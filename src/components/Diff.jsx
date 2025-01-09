'use client'

import { useEffect, useRef, useState } from 'react'

export default function ImageComparison({
  beforeImage,
  afterImage,
  beforeAlt = "Before image",
  afterAlt = "After image"
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || isRevealed) return

    const handleScroll = (e) => {
      if (e.deltaY > 0 && position < 100) {
        e.preventDefault()
        setPosition((prev) => {
          const newPosition = prev + e.deltaY * 0.1
          if (newPosition >= 100) {
            setIsRevealed(true)
            return 100
          }
          return newPosition
        })
      }
    }

    const currentWrapper = wrapperRef.current
    if (currentWrapper) {
      currentWrapper.addEventListener('wheel', handleScroll, { passive: false })
    }

    return () => {
      if (currentWrapper) {
        currentWrapper.removeEventListener('wheel', handleScroll)
      }
    }
  }, [isVisible, isRevealed, position])

  return (
    <div 
      ref={wrapperRef}
      className="h-fit w-full flex items-center justify-center"
    >
      <div 
        ref={containerRef} 
        className="relative w-full max-w-4xl aspect-[16/9] overflow-hidden rounded-lg mt-10"
      >
        <img
          src={afterImage}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        >
          <img
            src={beforeImage}
            alt={beforeAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="absolute inset-y-0 w-1 bg-white"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {!isRevealed && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 px-4 py-2 rounded-full text-sm font-medium text-neutral-content">
            V
          </div>
        )}
      </div>
    </div>
  )
}
