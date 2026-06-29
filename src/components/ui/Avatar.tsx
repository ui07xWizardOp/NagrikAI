import { ImgHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";
import { User } from "lucide-react";

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    if (src) {
      return (
        <img
          src={src}
          alt={alt || "Avatar"}
          ref={ref}
          className={cn(
            "h-10 w-10 rounded-full object-cover shadow-sm",
            className,
          )}
          {...props}
        />
      );
    }

    return (
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-text-muted shadow-sm",
          className,
        )}
      >
        {fallback ? (
          <span className="text-sm font-medium">{fallback}</span>
        ) : (
          <User className="h-5 w-5" />
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

export { Avatar };
