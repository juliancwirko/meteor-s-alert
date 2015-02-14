'use strict';

Template.sAlert.helpers({
    sAlertData: function () {
        return sAlert.collection.find();
    }
});

Template.sAlertContent.rendered = function () {
    var tmpl = this,
        sAlertTimeout = this.data.timeout;
    if (sAlertTimeout && sAlertTimeout !== 'no') {
        sAlertTimeout = parseInt(sAlertTimeout);
        if (tmpl.sAlertCloseTimeout) {
            Meteor.clearTimeout(tmpl.sAlertCloseTimeout);
        }
        tmpl.sAlertCloseTimeout = Meteor.setTimeout(function () {
            sAlert.close(tmpl.data._id);
        }, sAlertTimeout);
    }
};
Template.sAlertContent.destroyed = function () {
    if (this.sAlertCloseTimeout) {
        Meteor.clearTimeout(this.sAlertCloseTimeout);
    }
};

Template.sAlertContent.events({
    'click .s-alert-close': function (e, tmpl) {
        e.preventDefault();
        Meteor.clearTimeout(tmpl.sAlertCloseTimeout);
        sAlert.close(this._id);
    }
});