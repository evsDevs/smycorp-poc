import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const ServicesPage = ({ data }) => (
  <Layout>
    <SEO title="Services" />
    {console.log(data.allMarkdownRemark.edges)}
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={`/${node.frontmatter.path}`}>
          <h3>{node.frontmatter.title}</h3>
        </Link>
      </div>
    ))}
  </Layout>
)

export default ServicesPage

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___title] }
      filter: { frontmatter: { category: { eq: "services" } } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            path
            date
            category
          }
        }
      }
    }
  }
`
