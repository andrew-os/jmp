import React from 'react'
import styled from '@emotion/styled'
import { MapPin, Smartphone, Mail } from 'react-feather'
import { graphql } from 'gatsby'


import FormSimpleAjax from '../components/FormSimpleAjax'
import Content from '../components/Content'
import Layout from '../components/Layout'
import './ContactPage.css'

const ClipBG = styled.div`
  display: none;

  @media (min-width: 960px) {
    display: block;
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    height: 100vh;
    background: ${props => `url(${props.background}) no-repeat top center`};
    background-size: cover;
    position: relative;
    z-index: -1;
  }
`
// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  body,
  title,
  subtitle,
  featuredImage,
  address,
  phone,
  email,
  locations
}) => (
  <main className="Contact mt-5">

  <ClipBG background={featuredImage}>
    <div className="bg-w"></div>
  </ClipBG>

    <section className="section Contact--Section1">
      <div className="container Contact--Section1--Container">
        
      <div className="row">
        <div className="gr-12">
          
          <h1 className="mt-3">{title}</h1>
          
          {subtitle.length > 0 &&
            <p>{subtitle}</p>
          }

        </div>
      </div>

        
        
        <div className="row row-align-btween">
          <div className="md:gr-6 gr-12">
            <div className="Contact--Details">
            {address && (
              <a
                className="Contact--Details--Item"
                href={`https://www.google.com.au/maps/search/${encodeURI(
                  address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin /> {address}
              </a>
            )}
            {phone && (
              <a className="Contact--Details--Item" href={`tel:${phone}`}>
                <Smartphone /> {phone}
              </a>
            )}
            {email && (
              <a className="Contact--Details--Item" href={`mailto:${email}`}>
                <Mail /> {email}
              </a>
            )}
            </div>
          </div>

          <div className="md:gr-4 gr-12"></div>
        
        
        </div>

        <div>
          <Content source={body} />

        </div>

        <div className="block md:hidden">
          <FormSimpleAjax name="Simple Form Ajax" />
        </div>
      </div>
    </section>

   
  </main>
)

const ContactPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        address
        phone
        email

      }
    }
  }
`
