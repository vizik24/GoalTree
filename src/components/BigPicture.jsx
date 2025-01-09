import React from "react";
import AnimateOnScroll from "./AnimateOnScroll";


export default function BigPicture() {
    return(
        // todo add zoomout on scroll to the div. Fade in an image of the 5 year calendar behind it.
        <>
        <div className="mt-20 m-10">
            <AnimateOnScroll initialClass="scroll-animation-tiny" animationClass="visible">
        <h2 className='text-center text-5xl font-bold col-start-1 col-end-2'>See the bigger picture.</h2>
        <p className="py-6 text-xl">View your daily tasks alongside your yearly goals. Zoom out to plan the next decade or focus in on the next 15 minutes. 
            <br></br></p>
            <img src="/panel_view_screenshot.png" className="rounded-xl"></img>
            </AnimateOnScroll>
        </div>
        </>
    )
}