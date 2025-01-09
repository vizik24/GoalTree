function Rating() {
  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <input key={index} className="mask mask-star-2 bg-orange-400"></input>
      ))}
    </div>
  );
}

function UserAvatar({ username, role, avatarURL }) {
return (
    <div className="avatar flex items-start ">
        <div className="w-32 rounded-full">
            <img src={avatarURL} />
        </div>
        <div className="ml-4 text-left h-20 w-80">
            <h2>{username}</h2>
            <p className='text-neutral-content'>{role}</p>
            <Rating />
        </div>
    </div>
);
}

export default function ReviewCard({
  username,
  avatarURL,
  role,
  reviewText,
  reviewScore = 5,
  reviewDate = null,
}) {
return (
    <div className="card bg-base-100 w-80 shadow-xl">
        <UserAvatar username={username} role={role} avatarURL={avatarURL} />
        <p className="text-left">{reviewText}</p>
    </div>
);
}
