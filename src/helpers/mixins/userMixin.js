
/**
 * Mixin dependencies
 */

var getErrorMessage = require('./../errorMessage');

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
                email: vm.email,
                password: vm.password
            };

            $auth.isLoading = true;

            $auth.$user.signup(user)
                .then(userCreated)
                .catch(onSignupError)
                .finally(function () {
                    $auth.isLoading = false;
                });

            function userCreated(user) {
                $auth.errors = {};
                vm.$emit('signup:success', user);
            }

            function onSignupError(error) {
                var message = getErrorMessage(error);

                $auth.errors.$add(error.code, message);
                vm.$dispatch('signup:error', error);
            }
        },

        login: function () {
            var vm = this;
            var $auth = this.$parent;
            var user = {
                email: this.email,
                password: this.password
            };

            $auth.isLoading = true;
            $auth.$user.login(user)
                .then(loggedIn)
                .catch(loginError)
                .finally(function () {
                    $auth.isLoading = false;
                });

            function loggedIn(authData) {
                $auth.errors = {};
            }

            function loginError(error) {
                var message = getErrorMessage(error);

                $auth.errors.$add(error.code, message);
                vm.$dispatch('login:error', error);
            }
        }
    }
};