import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { PhotoSwipe } from 'react-photoswipe'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Image from './Image'


import _kebabCase from 'lodash/kebabCase'

import './Gallery.css'
import 'react-photoswipe/lib/photoswipe.css'



export const query = graphql`
  fragment GallerySlider on MarkdownRemark {
    frontmatter {
      slidegallery {
        alt
        image
      }
    }
  }
`
/*

*/

export default class GallerySlider extends Component {
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

    return (
      <Fragment>
        {images &&
          images.length > 0 && (
            <div className="Slider">
              <CarouselProvider
                naturalSlideWidth={1372}
                naturalSlideHeight={708}
                totalSlides={images.length}
                infinite={true}
              >
              
              <Slider>
                {images.map((image, index) => (
                    <Slide index={index}>
                      <div                         
                      key={_kebabCase(image.alt) + '-' + index}
                      onClick={() => this.isOpen(true, index)}>
                      <Image
                      resolutions="large"
                      src={image.image}
                      alt={image.alt}
                      
                      
                      />
                      </div>
                    </Slide>       
                  ))}
               
              </Slider>
              <div className="slider-button-w">
                <ButtonBack className="slider-button"></ButtonBack>
                <ButtonNext className="slider-button"></ButtonNext>              
              </div>

            </CarouselProvider>
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

GallerySlider.propTypes = {
  images: PropTypes.array.isRequired
}
