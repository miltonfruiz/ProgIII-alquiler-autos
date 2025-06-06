import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Hero from "./Hero/Hero";
import Categorias from "./Categorias/Categorias";
import Recomendados from "./Recomendados/Recomendados";
import WhyUs from "./WhyUs/WhyUs";
import Opiniones from "./Opiniones/Opiniones";
import RentNow from "./RentNow/RentNow";
import mockRecomendados from "../../data/mockRecomendados";
import UserNavbar from "../../components/UserNavbar/UserNavbar";

function Home({ loggedIn }) {
  return (
    <>
      <UserNavbar />
      <Hero loggedIn={loggedIn} />
      <Categorias loggedIn={loggedIn} />
      <Recomendados autos={mockRecomendados} loggedIn={loggedIn} />
      <WhyUs />
      <Opiniones />
      <RentNow loggedIn={loggedIn} />
      <Footer />
    </>
  );
}

export default Home;
