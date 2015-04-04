'use strict';

// sAlert Object

sAlert = {
    settings: {
        effect: 'scale',
        position: 'right-top',
        timeout: 5000
    },
    config: function (configObj) {
        if (_.isObject(configObj)) {
            var self = this;
            self.settings = _.extend(self.settings, configObj);
        } else {
            throw new Meteor.Error(400, 'Config must be an object!');
        }
    },
    closeAll: function () {
        sAlert.collection.remove({});
    },
    close: function (id) {
        if (_.isString(id)) {
            sAlertClose(id);
        }
    },
    info: function (msg, customSettings) {
        conditionSet(this, msg, 'blue', customSettings);
    },
    error: function (msg, customSettings) {
        conditionSet(this, msg, 'red', customSettings);
    },
    success: function (msg, customSettings) {
        conditionSet(this, msg, 'green', customSettings);
    },
    warning: function (msg, customSettings) {
        conditionSet(this, msg, 'yellow', customSettings);
    }
};


// helper functions
var conditionSet = function (self, msg, condition, customSettings) {
    customSettings = customSettings || {};
    if (_.isString(msg)) {
        self.settings = _.extend(self.settings, {message: msg}, {condition: condition}, customSettings);
        sAlert.collection.insert(self.settings);
    } else {
        throw new Meteor.Error(400, 'Message must be a string!');
    }
};

var EVENTS = 'webkitAnimationEnd oAnimationEnd animationEnd msAnimationEnd animationend';
var sAlertClose = function (alertId) {
    if (document.hidden || document.webkitHidden) {
        sAlert.collection.remove(alertId);
    } else {
        $('.s-alert-box#' + alertId).removeClass('s-alert-show');
        var closingTimeout = Meteor.setTimeout(function () {
            $('.s-alert-box#' + alertId).addClass('s-alert-hide');
        }, 100);
        $('.s-alert-box#' + alertId).off(EVENTS);
        $('.s-alert-box#' + alertId).on(EVENTS, function () {
            sAlert.collection.remove(alertId);
            Meteor.clearTimeout(closingTimeout);
        });
    }
};

// routers clean
Meteor.startup(function () {
    if (typeof Iron !== 'undefined' && typeof Router !== 'undefined') {
        Router.onBeforeAction(function () {
            sAlert.collection.remove({});
            this.next();
        });
    }
    if (typeof FlowRouter !== 'undefined') {
        FlowRouter.middleware(function (path, next) {
            sAlert.collection.remove({});
            next();
        });
    }
});