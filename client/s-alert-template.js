'use strict';

var getAlertData = function (currentData, sAlertPosition) {
    var positionTop = 0;
    var positionBottom = 0;
    var padding = 0;
    var alerts = {};
    var style;
    var sAlertBoxHTML;
    var sAlertBox;
    var docElement;
    var sAlertBoxHeight;
    var templateOverwrite = currentData && currentData.template;
    var positionTypeTop;
    var positionTypeBottom;
    var stackLimit;
    var alertsCount;
    var checkFirst = function (type, objId) {
        var collectionOfType = sAlertCollection.filter(function(obj) {
            return obj.position === type;
        });
        return collectionOfType && collectionOfType[0]._id === objId;
    };
    var positionFunc = function (position, positionType, alert, sAlertBox) {
        padding = alert.stack.spacing || sAlertBox.find('.s-alert-box').css(positionType);
        if (checkFirst(alert.position, alert._id) && alert.offset) {
            position = 0;
            position = position + parseInt(alert.offset);
        }
        if (checkFirst(alert.position, alert._id) && alert.stack.spacing) {
            position = position;
        } else {
            position = position + parseInt(padding);
        }
        style = positionType + ': ' + position + 'px;';
        position = position + sAlertBoxHeight;
        return position;
    };

    var query = {};
    if (sAlertPosition === 'left') {
        query = {$or: [{position: 'top-left'}, {position: 'bottom-left'}]};
    }
    if (sAlertPosition === 'right') {
        query = {$or: [{position: 'top-right'}, {position: 'bottom-right'}]};
    }
    if (sAlertPosition === 'full-top') {
        query = {position: 'top'};
    }
    if (sAlertPosition === 'full-bottom') {
        query = {position: 'bottom'};
    }
    var sAlertCollection = sAlert.collection.find(query).fetch();

    return sAlertCollection.map(function (alert) {
        positionTypeTop = alert.position && /top/g.test(alert.position);
        positionTypeBottom = alert.position && /bottom/g.test(alert.position);
        if (alert.stack) {
            stackLimit = alert.stack && alert.stack.limit;
            alertsCount = sAlert.collection.find(query).count();
            // limit check
            if (stackLimit && alertsCount > stackLimit) {
                sAlert.close(sAlert.collection.findOne(query)._id);
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
                positionTop = positionFunc(positionTop, 'top', alert, sAlertBox);
            }
            if (positionTypeBottom) {
                positionBottom = positionFunc(positionBottom, 'bottom', alert, sAlertBox);
            }
            sAlertBox.remove();
            if (sAlertPosition === 'left') {
                style = style + 'left: ' + (alert.stack.spacing || sAlertBox.find('.s-alert-box').css('left')) + 'px;';
            }
            if (sAlertPosition === 'right') {
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
};

Template.sAlert.helpers({
    sAlertDataLeft: function () {
        return getAlertData(Template.currentData(), 'left');
    },
    sAlertDataRight: function () {
        return getAlertData(Template.currentData(), 'right');
    },
    sAlertDataFullTop: function () {
        return getAlertData(Template.currentData(), 'full-top');
    },
    sAlertDataFullBottom: function () {
        return getAlertData(Template.currentData(), 'full-bottom');
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
