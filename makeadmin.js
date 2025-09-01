const { watch } = require('./models/student');
const User = require('./models/User')
const bcrypt = require('bcrypt')
async function makeAdmin(params) {
    try {
        let user = await User.findOne({ email: 'lavityagiyt@gmail.com' })
        if (user) {
            console.log('user updated')
        } else {
            user = new User();
            user.firstName = 'lavi';
            user.lastName = 'tyagi';
            user.email = 'lavityagiyt@gmail.com';
            let encrypytredPassword = bcrypt.hashSync('12345', 10);
            user.password = encrypytredPassword;
            user.userType = 'Admin';
            await user.save();
            console.log('user saved successfully...');
        }
    } catch (err) {
        console.log(err);

    }
}
module.exports = makeAdmin