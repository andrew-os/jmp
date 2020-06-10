import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'


import Content from '../components/Content'
import Layout from '../components/Layout'
import SVGIcon from '../components/SVGIcon'

import './DefaultPage.css'

// Export Template for use in CMS preview
const ClipBG = styled.div`
background: ${props => `url(${props.background}) no-repeat top center`};
background-size: cover;
`
export const DefaultPageTemplate = ({
  title,
  featuredImage,
  body
}) => (
  <main className="DefaultPage">
    <section className="section">
      <div className="clip-content">
        <ClipBG className="clip-cut" background={featuredImage}>
          <div className="bg-w"></div>
          <div className="inner-cont">
            <div className="inner-cont-w">
              <div className="container">
                <div className="row row-align-btween">
                  <div className="lg:gr-5 gr-12">
                    <header>
                      <h1>{title}</h1>
                    </header>
                    <Content source={body} />
                    <SVGIcon src="/images/calendar.svg" />
                  </div>
                  <div className="lg:gr-4 gr-12"></div>
                </div>  
              </div>
            </div>
          </div>
          </ClipBG>
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
