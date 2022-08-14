import { useState, useEffect } from "react";
import "./Tracks.css"
import TrackBlock from "./TrackBlock/TrackBlock";
import Spinner from "../Spinner/Spinner";

const Tracks = (props) => {
    const [info, setInfo] = useState([]);

    const search = () => {
        const endPoint =
          "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=" + props.time;
        setInfo([]);
            fetch(endPoint, {
                headers: {
                  Authorization: "Bearer " + props.user,
                },
              }).then(response => response.json())
              .then(data => data["items"])
              .then(items => {
                setInfo(items)
            });
    }

    useEffect(() => search(), [props.time])

    return (
        <div className="Tracks my-8">
            <h2 className="text-white trackLabel"><b>Your Top Tracks</b></h2>
            <div className="trackBox">
                {info.length !== 0 ? <>{info.map((data, index) => <TrackBlock track={data} key={index + 1} index={index + 1}/>)}</> : <Spinner />}
            </div>
            
        </div>
    )
}

export default Tracks;