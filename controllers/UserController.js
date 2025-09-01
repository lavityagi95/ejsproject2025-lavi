const User = require('../models/User')
const Student = require('../models/student')
const bcrypt = require('bcrypt');
async function addUser(req, res) {
    try {
        // console.log(req.body, 'req.body')
        let user = new User(req.body)

        let encrypytredPassword = bcrypt.hashSync(req.body.password, 10)
        // console.log(encrypytredPassword, 'encryptredPassword');
        user.password = encrypytredPassword;
        await user.save();
        // console.log('data saved successfully.....')
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}
async function doLogin(req, res) {
    try {
        // console.log(req.body, 'req.body')
        let user = await User.findOne({ email: req.body.email })
        // console.log(user)
        if (user) {
            let validPassword = await bcrypt.compare(req.body.password, user.password)

            if (validPassword) {
                if (user.userType === 'Admin') {
                    let students = await Student.find({});
                    res.render('welcomeadmin', {
                        students: students
                    })
                }else{
                    res.render('welcomestudent')
                }
            } else {
                res.end('<h1> invalid email/password')
            }
        } else {
            res.end('<h1> user does not found.....')
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    addUser,
    doLogin
}