import "./Main.css";
import { useEffect, useState } from "react";
import TitleBar from "./TitleBar/TitleBar";
import Artists from "./Artists/Artists";
import Genres from "./Genres/Genres";
import Tracks from "./Tracks/Tracks";


const Main = (props) => {
  const [info, setInfo] = useState([]);
  const [type, setType] = useState("artists");
  const [limit, setLimit] = useState(10);
  const [timeRange, setTimeRange] = useState("short_term");


  const format = (string) => {
    let acc = "";
    for (let i = 0; i < string.length; i++) {
      if (i === 0) {
        acc += string.charAt(0).toUpperCase();
      } else if (string.charAt(i) === "_") {
        acc += "-";
      } else {
        acc += string.charAt(i).toLowerCase();
      }
    }

    return acc;
  };


  const clampLimit = (value) => {
    const newLimit = Math.min(Math.max(3, value), 30);
    setLimit(newLimit);
    return newLimit;
  };


  const typeOptions = ["artists", "tracks"];
  const durationOptions = ["short_term", "medium_term", "long_term"];
  return (
    <>
      <TitleBar user={props.accessToken} logOut={props.logOut} />

      <Artists user={props.accessToken}/>
      <Genres user={props.accessToken}/>
      <Tracks user={props.accessToken}/>
      {/* {info.length === 0 ? (
        <>Choose your settings then Search!!</>
      ) : (
        <div className="Genres py-8 mb-16">
          <ArtistBlock
            artist={info[0]}
            width={"33.3%"}
            accessToken={props.accessToken}
            type={type}
          />
          <ArtistBlock
            artist={info[1]}
            width={"33.3%"}
            accessToken={props.accessToken}
            type={type}
          />
          <ArtistBlock
            artist={info[2]}
            width={"33.3%"}
            accessToken={props.accessToken}
            type={type}
          />
        </div>
      )} */}
    </>
  );
};

export default Main;
