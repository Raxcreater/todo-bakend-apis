const j_jwt = require('jsonwebtoken')
let sectreteKey = "thisissectret00983474839939"
const generate_token = async function generatingToken(data) {
    console.log("data>>>ddd>>>>", data)

    const token = j_jwt.sign(data, sectreteKey)
    console.log("token>>>>>>>>>", token)
    return token
}
module.exports = {
    generate_token
}