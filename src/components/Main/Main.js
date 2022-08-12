import "./Main.css";
import TitleBar from "./TitleBar/TitleBar";
import Artists from "./Artists/Artists";
import Genres from "./Genres/Genres";
import Tracks from "./Tracks/Tracks";


const Main = (props) => {


  return (
    <>
      <TitleBar user={props.accessToken} logOut={props.logOut} />
      <Artists user={props.accessToken}/>
      <Genres user={props.accessToken}/>
      <Tracks user={props.accessToken}/>
    </>
  );
};

export default Main;
