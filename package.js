Package.describe({
  "summary": "Simple and fancy notifications for Meteor.",
  "version": "0.0.4",
  "git": "https://github.com/juliancwirko/meteor-s-alert.git",
  "name": "juliancwirko:s-alert"
});

Package.on_use(function(api) {
    api.use('templating@1.0.0');
    api.use('ui@1.0.0');
    api.use(['jquery@1.0.0'], ['client']);
    api.add_files([
        'client/css/s-alert-default.css',
        'client/css/s-alert-effects.css'
    ], 'client');
    api.add_files(['client/s-alert-template.html', 'client/s-alert-template.js'], 'client');
});