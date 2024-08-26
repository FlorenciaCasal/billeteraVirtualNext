import Navbar from "@/Components/layout/Navbar"
import logoGreen from '/public/img/logo2.png';


const page = () => {
  return (<>
    <Navbar
      backgroundColor="bg-custom-green"
      logo={logoGreen}
      showLoginButton={true}
      showRegisterButton={false} />

    <div>Pagina de registro</div>
  </>
  )
}

export default page