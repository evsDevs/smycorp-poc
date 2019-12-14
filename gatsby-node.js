const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // const menuPages = await graphql(`
  //   query {
  //     allMarkdownRemark(
  //       filter: { frontmatter: { category: { eq: "menu item" } } }
  //     ) {
  //       edges {
  //         node {
  //           frontmatter {
  //             path
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)
  const menuPages = await graphql(`
    query {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___title] }
        filter: { frontmatter: { category: { eq: "menu item" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  menuPages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/template.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  const servicesPage = await graphql(`
    query {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___title] }
        filter: { frontmatter: { category: { eq: "services" } } }
      ) {
        edges {
          node {
            id
            excerpt
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  servicesPage.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/services-template.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
