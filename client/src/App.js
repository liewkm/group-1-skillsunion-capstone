import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";
import { useState, useEffect } from "react";
import ExpenseList from "./components/ExpenseList";

// for window.localstorage, use
// https://react-native-async-storage.github.io/async-storage/docs/install/

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);

        window.localStorage.setItem("auth", "true");
        // for react-native, use
        // https://react-native-async-storage.github.io/async-storage/docs/install/

        // get token from firebase auth
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      }
    });
  }, []);


  const googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        if (userCred) {
          setAuth(true);
          window.localStorage.setItem("auth", "true");
          // for react-native, use
          // https://react-native-async-storage.github.io/async-storage/docs/install/
        }

        console.log(userCred);
      });
  };


  return (
    <div className="App">
      {auth ? (
        <ExpenseList token={token} />
      ) : (
        <button onClick={googleLogin}>Google Login</button>
      )}
    </div>
  );
}

export default App;
