import "./Main.css";
import ArtistBlock from "./ArtistBlock/ArtistBlock.js";
import DropDown from "./DropDown/DropDown";
import { useEffect, useState, useRef } from "react";
import Button from "../Button/Button";

const Main = (props) => {
  const [info, setInfo] = useState([]);
  const [type, setType] = useState("artists");
  const [limit, setLimit] = useState(10);
  const [timeRange, setTimeRange] = useState("short_term");

  async function getArtists() {
    const endPoint =
      "https://api.spotify.com/v1/me/top/" +
      type +
      "?limit=" +
      limit +
      "&time_range=" +
      timeRange;
    // type +
    // "?limit=" +
    // limit +
    // "&time_range=" +
    // timeRange;
    return fetch(endPoint, {
      headers: {
        Authorization: "Bearer " + props.accessToken,
      },
    });
  }

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

  const getInfo = () => {
    getArtists()
      .then((response) => response.json())
      .then((data) => setInfo(data["items"]));
  };

  const clampLimit = (value) => {
    const newLimit = Math.min(Math.max(3, value), 30);
    setLimit(newLimit);
    return newLimit;
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  const typeOptions = ["artists", "tracks"];
  const durationOptions = ["short_term", "medium_term", "long_term"];
  return (
    <>
      <div className="Selections my-2">
        <DropDown formatter={format} setter={setType} choices={typeOptions} />

        <label htmlFor="limit">Number of {format(type)}: </label>
        <input
          name="limit"
          type="number"
          className="w-16 mr-8"
          onChange={(event) => clampLimit(event.target.value)}
          min={3}
          max={30}
          value={limit}
        />

        <DropDown
          formatter={format}
          setter={setTimeRange}
          choices={durationOptions}
        />

        <Button
          text="Search"
          styles="text-lg py-1 px-4 mr-2"
          onClick={getInfo}
        />
      </div>
      {info.length === 0 ? (
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
      )}
      <div>
        Hi
      </div>
    </>
  );
};

export default Main;
