const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    deviceType: { type: String, enum: ["android", "ios"], default: "android" },
    accessToken: { type: String, default: null },
    deviceToken: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number, default: Date.now },

}
)
module.exports = mongoose.model("user", user);