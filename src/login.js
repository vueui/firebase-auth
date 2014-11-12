
var attachFormMixin  = require('./helpers/attachFormMixin');

module.exports = {
    inherit: true,

    methods: {
        login: function () {

        }
    },

    mixins: [ attachFormMixin ],

    template: require('./templates/login.jade')
};