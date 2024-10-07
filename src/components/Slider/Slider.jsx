import React, { useState, useEffect } from 'react';
import './style.css';
import { dataSlider }from '../../dataSlider';

const autoPlayTime = 5000;

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % dataSlider.length);
            }, autoPlayTime);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % dataSlider.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + dataSlider.length) % dataSlider.length);

    return (
        <div className="slider">
            {dataSlider.map((slide, index) => (
                <div
                    key={index}
                    className={`slide ${ index === currentSlide ? 'active' : '' }`}
                    style={{ backgroundColor: slide.backgroundColor }}
                >
                    { slide.type === 'image' ? (
                       <img src={slide.content} alt={`slide ${index}`} />
                    ) : (
                        <div>{slide.content}</div>
                    )}
                </div>

            ))}
            <div className="controls">
                <button onClick={prevSlide}>Prev</button>
                <button onClick={() => setIsPlaying(true)}>Play</button>
                <button onClick={() => setIsPlaying(false)}>Stop</button>
                <button onClick={nextSlide}>Next</button>
            </div>
        </div>
    );
};

export default Slider;