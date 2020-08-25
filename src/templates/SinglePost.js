import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import ProjectSlider from '../components/ProjectSlider'

import Testimonial from '../components/Testimonial'
import Clients from '../components/Clients'

import './SinglePost.css'



export const SinglePostTemplate = ({
  title,
  date,
  body,
  projectgallery,
  nextPostURL,
  prevPostURL,
  testimonials = [],
  clients = [],
  categories = []
}) => (
  
  <main className="mt-3 xs:mt-7 md:mt-5">
    <article
      className="SinglePost section"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container">
        <Link className="SinglePost--BackButton" to="/blog/">
          <ChevronLeft /> BACK
        </Link>
        <div className="SinglePost--Content relative">

          <div className="row">

            <div className="lg:gr-6 gr-12 lg:order-2 order-1 lg:mt-8">
              <div className="ProjectSlider--w">
                <ProjectSlider images={projectgallery}/>
              </div>            
            </div>

            <div className="lg:gr-6 gr-12 lg:order-1 order-2 Project--Content">
              
              {title && (
                <h1 className="SinglePost--Title mt-1" itemProp="title">
                  {title}
                </h1>
              )}

              <div className="SinglePost--Meta">
                {date && (
                  <time
                    className="SinglePost--Meta--Date"
                    itemProp="dateCreated pubdate datePublished"
                    date={date}
                  >
                    {date}
                  </time>
                )}
                {categories && (
                  <Fragment>
                    <span>|</span>
                    {categories.map((cat, index) => (
                      <span
                        key={cat.category}
                        className="SinglePost--Meta--Category"
                      >
                        {cat.category}
                        {/* Add a comma on all but last category */}
                        {index !== categories.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </Fragment>
                )}
              </div>
          

              <div className="SinglePost--InnerContent">
                <Content source={body} />
              </div>

            </div>


          </div>







        </div>
      </div>

      
      <div className="container lg:mt-5">
        <div className="row">
          <div className="gr-12">
         
          {testimonials && (
            <Testimonial quote={testimonials} />
          )}
           
          </div>
          <div className="gr-12">
         
          {clients && (
            <Clients client={clients} />
          )}
           
          </div>
    
        </div>

        <div className="SinglePost--Pagination">
          {prevPostURL && (
            <Link
              className="SinglePost--Pagination--Link prev"
              to={prevPostURL}
            >
              Previous Post
            </Link>
          )}
          {nextPostURL && (
            <Link
              className="SinglePost--Pagination--Link next"
              to={nextPostURL}
            >
              Next Post
            </Link>
          )}
        </div>      
      </div>


    </article>
  </main>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...ProjectSlider
      html
      id
      frontmatter {
        title
        template
        subtitle
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
        testimonials{
          testimonials
          quoted
        }
        clients{
          logo
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
