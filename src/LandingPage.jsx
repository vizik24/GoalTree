import { Hero } from "./LandingPage/Hero";
import { Features } from "./LandingPage/Features";
import { Benefits } from "./LandingPage/Benefits";
import { HowItWorks } from "./LandingPage/HowItWorks";
import { Testimonials } from "./LandingPage/Testimonials";
import { FAQ } from "./LandingPage/Faq";
import Nav from './components/Nav.jsx';
import Footer from "./components/Footer.jsx";


import AnimateOnScroll from "./components/AnimateOnScroll";

import { Check, Zap, Shield, Clock, ArrowRight } from "lucide-react";
import { Solution } from "./LandingPage/Solution";

const heroData = {
  title: "Achieve More.",
  highlightedTitle: "One Step at a Time.",
  description:
    "Break down big ambitions into achievable steps, stay focused, stay motivated, and keep moving forward.",
  primaryButton: {
    text: "Start Free Trial",
    href: "/trial",
  },
  secondaryButton: {
    text: "Watch Demo",
    href: "#demo",
  },
  demoImageUrl: "",
  demoVideoUrl: "/goals_tree_demo.mov",
};

const featuresData = {
  title: "Key Features",
  features: [
    {
      icon: Check,
      title: "Break Big Goals into Actionable Steps",
      description: "Organize your ambitions into smaller, achievable tasks so you always know what to do next.",
    },
    {
      icon: Zap,
      title: "Stay Motivated with Progress Tracking",
      description: "See your progress visually with a structured roadmap that keeps you accountable.",
    },
    {
      icon: Shield,
      title: "Adapt and Evolve",
      description: "Adjust your goals dynamically as priorities shift, ensuring you're always on track.",
    },
  ],
};
const solutionData = {
  title: "How GoalsTree Helps You Achieve More",
  description: "Most goal-setting apps focus on lists. But lists don’t show how to get from A to B. GoalsTree maps out your goal as a structured hierarchy, starting with your big ambition and breaking it down into clear, actionable steps.",
  imageUrl: "/goal_tree.jpg",
  stats: [
    { value: "1,000+", label: "Goals achieved every day with GoalsTree." },  
    { value: "8/10", label: "People find it easier to take action when they can visualize their progress." },  
    { value: "33%", label: "Increase in goal completion rates with GoalsTree." }  
    
  ],
};
const benefitsData = {
  title: "Benefits of Using GoalsTree",
  benefits: [
    {
      icon: Zap,
      title: "Clarity",
      description: "Know exactly what to do next instead of feeling overwhelmed.",
    },
    {
      icon: Clock,
      title: "Momentum",
      description: "Small wins build confidence and keep you moving forward.",
    },
    {
      icon: ArrowRight,
      title: "Accountability",
      description: "Track progress and stay committed to your goals.",
    },
    {
      icon: Shield,
      title: "Flexibility",
      description: "Adjust your plan as life changes without losing sight of the big picture.",
    },
  ],
};
const howItWorksData = {
  title: "How it Works",
  steps: [
    {
      number: "1",
      title: "Set Your Big Goal",
      description: "Define your main ambition, whether it’s launching a business, running a marathon, or learning a new skill.",
    },
    {
      number: "2",
      title: "Break It Down",
      description: "Use Goal Tree to divide it into milestones and small, actionable steps.",
    },
    {
      number: "3",
      title: "Take Action & Track Progress",
      description: "Mark tasks as complete, adjust as needed, and stay motivated with visual progress tracking.",
    },
  ],
};
const testimonialsData = {
  title: "Testimonials",
  testimonials: [
    {
      content: "GoalsTree transformed the way I approach big projects. I used to feel overwhelmed, but now I actually follow through!",
      name: "Sarah L.",
      role: "",
      rating: 5,
    },
    {
      content:
        "I’ve tried so many productivity apps, but GoalsTree is the first one that actually keeps me accountable.",
      name: "Sarah K.",
      role: "CTO, Tech Innovators",
      rating: 5,
    },
    {
      content: "Seeing my goal as a tree instead of just a list made all the difference. I finally feel in control of my progress.",
      name: "Michael R.",
      role: "Product Manager, StartUp Inc.",
      rating: 5,
    },
  ],
};
const faqData = {
  title: "Frequently Asked Questions",
  faqs: [
    {
      question: "How is GoalsTree different from a to-do list?",
      answer:
        "To-do lists are great for daily tasks, but they don’t show how to achieve big goals. GoalsTree breaks them into structured steps so you can see your entire path forward.",
    },
    {
      question: "Can I use GoalsTree for personal and professional goals?",
      answer:
        "Absolutely! Whether you’re working on fitness, career, learning, or personal projects, Goal Tree helps you stay on track.",
    },
    {
      question: "What if my goal changes over time?",
      answer:
        "No problem! Goal Tree is designed to be flexible, so you can edit your goals and steps as needed.",
    },
    {
      question: "Can I share my goals with friends?",
      answer:
        "Of course! GoalsTree makes it easy to share your tree to social media and give you the accountability you need."
    },
  ],
};

export default function LandingPage() {
  return (
    <>
    <Nav />
      <AnimateOnScroll initialClass="scroll-animation" animationClass="visible">
        <Hero
          title={heroData.title}
          highlightedTitle={heroData.highlightedTitle}
          primaryButton={heroData.primaryButton}
          secondaryButton={heroData.secondaryButton}
          description={heroData.description}
          demoImageUrl={heroData.demoImageUrl}
          demoVideoUrl={heroData.demoVideoUrl}
        />
      </AnimateOnScroll>
      <AnimateOnScroll initialClass="scroll-animation" animationClass="visible">
        <Features title={featuresData.title} features={featuresData.features} />
      </AnimateOnScroll>

      <AnimateOnScroll initialClass="scroll-animation" animationClass="visible">
        <Solution
          title={solutionData.title}
          description={solutionData.description}
          imageUrl={solutionData.imageUrl}
          stats={solutionData.stats}
        />
      </AnimateOnScroll>

      <AnimateOnScroll initialClass="scroll-animation" animationClass="visible">
        <Benefits title={benefitsData.title} benefits={benefitsData.benefits} />
      </AnimateOnScroll>

      <AnimateOnScroll initialClass="scroll-animation" animationClass="visible">
        <HowItWorks title={howItWorksData.title} steps={howItWorksData.steps} />
      </AnimateOnScroll>

      <AnimateOnScroll initialClass="scroll-animation" animationClass="visible">
        <Testimonials
          title={testimonialsData.title}
          testimonials={testimonialsData.testimonials}
        />
      </AnimateOnScroll>

      <AnimateOnScroll initialClass="scroll-animation" animationClass="visible">
        <FAQ title={faqData.title} faqs={faqData.faqs} />
      </AnimateOnScroll>
      <div className="h-12"></div>
      <Footer />
    </>
  );
}
