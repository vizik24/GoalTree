import React, { useEffect, useRef, useState } from 'react'

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
      e.preventDefault()
      updatePosition(e.deltaY * 0.1)
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      const container = containerRef.current
      if (container) {
        const containerRect = container.getBoundingClientRect()
        const touchPosition = (touch.clientY - containerRect.top) / containerRect.height
        updatePosition((0.5 - touchPosition) * 10)
      }
    }

    const currentWrapper = wrapperRef.current
    if (currentWrapper) {
      currentWrapper.addEventListener('wheel', handleScroll, { passive: false })
      currentWrapper.addEventListener('touchmove', handleTouchMove, { passive: false })
    }

    return () => {
      if (currentWrapper) {
        currentWrapper.removeEventListener('wheel', handleScroll)
        currentWrapper.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [isVisible, isRevealed])

  const updatePosition = (delta) => {
    setPosition((prev) => {
      const newPosition = Math.max(0, Math.min(100, prev + delta))
      if (newPosition >= 100) {
        setIsRevealed(true)
        return 100
      }
      return newPosition
    })
  }

  return (
    <div 
      ref={wrapperRef}
      className="h-fit w-full flex items-center justify-center"
    >
      <div 
        ref={containerRef} 
        className="relative w-full max-w-5xl aspect-16/9 overflow-hidden rounded-lg mt-2"
      >
        <img
          src={afterImage}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div
          className="absolute inset-0 transition-[clip-path] duration-300 ease-out"
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
          className="absolute inset-y-0 w-0.5 bg-white transition-[left] duration-300 ease-out"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {!isRevealed && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 px-3 py-1 rounded-full text-xs font-medium text-neutral-content">
            {typeof window !== 'undefined' && 'ontouchstart' in window ? 'Swipe up to reveal' : 'Scroll to reveal'}
          </div>
        )}
      </div>
    </div>
  )
}

