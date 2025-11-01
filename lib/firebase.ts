import {
  initializeApp,
  getApps,
  getApp,
  type FirebaseApp,
  type FirebaseOptions,
} from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseEnv = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const requiredValues = [
  firebaseEnv.apiKey,
  firebaseEnv.authDomain,
  firebaseEnv.projectId,
  firebaseEnv.storageBucket,
  firebaseEnv.messagingSenderId,
  firebaseEnv.appId,
];

export const isFirebaseConfigured = requiredValues.every(
  (value) => typeof value === "string" && value.length > 0
);

const firebaseConfig: FirebaseOptions | null = isFirebaseConfigured
  ? {
      apiKey: firebaseEnv.apiKey!,
      authDomain: firebaseEnv.authDomain!,
      projectId: firebaseEnv.projectId!,
      storageBucket: firebaseEnv.storageBucket!,
      messagingSenderId: firebaseEnv.messagingSenderId!,
      appId: firebaseEnv.appId!,
      measurementId: firebaseEnv.measurementId,
    }
  : null;

let app: FirebaseApp | null = null;

if (firebaseConfig) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
} else if (process.env.NODE_ENV === "development") {
  console.warn(
    "Firebase environment variables are not fully configured. Running in demo mode without Firebase."
  );
}

const auth: Auth | null = app ? getAuth(app) : null;
const db: Firestore | null = app ? getFirestore(app) : null;
const storage: FirebaseStorage | null = app ? getStorage(app) : null;

export const getFirestoreDb = (): Firestore => {
  if (!db) {
    throw new Error(
      'Firestore is not configured. Provide Firebase credentials or connect to the emulator to enable persistence.'
    );
  }
  return db;
};

export const getStorageBucket = (): FirebaseStorage => {
  if (!storage) {
    throw new Error(
      'Firebase Storage is not configured. Provide Firebase credentials or connect to the emulator to enable uploads.'
    );
  }
  return storage;
};

let analytics: Analytics | null = null;
if (typeof window !== "undefined" && app) {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app as FirebaseApp);
      }
    })
    .catch(() => null);
}

export { app, auth, db, storage, analytics };
