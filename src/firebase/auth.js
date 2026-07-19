import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);

/**
 *
 * Google Auth Sign in function
 *
 */

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

/**
 *
 * Email/Password Sign up function
 */

export const signUpWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};

/**
 *
 * Email/Password Sign in function
 */

export const signInWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};

/**
 *
 * Sign out function
 */

export const signOutUser = async () => {
  await signOut(auth);
};

export { auth };
