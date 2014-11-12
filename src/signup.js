
/**
 * Component dependencies
 */

var attachFormMixin = require('./helpers/attachFormMixin');


/**
 * UiSignup definition
 */

module.exports = {
    inherit: true,

    methods: {
        signup: function () {
            var firebaseUrl = 'https://' + this.firebase + '.firebaseio.com';
            var ref = new Firebase(firebaseUrl);
            var newUser = {
                email: this.newUser.email,
                password: this.newUser.password
            };

            ref.createUser(newUser, onCreated);

            function onCreated(err) {
                if(!err) {
                    console.log('User created successfully.')
                } else {
                    console.log('Error', err);
                }
            }
        }
    },

    mixins: [ attachFormMixin ],

    template: require('./templates/signup.jade')
};