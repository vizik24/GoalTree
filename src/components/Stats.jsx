import ReviewCard from "./ReviewCard";
import testimonials from "../assets/testimonials.json";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Stats({
  heading,
  stat1,
  figure1,
  stat2,
  figure2,
  stat3,
  figure3,
}) {
return (
    <div className="my-10">
        <AnimateOnScroll animationClass="visible">
          <h2 className='text-center text-5xl font-bold mb-12 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>The fastest growing goal setting system.</h2>
        </AnimateOnScroll>
        <div className="stats stats-vertical lg:stats-horizontal shadow-sm">
            <div className="stat">
                <div className="stat-title">{stat1}</div>
                <div className="stat-value">{figure1}</div>
                <div className="stat-desc">Dec 8th - Jan 10th</div>
            </div>

            <div className="stat">
                <div className="stat-title">{stat2}</div>
                <div className="stat-value text-secondary">{figure2}</div>
                <div className="stat-desc">All time</div>
            </div>

            <div className="stat">
                <div className="stat-title">{stat3}</div>
                <div className="stat-value">{figure3}</div>
                <div className="stat-desc">Jan 8th - Jan 10th</div>
            </div>
        </div>
        <div className="mt-10 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {testimonials.map((testimonial, index) => (
                <AnimateOnScroll
                    key={index}
                    animationClass="visible"
                    className={`mb-5 ${
                        index % 3 === 1 ? 'lg:mt-[96rem]' : index % 3 === 2 ? 'lg:mb-[96rem]' : ''
                    }`}
                >
                    <ReviewCard
                        username={testimonial.name}
                        role={testimonial.role}
                        reviewText={testimonial.reviewText}
                        avatarURL={testimonial.avatarURL}
                    />
                </AnimateOnScroll>
            ))}
        </div>
    </div>
);
}

