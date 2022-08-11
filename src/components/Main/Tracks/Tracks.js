import { useState, useEffect } from "react";
import "./Tracks.css"


const Tracks = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [term, setTerm] = useState('short_term');
    const terms = ['short_term', 'medium_term', 'long_term'];
    const [info, setInfo] = useState([]);
    
    useEffect(() => {
        const endPoint =
          "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=" + term;
        fetch(endPoint, {
          headers: {
            Authorization: "Bearer " + props.user,
          },
        }).then(response => response.json())
        .then(data => data["items"])
        .then(items => setInfo(items));
        }, []);

    useEffect(() => console.log(info), [info]);


    return (
        <div className="Tracks my-8">
            <h2 className="text-white text-4xl">Your Top Tracks</h2>

        </div>
    )
}

export default Tracks;