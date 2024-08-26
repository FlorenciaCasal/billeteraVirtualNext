import Navbar from "@/Components/layout/Navbar"
import Image from "next/image"
import fondoDesktop from "../../public/img/fondoDesktop.png"
import logo1 from '/public/img/logo1.png';

export default function Home() {
  return (
    <>
      <Navbar
        backgroundColor="bg-backgroundNavbar"
        logo={logo1}
        showLoginButton={true}
        showRegisterButton={true}
      />     
      <div className=" block relative min-h-screen w-100 h-100">
        <Image
          src={fondoDesktop}
          alt="Fondo del Home"
          fill
          priority
          objectFit="cover"
          placeholder="blur"
          className="z-0"
        />
        <div className="absolute z-10 top-4 p-8 max-w-md mx-auto ml-5">
          <h1 className="text-white">De ahora en adelante, hacés más con tu dinero</h1>
          <h3 className="text-custom-green">Tu nueva <span className="font-bold">billetera virtual</span></h3>
        </div>
        <div className="absolute z-20 bottom-14 w-full flex justify-center gap-6">
          <div className="bg-white p-8 max-w-md rounded-3xl">
            <h2 className="text-black">Transferí dinero</h2>
            <div className="border-t-2 border-custom-green my-2"></div>
            <p className="text-black">Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual</p>
          </div>
          <div className="bg-white p-8 max-w-md rounded-3xl">
            <h2 className="text-black">Pago de servicios</h2>
            <div className="border-t-2 border-custom-green my-2"></div>
            <p className="text-black">Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel</p>
          </div>
        </div>
        <div className="absolute bottom-0 z-10 w-full bg-custom-green h-24 rounded-t-3xl"></div>
      </div>
    </>
  )
}
