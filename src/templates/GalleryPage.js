import React from 'react'
import { graphql } from 'gatsby'


import Layout from '../components/Layout'
import MasonryGallery from '../components/MasonryGallery'

/*
  import PageHeader from '../components/PageHeader'
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
*/

// Export Template for use in CMS preview
export const GalleryPageTemplate = ({ title, subtitle, featuredImage, body, gallery }) => (
  <main className="gallery mt-3 xs:mt-7 md:mt-5">


    <section className="section">
      <MasonryGallery images={gallery}/>
    </section>
  </main>
)

// Export Default GalleryPage for front-end
const GalleryPage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <GalleryPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default GalleryPage

export const pageQuery = graphql`
  ## Query for GalleryPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query GalleryPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
  }
`
