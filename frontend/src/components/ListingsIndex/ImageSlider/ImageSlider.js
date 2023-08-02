import React from 'react';
import Slider from 'react-slick';
import './ImageSlider.css'
import './Slick.css'

const sliderSettings = { 
    dots: true,
    infinite: true,
    speed: 250,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    className: 'slides',
  };

const ImageSlider = ({photoUrls}) => {
    return (
        <div id="image_slider_wrapper">
            <Slider {...sliderSettings} id="image_slider">
                {photoUrls && (
                    photoUrls.map((photoUrl) => 
                        <div key={photoUrl} id="listing_index_slider_wrapper">
                            <img className="listing_index_slider_image" src={photoUrl}></img>
                        </div>
                    )
                )}
            </Slider>
        </div>
    )
}

export default ImageSlider