
module.exports = {
    attached: function () {
        var vm = this;
        var validation = require('./../validationRules');
        var settings = {
            inline: true,
            onSuccess: function () {
                vm.$emit('form:submitted');
            }
        };

        $(vm.$el).form(validation, settings);
    }
};