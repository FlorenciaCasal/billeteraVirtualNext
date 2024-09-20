import Navbar from "../../src/Components/layout/Navbar"
import logo1 from '/public/img/Logo1.png';
import { homeTexts } from "../Components/texts/HomeTexts";
import Card from "@/Components/ui/Card";

export default function Home() {
  return (
    <>
        <Navbar
          backgroundColor="bg-backgroundNavbar"
          logo={logo1}
          showLoginButton={true}
          showRegisterButton={true}
        />

        <section className="bg-fondo-home w-full bg-cover bg-center flex-grow flex flex-col justify-between relative">
          <div className="p-4 max-w-md mx-5 mt-4">
            <h1 className="text-[#fff] leading-none">{homeTexts.title}</h1>
            <h3 className="text-custom-green">
              {homeTexts.subtitle} <span className="font-bold">{homeTexts.negrita}</span>
            </h3>
          </div>

          <div className="absolute z-20 bottom-8 w-full flex flex-col items-center custom-md:flex-row  custom-md:items-stretch justify-center gap-6">
            <Card
              title="Transferí dinero"
              paragraph="Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual"
            />
            <Card
              title="Pago de servicios"
              paragraph="Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel"
            />
          </div>


          <div className="w-full bg-crearCuentaNavbar h-2/5 rounded-t-3xl z-0 absolute bottom-0 custom-md:h-1/5"></div>
        </section>
    </>
  )
}
