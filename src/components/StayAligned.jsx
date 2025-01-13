import AnimateOnScroll from "./AnimateOnScroll"

export default function StayAligned() {
  return (
    <div className="bg-gradient-to-b from-base-300 to-base-200 py-20">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animationClass="visible">
          <h2 className='text-center text-5xl font-bold mb-8 text-secondary'>Stay Aligned.</h2>
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
    </div>
  )
}

