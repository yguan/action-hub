/*jslint nomen: true*/
/*global module,require,window */

function Dispatcher() {
    this.callbacks = [];
}

Dispatcher.prototype = {
    dispatch: function (payload) {
        this.callbacks.forEach(function (callback) {
            callback(payload);
        });
    },
    register: function (callback) {
        this.callbacks.push(callback);
    }
};

module.exports = Dispatcher;