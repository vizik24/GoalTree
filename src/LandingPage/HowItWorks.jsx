import AnimateOnScroll from "../components/AnimateOnScroll"

export function HowItWorks({ title, steps }) {
    return (
      <section className="py-16" id="how-it-works">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <AnimateOnScroll initialClass="scroll-animation" animationClass="visible" delay={index*300}>

              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  