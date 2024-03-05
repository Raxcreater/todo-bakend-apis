let express = require('express')
let router = express.Router()
let user = require('./Models/user')
let userContoller = require('./controller')



const authorizationn = async (req, res, next) => {
    try {
        let get_data = await user.findOne({ accessToken: req.headers.authorization })
        if (get_data) {
            req.user_data = get_data
            next()

        } else {
            console.log('not working');
        }
    } catch (err) {
        throw err
    }
}

router.post('/Signup', async (req, res) => {
    try {
        let savinguser = await userContoller.userSignup(req.body)
        res.send(savinguser)
    } catch (err) {
        res.send(err)
    }
})
router.get('/SignIn', async (req, res) => {
    try {
        console.log(req.body);
        let userlogin = await userContoller.userSignIN(req.body)
        res.send(userlogin)
    } catch (err) {
        res.send(err)
    }
})
router.put('/resetPassword', authorizationn, async (req, res) => {
    try {
        console.log(req.body);
        let resetPassword = await userContoller.userForget(req.body, req.user)
        res.send(resetPassword)
    } catch (err) {
        res.send(err)
    }
})
router.post('/todoTask', authorizationn, async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.user_data);
        let tasks = await userContoller.addingTask(req.body, req.user_data)
        res.send(tasks)
    } catch (err) {
        res.send(err)
    }
})
router.put('/editTask', authorizationn, async (req, res) => {
    try {
        console.log(req.body);
        let tasks = await userContoller.editingTask(req.body, req.user_data)
        res.send(tasks)
    } catch (err) {
        res.send(err)
    }
})
router.delete('/deleteTask', authorizationn, async (req, res) => {
    try {
        console.log(req.body);
        let tasks = await userContoller.deleteTask(req.body, req.user_data)
        res.send(tasks)
    } catch (err) {
        res.send(err)
    }
})
router.get('/getTask', async (req, res) => {
    try {
        let tasks = await userContoller.taskListing(req.body)
        res.send(tasks)
    } catch (err) {
        res.send(err)
    }
})
module.exports = router