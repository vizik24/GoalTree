import { Hero } from "./Hero";
import { Features } from "./Features";
import { Benefits } from "./Benefits";
import { HowItWorks } from "./HowItWorks";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./Faq";
import Nav from './components/Nav.jsx';
import Footer from "../components/Footer.jsx";


import AnimateOnScroll from "./components/AnimateOnScroll";

import { Check, Zap, Shield, Clock, ArrowRight } from "lucide-react";
import { Solution } from "./components/Solution";

const heroData = {
  title: "Achieve big goals",
  highlightedTitle: "Without the Complexity",
  description:
    "Expand on what makes your product special. Address objections upfront and highlight the desired outcome.",
  primaryButton: {
    text: "Start Free Trial",
    href: "/trial",
  },
  secondaryButton: {
    text: "Watch Demo",
    href: "#demo",
  },
  demoImageUrl: "/placeholder.svg?height=600&width=1200",
};

const featuresData = {
  title: "Key Features",
  features: [
    {
      icon: Check,
      title: "Feature 1",
      description: "Streamline your workflow with automated processes",
    },
    {
      icon: Zap,
      title: "Feature 2",
      description: "Boost productivity with AI-powered insights",
    },
    {
      icon: Shield,
      title: "Feature 3",
      description: "Secure your data with enterprise-grade protection",
    },
  ],
};
const solutionData = {
  title: "Our Solution",
  description: "Explain your solution and how it addresses the problem.",
  imageUrl: "/placeholder.svg?height=600&width=1200",
  stats: [
    { value: "99%", label: "Accuracy" },
    { value: "24/7", label: "Availability" },
    { value: "50x", label: "Faster" },
  ],
};
const benefitsData = {
  title: "Benefits",
  benefits: [
    {
      icon: Zap,
      title: "Increased Efficiency",
      description: "Save time and resources with automation.",
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "Reduce manual work by up to 80%",
    },
    {
      icon: ArrowRight,
      title: "Seamless Integration",
      description: "Works with your existing tools and workflows",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Enterprise-grade security for your peace of mind",
    },
  ],
};
const howItWorksData = {
  title: "How it Works",
  steps: [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your account in minutes",
    },
    {
      number: "2",
      title: "Configure",
      description: "Set up your workflows and integrations",
    },
    {
      number: "3",
      title: "Automate",
      description: "Let the system work for you",
    },
  ],
};
const testimonialsData = {
  title: "Testimonials",
  testimonials: [
    {
      content: "This product has revolutionized our workflow!",
      name: "John Doe",
      role: "CEO, Acme Corp",
      rating: 5,
    },
    {
      content:
        "The ROI we've seen since implementing this has been incredible.",
      name: "Sarah K.",
      role: "CTO, Tech Innovators",
      rating: 5,
    },
    {
      content: "Easy to integrate and powerful features. Just what we needed.",
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
      question: "What is this product?",
      answer:
        "This is a product that automates your workflow, increasing efficiency and saving time.",
    },
    {
      question: "How does the pricing work?",
      answer:
        "We offer flexible pricing plans based on your needs. Contact us for details.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all features.",
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
      <Footer />
    </>
  );
}
