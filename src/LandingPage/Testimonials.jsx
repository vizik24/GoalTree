import { Star } from "lucide-react"
import AnimateOnScroll from "../components/AnimateOnScroll";

function Rating() {
  return (
    <div className="rating py-2 flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <span 
          key={index} 
          className="mask mask-star-2 bg-yellow-400 w-5 h-5"
        ></span>
      ))}
    </div>
  );
}


function UserAvatar({ username, role, avatarURL }) {
return (
  <>
  {avatarURL?
    <div className="avatar flex items-start ">
         <div className="w-32 rounded-full">
            <img src={avatarURL} />
        </div> 
        <div className="ml-4 text-left h-20 w-80">
            <h2>{username}</h2>
            <p className='text-neutral-content'>{role}</p>
            
        </div>
    </div>
    : <div className="text-left">
      <p className="text-xl">{username}</p>
      <p className="text-sm">{role}</p>
      </div>}
    </>
);
}

export default function ReviewCard({
  username,
  avatarURL,
  role,
  reviewText,
  reviewScore,
  reviewDate,
}) {
return (
    <div className="card bg-base-200 w-80 shadow-xl">
        <UserAvatar username={username} role={role} avatarURL={avatarURL} />
        <Rating />
        <p className="text-left">{reviewText}</p>
    </div>
);
}



export function Testimonials({ title, testimonials }) {
  return (
    <section className="py-16 bg-base-100" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
              <AnimateOnScroll initialClass="scroll-animation" animationClass="visible" delay={index*500}>

            <ReviewCard 
              username={testimonial.name} 
              avatarURL={null} 
              role={testimonial.role}
              reviewScore={testimonial.rating}
              reviewText={testimonial.content}/>
              </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

