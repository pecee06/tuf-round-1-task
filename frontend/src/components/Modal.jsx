import { createPortal } from "react-dom"
import { useEffect } from "react"

const Modal = ({children, hideModal=()=>{}}) => {
  useEffect(() => {
    const body = document.querySelector("body")
    body.style.overflowY = "hidden"
    return () => {
      body.style.overflowY = "scroll"
    }
  }, [])

  return createPortal(
    <>
      <div
        className="h-screen w-screen fixed top-0 left-0"
        style={{
          backdropFilter: "blur(8.8px)",
          WebkitBackdropFilter: "blur(8.8px)"
        }}
        onClick={hideModal}
      ></div>

      <div
        className="border border-black bg-white fixed top-1/2 left-1/2 w-fit p-10 rounded flex justify-center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {children}
      </div>
    </>,
    document.querySelector("#modal")
  )
}

export default Modal