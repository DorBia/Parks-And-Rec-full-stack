import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {

  let navigate = useNavigate();

  return (
    <div className="container py-4">
      <div className="border rounded p-4 mt-2 shadow">
        <img
          className="img-fluid pb-5 px-3"
          src="https://netflixlife.com/wp-content/blogs.dir/340/files/2015/08/Parks-Recreation-NBC.jpg"
          alt="main"
        />
        <div className="px-4">
        <p>
          The first season of Parks and Recreation originally aired in the
          United States on the NBC television network between April 9 and May
          14, 2009. Produced by Deedle-Dee Productions and Universal Media
          Studios, the series was created by Greg Daniels and Michael Schur, who
          served as executive producers with Howard Klein. The season stars Amy
          Poehler, Rashida Jones, Paul Schneider, Aziz Ansari, Nick Offerman,
          and Aubrey Plaza.
        </p>
        <p>
          The comedy series focuses on Leslie Knope (Poehler), the deputy
          director of the Parks and Recreation Department of the fictional town
          of Pawnee, Indiana. The season consisted of six 22-minute episodes,
          all of which aired at 8:30 p.m. on Thursdays. Daniels and Schur
          conceived the show when NBC officials asked Daniels to produce a
          spin-off of his comedy series The Office, on which Schur was a writer.
          During development, the creators decided the new show would be a
          stand-alone series, though it would share the mockumentary style of
          The Office. Like that show, Parks and Recreation encouraged
          improvisation among its cast members.
        </p>
        <p>
          Early test screenings were poor, and many critics and industry
          observers were skeptical about the show's chances of success. The
          first season received generally mixed reviews, and several
          commentators found it too similar to The Office. The premiere episode
          was watched by 6.77 million viewers, but the viewership declined
          almost every week in the Nielsen ratings. A season low of 4.25 million
          viewers watched the final episode, "Rock Show". Despite the low
          rating, "Rock Show" received the best reviews of the season and
          convinced some critics that the series had finally found the right
          tone.
        </p>
        </div>
        <div className="row justify-content-center">
        <Button
                variant="outline-dark"
                className="btn-lg col-5 col-md-3 py-3 my-2 mx-5"
                onClick={() => navigate("/episodes")}
              >
                Episodes
              </Button>
              <Button
                variant="outline-dark"
                className="btn-lg col-5 col-md-3 py-3 my-2 mx-5"
                onClick={() => navigate("/characters")}
              >
                Characters
              </Button>
        </div>

      </div>
    </div>
  );
};

export default Home;
