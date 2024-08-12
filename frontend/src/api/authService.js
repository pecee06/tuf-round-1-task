import axios from "axios"

class Auth{
    async signup({username, password}){
        try {
            const res = await axios.post("/api/user/signup", {username, password})
            return res.data
        } catch (error) {
            throw error
        }
    }
    async state(){
        try {
            const res = await axios.get("/api/user/current")
            return res.data
        } catch (error) {
            throw error
        }
    }
    async login({username, password}){
        try {
            const res = await axios.post("/api/user/login", {username, password})
            return res.data
        } catch (error) {
            throw error
        }
    }
    async logout(){
        try {
            const res = await axios.get("/api/user/logout")
            return res.data
        } catch (error) {
            throw error
        }
    }
}

export default new Auth