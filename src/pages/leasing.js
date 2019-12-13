import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const LeasingPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    {/* {console.log(data.allMarkdownRemark.edges)}
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={`/${node.frontmatter.path}`}>
          <h3>{node.frontmatter.title}</h3>
        </Link>
      </div>
    ))} */}
  </Layout>
)

export default LeasingPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___title] }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`
