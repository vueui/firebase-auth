
/**
 * Component dependencies
 */

var Login = require('./login');
var Signup = require('./signup');
var getErrorMessage = require('./helpers/errorMessage');
var User = require('./helpers/user');


/**
 * auth helpers
 */

function onAuth(authData) {
    var vm = this;
    var firebase = this.$root.$user.firebase;

    if(authData) {
        vm.user = authData;
        vm.userAuthenticated = true;

        if(vm.currentView === 'signup') {
            firebase.child('users').child(authData.uid).set(authData);
        }
    } else {
        vm.user = {};
        vm.userAuthenticated = false;
    }
}


/**
 * <ui-auth> definition
 */

module.exports = {
    name: 'Auth',

    paramAttributes: ['firebase', 'facebook', 'google', 'github', 'twitter'],

    compiled: function () {
        this.$root.$user = new User(this.firebase);

        if(this.facebook != undefined) {
            this.providers.push('facebook');
            this.scopes['facebook'] = this.facebook;
        }

        if(this.google != undefined) {
            this.providers.push('google');
            this.scopes['google'] = this.google;
        }

        if(this.twitter === '') {
            this.providers.push('twitter');
            // Twitter doesn't have the option to use a scope
        }

        if(this.github != undefined) {
            this.providers.push('github');
            this.scopes['github'] = this.github;
        }
    },

    data: function () {
        return {
            currentView: 'signup',
            isLoading: false,
            errors: {},
            user: {},
            userAuthenticated: false,
            providers: [],
            scopes: {}
        }
    },

    ready: function () {
        this.$root.$user.firebase.onAuth(onAuth.bind(this));
    },

    destroyed: function () {
        this.$root.$user.firebase.offAuth();
    },

    methods: {
        authWithProvider: function (provider, e) {
            var vm = this;
            var $user = this.$root.$user;
            var scope = this.scopes[provider] || '';

            $user.authWithProvider(provider, scope)
                .then(onAuth.bind(vm))
                .catch(function(error) {
                    var message = getErrorMessage(error);
                    vm.errors.$add(error.code, message);
                });

            e.stopPropagation();
        }
    },

    watch: {
        currentView: function () {
            this.errors = {}
        },
        userAuthenticated: function (isAuthenticated) {
            this.errors = {}

            if(isAuthenticated) {
                this.$root.$emit('user:loggedIn', this.user)
            } else {
                this.$root.$emit('user:loggedOut')
            }
        }
    },

    computed: {
        hasErrors: function () {
            var errors = this.errors;
            var hasErrors = false;

            Object.keys(errors).forEach(function (error) {
               hasErrors = errors.hasOwnProperty(error) ? true : false;
            });

            return hasErrors;
        }
    },

    components: {
        login: Login,
        signup: Signup
    },

    template: require('./templates/auth.jade')
};