import { useEffect } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";


const Seasons = ({seasons, loadSeasons, loading}) => {

  useEffect(() => {
    loadSeasons();
    //eslint-disable-next-line
  },[])

  return (
    <>
    {loading && <LoadingScreen />}
    {!loading && 
    <div>
        <button onClick={() => {console.log(seasons)}}>Click</button>
        {seasons.map(season => <p key={season.id}>Season: {season.seasonsNumber}</p>)}
    </div>}
    </>
  )
}

export default Seasons