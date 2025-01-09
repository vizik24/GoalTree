import React, { useEffect, useRef, useState } from 'react';
import './AnimateOnScroll.css'; // Import the CSS file

const AnimateOnScroll = ({ children, animationClass, initialClass='scroll-animation' }) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Entry:', entry); // Debug log
          if (entry.isIntersecting) {
            console.log('Element is intersecting'); // Debug log
            setTimeout(() => setIsVisible(true), 100); // Add a delay
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      console.log('Observing element:', elementRef.current); // Debug log
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${initialClass} ${isVisible ? animationClass : ""}`}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;