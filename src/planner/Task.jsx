export default function Task({title, done, width = '3rem'}) {

    // if done is true show a line through the text.
    return (
        <div style={{ backgroundColor: 'white', 
                    width, 
                    alignSelf: "center", 
                    justifySelf: "center",
                    borderRadius: "0.2rem",}}>
            {title}
        </div>
    );

}