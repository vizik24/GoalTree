import AnimateOnScroll from "../components/AnimateOnScroll";

export function Benefits({ title, benefits }) {
  return (
    <section className="py-16 bg-base-100" id="benefits">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
              <AnimateOnScroll initialClass="scroll-animation" animationClass="visible" delay={index*300}>

            <div
              key={index}
              className="p-6 flex flex-col items-center text-center"
            >
              <benefit.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-base-content">{benefit.description}</p>
            </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
