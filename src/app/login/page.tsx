import Navbar from '@/Components/layout/Navbar'
import logoGreen from '/public/img/logo2.png';

const page = () => {
  return (
   <>
    <Navbar
       backgroundColor="bg-custom-green"
       logo={logoGreen}
       showLoginButton={false}
       showRegisterButton={false}/>
    
    <div>Pagina de Login</div></>
  )
}

export default page