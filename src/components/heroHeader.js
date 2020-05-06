import React from "react"
import { StaticQuery, graphql } from "gatsby"
import GithubIcon from "../images/github.inline.svg";
import LinkedinIcon from "../images/linkedin.inline.svg";

export default () => (
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
        <div className="headline">{data.site.siteMetadata.home.title}</div>
        <div 
          className="primary-content" 
          dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.home.description}}
        />
        <a href='https://github.com/brunogarcia' className="button -primary">
          <GithubIcon role="img" aria-label="github icon" /> Github
        </a>
        <a href='https://www.linkedin.com/in/bruno-garcia-echegaray' className="button -primary">
          <LinkedinIcon role="img" aria-label="Linkedin icon" /> Linkedin
        </a>
      </div>
    )}
  />
)