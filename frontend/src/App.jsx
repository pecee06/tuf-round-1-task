import {Navbar,Cards} from "./components/components"
import {UserProvider} from "./user.context"
import { useState } from "react"

const App = () => {
  console.log(`Username: ${import.meta.env.VITE_ADMIN_USERNAME}\nPassword: ${import.meta.env.VITE_ADMIN_PASSWORD}`)
  
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <UserProvider value={{loggedIn, loginUser: ()=>{setLoggedIn(true)}, logoutUser: ()=>{setLoggedIn(false)}}}>
      <main className="h-screen flex flex-col p-6 bg-amber-50 gap-4">
        <Navbar/>
        <Cards/>
      </main>
    </UserProvider>
  )
}

export default App