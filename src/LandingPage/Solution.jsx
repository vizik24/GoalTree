import AnimateOnScroll from "../components/AnimateOnScroll"

export function Solution({ title, description, imageUrl, stats }) {
  return (
    <section className="py-16" id="solution">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
        <p className="text-center text-base-content mb-12 max-w-2xl mx-auto">{description}</p>
        {imageUrl ? 
        <div className="relative aspect-video max-w-4xl mx-auto mb-12">
          
          <img src={imageUrl || "/placeholder.svg"} alt="Solution Preview" fill className="rounded-lg object-cover" /> 
        </div>
        : null}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <AnimateOnScroll initialClass="scroll-animation" animationClass="visible" delay={index*300}>

              <div key={index} className="p-6 text-center">
                <div className="text-3xl font-bold mb-2 text-accent">{stat.value}</div>
                <div className="text-base-content">{stat.label}</div>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

