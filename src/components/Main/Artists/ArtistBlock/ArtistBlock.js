import "./ArtistBlock.css"
import { format } from "../../../../functions/functions";
const ArtistBlock = (props) => {

    const openLink = () => {
        window.open(props.artist.external_urls?.spotify);
    }
    
    return(
        <div className="artistBlock" onClick={openLink}>
            <img src={props.artist["images"][0]["url"]} alt={props.artist["name"]}/>
            <div className="artistText">
                <h2><strong>{props.index + ". " + props.artist["name"]}</strong></h2>
                <p>{props.artist["genres"].map(genre => format(genre)).join(', ') || "Other"}</p>
            </div>
        </div>
    )
    
}

export default ArtistBlock;