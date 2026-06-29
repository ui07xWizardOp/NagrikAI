import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Send,
  Activity,
  CheckCircle,
  Loader2,
  Mic,
  Square,
  X,
} from "lucide-react";
import { Report } from "../types";

export default function Capture({
  setView,
}: {
  setView: (
    v:
      | "home"
      | "capture"
      | "dashboard"
      | "playbook"
      | "hotspots"
      | "agency"
      | "karma",
  ) => void;
}) {
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState(
    "Indiranagar, 100ft Road, Bengaluru",
  );
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<
    { agent: string; message: string; metadata?: any }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const [interimText, setInterimText] = useState("");
  const [voiceConfidence, setVoiceConfidence] = useState<number | null>(null);
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: "success" | "info" | "error" }[]
  >([]);

  const addToast = (
    message: string,
    type: "success" | "info" | "error" = "info",
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    // Get geolocation on mount if possible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
      );
    }

    // @ts-ignore
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN"; // could be made dynamic

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setText((prev) => prev + event.results[i][0].transcript + " ");
            if (event.results[i][0].confidence !== undefined) {
              setVoiceConfidence(event.results[i][0].confidence);
            }
          } else {
            currentTranscript += event.results[i][0].transcript;
          }
        }
        setInterimText(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
        setInterimText("");
      };

      recognition.onend = () => {
        setIsRecording(false);
        setInterimText("");
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length > 0) {
      Promise.all(
        files.slice(0, 4 - images.length).map((file) => compressImage(file)),
      ).then((base64s) => {
        setImages((prev) => [...prev, ...base64s].slice(0, 4));
      });
    }
  };

  const handleSubmit = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setLogs([]);

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64s: images,
          text,
          location,
          lat:
            location.includes(",") && !isNaN(parseFloat(location.split(",")[0]))
              ? parseFloat(location.split(",")[0])
              : 12.9784 + (Math.random() - 0.5) * 0.01,
          lng:
            location.includes(",") && !isNaN(parseFloat(location.split(",")[1]))
              ? parseFloat(location.split(",")[1])
              : 77.6408 + (Math.random() - 0.5) * 0.01,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) throw new Error("No readable stream");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.agent === "Done") {
                try {
                  const myReports = JSON.parse(
                    localStorage.getItem("my_reports") || "[]",
                  );
                  if (data.metadata && data.metadata.id) {
                    myReports.push(data.metadata.id);
                    localStorage.setItem(
                      "my_reports",
                      JSON.stringify(myReports),
                    );
                  }
                } catch (e) {
                  console.error("Failed to save report to local storage", e);
                }
                setIsProcessing(false);
                setView("dashboard");
                return;
              } else if (data.agent === "Error") {
                setIsProcessing(false);
                addToast(
                  "An error occurred while processing the report.",
                  "error",
                );
                return;
              } else {
                setLogs((prev) => [
                  ...prev,
                  {
                    agent: data.agent,
                    message: data.message,
                    metadata: data.metadata,
                  },
                ]);
              }
            } catch (e) {
              console.error("Failed to parse SSE", e);
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 pb-24 relative">
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-[100] space-y-2 flex flex-col items-end pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="bg-surface-card border border-border-default shadow-lg rounded-xl p-4 flex items-center gap-3 animate-fade-in pointer-events-auto"
            >
              {toast.type === "success" ? (
                <CheckCircle className="text-success" size={18} />
              ) : (
                <Activity className="text-error" size={18} />
              )}
              <span className="text-sm font-medium text-text-primary">
                {toast.message}
              </span>
              <button
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
                className="text-text-muted hover:text-text-primary"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {!isProcessing ? (
        <>
          <div className="flex items-center justify-between border-b border-border-default pb-4">
            <h2 className="text-3xl font-black uppercase tracking-tighter">
              Report Issue
            </h2>
            <span className="text-xxs font-mono text-text-subtle uppercase tracking-widest">
              Multi-modal Input
            </span>
          </div>

          <div className="space-y-4">
            <div
              className="w-full aspect-[4/3] bg-surface-card rounded-lg border border-dashed border-border-default flex flex-col items-center justify-center overflow-hidden cursor-pointer relative hover:bg-surface-muted transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {images.length > 0 ? (
                <img
                  src={images[0]}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-text-subtle flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-surface-muted rounded-full flex items-center justify-center">
                    <Camera size={32} className="text-text-muted" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    Tap to take photo(s)
                  </span>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
                aria-label="Upload photos"
              />
            </div>

            {images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden border border-border-default group"
                  >
                    <img
                      src={img}
                      alt={`Preview ${i}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImages((prev) => prev.filter((_, idx) => idx !== i));
                      }}
                      className="absolute top-1 right-1 bg-black/60 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </div>
                ))}
                {images.length < 4 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 shrink-0 rounded-md border border-dashed border-border-default flex flex-col items-center justify-center text-text-subtle hover:bg-surface-card hover:text-text-secondary transition-colors"
                  >
                    <Camera size={16} className="mb-1" />
                    <span className="text-xxs uppercase font-mono tracking-widest">
                      Add
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label
              htmlFor="location-input"
              className="block text-xxs font-mono text-text-muted uppercase tracking-widest"
            >
              Detected Location
            </label>
            <input
              id="location-input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-4 rounded-lg bg-surface-card border border-border-default text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none font-mono text-sm"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label
                htmlFor="voice-description"
                className="block text-xxs font-mono text-text-muted uppercase tracking-widest"
              >
                Voice Description (Optional)
              </label>
              {voiceConfidence !== null && text.length > 0 && (
                <span className="text-xxs font-mono text-secondary bg-secondary/10 px-2 py-0.5 rounded border border-secondary/20">
                  VOICE AGENT CONFIDENCE: {Math.round(voiceConfidence * 100)}%
                </span>
              )}
            </div>
            <div className="relative">
              <div className="relative w-full rounded-lg bg-surface-card border border-border-default overflow-hidden focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
                <textarea
                  id="voice-description"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe the issue... (or tap mic to speak)"
                  className="w-full p-4 pr-16 bg-transparent text-text-primary outline-none font-mono text-sm min-h-[100px] resize-y absolute inset-0 z-10"
                />
                <div
                  className="w-full p-4 pr-16 font-mono text-sm min-h-[100px] whitespace-pre-wrap invisible"
                  aria-hidden="true"
                >
                  {text + (interimText ? " " + interimText : "") + "\n"}
                </div>
                {interimText && (
                  <div className="absolute inset-0 p-4 pr-16 font-mono text-sm pointer-events-none z-0">
                    <span className="opacity-0">{text}</span>
                    <span className="text-text-subtle italic ml-1">
                      {interimText}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={toggleRecording}
                className={`absolute right-4 bottom-4 w-10 h-10 rounded-full flex items-center justify-center transition-all z-20 ${isRecording ? "bg-danger animate-pulse" : "bg-surface-muted hover:bg-surface-muted"}`}
              >
                {isRecording ? (
                  <Square size={16} fill="white" />
                ) : (
                  <Mic
                    size={16}
                    className={
                      isRecording ? "text-text-on-accent" : "text-accent"
                    }
                  />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={images.length === 0}
            className="w-full bg-accent disabled:bg-surface-muted disabled:text-text-subtle text-text-on-accent p-5 rounded-lg font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-colors shadow-lg shadow-accent/10"
          >
            <Send size={18} />
            Submit for AI Triage
          </button>
        </>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-border-default pb-4">
            <div className="flex flex-col">
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                AI Processing
              </h2>
              <p className="text-xxs font-mono text-text-subtle uppercase tracking-widest mt-1">
                Routing your report
              </p>
            </div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-50"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-20"></div>
            </div>
          </div>

          <div className="bg-surface-card p-6 rounded-lg border border-border-subtle space-y-4">
            <h3 className="text-xxs font-bold text-text-subtle uppercase tracking-widest mb-4">
              Live Agent Logic
            </h3>
            {logs.map((log, index) => {
              const isVision = log.agent === "Vision";
              const isSeverity = log.agent === "Severity";
              const isJurisdiction = log.agent === "Jurisdiction";
              const isRouting = log.agent === "Routing";
              const isVerification = log.agent === "Verification";
              const isDuplicate = log.agent === "Duplicate";
              const isImpact = log.agent === "Impact";
              const isRepair = log.agent === "Repair";
              let borderColor = "border-border-strong";
              let textColor = "text-text-muted";

              if (isVision) {
                borderColor = "border-agent-2";
                textColor = "text-agent-2";
              }
              if (isSeverity) {
                borderColor = "border-agent-3";
                textColor = "text-agent-3";
              }
              if (isJurisdiction) {
                borderColor = "border-agent-4";
                textColor = "text-agent-4";
              }
              if (isRouting) {
                borderColor = "border-agent-9";
                textColor = "text-agent-9";
              }
              if (isVerification) {
                borderColor = "border-agent-7";
                textColor = "text-agent-7";
              }
              if (isDuplicate) {
                borderColor = "border-agent-5";
                textColor = "text-agent-5";
              }
              if (isImpact) {
                borderColor = "border-agent-6";
                textColor = "text-agent-6";
              }
              if (isRepair) {
                borderColor = "border-agent-8";
                textColor = "text-agent-8";
              }

              return (
                <div
                  key={index}
                  className={`bg-surface-card p-4 rounded-lg border border-border-default border-l-4 ${borderColor} animate-in fade-in slide-in-from-right-4 shadow-sm`}
                >
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-border-subtle">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${textColor} flex items-center gap-2`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full bg-current`}
                      ></span>
                      {log.agent} Agent
                    </span>
                    <span className="text-xxs text-text-subtle font-mono">
                      {new Date().toLocaleTimeString("en-US", {
                        hour12: false,
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-text-primary">{log.message}</p>

                  {log.metadata && (
                    <div className="mt-4 space-y-3">
                      {log.metadata.reasoning && (
                        <div className="text-xs text-text-secondary italic border-l-2 border-border-strong pl-3 py-1">
                          "{log.metadata.reasoning}"
                        </div>
                      )}
                      {log.metadata.confidence && (
                        <div className="inline-flex items-center gap-1.5 bg-surface-muted px-2 py-0.5 rounded text-xs font-medium border border-border-subtle">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          <span className="text-text-primary">
                            {Math.round(log.metadata.confidence * 100)}%
                            confidence
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex items-center gap-3 py-4">
              <div className="flex space-x-1">
                <div className="w-1 h-3 bg-surface-muted animate-pulse"></div>
                <div className="w-1 h-3 bg-surface-muted"></div>
                <div className="w-1 h-3 bg-surface-muted"></div>
              </div>
              <span className="text-xxs font-mono text-text-subtle uppercase tracking-widest flex items-center gap-2">
                <Loader2 size={12} className="animate-spin" /> Orchestrating
                next agent...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
