import AnimateOnScroll from "./AnimateOnScroll";


export default function DragDrop() {
    return(
        // TODO - on scroll animation of template being dragged onto a day calendar view.
        <>
        <AnimateOnScroll animationClass="visible">
        <div className="text-center mt-20">
        <h2 className='text-center text-5xl font-bold col-start-1 col-end-2'>Hierarchical Goal Setting</h2>
        <p className="py-6 text-xl">Use TimeBlocks outline your daily routine. They stay consistent week to week. 
            <br></br>Add tasks to time blocks so you don't forget the specifics</p>

            <img src="../public/goal_tree.png" className="rounded-xl"></img>

       
        </div>
        </AnimateOnScroll>
        </>
    )
}