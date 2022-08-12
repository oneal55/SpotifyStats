import "./Artists.css";
import { useEffect, useState } from "react";
import ArtistBlock from "./ArtistBlock/ArtistBlock";
import Spinner from "../Spinner/Spinner";

const Artists = (props) => {
    const [term, setTerm] = useState('short_term');
    const [info, setInfo] = useState([]);
    
    const terms = ['short_term', 'medium_term', 'long_term'];

    useEffect(() => {
        const endPoint =
          "https://api.spotify.com/v1/me/top/artists?limit=24&time_range=" + term;
        fetch(endPoint, {
          headers: {
            Authorization: "Bearer " + props.user,
          },
        }).then(response => response.json())
        .then(data => data["items"])
        .then(items => setInfo(items));
        }, []);



    return (
        <div className="Artists my-8">
            <h2 className="text-white text-4xl"><b>Your Top Artists</b></h2>
            <div className="artistBox">
                {info.length !== 0 ? <>{info.map((data, index) => <ArtistBlock artist={data} key={index + 1} index={index + 1}/>)}</> : <Spinner />}
            </div>
            
        </div>
    )
};

export default Artists;