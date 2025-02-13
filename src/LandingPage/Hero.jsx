import { Link } from "react-router-dom";
import CtaButton from "./CtaButton";

export function Hero({ title, highlightedTitle, primaryButton, secondaryButton, description, demoImageUrl }) {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {title}
          <span className="block text-primary">{highlightedTitle}</span>
        </h1>
        <p className="text-xl text-base-content mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
        <CtaButton />
      <Link to={`/${secondaryButton.path}`}>
      <button className="btn btn-secondary">{secondaryButton.text}</button>
      </Link>
        </div>
        {demoImageUrl && (
          <div className="mt-12 relative aspect-video max-w-4xl mx-auto">
            <img
              src={demoImageUrl || "/placeholder.svg"}
              alt="Product Demo"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        )}
      </div>
    </section>
  )
}

