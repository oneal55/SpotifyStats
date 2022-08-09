import { useState, useEffect } from "react";
import "./ArtistBlock.css";

const ArtistBlock = (props) => {
  const [profile, setProfile] = useState(undefined);
  const styles = {
    display: "inline-block",
    width: props.width,
    height: props.height,
  };

  useEffect(() => {
    fetch(props.artist["href"], {
      headers: {
        Authorization: "Bearer " + props.accessToken,
      },
    })
      .then((response) => response.json())
      .then((profile) => setProfile(profile));
  }, [props.artist]);

  const imgStyles = (type) => {
    let img = undefined;

    if (type === "artist") {
      img = profile["images"][0];
    } else {
      img = profile["album"]["images"][0];
    }
    if (img["height"] > img["width"]) {
      return { margin: "auto", height: "90vw", cursor: "pointer" };
    } else {
      return { margin: "auto", width: "90%", cursor: "pointer" };
    }
  };

  const format = (string) => {
    let acc = "";
    for (let i = 0; i < string.length; i++) {
      if (i === 0) {
        acc += string.charAt(0).toUpperCase();
      } else if (string.charAt(i - 1) < "a" || string.charAt(i - 1) > "z") {
        acc += string.charAt(i).toUpperCase();
      } else {
        acc += string.charAt(i).toLowerCase();
      }
    }

    return acc;
  };

  return (
    <div className="TypeBlock" style={styles}>
      <h1 className="text-4xl text-black">
        <strong>{props.artist["name"]}</strong>
      </h1>
      <div className="img-container">
        {profile !== undefined ? (
          profile["type"] === "artist" ? (
            <>
              <img
                className="img"
                src={profile["images"][0]["url"]}
                alt={"Photo of " + props.artist["name"]}
                style={imgStyles(profile["type"])}
                onClick={(event) => {
                  window.open(profile["external_urls"]["spotify"]);
                }}
              />
              <h2>
                {profile["genres"].map((genre) => format(genre)).join(", ")}
              </h2>
            </>
          ) : (
            <>
              <img
                className="img"
                src={profile["album"]["images"][0]["url"]}
                alt={"Photo of " + props.artist["name"]}
                style={imgStyles(profile["type"])}
                onClick={(event) => {
                  window.open(profile["external_urls"]["spotify"]);
                }}
              />

              <h2>
                {/* {profile["genre"].map((genre) => format(genre)).join(", ")} */}
              </h2>
            </>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ArtistBlock;
