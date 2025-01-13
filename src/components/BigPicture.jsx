import React from "react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function BigPicture() {
  return (
    <div className="bg-gradient-to-b from-base-200 to-base-300 py-24">
      <div className="container mx-auto px-4">
        <AnimateOnScroll initialClass="scroll-animation-tiny" animationClass="visible">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
            <h2 className='text-4xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent'>See the bigger picture.</h2>
          </div>
          <p className="text-center text-xl text-base-content/80 mb-12 max-w-2xl mx-auto">
            View your daily tasks alongside your yearly goals. Zoom out to plan the next decade or focus in on the next 15 minutes.
          </p>
          <div className="bg-base-100 p-4 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-secondary/10 to-primary/10 blur-2xl"></div>
            <img src="/panel_view_screenshot.png" className="rounded-lg mx-auto relative z-10" alt="Panel View Screenshot" />
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  )
}

