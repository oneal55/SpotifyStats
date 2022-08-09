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
    <div className="Login">
      <Button text="Login Here" styles="py-2 px-4" onClick={authenticate} />
    </div>
  );
};

export default Login;
