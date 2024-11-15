// app/login/page.tsx

import { useSearchParams } from "next/navigation";
import Footer from "../../components/Footer";
import Login from "../../components/Login";
import NavBar from "../../components/Navbar";
import Triangule from "../../components/ornaments/Triangule";
import { AuthGetCurrentUserAtribServer, cookiesClient } from "../../utils/server-utils";
import { fetchUserAttributes } from 'aws-amplify/auth'
export default async function LoginPage() {

  return (
    <main className="w-full h-fit flex flex-col">
      <NavBar/>
      <section className="mt-[14vh] min-h-[80vh] relative w-full h-fit p-6 overflow-hidden">
        <Triangule className={`absolute opacity-100 -z-10 transition-all ease-in-out duration-700 translate-y-0 delay-300 w-[30vw] h-[30vw] min-h-[300px] min-w-[300px] opacity-70 rounded-[18%] bg-gradient-to-r from-transparent to-[#976cf5] absolute bottom-1/2 -right-10 rotate-[340deg]`} />
        <Triangule className={`absolute opacity-100 -z-10 transition-all ease-in-out duration-700 translate-y-0 delay-300 w-[28vw] h-[28vw] min-h-[300px] min-w-[300px] opacity-70 rounded-[18%] bg-gradient-to-r from-transparent to-[#976cf5] absolute top-1/2 -left-10 rotate-[130deg]`} />
        
        <Login />
      </section>
      <Footer/>
    </main>
  
  )
}