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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gradient-to-b from-base-300 to-base-200 py-20">

    <div className="problem mt-20">
      <div className="container mx-auto px-4">
      <AnimateOnScroll animationClass="visible">
          <h2 className="text-center text-5xl font-bold mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Got big dreams but struggling to stay on track?
          </h2>
        </AnimateOnScroll>
      <AnimateOnScroll animationClass="visible">
        <div className={`grid ${isMobile ? "grid-cols-1 gap-8" : "grid-cols-3"} gap-8 my-8`}>
          <p className="col-1">
            You’re managing a business, personal growth, and life’s unexpected
            twists—all at once.
          </p>
          <p className="col-1">
            Traditional goal setting doesn't keep you focused day to day.
          </p>
          <p className="col-1">
            It’s hard to connect long-term visions with daily actions, leaving
            you overwhelmed and scattered.
          </p>
        </div>
      </AnimateOnScroll>
      <AnimateOnScroll animationClass="visible">
        <Diff beforeImage="/goal_tree.png" afterImage="/stress.jpg" />
      </AnimateOnScroll>
    </div>
    </div>
    </div>

  );
}
