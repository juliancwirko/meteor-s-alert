'use strict';

Template.sAlert.helpers({
    sAlertData: function () {
        var positionTop = 0;
        var positionBottom = 0;
        var padding = 0;
        var alerts = {};
        var style;
        var sAlertBoxHTML;
        var sAlertBox;
        var docElement;
        var sAlertBoxHeight;
        var currentData = Template.currentData();
        var templateOverwrite = currentData && currentData.template;
        var positionTypeTop;
        var positionTypeBottom;
        return sAlert.collection.find().map(function (alert, index) {
            positionTypeTop = alert.position && /top/g.test(alert.position);
            positionTypeBottom = alert.position && /bottom/g.test(alert.position);
            if (alert.stack) {
                // checking alert box height - needed to calculate position
                docElement = document.createElement('div');
                $(docElement).addClass('s-alert-box-height');
                if (_.isString(templateOverwrite)) {
                    sAlertBoxHTML = Blaze.toHTMLWithData(Template[templateOverwrite], alert);
                } else {
                    sAlertBoxHTML = Blaze.toHTMLWithData(Template.sAlertContent, alert);
                }
                sAlertBox = $(docElement).html(sAlertBoxHTML);
                $('body').append(sAlertBox);
                sAlertBoxHeight = sAlertBox.find('.s-alert-box').outerHeight(true);
                if (positionTypeTop) {
                    padding = sAlertBox.find('.s-alert-box').css('top');
                    if (index === 0 && alert.offset) {
                        positionTop = positionTop + parseInt(padding) + parseInt(alert.offset);
                        positionTop = positionTop + parseInt(padding);
                    } else {
                        positionTop = positionTop + parseInt(padding);
                    }
                    style = 'top: ' + positionTop + 'px;';
                    positionTop = positionTop + sAlertBoxHeight;
                }
                if (positionTypeBottom) {
                    padding = sAlertBox.find('.s-alert-box').css('bottom');
                    if (index === 0 && alert.offset) {
                        positionBottom = positionBottom + parseInt(padding) + parseInt(alert.offset);
                    } else {
                        positionBottom = positionBottom + parseInt(padding);
                    }
                    style = 'bottom: ' + positionBottom + 'px;';
                    positionBottom = positionBottom + sAlertBoxHeight;
                }
                sAlertBox.remove();
                alerts = _.extend(alert, {boxPosition: style});
            } else if (alert.offset && positionTypeTop) {
                alerts = _.extend(alert, {boxPosition: 'top: ' + parseInt(alert.offset) + 'px;'});
            } else if (alert.offset && positionTypeBottom) {
                alerts = _.extend(alert, {boxPosition: 'bottom: ' + parseInt(alert.offset) + 'px;'});
            } else {
                alerts = alert;
            }
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
