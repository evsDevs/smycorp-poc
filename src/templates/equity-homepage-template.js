import React from "react"
import { graphql, Link } from "gatsby"
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  // const { markdownRemark } = data // data.markdownRemark holds your post data
  // const { frontmatter, html } = markdownRemark
  return (
    <div>
      <div>
        <h1>Equity - {data.markdownRemark.frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.frontmatter.html,
          }}
        />
      </div>
      {console.log(data)}
      {console.log("equity homepage")}
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={`/${node.frontmatter.path}`}>
            <h3>{node.frontmatter.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  )
}
export const query = graphql`
  query($slug: String!) {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___title] }
      filter: { frontmatter: { templateKey: { eq: "equity-homepage" } } }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            path
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
