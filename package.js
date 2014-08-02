Package.describe({
  name: "s-alert",
  summary: "Simple and fancy notifications for Meteor. Especially for Scotty boilerplate."
});

Package.on_use(function(api) {
    api.use('templating');
    api.use('ui');
    api.use(['jquery'], ['client']);
    api.add_files([
        'client/css/s-alert-default.css',
        'client/css/s-alert-effects.css'
    ], 'client');
    api.add_files(['client/s-alert-template.html', 'client/s-alert-template.js'], 'client');
});