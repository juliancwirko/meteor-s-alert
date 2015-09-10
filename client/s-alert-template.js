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
        var positionTypeLeft;
        var positionTypeRight;
        var stackLimit;
        var alertsCount;
        return sAlert.collection.find().map(function (alert, index) {
            positionTypeTop = alert.position && /top/g.test(alert.position);
            positionTypeBottom = alert.position && /bottom/g.test(alert.position);
            positionTypeRight = alert.position && /right/g.test(alert.position);
            positionTypeLeft = alert.position && /left/g.test(alert.position);
            if (alert.stack) {
                stackLimit = alert.stack && alert.stack.limit;
                alertsCount = sAlert.collection.find().count();
                // limit check
                if (stackLimit && alertsCount > stackLimit) {
                    sAlert.collection.find({}).forEach(function (a, i) {
                        if (i < stackLimit) {
                            sAlert.collection.remove(a._id);
                        }
                    });
                }
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
                    padding = alert.stack.spacing || sAlertBox.find('.s-alert-box').css('top');
                    if (index === 0 && alert.offset) {
                        positionTop = positionTop + parseInt(alert.offset);
                    }
                    if (index === 0 && alert.stack.spacing) {
                        positionTop = positionTop;
                    } else {
                        positionTop = positionTop + parseInt(padding);
                    }
                    style = 'top: ' + positionTop + 'px;';
                    positionTop = positionTop + sAlertBoxHeight;
                }
                if (positionTypeBottom) {
                    padding = alert.stack.spacing || sAlertBox.find('.s-alert-box').css('bottom');
                    if (index === 0 && alert.offset) {
                        positionBottom = positionBottom + parseInt(alert.offset);
                    }
                    if (index === 0 && alert.stack.spacing) {
                        positionBottom = positionBottom;
                    } else {
                        positionBottom = positionBottom + parseInt(padding);
                    }
                    style = 'bottom: ' + positionBottom + 'px;';
                    positionBottom = positionBottom + sAlertBoxHeight;
                }
                sAlertBox.remove();
                if (positionTypeLeft) {
                    style = style + 'left: ' + (alert.stack.spacing || sAlertBox.find('.s-alert-box').css('left')) + 'px;';
                }
                if (positionTypeRight) {
                    style = style + 'right: ' + (alert.stack.spacing || sAlertBox.find('.s-alert-box').css('right')) + 'px;';
                }
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
    var beep = data.beep;
    // audio
    if (beep && _.isString(beep)) {
        sAlert.audio = new Audio(data.beep);
        sAlert.audio.load();
        sAlert.audio.play();
    }
    if (beep && _.isObject(beep) && data.condition === 'info') {
        sAlert.audioInfo = new Audio(data.beep.info);
        sAlert.audioInfo.load();
        sAlert.audioInfo.play();
    }
    if (beep && _.isObject(beep) && data.condition === 'error') {
        sAlert.audioError = new Audio(data.beep.error);
        sAlert.audioError.load();
        sAlert.audioError.play();
    }
    if (beep && _.isObject(beep) && data.condition === 'success') {
        sAlert.audioSuccess = new Audio(data.beep.success);
        sAlert.audioSuccess.load();
        sAlert.audioSuccess.play();
    }
    if (beep && _.isObject(beep) && data.condition === 'warning') {
        sAlert.audioWarning = new Audio(data.beep.warning);
        sAlert.audioWarning.load();
        sAlert.audioWarning.play();
    }
    if (sAlertTimeout && sAlertTimeout !== 'none') {
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
