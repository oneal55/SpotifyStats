import "./Genres.css";
import {useState, useEffect} from 'react';
import Spinner from './../Spinner/Spinner.js';
import { format } from "./../../../functions/functions.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
    );

const Genres = (props) => {

    const [info, setInfo] = useState(undefined);
    const [rawData, setrawData] = useState([]);
    const [term, setTerm] = useState('long_term');
    
    const terms = ['short_term', 'medium_term', 'long_term'];

    async function getAllInfo(offsetAmount) {
        const endPoint =
          "https://api.spotify.com/v1/me/top/artists?offset=" + offsetAmount + "&limit=100&time_range=" + term;
        fetch(endPoint, {
          headers: {
            Authorization: "Bearer " + props.user,
          },
        }).then(response => response.json())
        .then(data => data["items"])
        .then(items => {
            if (items.length < 100) {
                setrawData(rawData.concat(items));
            }
            else {
                getAllInfo(offsetAmount + 100).then(data => {setrawData(items.concat(data))});
            }
        });
    }

    const turnInfoIntoObject = (data) => {
        let acc = {};
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i]["genres"].length; j++) {
                const genre = data[i]['genres'][j];
                if (acc[genre] === undefined) {
                    acc[genre] = 1;
                }
                else {
                    acc[genre] = acc[genre] + 1;
                }
            }
        }
        return acc;
    }

    const splitInfoObjectIntoArray = (infoObject) => {
        let arr = [];
        const keys = Object.keys(infoObject);
        for (let i = 0; i < keys.length; i++) {
            const pair = {[keys[i]]: infoObject[keys[i]]};
            arr.push(pair);
        }

        arr.sort((obj1, obj2) => {
            const val1 = Object.values(obj1)[0];
            const val2 = Object.values(obj2)[0];
            return val2 - val1;
        });

        return arr;
    }

    const turnDataIntoEasyData = (data) => {
        let infoClone = [];
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            if (i < 10) {
                infoClone.push(data[i]);
            }
            else {
                total += Object.values(data[i])[0];
            }
        }
        infoClone.push({others: total});

        return infoClone;
    }

    const formatChartData = (data) => {
        const smallerData = data.slice(0, 10);
        return {
            labels: smallerData.map(pair => format(Object.keys(pair)[0])),
            datasets: [
                {
                    label: "Top 10 Genres",
                    data: smallerData.map(pair => Object.values(pair)[0]),
                    backgroundColor: [
                        'rgba(34, 197, 94, 1)',
                      ],
                    borderColor: [
                        'rgba(4, 167, 64, 1)',]
                    ,
                    borderWidth: 1
                }
            ]

        }
    }

     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Your Top 10 Genres Based On Your Artists',
          },
        },
      };


    useEffect(() => {
        setrawData([]);
        getAllInfo(0);
    }, []);

    useEffect(() => {

        const newInfo = splitInfoObjectIntoArray(turnInfoIntoObject(rawData));
        console.log(newInfo);
        setInfo(newInfo);
    }, [rawData]);

    return (
        <div className="Genres my-8">
            <h2 className="text-white text-4xl"><b>Your Favorite Genres</b></h2>
            <div className="canvas-container">
                {info != undefined ? <Bar data={formatChartData(info)} options={options}/>: <Spinner />}
            </div>
            
        </div>
    )
}

export default Genres;