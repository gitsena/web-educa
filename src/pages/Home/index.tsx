import Header from '../../components/Header';
import Hero from './components/Hero';
import FooterHome from './components/FooterHome';
import Footer from '../../components/Footer';
import Intro from './components/Intro';
import Pillar from './components/Pillar';
import Supporters from './components/Supporters';
import Feedbacks from './components/Feedbacks';


export function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <Pillar/>
      <Feedbacks/>
      <Supporters/>
      <FooterHome />
      <Footer />
    </>
  );
}
