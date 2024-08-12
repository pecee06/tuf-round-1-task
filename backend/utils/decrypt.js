import bcrypt from "bcryptjs"

const decrypt = async (plainText, encryptedValue)=>{
    return await bcrypt.compare(plainText, encryptedValue)
}

export default decrypt