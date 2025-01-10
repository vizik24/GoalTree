
import Hero from './components/Hero.jsx';
import Nav from './components/Nav.jsx';
import Problem from './components/Problem.jsx';
import BigPicture from './components/BigPicture.jsx';
import StayAligned from './components/StayAligned.jsx';
import DragDrop from './components/DragDrop.jsx';
import Periodise from './components/Periodise.jsx';
import Stats from './components/Stats.jsx';
import Footer from './components/Footer.jsx';
import Diff from './components/Diff.jsx'

import CTA from './components/CTA.jsx'

export default function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <BigPicture />
      {/* <Periodise /> */}
      <StayAligned />
      <DragDrop />
      <Stats
        stat1={"Hours saved"}
        stat2={"5 Star reviews"}
        stat3={"New users"}
        figure1={"300+"}
        figure2={"95%"}
        figure3={"100+"}
      />
      <CTA></CTA>
      <Footer/>
    </>
  );
}
