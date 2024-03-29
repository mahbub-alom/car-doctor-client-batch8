import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUsers(currentUser);
      setLoading(false);
      const userEmail = currentUser?.email || users?.email;
      const loggedUser = { email: userEmail };
      console.log("logged user", currentUser);
      if (currentUser) {
         axios
          .post("https://car-doctor-server-batch8.onrender.com/jwt", loggedUser, {
            withCredentials: true,
         })
          .then((res) => {
            console.log(res.data);
          });
       } else {
       axios
          .post("https://car-doctor-server-batch8.onrender.com/logOut", loggedUser, {
             withCredentials: true,
          })
           .then((res) => {
             console.log("user logOut",res.data);
           });
       }
    });
    return () => {
      unSubscribe();
    };
  }, [users?.email]);

  const authInfo = {
    users,
    loading,
    createUser,
    signInUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
