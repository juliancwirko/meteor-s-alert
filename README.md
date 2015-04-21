### Simple and fancy notifications for Meteor

- Website: [http://s-alert.meteor.com/](http://s-alert.meteor.com/)
- Demo: [http://s-alert-demo.meteor.com/](http://s-alert-demo.meteor.com/)

**Note: Starting with version 2.0.0 you should also choose and add and effect package.**
This is a more flexible and lean solution (previously, the effects CSS file contained all effect styles and it was heavy). sAlert will work without effects as well. You can add as many effect packages as you want. Config and usage are the same.

### Usage

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

    <body>
        {{> sAlert}}
    </body>

#### sAlert configuration

sAlert can optionally be configured on the client (more about possible configuration options below). The defaults are below:

    Meteor.startup(function () {

        sAlert.config({
            effect: 'scale',
            position: 'top-right',
            timeout: 5000
        });

    });

sAlert is based on a [client-only collection](http://docs.meteor.com/#/full/mongo_collection). It is called `sAlert.collection`.

sAlert methods returns the ID of the alert they have just created

    var warningThatWeWantToCloseLater = sAlert.warning('Please register', {timeout: 'none'});
    /* ... */
    sAlert.close(warningThatWeWantToCloseLater);

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

    sAlert.close(allertId);
- id is from Meteor collection called `sAlerts.collection` (client only)

##### Immediately close all alerts:

    sAlert.closeAll();

#### Individual alert configuration

And what is `configOverwrite`? This is an object with all the settings you want to override, on a per-alert basis. For example:

    sAlert.error('Boom! Something went wrong!', {effect: 'genie', position: 'bottom-right', timeout: 'none'});

This particular error will be displayed in different way.

#### Avaible effects:

- scale - `meteor add juliancwirko:s-alert-scale`
- slide - `meteor add juliancwirko:s-alert-slide`
- genie - `meteor add juliancwirko:s-alert-genie`
- jelly - `meteor add juliancwirko:s-alert-jelly`
- flip - `meteor add juliancwirko:s-alert-flip`
- bouncyflip - `meteor add juliancwirko:s-alert-bouncyflip`
- stackslide - `meteor add juliancwirko:s-alert-stackslide`

#### Avaible positions:

- top-left
- bottom-left
- top-right
- bottom-right
- top (full width)
- bottom (full width)

#### Timeout:

You can set up it in miliseconds or use the string `none`.

### CSS styling

You can override all CSS classes by targeting `s-alert-{{alertType}}.s-alert-effect-{{effectType}}`. The alert type classes are:

    .s-alert-info, .s-alert-success, .s-alert-warning, .s-alert-error

For example, this CSS rule will override the style for `.s-alert-error` when displayed with the `scale` effect:

    .s-alert-error.s-alert-effect-scale {
        background: #bada55;  /* your background color here */
        color: #fff  /* your text color here */
    }

### Your own effects packages

You can prepare your own effect package. As a reference, look at one of the ready-to-use packages, such as [meteor-s-alert-jelly](https://github.com/juliancwirko/meteor-s-alert-jelly). You can create your own animations, but remember to use the `.s-alert-effect-{your-effect-name-here}` prefix. Then you can use it like:

    sAlert.error('Boom! Something went wrong!', {effect: 'your-effect-name-here'});


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

    <div class="s-alert-box s-alert-{{condition}} s-alert-{{position}} s-alert-effect-{{effect}} s-alert-show" id="{{_id}}">
        <div class="s-alert-box-inner">
            <p>{{message}}</p>
        </div>
        <span class="s-alert-close"></span>
    </div>

If you want to owerwrite it you should remember to be careful with all used helpers. They should remain in place.
**Here you have an example of overwriting an alert content template** (Place it somewhere in your html files, you can name it as you want):

    <template name="sAlertCustom">
        <div class="custom-alert-class s-alert-box s-alert-{{condition}} s-alert-{{position}} s-alert-effect-{{effect}} s-alert-show" id="{{_id}}">
            <div class="s-alert-box-inner">
                <div class="alert-header">
                    <h1>{{sAlertTitle}}</h1>
                </div>
                <div class="alert-content">
                    <i class="fa fa-fw fa-cog"></i>
                    {{message}}
                </div>
            </div>
            <span class="s-alert-close"></span>
        </div>
    </template>

#### Usage of custom template

Place `{{> sAlert template='sAlertCustom'}}` in your main template.

#### Custom fields

As you can see in a custom `sAlertCustom` template we have used the `sAlertTitle` custom helper. Now if you want to pass the value to it you should call one of sAlert functions with the first parameter being an object instead of a message string:

    sAlert.info({sAlertTitle: 'My custom sAlert field - the title', message: 'My sAlert message here'}, configOverwrite);

You can pass as many fields as you like. Remember to add the corresponding helpers in the template. `configOverwrite` works here the same as described above. It is of course optional.

#### Using with routers:

If you go to another route, the alerts should automatically be cleaned up. This works with Iron Router and FlowRouter.

- - -

#### Inspiration:

- [Codrops Article - Notification Styles Inspiration](http://tympanus.net/codrops/2014/07/23/notification-styles-inspiration/)

Thanks a lot for those who report bugs and request changes (especially @dandv). sAlert keeps getting better.

#### Changelog

- v2.1.1
    - console info fix (#12)
    - sAlert init functions now returns alert id (#15)

- v2.1.0
    - Postition names changed; example: 'right-bottom' is now 'bottom-right' etc. (The old names will work too, for backwards compatibility, but will be removed in v3.0.0.)
    - CSS class names changed; example: '.s-alert-blue' is now '.s-alert-info', coresponding to sAlert.info(...) etc.
    - two new positions: 'top' and 'bottom', for full-width alerts; they work for all effects
    - timeout 'no' is now 'none' ('no' is deprecated and will work but will be removed in v3.0.0)

- v2.0.0 - factor out effects into separate packages
