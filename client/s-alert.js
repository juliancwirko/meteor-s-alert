'use strict';

// helper functions
var conditionSet = function (self, msg, condition, customSettings) {
    var settings = {};
    var effects = ['jelly', 'genie', 'stackslide', 'scale', 'slide', 'flip', 'bouncyflip'];
    var currentEffect;
    var sAlertId;
    if (!_.isObject(customSettings)) {
        customSettings = {};
    }
    if (_.isObject(msg) && _.isString(condition)) {
        settings = _.extend(settings, self.settings, JSON.parse(JSON.stringify(msg)), {condition: condition}, customSettings);
    }
    if (_.isString(msg) && _.isString(condition)) {
        settings = _.extend(settings, self.settings, {message: msg}, {condition: condition}, customSettings);
    }
    currentEffect = settings && settings.effect;
    if (_.contains(effects, currentEffect) && !Package['juliancwirko:s-alert-' + currentEffect] && typeof console !== 'undefined') {
        console.info('Install "' + currentEffect + '" effect by running "meteor add juliancwirko:s-alert-' + currentEffect + '"');
    }
    if (_.isObject(settings) && !_.isEmpty(settings)) {
        sAlertId = sAlert.collection.insert(settings);
    }
    return sAlertId;
};

var EVENTS = 'webkitAnimationEnd oAnimationEnd animationEnd msAnimationEnd animationend';
var sAlertClose = function (alertId) {
    var closingTimeout;
    var onClose;
    if (document.hidden || document.webkitHidden || !$('#' + alertId).hasClass('s-alert-is-effect')) {
        onClose = sAlert.collection.findOne(alertId).onClose;
        sAlert.collection.remove(alertId);
    } else {
        $('.s-alert-box#' + alertId).removeClass('s-alert-show');
        closingTimeout = Meteor.setTimeout(function () {
            $('.s-alert-box#' + alertId).addClass('s-alert-hide');
        }, 100);
        $('.s-alert-box#' + alertId).off(EVENTS);
        $('.s-alert-box#' + alertId).on(EVENTS, function () {
            $(this).hide();
            onClose = sAlert.collection.findOne(alertId).onClose;
            sAlert.collection.remove(alertId);
            Meteor.clearTimeout(closingTimeout);
        });
    }
    // stop audio when closing
    sAlert.audio && sAlert.audio.load();
    sAlert.audioInfo && sAlert.audioInfo.load();
    sAlert.audioError && sAlert.audioError.load();
    sAlert.audioSuccess && sAlert.audioSuccess.load();
    sAlert.audioWarning && sAlert.audioWarning.load();

    // invoke onClose callback
    if (onClose && _.isFunction(onClose)) {
        onClose();
    }
};

// sAlert object
sAlert = {
    settings: {
        effect: '',
        position: 'top-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
        onClose: _.noop
    },
    config: function (configObj) {
        var self = this;
        if (_.isObject(configObj)) {
            self.settings = _.extend(self.settings, configObj);
        } else {
            throw new Meteor.Error(400, 'Config must be an object!');
        }
    },
    closeAll: function () {
        sAlert.collection.find({}).forEach(function (sAlertObj){
            sAlert.collection.remove(sAlertObj._id);
            if (sAlertObj.onClose && _.isFunction(sAlertObj.onClose)) {
                sAlertObj.onClose();
            }
        });
    },
    close: function (id) {
        if (_.isString(id)) {
            sAlertClose(id);
        }
    },
    info: function (msg, customSettings) {
        return conditionSet(this, msg, 'info', customSettings);
    },
    error: function (msg, customSettings) {
        return conditionSet(this, msg, 'error', customSettings);
    },
    success: function (msg, customSettings) {
        return conditionSet(this, msg, 'success', customSettings);
    },
    warning: function (msg, customSettings) {
        return conditionSet(this, msg, 'warning', customSettings);
    }
};

// routers clean
Meteor.startup(function () {
    if (typeof Iron !== 'undefined' && typeof Router !== 'undefined') {
        Router.onStop(function () {
            sAlert.collection.remove({onRouteClose: true});
        });
    }
    if (typeof FlowRouter !== 'undefined' && _.isObject(FlowRouter.triggers)) {
        FlowRouter.triggers.enter([function () {
            sAlert.collection.remove({onRouteClose: true});
        }]);
    }
    if (typeof FlowRouter !== 'undefined' && !_.isObject(FlowRouter.triggers)) {
        FlowRouter.middleware(function (path, next) {
            sAlert.collection.remove({onRouteClose: true});
            next();
        });
    }
});
