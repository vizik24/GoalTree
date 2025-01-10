import React from "react";
import { Link } from "react-router-dom";
import CtaButton from "./CtaButton";

export default function Hero() {
    return(
    <>
    <div className="hero bg-base-200 min-h-screen mb-10 flex flex-col justify-center">
      
      <div className="hero-content text-center">
      <div className="max-w-md">
      <h1 className="text-5xl font-bold">Achieve <a className="text-primary bg-gradient-to-r from-indigo-500 via-indigo-500 to-accent bg-clip-text text-transparent">big goals,</a> one step at a time.</h1>
      <p className="py-6">
      Set goals with structure, whether you’re focusing on the next 15 minutes or the next 10 years.

      </p>
      <h2 className="text-2xl font-bold">Set goals, stay on track, and make time for what matters most.</h2>
      <br></br>
      <CtaButton></CtaButton>
      
      <p className="text-neutral-500 mt-2">No credit card required</p>
     
      </div>
      </div>
      <img src='/linear_tree.png' className="w-full inline-flex mt-10"></img>

    </div>
    </>
    )
}
