import React from "react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function BigPicture() {
  return (
      <div className="container mx-auto px-4">
        <AnimateOnScroll initialClass="scroll-animation-tiny" animationClass="visible">
          <div className="flex items-center justify-center mb-8">
        
            <h2 className='text-center text-5xl font-bold mb-12 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>See the bigger picture.</h2>
          </div>
          <p className="text-center text-xl text-base-content/80 mb-12 max-w-2xl mx-auto">
            View your daily tasks alongside your yearly goals. Zoom out to plan the next decade or focus in on the next 15 minutes.
          </p>
          <div className="bg-base-100 p-4 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-accent/10 via-secondary/10 to-primary/10 blur-2xl"></div>
            <img src="/panel_view_screenshot.png" className="rounded-lg mx-auto relative z-10" alt="Panel View Screenshot" />
          </div>
        </AnimateOnScroll>
      </div>
  )
}

