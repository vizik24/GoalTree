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

    // get the testimonials json and store it in a variable
    console.log(testimonials[0].avatarURL)

    return (
        <div className="my-10">
        <h2 className="text-center text-5xl font-bold m-10">
            The fastest growing goal tracking system.
        </h2>
        <div className="stats stats-vertical lg:stats-horizontal shadow">
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
        <div className="mt-20 grid grid-cols-3 gap-4">
            <div className="mb-36 col-span-1 grid grid-rows-3 gap-5">
            {testimonials.map((testimonial, index) => {
                if (index < 3) {
                return (
                    <AnimateOnScroll animationClass="visible">
                    <ReviewCard
                    username={testimonial.name}
                    role={testimonial.role}
                    reviewText={testimonial.reviewText}
                    avatarURL={testimonial.avatarURL}
                    />
                    </AnimateOnScroll>
                );
                }
            }
            )}
            </div>
            <div className="mt-36 col-span-1 grid grid-rows-3 gap-5 sm:grid-cols-1">
            {testimonials.map((testimonial, index) => {
                if ((index > 2) && (index < 6)) {
                return (
                    <AnimateOnScroll animationClass="visible">

                    <ReviewCard
                    username={testimonial.name}
                    role={testimonial.role}
                    reviewText={testimonial.reviewText}
                    avatarURL={testimonial.avatarURL}
                    />
                    </AnimateOnScroll>

                );
                }
            }
            )}
            </div>
            <div className="mb-36 col-span-1 grid grid-rows-3 gap-5">
            {testimonials.map((testimonial, index) => {
                if (index >= 6) {
                return (
                    <AnimateOnScroll animationClass="visible">

                    <ReviewCard
                    username={testimonial.name}
                    role={testimonial.role}
                    reviewText={testimonial.reviewText}
                    avatarURL={testimonial.avatarURL}
                    />
                    </AnimateOnScroll>

                );
                }
            }
            )}
            </div>
        </div>
        </div>
    );
    }
