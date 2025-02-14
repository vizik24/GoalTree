import AnimateOnScroll from "../components/AnimateOnScroll";

export function Features({ title, features }) {
    return (
      <section className="py-16 bg-base-100" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimateOnScroll initialClass="scroll-animation" animationClass="visible" delay={index*300}>
              <div key={index} className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-base-content">{feature.description}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  