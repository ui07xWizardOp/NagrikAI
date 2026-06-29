import { getFirestore } from 'firebase-admin/firestore';
import { getApps, initializeApp } from 'firebase-admin/app';
import fs from 'fs';
import path from 'path';

// Initialize Firebase Admin if not already initialized
function initFirebase() {
  if (!getApps().length) {
    try {
      const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        initializeApp({ projectId: config.projectId });
      }
    } catch (e) {
      console.error("Failed to initialize firebase admin in firestore.ts", e);
    }
  }
}

let dbInstance: any = null;
export function getDb() {
  if (!dbInstance) {
    initFirebase();
    try {
      dbInstance = getFirestore();
    } catch (e) {
      console.error("Failed to get firestore instance", e);
      throw e;
    }
  }
  return dbInstance;
}

export async function getReports() {
  try {
    const db = getDb();
    const snapshot = await db.collection('reports').orderBy('date', 'desc').get();
    return snapshot.docs.map((doc: any) => doc.data());
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function addReport(report: any) {
  try {
    const db = getDb();
    await db.collection('reports').doc(report.id).set(report);
  } catch (e) {
    console.error(e);
  }
}

export async function updateReport(id: string, data: any) {
  try {
    const db = getDb();
    await db.collection('reports').doc(id).update(data);
  } catch (e) {
    console.error(e);
  }
}

export async function getReport(id: string) {
  try {
    const db = getDb();
    const doc = await db.collection('reports').doc(id).get();
    return doc.exists ? doc.data() : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function upvoteReport(id: string) {
  try {
    const db = getDb();
    const docRef = db.collection('reports').doc(id);
    const doc = await docRef.get();
    if (doc.exists) {
      const current = doc.data()?.upvotes || 0;
      await docRef.update({ upvotes: current + 1 });
      return current + 1;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

export async function addComment(id: string, comment: any) {
  try {
    const db = getDb();
    const docRef = db.collection('reports').doc(id);
    const doc = await docRef.get();
    if (doc.exists) {
      const comments = doc.data()?.comments || [];
      comments.push(comment);
      await docRef.update({ comments });
      return comment;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}
