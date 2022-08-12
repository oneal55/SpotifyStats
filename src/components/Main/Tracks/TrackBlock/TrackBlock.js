import "./TrackBlock.css"

const TrackBlock = (props) => {

    const openLink = () => {
        window.open(props.track.external_urls?.spotify);
    }
    
    return(
        <div className="trackBlock" onClick={openLink}>
            <img src={props.track["album"]["images"][0]["url"]} alt='Album Cover'/>
            <div className="trackText">
                <h2><strong>{props.index + ". " + props.track["album"]["name"] + " - " + props.track["name"]}</strong></h2>
                <p>{props.track["artists"].map(artist => artist["name"]).join(', ')}</p>
            </div>
        </div>
    )
    
}

export default TrackBlock;