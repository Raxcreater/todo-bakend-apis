const { Model, model } = require('mongoose')
const user = require('./Models/user')
const task = require('./Models/task')
const tokens = require('./jwt_tokeens/genrate-tokeens')


const userSignup = async (payload) => {
    try {
        let savedata = {
            name: payload.name,
            email: payload.email,
            password: payload.password
        }
        let Signup = await user.findOne({ email: payload.email })
        if (!Signup) {
            let createnew = await user.create(savedata) // new user created
            console.log("createnew:", createnew);
            let token = await tokens.generate_token({ _id: createnew._id }) // created token based on _id
            console.log(token);
            let saveToken = await user.findOneAndUpdate({ _id: createnew._id }, { accessToken: token }, { new: true })
            return saveToken
        }
        return "user allready exist. Go to Sign In"
    } catch (error) {
        throw err
    }
}
const userSignIN = async (payload) => {
    try {
        console.log(payload);
        let userData = {
            email: payload.email,
            password: payload.password
        }
        let fetchUser = await user.findOne(userData)
        console.log("fetchUser", fetchUser);
        if (fetchUser) {
            let token = await tokens.generate_token({ _id: fetchUser._id }) // created token based on _id
            let saveToken = await user.findOneAndUpdate({ _id: fetchUser._id }, { accessToken: token }, { new: true })
            console.log(saveToken);
            return saveToken
        } else {
            throw err
        }
    } catch (err) {
        throw err
    }
}
const userForget = async (payload) => {
    try {
        let userData = {
            email: payload.email,
        }
        let fetchUser = await user.findOneAndUpdate(userData, { password: payload.password }, { new: true })
        return fetchUser
    } catch (err) {
        throw err
    }
}
const addingTask = async (payload, user_data) => {
    try {
        let data = {
            userId: user_data._id,
            TaskDecription: payload.TaskDecription
        }
        console.log("data:", data);
        let adding = await task.create(data)
        console.log("adding:", adding);
        return adding
    } catch (err) {
        throw err
    }
}
const editingTask = async (payload, user_data) => {
    try {
        let data = {
            TaskDecription: payload.TaskDecription,
        }
        let edit = await task.findOneAndUpdate({ _id: payload._id, userId: user_data._id }, data, { new: true })
        return edit
    } catch (err) {
        throw err
    }
}

const deleteTask = async (payload, user_data) => {
    try {
        return await task.deleteOne({ _id: payload._id, userId: user_data._id });
    } catch (err) {
        throw err
    }
}

const taskListing = async (payload) => {
    try {
        return await task.find();
    } catch (err) {
        throw err
    }
}
module.exports = {
    userSignup,
    userSignIN,
    userForget,
    addingTask,
    editingTask,
    deleteTask,
    taskListing
}