import Vue from 'vue'

Vue.filter("roundDate", function (input) {
    input=input.replace('%','');
    return Math.round(parseFloat(input));
});