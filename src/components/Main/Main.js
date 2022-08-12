import "./Main.css";
import TitleBar from "./TitleBar/TitleBar";
import Artists from "./Artists/Artists";
import Genres from "./Genres/Genres";
import Tracks from "./Tracks/Tracks";
import Button from "../Button/Button";
import { format } from "../../functions/functions";
import { useState } from "react";

const Main = (props) => {
  const [term, setTerm] = useState('short_term')

  return (
    <>
      <TitleBar user={props.accessToken} logOut={props.logOut} />
      <h2 className="text-white text-4xl"><b>Currently On: {format(term)}</b></h2>
      <div className="Terms">
      <Button text={'Short Term'} onClick={() => setTerm('short_term')} styles={'py-2 my-2 mx-4 px-4'}/>
      <Button text={'Medium Term'} onClick={() => setTerm('medium_term')} styles={'py-2 my-2 mx-4 px-4'}/>
      <Button text={'Long Term'} onClick={() => setTerm('long_term')} styles={'py-2 my-2 mx-4 px-4'}/>
      </div>
      <Artists user={props.accessToken} time={term}/>
      <Genres user={props.accessToken} time={term}/>
      <Tracks user={props.accessToken} time={term}/>
    </>
  );
};

export default Main;
