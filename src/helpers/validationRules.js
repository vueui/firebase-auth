
module.exports = {
    email: {
        identifier: 'email',
        rules: [{
            type: 'empty',
            prompt: 'Please enter an e-mail address'
        }, {
            type: 'email',
            prompt: 'Invalid e-mail address'
        }]
    },

    password: {
        identifier: 'password',
        rules: [{
            type: 'empty',
            prompt: 'Please enter a password'
        }, {
            type   : 'length[6]',
            prompt : 'Your password must be at least 6 characters'
        }]
    }
};