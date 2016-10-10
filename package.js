Package.describe({
    'summary': 'Simple and fancy notifications / alerts / errors for Meteor',
    'version': '3.1.3_1',
    'git': 'https://github.com/juliancwirko/meteor-s-alert.git',
    'name': 'juliancwirko:s-alert'
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.1.0.3');
    api.use('mongo');
    api.use('templating');
    api.use('ui');
    api.use('underscore');
    api.use(['jquery', 'session'], ['client']);
    api.addFiles([
        'client/s-alert.js',
        'client/s-alert-collection.js',
        'client/s-alert-default.css',
        'client/s-alert-template.html',
        'client/s-alert-template.js'
    ], 'client');
    api.export('sAlert', ['client']);
});

Package.onTest(function (api) {
    api.versionsFrom('METEOR@1.1.0.3');
    api.use(['jquery'], ['client']);
    api.use([
        'templating',
        'juliancwirko:s-alert@3.2.0',
        'practicalmeteor:mocha@2.4.5_6',
        'practicalmeteor:chai@2.1.0_1'
    ]);
    api.addFiles(['tests/s-alert-test.js'], 'client');
});

