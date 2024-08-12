import authService from "../api/authService"
import {Button,Modal,Auth,Dashboard} from "./components"
import {useState, useEffect} from "react"
import { useUserContext } from "../user.context"

const Navbar = () => {
  const {loggedIn, loginUser, logoutUser} = useUserContext()
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [showCardDashboard, setShowCardDashboard] = useState(false)

  const tabs = [
    {
      name: "Admin Login",
      accessible: !loggedIn,
      f: ()=>{
        setShowAuthForm(true)
      }
    },
    {
      name: "Add Card",
      accessible: loggedIn,
      f: ()=>{
        setShowCardDashboard(true)
      }
    },
    {
      name: "Logout",
      accessible: loggedIn,
      f: ()=>{
        authService
        .logout()
        .then(()=>{
          logoutUser()
        })
        .catch(error => console.error(error))
      }
    },
  ]

  useEffect(()=>{
    authService
    .state()
    .then(res => {
      if (Object.keys(res.data).length)
        loginUser()
    })
    .catch(error => console.error(error))
  },[showAuthForm])

  return (
    <>
      <nav className="w-full bg-slate-800 py-2 px-4 rounded-xl flex justify-between items-center">
        <img src="/logo.png" alt="Logo" className="w-[3.5vw]" />
        <div className="flex gap-4">
          {
            tabs.map((tab, index)=>(
              tab.accessible && <Button key={index} f={tab.f} label={tab.name} className="border-2 border-white py-1 px-2 rounded text-white" />
            ))
          }
        </div>
      </nav>

      {
        showAuthForm &&
        <Modal hideModal={()=>{
          setShowAuthForm(false)
        }}>
          <Auth hideModal={()=>{
            setShowAuthForm(false)
          }}/>
        </Modal>
      }

      {
        showCardDashboard &&
        <Modal hideModal={()=>{
          setShowCardDashboard(false)
        }}>
          <Dashboard hideModal={()=>{
          setShowCardDashboard(false)
        }}/>
        </Modal>
      }
    </>
  )
}

export default Navbar