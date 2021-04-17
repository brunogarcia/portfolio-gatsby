import React from "react"
import Helmet from 'react-helmet';
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import HeroHeader from "../components/heroHeader"
import Item from "../components/item"

const BLOG = 'blog';
const EXPERIMENT = 'experiment';

const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {

  const Experiments = edges
    .filter(edge =>  edge.node.frontmatter.type === EXPERIMENT)
    .map(edge => <Item key={edge.node.id} post={edge.node} />)

  const Posts = edges
    .filter(edge =>  edge.node.frontmatter.type === BLOG)
    .map(edge => <Item key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
        {
          !site.siteMetadata.w3l_dom_key
          ? null
          : <meta name="w3l-domain-verification" content={site.siteMetadata.w3l_dom_key} />
        }
      </Helmet>

      <HeroHeader />

      <h2>Experiments &darr;</h2>
      <div className="grids">
        {Experiments}
      </div>

      <h2>Blog &darr;</h2>
      <div className="grids">
        {Posts}
      </div>
    </Layout>
  )
}

export default IndexPage;

export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
        w3l_dom_key
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            type
            title
            thumbnail
          }
        }
      }
    }
  }
`