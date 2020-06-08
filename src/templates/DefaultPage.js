import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import SVGIcon from '../components/SVGIcon'

import './DefaultPage.css'

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  featuredImage,
  body
}) => (
  <main className="DefaultPage">
    <PageHeader
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <h1>{title}</h1>
        <Content source={body} />
        <SVGIcon src="/images/calendar.svg" />
      </div>
    </section>
  </main>
)

const DefaultPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <DefaultPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default DefaultPage

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
  }
`
