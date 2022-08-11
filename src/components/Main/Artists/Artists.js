import "./Artists.css";
import { useEffect, useState } from "react";

const Artists = (props) => {
    
    const [expanded, setExpanded] = useState(false);
    const [artistInfo, setArtistInfo] = useState({});

    
    return (
        <div className="Artists my-8">
            <h2 className="text-white text-4xl">Your Top Artists</h2>

        </div>
    )
};

export default Artists;