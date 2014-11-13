
/**
 * Mixin dependencies
 */

var getErrorMessage = require('./errorMessage');


/**
 * userMixin definition
 */

module.exports = {

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
            $auth.$firebase.createUser(user, function onSignup(error) {
                $auth.isLoading = false;

                if(error) {
                    var message = getErrorMessage(error);

                    $auth.errors.$add(error.code, message);
                    vm.$dispatch('signup:error', error);
                } else {
                    $auth.errors = {};
                    vm.$emit('signup:success')
                }
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
            $auth.$firebase.authWithPassword(user, function (error, authData) {
                $auth.isLoading = false;

                if(error) {
                    var message = getErrorMessage(error);

                    $auth.errors.$add(error.code, message);
                    vm.$dispatch('login:error');
                } else {
                    $auth.errors = {};
                }
            });
        }
    }
};