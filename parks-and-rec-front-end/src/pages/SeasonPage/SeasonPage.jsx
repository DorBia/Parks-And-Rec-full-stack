import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const SeasonPage = () => {
    const { id } = useParams();

    let seasonJsx = [];
    for (let i = 1; i < 23; i++) {
        seasonJsx.push(<Link to={`/episode/${i}`} key={i}><p>Episode {i}</p></Link>)
    }

  return (
    <div>
        <h1>Season {id}</h1>
        {seasonJsx}
    </div>
  )
}

export default SeasonPage