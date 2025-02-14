import { Link } from "react-router-dom";
import CtaButton from "./CtaButton";

export function Hero({ title, highlightedTitle, primaryButton, secondaryButton, description, demoImageUrl, demoVideoUrl }) {
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
      <Link to={`/${secondaryButton.href}`}>
      <button className="btn btn-secondary">{secondaryButton.text}</button>
      </Link>
        </div>
        <section >
          <div className="mt-12 relative aspect-video max-w-4xl mx-auto rounded-lg object-cover">
            <video
            id='demo'
              className="rounded-lg object-cover w-full h-full"
              autoPlay
              controls
            >
              <source
                src={demoVideoUrl}
                alt="Product Demo (video)"
                className="rounded-lg object-cover w-full h-full"
                type="video/mp4"
              />
            </video>
          </div>
          </section>
      </div>
    </section>
  )
}

