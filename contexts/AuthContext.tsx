'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';

type DemoUser = {
  uid: string;
  email: string;
  password: string;
  displayName: string;
  photoURL: string | null;
  providerId: 'demo';
};

type AuthUser = User | DemoUser;

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const DEMO_USERS_KEY = 'wealthBridge-demo-users';
const DEMO_SESSION_KEY = 'wealthBridge-demo-session';

const readDemoUsers = (): DemoUser[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(DEMO_USERS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as DemoUser[];
  } catch (error) {
    console.warn('Unable to read demo users from storage:', error);
    return [];
  }
};

const persistDemoUsers = (users: DemoUser[]) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
};

const loadDemoSession = (): DemoUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const sessionId = window.localStorage.getItem(DEMO_SESSION_KEY);
  if (!sessionId) {
    return null;
  }
  const users = readDemoUsers();
  return users.find((candidate) => candidate.uid === sessionId) ?? null;
};

const storeDemoSession = (uid: string | null) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (uid) {
    window.localStorage.setItem(DEMO_SESSION_KEY, uid);
  } else {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
  }
};

const generateDemoId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `demo-${Math.random().toString(36).slice(2, 11)}`;
};

const createDemoUser = (email: string, password: string, displayName: string): DemoUser => {
  return {
    uid: generateDemoId(),
    email,
    password,
    displayName,
    photoURL: null,
    providerId: 'demo',
  };
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !isFirebaseConfigured) {
      const existingUser = loadDemoSession();
      setUser(existingUser);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser || !db) {
        return;
      }

      // Create user document if it doesn't exist
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || 'New User',
            photoURL: currentUser.photoURL || '',
            createdAt: serverTimestamp(),
            level: 1,
            points: 0,
            streak: 0,
            lastLoginDate: serverTimestamp(),
          });
        } else {
          // Update last login date
          await setDoc(userDocRef, {
            lastLoginDate: serverTimestamp(),
          }, { merge: true });
        }
      } catch (error) {
        console.error('Error syncing user profile with Firestore:', error);
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    if (!auth || !isFirebaseConfigured) {
      const users = readDemoUsers();
      const emailExists = users.some(
        (existing) => existing.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        throw new Error('An account with this email already exists (demo mode).');
      }

      const newUser = createDemoUser(email, password, displayName);
      persistDemoUsers([...users, newUser]);
      storeDemoSession(newUser.uid);
      setUser(newUser);
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update display name
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });

      // Create user document in Firestore
      if (db) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName,
          photoURL: '',
          createdAt: serverTimestamp(),
          level: 1,
          points: 0,
          streak: 0,
          achievements: [],
          lastLoginDate: serverTimestamp(),
        });
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!auth || !isFirebaseConfigured) {
      const users = readDemoUsers();
      const existingUser = users.find(
        (candidate) =>
          candidate.email.toLowerCase() === email.toLowerCase() &&
          candidate.password === password
      );

      if (!existingUser) {
        throw new Error('Invalid email or password (demo mode).');
      }

      storeDemoSession(existingUser.uid);
      setUser(existingUser);
      return;
    }

    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    if (!auth || !isFirebaseConfigured) {
      // In demo mode, create a mock Google account
      const users = readDemoUsers();
      const demoGoogleEmail = 'demo.user@wealthbridge.local';
      let existingUser = users.find(
        (candidate) => candidate.email.toLowerCase() === demoGoogleEmail
      );

      if (!existingUser) {
        existingUser = {
          uid: generateDemoId(),
          email: demoGoogleEmail,
          password: '',
          displayName: 'Demo Learner',
          photoURL: null,
          providerId: 'demo',
        };
        persistDemoUsers([...users, existingUser]);
      }

      storeDemoSession(existingUser.uid);
      setUser(existingUser);
      return;
    }

    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    if (!auth || !isFirebaseConfigured) {
      storeDemoSession(null);
      setUser(null);
      return;
    }

    await signOut(auth);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
