import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { PhotoSwipe } from 'react-photoswipe'
import { graphql } from 'gatsby'
import Masonry from 'react-masonry-css'
import Image from './Image'

import _kebabCase from 'lodash/kebabCase'

import 'react-photoswipe/lib/photoswipe.css'
import './MasonryGallery.css'

export const query = graphql`
  fragment Gallery on MarkdownRemark {
    frontmatter {
      gallery {
        alt
        image
        title
      }
    }
  }
`

export default class MasonryGallery extends Component{
    state = {
        loaded: false,
        isOpen: false,
        sliderImages: [],
        index: 0
    }
    isOpen(isOpen, index) {
        if (typeof index === 'undefined') index = 0
        this.setState({ isOpen, index })
      }
    
      getImageInfo = (img, index) =>
        fetch(img.image + '-/json/')
          .then(res => res.json())
          .then(
            result => {
              const newImagesArr = [...this.state.sliderImages]
              newImagesArr[index] = {
                src: img.image,
                title: img.title,
                w: result.width,
                h: result.height
              }
              this.setState({
                sliderImages: newImagesArr
              })
              return true
            },
            error => {
              console.log(error)
              return false
            }
          )
    
      componentDidMount() {
        const { images } = this.props,
          maxCount = images.length
        let loopCount = 1
    
        for (let i in images) {
          if (this.getImageInfo(images[i], i)) {
            this.setState({ loaded: loopCount === maxCount })
            loopCount++
          }
        }
      }
    
      render() {
        const { images } = this.props
        const breakpointColumnsObj = {
            default: 4,
            1100: 3,
            700: 2,
            500: 1
          };
        return (
          <Fragment>
            {images &&
              images.length > 0 && (
                <div className="Masonry">
                <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                >
                  {images.map((image, index) => (

                      <div key={index}>
                        <Image
                          src={image.image}
                          alt={image.alt}
                        />
                      </div>
                      
                  ))}
                </Masonry>  
                </div>
              )}

                

            {this.state.loaded &&
              this.state.sliderImages.length > 0 && (
                <PhotoSwipe
                  isOpen={this.state.isOpen}
                  items={this.state.sliderImages}
                  options={{
                    index: this.state.index,
                    history: false
                  }}
                  onClose={() => this.isOpen(false)}
                />
              )}
          </Fragment>
        )
      }    
}