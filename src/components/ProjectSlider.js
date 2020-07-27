import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { PhotoSwipe } from 'react-photoswipe'

import { CarouselProvider, Slider, Slide, Dot, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

// import Slider from "react-slick";
import Image from './Image'


import _kebabCase from 'lodash/kebabCase'

import './Gallery.css'
import './ProjectSlider.css'
import 'react-photoswipe/lib/photoswipe.css'



export const query = graphql`
  fragment ProjectSlider on MarkdownRemark {
    frontmatter {
      projectgallery {
        alt
        image
      }
    }
  }
`
/*
<div className="Slider slider--thumbs">
                <Slider 
                asNavFor={this.state.nav1}
                ref={slider => (this.slider2 = slider)}
                slidesToShow={4}
                swipeToSlide={true}
                focusOnSelect={true}
                >
                  {images.map((img, i) => (

                    <div                         
                    key={_kebabCase(img.alt) + '-' + i}
                    onClick={() => this.isOpen(true, i)}
                    >
                      <Image
                      resolutions="small"
                      src={img.image}
                      alt={img.alt}
                      sizes={'320'}
                      
                      />

                    </div>
                  ))}                
                </Slider>
              
              </div>
*/

export default class ProjectSlider extends Component {
  state = {
    loaded: false,
    isOpen: false,
    sliderImages: [],
    index: 0,
    activeSlide: 0
    // nav1: this.slider1,
    // nav2: this.slider2
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
      this.setState({
        // nav1: this.slider1,
        // nav2: this.slider2
      })

      
  }

  // incrementActiveSlide() {
  //   const { activeSlide } = this.state;
  //   this.setState({
  //     activeSlide: activeSlide + 1,
  //   });
  // }

  // decrementActiveSlide() {
  //   const { activeSlide } = this.state;
  //   this.setState({
  //     activeSlide: activeSlide - 1,
  //   });
  // }

  render() {
    const { images } = this.props
    return (
      <Fragment>
        {images &&
          images.length > 0 && (
            <div>
              <div className="Slider slider--main">
              <CarouselProvider
                naturalSlideWidth={800}
                naturalSlideHeight={450}
                totalSlides={images.length}
                infinite={true}
                >
                <Slider 
                >
                  {images.map((image, index) => (
                    <Slide 
                    index={index}
                    key={index}
                    
                    >
                      <div                         
                        key={_kebabCase(image.alt) + '-' + index}
                        onClick={() => this.isOpen(true, index)}>
                        <Image
                        resolutions="large"
                        src={image.image}
                        alt={image.alt}
                        sizes={'800'}
                      
                      
                        />
                      </div>
                      </Slide>    
                    ))}
                  </Slider>
                  <div className="slider-button-w">
                    <ButtonBack className="slider-button"></ButtonBack>
                    <ButtonNext className="slider-button"></ButtonNext>
                  </div>
                

                <div className="slider slider--thumbs">
                {images.map((image, index) => (
                  <Dot 
                    slide={index}
                    key={index}
                  >
                    <Image
                      resolutions="small"
                      src={image.image}
                      alt={image.alt}
                    />
                  </Dot>
                ))}
                
                </div>
              </CarouselProvider>

              </div>
              
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

ProjectSlider.propTypes = {
  images: PropTypes.array.isRequired
}
