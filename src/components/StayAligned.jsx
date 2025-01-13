import AnimateOnScroll from "./AnimateOnScroll"

export default function StayAligned() {
  return (
      <div className="container mx-auto px-4">
        <AnimateOnScroll animationClass="visible">
          <h2 className='text-center text-5xl font-bold mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>Stay Aligned.</h2>
        </AnimateOnScroll>

        <AnimateOnScroll animationClass="visible">
          <p className="text-center text-xl text-base-content/80 mb-12 max-w-2xl mx-auto">
            Stay motivated and never lose sight of your vision.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animationClass="visible">
          <div className="bg-base-100 p-4 rounded-xl shadow-lg">
            <img src="/motivation_screenshot.png" className="rounded-lg mx-auto" alt="Motivation Screenshot" />
          </div>
        </AnimateOnScroll>
      </div>
  )
}

