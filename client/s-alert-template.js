var EVENTS = 'webkitAnimationEnd oAnimationEnd animationEnd msAnimationEnd animationend',
    closeTimeout,
    sAlertClose = function (tmpl) {
        if (tmpl) {
            tmpl.$('.s-alert-box').removeClass('s-alert-show');
            tmpl.$('.s-alert-box').on(EVENTS, function () {
                $(this).css('visibility', 'hidden');
                Session.set('sAlert', null);
            });
            Meteor.setTimeout(function () {
               tmpl.$('.s-alert-box').addClass('s-alert-hide');
            }, 100);
        }
    };

Template.sAlert.helpers({
    sAlertData: function () {
        var alertObj = Session.get('sAlert'),
            avaibleConditions = ['red', 'yellow', 'blue', 'green'],
            avaibleTypes = ['growl', 'attached', 'bar'],
            avaibleEffects = {
                'growl': ['slide', 'scale', 'genie', 'jelly'],
                'attached': ['flip', 'bouncyflip'],
                'bar': ['slidetop', 'exploader']
            };
        if (alertObj && _.isObject(alertObj) && alertObj.message) {
            var isCondition = (_.indexOf(avaibleConditions, alertObj.condition) !== -1),
                isType = (_.indexOf(avaibleTypes, alertObj.type) !== -1),
                isEffect = function (type) {
                    return _.indexOf(avaibleEffects[type], alertObj.effect) !== -1;
                };
            return {
                condition: (isCondition && alertObj.condition) || 'green',
                type: (isType && alertObj.type) || 'growl',
                effect: (isType && isEffect(alertObj.type) && alertObj.effect) || 'genie',
                message: alertObj.message,
                timeout: alertObj.timeout || '12000'
            };
        }
    }
});

Template.sAlertContent.rendered = function () {
    var tmpl = this,
        sAlertTimeout = this.$('.s-alert-box').data('timeout');
    if (sAlertTimeout !== 'no') {
        sAlertTimeout = parseInt(sAlertTimeout);
        Meteor.clearTimeout(closeTimeout);
        closeTimeout = Meteor.setTimeout(function () {
            sAlertClose(tmpl);
        }, sAlertTimeout);
    }
};

Template.sAlertContent.events({
    'click .s-alert-close': function (e, tmpl) {
        e.preventDefault();
        sAlertClose(tmpl);
    }
});