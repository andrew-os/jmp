import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'


import Content from '../components/Content'
import Layout from '../components/Layout'


import './DefaultPage.css'

// Export Template for use in CMS preview
//    <SVGIcon src="/images/calendar.svg" />
const ClipBG = styled.div`
background: ${props => `url(${props.background}) no-repeat top center`};
background-size: cover;
position: relative;
z-index: -1;
padding-top: 62.5%;
  @media (min-width: 960px) {
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    height: 100vh;
  }
`
export const DefaultPageTemplate = ({
  title,
  featuredImage,
  body
}) => (
  <main className="DefaultPage mt-3 xs:mt-7 md:mt-5">
    <section className="section">

      <ClipBG background={featuredImage}>
        <div className="bg-w"></div>
      </ClipBG>


      <div className="clip-content">


        <div className="clip-inner-cont">
          <div className="clip-inner-cont-w">
            <div className="container">
              <div className="row row-align-btween">
                <div className="md:gr-6 gr-12">
                  <header className="mt-1">
                    <h1>{title}</h1>
                  </header>
                  <Content source={body} />
              
                </div>
                <div className="md:gr-4 gr-12"></div>
              </div>  
            </div>
          </div>
        </div>
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
