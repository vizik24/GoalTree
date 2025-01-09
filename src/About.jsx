import CtaButton from "./components/CtaButton";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function About() {
  return (
    <>
      <Nav />
      <div className="container mx-auto px-4">
        <section className="my-12">
          <h2 className="text-3xl font-bold">Welcome to GoalTree</h2>
          <br></br>
          <p className="text-lg">
            Welcome to GoalTree, your new partner in achieving your dreams and
            ambitions. This hierarchical goal-tracking app is designed to help
            you transform broad aspirations into tangible, manageable steps.
            With features like goal hierarchy management, detailed progress
            tracking, and customizable alerts, GoalTree ensures that you stay
            focused and motivated. Whether you're planning long-term projects or
            daily tasks, our app provides a clear, structured pathway to
            success, keeping you aligned with your objectives every step of the
            way.
          </p>
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-bold">Designed for Everyone</h2>
          <br></br>
          <p className="text-lg">
            GoalTree is designed with everyone in mind, from students and
            professionals to entrepreneurs and hobbyists. Its intuitive and
            adaptable interface caters to a variety of needs, making it the
            perfect tool for anyone looking to streamline their goal-setting
            process. Whether you are aiming to advance your career, excel in
            academia, or pursue personal passions, GoalTree provides the
            support and structure necessary to navigate complex objectives. By
            simplifying the goal management process, we help you focus on what's
            truly important—achieving your dreams.
          </p>
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-bold">Meet the Makers</h2>
          <br></br>
          <div className="flex gap-36">
            <p className="text-lg w-2/4">
              At the core of GoalTree’s development is Max, a developer who
              found that his personal challenge with ADHD impacted his ability
              to maintain focus on long-term goals. <br></br> <br></br>Inspired
              by his experiences, Max conceived GoalTree as a solution not only
              for himself but for anyone needing a more structured approach to
              managing their objectives.
            </p>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-48 h-48 rounded-full ring ring-offset-2 mt-2">
                <img src="/Max.png" />
              </div>
            </div>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-bold">Get Started Today</h2>
          <br></br>
          <p className="text-lg">GoalTree is currently available for free in early access. No credit card required.</p>
          <br></br>
          <CtaButton></CtaButton>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
}
