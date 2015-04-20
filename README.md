### Simple and fancy notifications for Meteor

- Website: [http://s-alert.meteor.com/](http://s-alert.meteor.com/)
- Demo: [http://s-alert-demo.meteor.com/](http://s-alert-demo.meteor.com/)

**Note: From version 2.0.0 you should also choose and add effect package.**
This is more elastic and optimal solution (effects css file contained all effects styles and it was heavy). It will work without effects too. You can add as many effect packages as you want. Config and usage is the same.

### Usage

Add package:

    meteor add juliancwirko:s-alert

Or/And add it with one of effects:

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

You can set up your sAlert (client side). (More about possible configuration options below.) You can ommit it and you will have standard config which is the same as the one below:

    Meteor.startup(function () {

        sAlert.config({
            effect: 'scale',
            position: 'top-right',
            timeout: 5000
        });

    });

sAlert is based on only client side collection. It is called `sAlert.collection`

#### Fire up your alerts by using methods:

##### Error:

    sAlert.error('Your message', configOverwrite);

##### Warning:

    sAlert.warning('Your message', configOverwrite);

##### Info:

    sAlert.info('Your message', configOverwrite);

##### Success:

    sAlert.success('Your message', configOverwrite);

##### Close alert:

    sAlert.close(allertId);
- id is from Meteor collection called `sAlerts.collection` (client only)

##### Immediately close all alerts:

    sAlert.closeAll();


And what is `configOverwrite`?
This is an object with all settings which you want to overwrite. So if you have your sAlert config (mentioned above) you can overwrite global config with each of your sAlert calls.

**For example:**

    sAlert.error('Boom! Something went wrong!', {effect: 'genie', position: 'bottom-right', timeout: 'none'});

This one particular error will be displayed in different way.

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

You can set up it in miliseconds or place `none` string.

### CSS styling

You can overwrite all css classes. Major classes which are defined by conditions are:

`.s-alert-info, .s-alert-success, .s-alert-warning, .s-alert-error`

For example if you want to overwrite .s-alert-red in scale effect

    .s-alert-error.s-alert-effect-scale {
        background: #bada55; //your background color here
        color: #fff //your text color here
    }

### Your own effects packages

You can prepare your own effect package. As a reference take one of the ready to use packages. You will find the code on GitHub. You can create your own animations, but remember to use `.s-alert-effect-{your-effect-name-here}` prefix. Then you can use it like:

```
sAlert.error('Boom! Something went wrong!', {effect: 'your-effect-name-here', position: 'bottom-right', timeout: 'none'});
```

Or you can place it in the config:

```
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

Here is a default template (it will be included when you use standard `{{> sAlert}}`):

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

As you can see in a custom `sAlertCustom` template we have used `sAlertTitle` custom helper. Now if you want to pass the value to it you should call one of sAlert functions with first param as an object instead of a message string. See example:

```
sAlert.info({sAlertTitle: 'My custom sAlert field - the title', message: 'My sAlert message here'}, configOverwrite);
```
You can pass as many fields as you like. Remember to add the corresponding helpers in template. `configOverwrite` works here the same as described above. It is of course optional.

#### Using with routers:

If you go to another route it should autoclean alerts. Works with Iron Router and FlowRouter.
If you notice any bugs related with this please drop me a note. Thanks.

- - -

#### Inspiration:

- [Codrops Article - Notification Styles Inspiration](http://tympanus.net/codrops/2014/07/23/notification-styles-inspiration/)

Thanks a lot for those who report bugs and request changes. S-alert keeps getting better.

#### Changelog

- v2.1.0
    - Postitions names changed; example: 'right-bottom' is now 'bottom-right' etc. (old names should work too. It will be removed in v3.0.0)
    - css classes names changed; example: '.s-alert-blue' is now '.s-alert-info' etc. coresponding to sAlert.info(...) etc.
    - 2 new positions: 'top', 'bottom' (full width alerts for all kind of effects.)
    - timeout 'no' is now 'none' ('no' will work to - will be removed in v3.0.0)

- v2.0.0 - divide effects into separate packages