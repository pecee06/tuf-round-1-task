import axios from "axios"

class Card{
    async getCards(){
        try {
            const res = await axios.get("/api/card/all")
            return res.data
        } catch (error) {
            throw error
        }
    }
    async createCard({term, definition}){
        try {
            const res = await axios.post("/api/card/create", {term, definition})
            return res.data
        } catch (error) {
            throw error
        }
    }
    async updateCard({id, newTerm, newDefinition}){
        try {
            const res = await axios.patch("/api/card/update", {id, term:newTerm, definition:newDefinition})
            return res.data
        } catch (error) {
            throw error
        }
    }
    async deleteCard(id){
        try {
            const res = await axios.delete("/api/card/delete", {
                data: {id}
            })
            return res.data
        } catch (error) {
            throw error
        }
    }
}

export default new Card