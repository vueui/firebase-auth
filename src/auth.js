var UiLogin = require('./login');
var UiSignup = require('./signup');

module.exports = {

    paramAttributes: ['firebase', 'providers', 'emailEnabled'],

    compiled: function () {
        this.providers = this.providers
            ? this.providers.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/)
            : [];
    },

    data: function () {
        return {
            user: {
                email: '',
                password: ''
            },
            newUser: {
                email: '',
                password: ''
            },
            currentView: 'signup',
            emailEnabled: true
        }
    },

    methods: {
        authProvider: function (provider, e) {
            e.stopPropagation();

            console.log('Logging in with ' + provider);
        }
    },

    components: {
        login: UiLogin,
        signup: UiSignup
    },

    template: require('./templates/auth.jade')
};