import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  function handlerRegister() {
    navigate("/register");
  }

  function handlerLogin() {
    navigate("/");
  }

  return (
    <div>
      <div className="containerLanding">
        <div className="containerH1">
          <h1 className="titleLanding">Alquileres de autos</h1>
        </div>
        <div className="containerP">
          <p className="textWelcome">
            Bienvenidos a la pagina de Alquileres de autos. Aqui podras
            encontrar el auto que desees a un precio de alquiler accesible Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Accusantium rem
            voluptatem reiciendis nesciunt quaerat, deleniti delectus dolore
            aperiam praesentium pariatur, eius aut consequatur ut saepe
            consequuntur. Deserunt, asperiores? Maiores, atque. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. A, voluptatum quas.
            Blanditiis necessitatibus pariatur dolorem amet dolorum delectus
            quaerat. Rem maiores quisquam dolores ipsa incidunt autem esse
            blanditiis minus laboriosam! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Enim rem illo eum consectetur placeat atque
            suscipit perspiciatis et ipsam cum, ipsum voluptas repudiandae ea
            modi quibusdam illum omnis excepturi explicabo! Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Et Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Facere qui error facilis fugiat
            id quo, eum consequuntur ducimus laudantium dolorum, sequi nisi
            repellendus eveniet harum illo esse. Ad, iure aspernatur? Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Asperiores modi
            corrupti ad, quos at eos rerum fuga porro molestiae voluptatem
            harum, velit facere provident ea repellat quis. Dolorum, a adipisci.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            ea minus nihil consequuntur voluptas laboriosam, voluptatem rerum
            quasi eos provident voluptates nobis debitis obcaecati
            necessitatibus maiores, pariatur sint nostrum sequi. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Nihil asperiores aut
            velit iure et mollitia adipisci animi ut at deleniti, nostrum,
            perferendis, temporibus distinctio earum suscipit blanditiis rem
            similique itaque. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nostrum sed dignissimos quia quo fugit harum non optio
            inventore mollitia quod blanditiis, ab perferendis, quis
            perspiciatis voluptas dolorum sint nulla. Quasi? Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Rerum obcaecati dicta fugit
            error corporis hic harum. Natus exercitationem voluptas ducimus iste
            est. Fuga, modi. Similique rem id possimus reprehenderit provident!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quod
            numquam, ipsum repellat voluptate dolorum veritatis cum similique
            facilis quisquam voluptatum consequatur reiciendis fugit at
            molestiae tempore. Perferendis, officiis repudiandae.
          </p>
        </div>
        <div className="containerSocial">
          <Link to="https://www.instagram.com/">
            <FaInstagram className="logo" />
          </Link>
          <Link to="https://x.com/explore">
            <FaTwitter className="logo" />
          </Link>
          <Link to="https://www.facebook.com/?locale=es_ES">
            <FaFacebook className="logo" />
          </Link>
          <Link to="https://web.whatsapp.com/">
            <IoLogoWhatsapp className="logo" />
          </Link>
        </div>
        <div className="containerButton">
          <button className="buttonRegisterLanding" onClick={handlerRegister}>
            Registrarse
          </button>
          <button className="buttonLogin" onClick={handlerLogin}>
            Inicio Sección
          </button>
        </div>
        <div className="footer">
          <div className="containerDesign">
            <p className="textDesign">
              Diseñado por: Milton Ruiz, Juan Sosa ,Branco Antuña
            </p>
          </div>

          <div className="containerCopyright">
            <p className="copyright">© 2025 Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
