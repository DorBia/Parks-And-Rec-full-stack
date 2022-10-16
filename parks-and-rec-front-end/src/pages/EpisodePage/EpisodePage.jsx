import { Link, useParams } from "react-router-dom";

const EpisodePage = () => {
    const { id } = useParams();

    let seasonJsx = [];
    for (let i = 1; i < 10; i++) {
        seasonJsx.push(<Link to={`/character/${i}`} key={i}><p>Name {i}</p></Link>)
    }

  return (
    <div>
    <h1>Episode {id}</h1>
    {seasonJsx}
</div>
  )
}

export default EpisodePage