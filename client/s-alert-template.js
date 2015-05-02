'use strict';

Template.sAlert.helpers({
    sAlertData: function () {
        var positionTop = 0;
        var positionBottom = 0;
        var padding = 0;
        var alerts = {};
        var style;
        var alertPosition;
        var sAlertBoxHTML;
        var sAlertBox;
        var docElement;
        var sAlertBoxHeight;
        return sAlert.collection.find().map(function (alert) {
            // checking alert box height - needed to calculate position
            docElement = document.createElement('div');
            $(docElement).addClass('s-alert-box-height');
            sAlertBoxHTML = Blaze.toHTMLWithData(Template.sAlertContent, alert);
            sAlertBox = $(docElement).html(sAlertBoxHTML);
            $('body').append(sAlertBox);
            sAlertBoxHeight = sAlertBox.find('.s-alert-box').outerHeight(true);

            alertPosition = alert.position;
            if (alertPosition && /top/g.test(alertPosition)) {
                padding = getComputedStyle(sAlertBox.find('.s-alert-box')[0], null).getPropertyValue('top');
                positionTop = positionTop + parseInt(padding);
                style = 'top: ' + positionTop + 'px;';
                positionTop = positionTop + sAlertBoxHeight;
            }
            if (alertPosition && /bottom/g.test(alertPosition)) {
                padding = getComputedStyle(sAlertBox.find('.s-alert-box')[0], null).getPropertyValue('bottom');
                positionBottom = positionBottom + parseInt(padding);
                style = 'bottom: ' + positionBottom + 'px;';
                positionBottom = positionBottom + sAlertBoxHeight;
            }

            sAlertBox.remove();

            alerts = _.extend(alert, {boxPosition: style});

            return alerts;
        });
    }
});

Template.sAlertContent.onRendered(function () {
    var tmpl = this;
    var data = Template.currentData();
    var sAlertTimeout = data.timeout;
    if (sAlertTimeout && sAlertTimeout !== 'no' && sAlertTimeout !== 'none') {
        sAlertTimeout = parseInt(sAlertTimeout);
        if (tmpl.sAlertCloseTimeout) {
            Meteor.clearTimeout(tmpl.sAlertCloseTimeout);
        }
        tmpl.sAlertCloseTimeout = Meteor.setTimeout(function () {
            sAlert.close(data._id);
        }, sAlertTimeout);
    }
});
Template.sAlertContent.onDestroyed(function () {
    if (this.sAlertCloseTimeout) {
        Meteor.clearTimeout(this.sAlertCloseTimeout);
    }
});

Template.sAlertContent.events({
    'click .s-alert-close': function (e, tmpl) {
        e.preventDefault();
        Meteor.clearTimeout(tmpl.sAlertCloseTimeout);
        sAlert.close(this._id);
    }
});

Template.sAlertContent.helpers({
    isHtml: function () {
        var data = Template.currentData();
        return data && data.html;
    }
});
