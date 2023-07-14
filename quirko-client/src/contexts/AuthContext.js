import React, { useContext, useState, useEffect } from "react";
import { auth, database } from "../index";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, username) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return updateUsername(result.user, username);
      });
  }

  function updateUsername(user, username) {
    return database
      .ref(`users/${user.uid}`)
      .update({
        username: username,
      })
      .then(() => {
        setCurrentUser((prevUser) => ({ ...prevUser, username: username }));
      });
  }

  function signupAnonymously() {
    return auth.signInAnonymously();
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    signupAnonymously,
    logout,
    resetPassword,
    updateUsername,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthContext;
