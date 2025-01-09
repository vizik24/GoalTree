import AnimateOnScroll from "./AnimateOnScroll"

export default function StayAligned() {
    return(
        // add slide in with fade - h2 and p from different directions.
        <>
        
        <div className="mt-20">
        <AnimateOnScroll animationClass="visible">
        <h2 className='text-center text-5xl font-bold col-start-1 col-end-2 mt-10'>Stay Aligned.</h2>
        </AnimateOnScroll>

        <AnimateOnScroll animationClass="visible">
        <p className="pt-6 text-xl"> Stay motivated and never 
        lose sight of your vision.</p>
        </AnimateOnScroll>

        <AnimateOnScroll animationClass="visible">
        <img src="/motivation_screenshot.png" className="rounded-xl mx-auto m-10"></img>
        </AnimateOnScroll>
        </div>
        
        </>
    )
}