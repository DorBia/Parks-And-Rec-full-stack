import axios from "axios";
import { useEffect, useState } from "react";


const Seasons = () => {
    const [ seasons, setSeasons ] = useState([]);

  useEffect(() => {
    loadSeasons();
  },[])

const loadSeasons = async () =>{
  const result = await axios.get("https://parks-and-rec-123.nw.r.appspot.com/season/all" ,{
      validateStatus: function (status) {
          return true;
      }
  });

  if (result.status === 302) {
    setSeasons(result.data);
  }
}

  return (
    <div>
        <button onClick={() => {console.log(seasons)}}>Click</button>
        {seasons.map(season => <p key={season.id}>Season: {season.seasonsNumber}</p>)}
    </div>
  )
}

export default Seasons