import React, { useState, useEffect } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import '../home/HeroSection.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      video: '/carouselvideos/secondcarouselvideo.mp4',
      title: 'ASIC MINERS & HOSTING',
      description: '25 years of network technology, crypto mining and e-commerce. Miner hosting from 4.9 cents/kWh.',
      buttons: [
        { text: 'VISIT SHOP', variant: 'primary' },
        { text: 'BOOK CONSULTING APPOINTMENT', variant: 'secondary' }
      ]
    },
    {
      video: '/carouselvideos/firstcarouselvideo.mp4',
      title: 'PROFESSIONAL CRYPTO HOSTING',
      description: 'State-of-the-art infrastructure with 24/7 monitoring and optimal cooling systems.',
      buttons: [
        { text: 'EXPLORE HOSTING', variant: 'primary' },
        { text: 'GET A QUOTE', variant: 'secondary' }
      ]
    },
    {
      video: '/carouselvideos/secondcarouselvideo.mp4',
      title: 'PREMIUM MINING HARDWARE',
      description: 'Latest ASIC miners from top manufacturers. Competitive pricing and fast delivery.',
      buttons: [
        { text: 'VIEW PRODUCTS', variant: 'primary' },
        { text: 'CONTACT US', variant: 'secondary' }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="herosection-container">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'prev' : ''} ${index > currentSlide ? 'next' : ''}`}
        >
          {/* Video Background - Replace with actual video */}
          <div className="video-background">
            <video autoPlay muted loop playsInline>
              <source src={slide.video} type="video/mp4" />
            </video>
            <div className="video-placeholder"></div>
          </div>
          
          <div className="video-overlay"></div>

          {/* Slide Content */}
          <div className="slide-content-wrapper raleway">
            <div className="slide-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-description">{slide.description}</p>
              <div className="hero-buttons">
                {slide.buttons.map((button, btnIndex) => (
                  <button
                    key={btnIndex}
                    className={`hero-btn ${button.variant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="nav-arrow nav-arrow-left"
        aria-label="Previous slide"
      >
        <IoChevronBack />
      </button>

      <button
        onClick={nextSlide}
        className="nav-arrow nav-arrow-right"
        aria-label="Next slide"
      >
        <IoChevronForward />
      </button>

      {/* Dots Navigation */}
      <div className="dots-container">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;