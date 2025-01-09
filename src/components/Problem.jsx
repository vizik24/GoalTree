import { useEffect, useState } from "react";
import "./problem.css";
import AnimateOnScroll from "./AnimateOnScroll";
import Diff from "./Diff";

function StickyNote({ text, extraClass }) {
  return (
    <div className={`sticky-note ${extraClass}`}>
      <p>{text}</p>
    </div>
  );
}

export default function Problem() {
  return (
    // TODO - add conditional rendering for mobile - notes to stack on mobile, position text underneath
    // TODO - add conditional rendering for mobile - notes to stack on mobile, position text underneath
    <div className="problem mt-20">
      <AnimateOnScroll animationClass='visible'>
      <h2 className="text-center text-5xl font-bold col-start-1 col-end-2">
        Got big dreams but struggling to stay on track?
      </h2>
      </AnimateOnScroll>
      <AnimateOnScroll animationClass='visible'>
        
      <div className="grid grid-cols-3 my-8">
          <p className="col-1">
            You’re managing a business, personal growth, and life’s unexpected
            twists—all at once.
          </p>
          <p className="col-1">Traditional goal setting doesn't keep you focused day to day.</p>
          <p className="col-1">
            It’s hard to connect long-term visions with daily actions, leaving
            you overwhelmed and scattered.
          </p>
      </div>
      </ AnimateOnScroll>
      <AnimateOnScroll animationClass='visible'>
      <Diff
        beforeImage="../public/goal_tree.png"
        afterImage="../public/stress.jpg"
      />
      </AnimateOnScroll>

      {/* <div className="problem-panes gap-2">
        <div className="left-pane">
          <AnimateOnScroll animationClass="visible">
            <StickyNote text="Pick kids up from school" extraClass="note-4 " />
          </AnimateOnScroll>
          <AnimateOnScroll animationClass="visible">
            <StickyNote text="Lunchtime meeting" extraClass="note-3 " />
          </AnimateOnScroll>
          <AnimateOnScroll animationClass="visible">
            <StickyNote
              text="Write business plan"
              extraClass="note-5 rotate-plus"
            />
          </AnimateOnScroll>
          <AnimateOnScroll animationClass="visible">
            <StickyNote text="Make social media posts" extraClass="note-6 " />
          </AnimateOnScroll>
          <AnimateOnScroll animationClass="visible">
            <StickyNote text="Workout" extraClass="note-2 rotate-minus" />
          </AnimateOnScroll>
          <AnimateOnScroll animationClass="visible">
            <StickyNote text="Food shop" extraClass="note-1 rotate-plus" />
          </AnimateOnScroll>
        </div>
        <div className="right-pane text-xl">
          <ol>
            <li>
              You’re managing a business, personal growth, and life’s unexpected
              twists—all at once.
            </li>
            <br></br>
            <li>
              Traditional goal setting doesn't keep you focused day to day.
            </li>
            <br></br>
            <li>
              It’s hard to connect long-term visions with daily actions, leaving
              you overwhelmed and scattered.
            </li>
          </ol>
        </div>
      </div> */}
    </div>
  );
}
