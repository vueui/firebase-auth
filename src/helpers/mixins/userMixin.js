
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
                .catch(authError.bind($auth))
                .catch(signupError)
                .finally(function () {
                    $auth.isLoading = false;
                });

            function userCreated(user) {
                $auth.errors = {};
                vm.$dispatch('signup:success', user);
                vm.login();
            }

            function signupError(error) {
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
                .catch(authError.bind($auth))
                .catch(loginError)
                .finally(function () {
                    $auth.isLoading = false;
                });

            function loggedIn(authData) {
                $auth.errors = {};
                vm.$dispatch('login:success', authData);
            }

            function loginError(error) {
                vm.$dispatch('login:error', error);
            }
        }
    }
};

// Helpers

function authError(error) {
    var message = getErrorMessage(error);

    this.errors.$add(error.code, message);
    throw error;
}