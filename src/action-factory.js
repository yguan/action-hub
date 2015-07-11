/*jslint nomen: true*/
/*global module,require,window */

var Action = require('./action');
var Dispatcher = require('./dispatcher');

module.exports = {
    createActions: function (config) {
        var dispatcher = new Dispatcher();
        var group = config.group || '';
        var actions = {
            group: group
        };

        dispatcher.register(function (payload) {
            if (actions.hasOwnProperty(payload.actionType)) {
                actions[payload.actionType].callbacks.forEach(function (callback) {
                    callback.fn.call(callback.scope || this, payload.data);
                });
            }

            if(config.logger) {
                // You can log all action here.
                config.logger.log({
                    payload: payload,
                    group: group
                });
            }
        });

        config.names.forEach(function (name) {
            actions[name] = new Action(name, dispatcher);
        });

        return actions;
    }
};