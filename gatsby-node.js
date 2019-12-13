const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // if (node.internal.type === `MarkdownRemark`) {
  //   const slug = createFilePath({ node, getNode, basePath: `pages` })
  //   createNodeField({
  //     node,
  //     name: `slug`,
  //     value: slug,
  //   })
  // }
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`./src/templates/template.js`),
      context: {
        path: node.frontmatter.path,
      },
    })
  })

  const leasingPage = await graphql(`
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
  `)

  leasingPage.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`./src/templates/services-template.js`),
      context: {
        path: node.frontmatter.path,
      },
    })
  })
}
