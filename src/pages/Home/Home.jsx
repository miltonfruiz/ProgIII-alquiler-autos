import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Hero from "./Hero/Hero";
import Categorias from "./Categorias/Categorias";
import Recomendados from "./Recomendados/Recomendados";
import WhyUs from "./WhyUs/WhyUs";
import Opiniones from "./Opiniones/Opiniones";
import RentNow from "./RentNow/RentNow";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categorias />
      <Recomendados />
      <WhyUs />
      <Opiniones />
      <RentNow />
      <Footer />
    </>
  );
}

export default Home;
