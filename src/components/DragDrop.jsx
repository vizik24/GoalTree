import AnimateOnScroll from "./AnimateOnScroll";


export default function DragDrop() {
    return(
        // TODO - on scroll animation of template being dragged onto a day calendar view.
        <>
        
        <AnimateOnScroll animationClass="visible">
        <div className="text-center mt-20">
        <AnimateOnScroll animationClass="visible">
          <h2 className='text-center text-5xl font-bold mb-12 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>Hierarchical Goal Setting.</h2>
        </AnimateOnScroll>
        <p className="py-6 text-xl">Use GoalsTree outline what you want to achieve. Give your goals parent goals. <br></br>Keep breaking them down until you get to the nitty gritty.
        </p>

            <img src="/goal_tree.png" className="rounded-xl"></img>

       
        </div>
        </AnimateOnScroll>
        </>
    )
}