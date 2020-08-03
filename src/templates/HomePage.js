import React from 'react'
import { graphql } from 'gatsby'


import GallerySlider from '../components/GallerySlider'
import Content from '../components/Content'
import Layout from '../components/Layout'

import './HomePage.css'

// Export Template for use in CMS preview
export const HomePageTemplate = ({ 
  title, 
  subtitle, 
  body,
  slidegallery
 }) => (
  <main className="Home mt-3 xs:mt-7 md:mt-5">


    <section className="section">
      <div className="container relative">

        <div className="slider-content-w">
          <article className="slider-content">
            <h1 className="xl lg:mb-0">{title}</h1>
            <p>{subtitle}</p>        
          </article>        
        </div>
        
        <GallerySlider className="Slider home--slider" images={slidegallery} />


        

      </div>

    </section>

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...GallerySlider
      html
      frontmatter {
        title
        subtitle
      }
    }
  }
`
