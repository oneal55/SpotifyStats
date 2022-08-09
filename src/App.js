import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login.js";
import Main from "./components/Main/Main.js";
import TitleBar from "./components/TitleBar/TitleBar.js";

export default function App() {
  const url = window.location.hash;
  const [user, setUser] = useState(
    new URLSearchParams(url).get("#access_token")
  );

  const generateRandomString = () => {
    const length = Math.floor(Math.random() * 10) + 30;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let string = "";
    for (let i = 0; i < length; i++) {
      string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return string;
  };

  const stringifyPerms = (scope) => {
    let acc = "";
    for (let i = 0; i < scope.length; i++) {
      if (i > 0) {
        acc += " ";
      }
      acc += scope[i];
    }
    return acc;
  };

  const logOut = () => {
    window.location.href = "http://localhost:3000";
  };

  const baseURL = "https://accounts.spotify.com/authorize?";
  const state = generateRandomString();
  const client_id = "4f3cd9dfe9714762acbbbd97b623ca35";
  const response_type = "token";
  const redirect_uri = "http://localhost:3000";
  const perms = ["user-top-read"];

  let AUTH_URL = baseURL;
  AUTH_URL += "response_type=" + response_type;
  AUTH_URL += "&client_id=" + encodeURIComponent(client_id);
  AUTH_URL += "&scope=" + encodeURIComponent(stringifyPerms(perms));
  AUTH_URL += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  AUTH_URL += "&state=" + encodeURIComponent(state);
  AUTH_URL += "&show_dialog=true";

  useEffect(() => {
    if (user) {
      window.opener.spotifyCallback(user);
    }
  }, []);

  return (
    <div className="App">
      <TitleBar user={user} logOut={logOut} />
      {user ? (
        <Main accessToken={user} />
      ) : (
        <Login userAuth={AUTH_URL} setUser={setUser} />
      )}
    </div>
  );
}
