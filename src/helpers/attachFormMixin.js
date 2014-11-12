
module.exports = {
    attached: function () {
        var vm = this;
        var validation = require('./validationRules');

        $(vm.$el).form(validation, {
            inline: true,
            onSuccess: vm.signup.bind(vm)
        });
    }
};