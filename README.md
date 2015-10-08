### Simple and fancy notifications for Meteor

- Website: [http://s-alert.meteor.com/](http://s-alert.meteor.com/)
- Demo: [http://s-alert-demo.meteor.com/](http://s-alert-demo.meteor.com/)
- [s-Alert on the Meteor Podcast](http://www.meteorpodcast.com/e/episode-60-the-club-edition/)
- [How to use it with React](http://julian.io/how-to-use-the-meteor-salert-package-with-react/)

### sAlert Usage

Add package:

    meteor add juliancwirko:s-alert

Optionally, add one or more effects:

    meteor add juliancwirko:s-alert-scale
    meteor add juliancwirko:s-alert-slide
    meteor add juliancwirko:s-alert-genie
    meteor add juliancwirko:s-alert-jelly
    meteor add juliancwirko:s-alert-flip
    meteor add juliancwirko:s-alert-bouncyflip
    meteor add juliancwirko:s-alert-stackslide

Then place `{{> sAlert}}` in your main template. Recomended usage:

```handlebars
<body>
    {{> sAlert}}
</body>
```

#### sAlert configuration

sAlert can be configured on the client (more about possible configuration options below). The defaults are below:

```js
Meteor.startup(function () {

    sAlert.config({
        effect: '',
        position: 'top-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
    });

});
```

sAlert is based on a [client-only collection](http://docs.meteor.com/#/full/mongo_collection). It is called `sAlert.collection`. Every sAlert method returns the ID of the alert it has just created.

```js
var warningThatWeWantToCloseLater = sAlert.warning('Please register', {timeout: 'none'});
/* ... */
sAlert.close(warningThatWeWantToCloseLater);
```

#### Fire up your alerts with these methods:

##### Error

    sAlert.error('Your message', configOverwrite);

##### Warning

    sAlert.warning('Your message', configOverwrite);

##### Info

    sAlert.info('Your message', configOverwrite);

##### Success

    sAlert.success('Your message', configOverwrite);

##### Close alert:

    sAlert.close(alertId);

##### Immediately close all alerts:

    sAlert.closeAll();

#### Individual alert configuration

And what is `configOverwrite`? This is an object with all the settings you want to override, on a per-alert basis. For example:

```js
sAlert.error('Boom! Something went wrong!', {effect: 'genie', position: 'bottom-right', timeout: 'none', onRouteClose: false, stack: false, offset: '80px'});
```

This particular error will be displayed in different way.

#### Available effects:

- scale - `meteor add juliancwirko:s-alert-scale`
- slide - `meteor add juliancwirko:s-alert-slide`
- genie - `meteor add juliancwirko:s-alert-genie`
- jelly - `meteor add juliancwirko:s-alert-jelly`
- flip - `meteor add juliancwirko:s-alert-flip`
- bouncyflip - `meteor add juliancwirko:s-alert-bouncyflip`
- stackslide - `meteor add juliancwirko:s-alert-stackslide`

#### Available positions:

- top-left
- bottom-left
- top-right
- bottom-right
- top (full width)
- bottom (full width)

#### Timeout:

You can set up it in miliseconds or use the string `none`.

#### HTML tags

If you want you can use HTML in your message.

```js
sAlert.error('Boom! <br> Something went wrong!', {effect: 'your-effect-name-here', html: true});
```
You can also put it in the main sAlert config.

#### Closing alerts on route change

If you go to another route, in default the alerts should automatically be cleaned up. This works with Iron Router and FlowRouter. However if you want the alerts to persists on route change you should change `onRouteClose` param in your config (example above).

You can even overwrite it in sAlert methods calls. So you can close only some of the alerts on route change. Example:

```javascript
sAlert.warning('Opssss!!! No good! Keep me even when the route changes.', {onRouteClose: false, timeout: 10000});
sAlert.info('Be careful and hide me when the route changes.', {onRouteClose: true, timeout: 10000});
```

#### Stacking alerts

By default your multiple alerts on the screen will appear one after another with shift on top or bottom. You can disable it by stack param. Just set it to false.

```javascript
sAlert.info('Opssss!!! I am full width alert without stacking enabled', {position: 'top'; stack: false});
```
You can also put it in the main sAlert config.

There is an option to set up alerts limit on page and spacing between them.
Sometimes when you use long timeouts (or no timeouts) it is better to use configured limit. So when it will be reached all previous alerts will be cleared immediately.
Instead of using `stack: true` you can pass an object like:

```
...
stack: {
    spacing: 10, // in px
    limit: 3
}
...
```

See full config above.

Remember that if you use `stack.spacing` configuration you probably might want to use offset too, because the first alert will always have 0px spacing from top or bottom. If you use only `stack: true` there will be standard 30px spacing between alerts.

#### Alerts offset

If you want you can set up offset for your alerts. This is useful when you have for example some header and you want your alerts to appear below it. You can set this param in pixels. Default is '0';

```javascript
sAlert.info('Opssss!!! I am displayed below the header which is 70px height', {position: 'top'; offset: '100px'});
```
You can also put it in the main sAlert config.

#### Audio alerts

You can set up your audio 'beeps'. Just configure your audio file path (.mp3 is prefered because it should work in every browser). You can also configure 4 paths for 4 conditions. The best way is to put your audio files in `public` folde. Check the configuration above for more details.

**There is no default audio sample in the package.** You should use sound samples which you know that you have the right to use it.

### CSS styling

You can override all CSS classes by targeting `s-alert-{{alertType}}.s-alert-effect-{{effectType}}`. The alert type classes are:

    .s-alert-info, .s-alert-success, .s-alert-warning, .s-alert-error

For example, this CSS rule will override the style for `.s-alert-error` when displayed with the `scale` effect:

```css
.s-alert-error.s-alert-effect-scale {
    background: #bada55;  /* your background color here */
    color: #fff  /* your text color here */
}
```

### Your own effects packages

You can prepare your own effect package. As a reference, look at one of the ready-to-use packages, such as [meteor-s-alert-jelly](https://github.com/juliancwirko/meteor-s-alert-jelly). You can create your own animations, but remember to use the `.s-alert-effect-{your-effect-name-here}` prefix. Then you can use it like:

```js
sAlert.error('Boom! Something went wrong!', {effect: 'your-effect-name-here'});
```

Or you can place it in the config:

```js
Meteor.startup(function () {

    sAlert.config({
        effect: 'your-effect-name-here',
        position: 'top-right',
        timeout: 5000
    });

});
```

If you want to have your effect package linked here just let me know.

### Template overwriting

Here is a default template (it will be included when you use the standard `{{> sAlert}}`):

```handlebars
<div class="s-alert-box s-alert-{{condition}} s-alert-{{position}} s-alert-effect-{{effect}} s-alert-show" id="{{_id}}" style="{{boxPosition}}">
    <div class="s-alert-box-inner">
        <p>{{message}}</p>
    </div>
    <span class="s-alert-close"></span>
</div>
```

If you want to owerwrite it you should remember to be careful with all used helpers. They should remain in place.
**Here you have an example of overwriting an alert content template** (Place it somewhere in your html files, you can name it as you want):

```handlebars
<template name="sAlertCustom">
    <div class="custom-alert-class s-alert-box s-alert-{{condition}} s-alert-{{position}} s-alert-effect-{{effect}} s-alert-show" id="{{_id}}" style="{{boxPosition}}">
        <div class="s-alert-box-inner">
            <div class="alert-header">
                <h1><i class="fa fa-{{sAlertIcon}}"></i> {{sAlertTitle}}</h1>
            </div>
            <div class="alert-content">
                <i class="fa fa-fw fa-cog"></i>
                {{message}}
            </div>
        </div>
        <span class="s-alert-close"></span>
    </div>
</template>
```

#### Usage of custom template

Place `{{> sAlert template='sAlertCustom'}}` in your main template.

#### Custom fields

As you can see in a custom `sAlertCustom` template we have used the `sAlertTitle` custom helper. Now if you want to pass the value to it you should call one of sAlert functions with the first parameter being an object instead of a message string:

```js
sAlert.info({sAlertIcon: 'asterisk', sAlertTitle: 'My custom sAlert field - the title', message: 'My sAlert message here'}, configOverwrite);
```

You can pass as many fields as you like. Remember to add the corresponding helpers in the template. `configOverwrite` works here the same as described above. It is of course optional.

#### Testing

Clone it into `packages` folder and run meteor with:
```
meteor test-packages --driver-package respondly:test-reporter juliancwirko:s-alert
```

and go to:

```
http://localhost:3000
```

- - -

#### Inspiration:

- [Codrops Article - Notification Styles Inspiration](http://tympanus.net/codrops/2014/07/23/notification-styles-inspiration/)

Thanks a lot for those who report bugs and request changes (especially [@dandv](https://github.com/dandv)). sAlert keeps getting better.

#### Also check out:

- [sGrid](https://atmospherejs.com/juliancwirko/s-grid)
- [sId](https://atmospherejs.com/juliancwirko/s-id)
- [sImageBox](https://atmospherejs.com/juliancwirko/s-image-box)
- [Scotty Boilerplate](https://github.com/juliancwirko/scotty)

**Note: Starting with version 3.0.0 old deprecated APIs are removed**

**Note: Starting with version 2.0.0 you should also choose and add and effect package.**
This is a more flexible and lean solution (previously, the effects CSS file contained all effect styles and it was heavy). sAlert will work without effects as well. You can add as many effect packages as you want. Config and usage are the same.

#### Changelog

#### v3.1.0
- clear audio on close by hand [#25](https://github.com/juliancwirko/meteor-s-alert/issues/25)
- stack up spacing & limit [#31](https://github.com/juliancwirko/meteor-s-alert/issues/31)

#### v3.0.0
- old API cleanup
- Audio alerts

#### v2.4.2
- Error object parse fix [#29](https://github.com/juliancwirko/meteor-s-alert/issues/29)

#### v2.4.1
- Router clearing option - Flow Router new triggers API adjustments

#### v2.4.0
- `stack` param - enable/disable stacking feature
- `offset` param - top or bottom offset of the first alert on screen. In pixels. Default '0'

#### v2.3.5
- `onRouteClose` param - you can decide whether you want to close your alerts (or particular ones) when your route changes (default true)

#### v2.3.4
- Some fixes related to template overwrite

#### v2.3.2, v2.3.3
- Some tests added

#### v2.3.1
- Iron Router clear fix

#### v2.3.0
- displaying more than one alert ([#7](https://github.com/juliancwirko/meteor-s-alert/issues/7))

#### v2.2.0
- now you can use HTML in your messages (thanks to [@gibex](https://github.com/gibex))

#### v2.1.1
- console info fix ([#12](https://github.com/juliancwirko/meteor-s-alert/issues/12))
- sAlert init functions now returns alert id ([#15](https://github.com/juliancwirko/meteor-s-alert/issues/15))

#### v2.1.0
- Postition names changed; example: 'right-bottom' is now 'bottom-right' etc. (The old names will work too, for backwards compatibility, but will be removed in v3.0.0.)
- CSS class names changed; example: '.s-alert-blue' is now '.s-alert-info', coresponding to sAlert.info(...) etc.
- two new positions: 'top' and 'bottom', for full-width alerts; they work for all effects
- timeout 'no' is now 'none' ('no' is deprecated and will work but will be removed in v3.0.0)

#### v2.0.0
- factor out effects into separate packages

#### License
MIT
