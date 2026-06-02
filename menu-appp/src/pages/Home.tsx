import { Link } from "react-router";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-stone-950 via-red-950 to-amber-950 text-white flex flex-col">

      {/* HEADER */}
      <Header
        titulo='Churrasquería "El Parrillero"'
        descripcion="Las mejores carnes a la parrilla de la ciudad"
      />

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO PRINCIPAL */}
      <main
        className="flex-1 flex flex-col items-center justify-center text-center px-6
                   bg-linear-to-b from-transparent to-black/20"
      >

        <div
          className="max-w-4xl bg-black/20 backdrop-blur-sm
                     border border-amber-700/30
                     rounded-3xl p-8 md:p-12
                     shadow-2xl"
        >
          <h2
            className="text-5xl md:text-6xl font-extrabold mb-6
                       text-amber-100 tracking-wide"
          >
            <img
             src="https://www.solocarnes.com/wp-content/uploads/2020/12/White-and-Yellow-Simple-Fireworks-Photo-New-Year-Card-3-6.jpg"
             className="w-full max-w-4xl h-80 object-cover rounded-3xl shadow-2xl mb-8"
            />
            Bienvenido a El Parrillero
          </h2>

          <p
            className="text-amber-200/80 max-w-2xl mx-auto
                       text-lg md:text-xl leading-relaxed"
          >
            Disfruta de nuestras parrillas, cortes premium, bebidas y
            acompañamientos preparados al momento con el auténtico sabor
            de una parrilla tradicional.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/menu"
              className="bg-amber-600 hover:bg-amber-500
                         text-white px-8 py-3
                         rounded-xl font-bold
                         shadow-lg hover:shadow-xl
                         transition-all duration-300
                         hover:scale-105"
            >
              Ver Menú
            </Link>
          </div>

          <div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6
                       text-center"
          >
            <div
              className="bg-black/20 rounded-2xl p-5
                         border border-amber-700/20"
            >
              <h3 className="text-3xl font-bold text-amber-400">100%</h3>
              <p className="text-amber-100/70 mt-1">
                Carne seleccionada
              </p>
            </div>

            <div
              className="bg-black/20 rounded-2xl p-5
                         border border-amber-700/20"
            >
              <h3 className="text-3xl font-bold text-amber-400">🔥</h3>
              <p className="text-amber-100/70 mt-1">
                Parrilla al momento
              </p>
            </div>

            <div
              className="bg-black/20 rounded-2xl p-5
                         border border-amber-700/20"
            >
              <h3 className="text-3xl font-bold text-amber-400">★</h3>
              <p className="text-amber-100/70 mt-1">
                Sabor tradicional
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;