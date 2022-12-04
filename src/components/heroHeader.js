import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faSuitcase, faRunning, faFilm, faMusic, faBookReader } from '@fortawesome/free-solid-svg-icons'
export default function HeroHeader() {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              home {
                title
                description
              }
            }
          }
        }
      `}
      render={data => (
        <div className="hero-header">
          <div className="row">
            <div className="column-left">
              <img src="https://res.cloudinary.com/pastelitos/image/upload/v1670174082/bruno/bruno-garcia_qqrpip.jpg" alt="Avatar of Bruno" />
            </div>
            <div className="column-right">
              <div className="headline">
                {data.site.siteMetadata.home.title}
              </div>
              <div className="primary-content">
                { data.site.siteMetadata.home.description }
              </div>
              <a href='https://github.com/brunogarcia' className="button -primary">
                <FontAwesomeIcon icon={faCode} /> Github
              </a>
              <a href='https://www.linkedin.com/in/bruno-garcia-echegaray' className="button -primary">
                <FontAwesomeIcon icon={faSuitcase} /> Linkedin
              </a>
              <a href='https://www.strava.com/athletes/43126016' className="button -primary">
                <FontAwesomeIcon icon={faRunning} /> Strava
              </a>
              <a href="http://www.goodreads.com/review/list/4722653-bruno-garcia?page=1&sort=rating&view=covers" className="button -primary">
                <FontAwesomeIcon icon={faBookReader} /> Goodreads
              </a>
              <a href="http://www.filmaffinity.com/es/userratings.php?user_id=738783&amp;orderby=0" className="button -primary">
                <FontAwesomeIcon icon={faFilm} /> Filmaffinity
              </a>
              <a href="https://play.spotify.com/user/brunogarcia/playlist/4MRGjKqlWuJZJ8XHOGcqkR" className="button -primary">
                <FontAwesomeIcon icon={faMusic} /> Spotify
              </a>
            </div>
          </div>
        </div>
      )}
    />
  );
}
