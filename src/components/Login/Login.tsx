import { act, FormEvent, useEffect, useState } from "react";
import styles from "./login.module.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "../../firebase";
import { EmailAuthCredential } from "firebase/auth/web-extension";

type AuthError = Error & {
  code?: string;
};

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [action, setAction] = useState<"login" | "signup">("signup");
  const [error, setError] = useState<string>("");
  const currUser = auth.currentUser;
  const [nickName, setNickName] = useState<string>(currUser?.displayName ?? "");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      return setError("All fields must be filled");
    }
    const submitCredentials =
      action === "login"
        ? signInWithEmailAndPassword
        : createUserWithEmailAndPassword;
    try {
      await submitCredentials(auth, email, password);
    } catch (error) {
      console.error(error);
      if ((error as AuthError).code) {
        switch ((error as AuthError).code) {
          case "auth/email-already-in-use":
            setError("Email already registered");
            break;
          case "auth/user-not-found":
            setError("This email is not registered");
            break;
          case "auth/invalid-email":
            setError("This email is invalid");
            break;
          case "auth/invalid-password":
            setError("Password must be at east 6 chars long");
            break;
          case "auth/wrong-password":
            setError("Password is incorrect");
            break;
          default:
            setError("Something went wrong, try again later");
        }
      } else {
        setError("Something went wrong signing up, try again later");
      }
    }
  };

  const handleUserName = async (username: string) => {
    if (currUser) {
      try {
        await updateProfile(currUser, { displayName: username });
        setNickName(username);
      } catch (error) {
        console.error(error);
        setError("Seems like your name triggered an error, try again later");
      }
    } else {
      setError("user not signed in correctly");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError("Something went wrong signing out. Maybe refresh the page?");
    }
  };

  return (
    <div className={styles.credentials}>
      {!user ? (
        <div className={styles.login}>
          <div className={styles.button_box}>
            <button
              onClick={() => setAction("signup")}
              className={action === "signup" ? styles.active : ""}
            >
              Sign up
            </button>
            <button
              onClick={() => setAction("login")}
              className={action === "login" ? styles.active : ""}
            >
              Log in
            </button>
          </div>
          <form onSubmit={handleSignUp}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
              value={email}
              id="email"
              name="email"
            ></input>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              value={password}
              id="password"
              name="password"
            ></input>
            <button type="submit">Log in</button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : user && nickName ? (
        <div className={styles.identified}>
          Nice to see you again {user.displayName}
          <button onClick={() => handleUserName("")}>
            Change Nickname
          </button>{" "}
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div className={styles.identified}>
          <label htmlFor="username"></label>How should I call you today?
          <input
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            value={userName}
            id="username"
          ></input>
          <button onClick={() => handleUserName(userName)}>OK</button>
        </div>
      )}
    </div>
  );
};
