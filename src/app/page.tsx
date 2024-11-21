import Navbar from "../Components/layout/Navbar"
import logo1 from '/public/img/Logo1.png';
import { homeTexts } from "../Components/texts/HomeTexts";
import Card from "@/Components/ui/Card";
import { cookies } from "next/headers";

export default function Home() {
  const loggedEmailCookie = cookies().get('digitalMoneyEmail')?.value 
  return (
    <>
      <Navbar
        backgroundColor="bg-backgroundNavbar"
        logo={logo1}
        showLoginButton={true}
        showRegisterButton={true}
        loggedEmailCookie = {loggedEmailCookie}
      />
      <section className="relative bg-fondo-home-mobile w-full sm:bg-fondo-home bg-cover bg-[center_40%] sm:bg-[40%_center] xl:bg-[center_10%] flex-grow flex flex-col justify-between">

        <div className="p-4 max-w-md mx-5 mt-12 lg:mt-4">

          {/* Este h1 es para pantallas menores a sm */}
          <h1 className="text-[#fff] leading-none sm:hidden">
            {homeTexts.title.split(' ').slice(0, 2).join(' ')}<br />
            {homeTexts.title.split(' ').slice(2, 4).join(' ')}<br />
            {homeTexts.title.split(' ').slice(4, 6).join(' ')}<br />
            {homeTexts.title.split(' ').slice(6).join(' ')}
            
          </h1>

          {/* Este h1 es para pantallas mayores o iguales a sm */}
          <h1 className="text-[#fff] leading-none hidden sm:block">
            {homeTexts.title.split(' ').slice(0, 3).join(' ')}<br />
            {homeTexts.title.split(' ').slice(3, 5).join(' ')}<br />
            {homeTexts.title.split(' ').slice(5).join(' ')}
            <br/>
          </h1>

          <hr className="sm:hidden border-t-[4px] border-solid border-crearCuentaNavbar my-4 w-6" />
      
          <h3 className="text-crearCuentaNavbar sm:hidden">
            {homeTexts.subtitle} <br />
            <span className="font-bold">{homeTexts.negrita}</span>
          </h3>

          {/* Este h3 es para pantallas mayores o iguales a sm */}
          <h3 className="text-crearCuentaNavbar hidden sm:inline">
            {homeTexts.subtitle} <span className="font-bold">{homeTexts.negrita}</span>
          </h3>

        </div>
    
        
        <div className="px-2 xs:px-4 relative self-center items-center z-20 bottom-4 sm:bottom-6 w-full flex flex-col lg:bottom-8 lg:flex-row lg:items-stretch justify-center gap-2 xs:gap-4 sm:gap-8">
          <Card
            title="Transferí dinero"
            paragraph="Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual"
          />
          <Card
            title="Pago de servicios"
            paragraph="Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel"
          />
        </div>
       

        {/* <div className="w-full bg-crearCuentaNavbar h-2/5 rounded-t-3xl z-0 absolute bottom-0 lg:h-1/5"></div> */}
        <div className="absolute w-full bg-crearCuentaNavbar h-[30vh] lg:h-[15vh] rounded-t-3xl z-0 bottom-0 "></div>
      </section>
    </>
  )
}
