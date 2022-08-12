import { useState, useEffect } from "react";
import "./Tracks.css"
import TrackBlock from "./TrackBlock/TrackBlock";
import Spinner from "../Spinner/Spinner";

const Tracks = (props) => {
    const [term, setTerm] = useState('short_term');
    const [info, setInfo] = useState([]);
    

    const terms = ['short_term', 'medium_term', 'long_term'];

    useEffect(() => {
        const endPoint =
          "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=" + term;
        setInfo([]);
            fetch(endPoint, {
                headers: {
                  Authorization: "Bearer " + props.user,
                },
              }).then(response => response.json())
              .then(data => data["items"])
              .then(items => setInfo(items));
              }
        , []);


    return (
        <div className="Tracks my-8">
            <h2 className="text-white text-4xl"><b>Your Top Tracks</b></h2>
            <div className="trackBox">
                {info.length !== 0 ? <>{info.map((data, index) => <TrackBlock track={data} key={index + 1} index={index + 1}/>)}</> : <Spinner />}
            </div>
            
        </div>
    )
}

export default Tracks;