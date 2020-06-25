import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import MasonryGallery from '../components/MasonryGallery'

// Export Template for use in CMS preview
export const GalleryPageTemplate = ({ title, subtitle, featuredImage, body, gallery }) => (
  <main className="gallery">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>

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
