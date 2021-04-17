import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import 'prismjs/themes/prism-okaidia.css';

const year = new Date().getFullYear();

export default function Layout ({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="site-title">
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <p>
          &copy; {year} Bruno Garcia
          &bull; Powered by <a href="https://github.com/brunogarcia/portfolio">Github</a>, <a href="https://www.gatsbyjs.org/">Gatsby</a> and <a href="https://www.netlify.com/">Netlify</a>
        </p>
      </footer>
    </div>
  )
}
