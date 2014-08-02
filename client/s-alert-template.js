var EVENTS = 'webkitAnimationEnd oAnimationEnd animationEnd msAnimationEnd animationend',
    closeTimeout, hideClassTimeout,
    sAlertClose = function (tmpl) {
        if (tmpl) {
            tmpl.$('.s-alert-box').removeClass('s-alert-show');
            tmpl.$('.s-alert-box').on(EVENTS, function () {
                $(this).css('visibility', 'hidden');
                Session.set('sAlert', null);
            });
            hideClassTimeout = Meteor.setTimeout(function () {
               tmpl.$('.s-alert-box').addClass('s-alert-hide');
            }, 100);
        }
    };

Template.sAlert.helpers({
    sAlertData: function () {
        var alertObj = Session.get('sAlert'),
            avaibleConditions = ['red', 'yellow', 'blue', 'green'],
            avaibleEffects = ['slide', 'scale', 'genie', 'jelly', 'flip', 'bouncyflip', 'stackslide'],
            avaiblePositions = ['left-top', 'left-bottom', 'right-top', 'right-bottom'];
        if (alertObj && _.isObject(alertObj) && alertObj.message) {
            var isCondition = (_.indexOf(avaibleConditions, alertObj.condition) !== -1),
                isEffect = (_.indexOf(avaibleEffects, alertObj.effect) !== -1),
                isPosition = (_.indexOf(avaiblePositions, alertObj.position) !== -1);
            return {
                condition: (isCondition && alertObj.condition) || 'green',
                effect: (isEffect && alertObj.effect) || 'genie',
                position: (isPosition && alertObj.position) || 'right-top',
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
        Meteor.clearTimeout(hideClassTimeout);
        closeTimeout = Meteor.setTimeout(function () {
            sAlertClose(tmpl);
        }, sAlertTimeout);
    }
};
Template.sAlertContent.destroyed = function () {
    Meteor.clearTimeout(closeTimeout);
    Meteor.clearTimeout(hideClassTimeout);
};

Template.sAlertContent.events({
    'click .s-alert-close': function (e, tmpl) {
        e.preventDefault();
        Meteor.clearTimeout(closeTimeout);
        Meteor.clearTimeout(hideClassTimeout);
        sAlertClose(tmpl);
    }
});