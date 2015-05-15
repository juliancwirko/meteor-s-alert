Package.describe({
    'summary': 'Simple and fancy notifications / alerts / errors for Meteor',
    'version': '2.3.4',
    'git': 'https://github.com/juliancwirko/meteor-s-alert.git',
    'name': 'juliancwirko:s-alert'
});

Package.onUse(function (api) {

    api.use('mongo@1.0.0');
    api.use('templating@1.0.0');
    api.use('ui@1.0.0');
    api.use('underscore@1.0.0');
    api.use(['jquery@1.0.0'], ['client']);

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
    api.use([
        'jquery@1.0.0',
        'templating@1.0.0',
        'juliancwirko:s-alert@2.3.4',
        'mike:mocha-package@0.5.7'
    ]);
    api.addFiles(['tests/s-alert-test.js'], 'client');
});

