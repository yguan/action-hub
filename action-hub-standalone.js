!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.actionHub=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jslint nomen: true*/
/*global module,require,window */

module.exports = require('./src/action-factory');
},{"./src/action-factory":2}],2:[function(require,module,exports){
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
},{"./action":3,"./dispatcher":4}],3:[function(require,module,exports){
/*jslint nomen: true*/
/*global module */

function createPayload(actionType, data) {
    return {
        actionType: actionType,
        data: data
    };
}

function Action(name, dispatcher) {
    this.name = name;
    this.dispatcher = dispatcher;
    this.callbacks = [];
}

Action.prototype = {
    dispatch: function (data) {
        this.dispatcher.dispatch(createPayload(this.name, data));
    },
    register: function (callback, scope) {
        this.callbacks.push({
            fn: callback,
            scope: scope
        });
    }
};

module.exports = Action;
},{}],4:[function(require,module,exports){
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
},{}]},{},[1])(1)
});