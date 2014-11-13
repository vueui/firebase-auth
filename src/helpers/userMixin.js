
/**
 * Mixin dependencies
 */

var getErrorMessage = require('./errorMessage');

/**
 * userMixin definition
 */

module.exports = {

    compiled: function () {
        var firebaseUrl = 'https://' + this.$parent.firebase + '.firebaseio.com';
        this.$firebase = new Firebase(firebaseUrl);
    },

    data: function () {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        signup: function () {
            var vm = this;
            var $auth = this.$parent;
            var user = {
                email: this.email,
                password: this.password
            };

            $auth.isLoading = true;
            vm.$firebase.createUser(user, function onSignup(error) {
                if(!error) {
                    $auth.errors = [];
                    vm.$emit('signup:success');
                } else {
                    var message = getErrorMessage(error);

                    $auth.errors.push(message);
                    vm.$emit('signup:error', error);
                }

                $auth.isLoading = false;
            });
        },

        login: function () {
            var vm = this;
            var $auth = this.$parent;
            var user = {
                email: this.email,
                password: this.password
            };

            $auth.isLoading = true;
            vm.$firebase.authWithPassword(user, function (error, authData) {
                if(error) {
                    var message = getErrorMessage(error);

                    $auth.errors.push(message);
                    vm.$emit('login:error');
                } else {
                    $auth.errors = [];
                    vm.$emit('login:success', authData);
                }

                $auth.isLoading = false;
            });
        }
    }
};