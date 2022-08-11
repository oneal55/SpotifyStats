import "./Login.css";
import Button from "../Button/Button.js";
const Login = (props) => {
  const authenticate = () => {
    let popup = window.open(props.userAuth, "Login To Spotify", 'popup, height=500, width=400');
    window.spotifyCallback = (payload) => {
      props.setUser(new URLSearchParams(popup.location.hash).get("#access_token"));
      popup.close();
    }
  };

  return (
    <div className="container">
        <h1 className="text-white text-6xl text-bold title">Spotify Stats</h1>
        <div className="logIn">
          <Button text="Login Here" styles="py-2 px-4" onClick={authenticate} />
        </div>
    </div>
    
  );
};

export default Login;
