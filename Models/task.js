const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const task = new Schema({
    userId: { type: Schema.ObjectId, ref: "user", default: null },
    TaskDecription: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Number, default: Date.now },

})
module.exports = mongoose.model("task", task);