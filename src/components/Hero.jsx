import React from "react";
import { Link } from "react-router-dom";
import CtaButton from "./CtaButton";

export default function Hero() {
  return (
    <div className="min-h-fit bg-gradient-to-b from-base-300 via-base-200 to-primary/10">
      <div className="hero min-h-[calc(100vh-4rem)] relative">
        <div className="absolute inset-32 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-3xl"></div>
        <div className="hero-content text-center relative z-10">
          <div className="max-w-md mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Achieve <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">big goals,</span> one step at a time.
            </h1>
            <p className="py-6 text-lg text-base-content/80">
              Set goals with structure, whether you're focusing on the next 15 minutes or the next 10 years.
            </p>
            <h2 className="text-2xl font-bold text-secondary mb-6">Set goals, stay on track, and make time for what matters most.</h2>
            <CtaButton>
              Get early access
            </CtaButton>
            <p className="text-neutral-500 mt-2 text-sm">No credit card required</p>
          </div>
        </div>
        <img src='/linear-tree-2.png' className="w-full absolute bottom-0 left-0 right-0 hidden sm:block" alt="Linear Tree Visualization" />
      </div>
    </div>
  )
}
