import cardService from "../api/cardService"
import { useEffect, useState } from "react"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaRegTrashAlt} from "react-icons/fa"
import { HiPencilAlt } from "react-icons/hi"
import { useUserContext } from "../user.context"
import {Modal, Dashboard} from "./components"

const Cards = () => {
  const {loggedIn} = useUserContext()
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [currInd, setCurrInd] = useState(0)
  const [showCardDashboard, setShowCardDashboard] = useState(false)
  const [cardData, setCardData] = useState({})

  useEffect(()=>{
    cardService
    .getCards()
    .then(res => setCards(res.data))
    .catch(error => console.error(error))
  },[])

  return (
    <>
      <div className="flex flex-nowrap gap-4 whitespace-nowrap h-screen items-center">
        <FaArrowAltCircleLeft className="text-[4vmax] cursor-pointer" onClick={()=>{
          setCurrInd(prev => (prev > 0) ? prev-1 : prev)
        }}/>
        {
          !cards.length ?
          <h1 className="text-center text-[5vmax] font-bold w-full">No Cards Added Yet</h1>
          :
          cards.map((card, index)=>(
            (currInd == index) &&
            <div key={index} className="w-screen h-[50vh] flex flex-col gap-3 justify-center items-center bg-red-200 rounded-xl cursor-default relative" onClick={()=>{
              if (flippedCards.includes(index))
                setFlippedCards(prev => prev.filter(i => i != index))
              else
                setFlippedCards(prev => [...prev, index])
            }}>
              <p className={`uppercase font-bold text-3xl transition-all ${flippedCards.includes(index) && "opacity-0"}`}>{card.term}</p>
              <p className={`first-letter:uppercase text-xl transition-all ${!flippedCards.includes(index) && "opacity-0"}`}>{card.definition}</p>
              <HiPencilAlt className={`absolute right-0 top-0 text-[3vmax] cursor-pointer ${!loggedIn && "hidden"}`} onClick={()=>{
                setCardData({
                  id: card.id,
                  term: card.term,
                  definition: card.definition
                })
                setShowCardDashboard(true)
              }} />
              <FaRegTrashAlt className={`absolute right-0 bottom-2 text-[3vmax] cursor-pointer ${!loggedIn && "hidden"}`} onClick={()=>{
                cardService
                .deleteCard(card.id)
                .then(res => console.log(res))
                .catch(error => console.error(error))
                .finally(()=> location.reload())
              }} />
            </div>
          ))
        }
        <FaArrowAltCircleRight className="text-[4vmax] cursor-pointer" onClick={()=>{
          setCurrInd(prev => (prev+1)%cards.length)
        }}/>
      </div>
      {
        showCardDashboard &&
        <Modal hideModal={()=>{setShowCardDashboard(false)}}>
          <Dashboard hideModal={()=>{setShowCardDashboard(false)}} data={cardData} />
        </Modal>
      }
    </>
  )
}

export default Cards