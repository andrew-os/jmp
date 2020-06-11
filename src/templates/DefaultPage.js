import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'


import Content from '../components/Content'
import Layout from '../components/Layout'
import SVGIcon from '../components/SVGIcon'

import './DefaultPage.css'

// Export Template for use in CMS preview
//    <SVGIcon src="/images/calendar.svg" />
const ClipBG = styled.div`
background: ${props => `url(${props.background}) no-repeat top center`};
background-size: cover;
position: relative;
clip-path: polygon(100% 0, 0% 100%, 100% 100%);
z-index: -1;
height: 100vh;
`
export const DefaultPageTemplate = ({
  title,
  featuredImage,
  body
}) => (
  <div>
    <div className="clip-content">
      <ClipBG background={featuredImage}>
      <div className="bg-w"></div>

      </ClipBG>

      <div className="clip-inner-cont">
        <div className="clip-inner-cont-w">
          <div className="container">
            <div className="row row-align-btween">
              <div className="lg:gr-6 gr-12">
                <header>
                  <h1>{title}</h1>
                </header>
                <Content source={body} />
            
              </div>
              <div className="lg:gr-4 gr-12"></div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  
  </div>

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
