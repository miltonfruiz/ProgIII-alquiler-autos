import Navbar from "../../components/Navbar/Navbar";
import Hero from "./Hero/Hero";
import Categorias from "./Categorias/Categorias";
import Recomendados from "./Recomendados/Recomendados";
import WhyUs from "./WhyUs/WhyUs";
import Opiniones from "./Opiniones/Opiniones";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categorias />
      <Recomendados />
      <WhyUs />
      <Opiniones />
    </>
  );
}

export default Home;
