### Simple and fancy notifications for Meteor

Demo: [http://s-alert-demo.meteor.com/](http://s-alert-demo.meteor.com/)

### Usage

Add package:

    meteor add juliancwirko:s-alert

Then place ````{{> sAlert}}```` in your main template. Recomended usage:

    <body>
        {{> sAlert}}
    </body>

#### sAlert configuration

You can set up your sAlert (client side). (More about possible configuration options below.) You can ommit it and you will have standard config which is the same as the one below:

    Meteor.startup(function () {

        sAlert.config({
            effect: 'scale',
            position: 'right-top',
            timeout: 5000
        });

    });

sAlert is based on only client side collection. It is called ````sAlert.collection````

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
- id is from Meteor collection called ````sAlerts.collection```` (client only)

##### Immediately close all alerts:

    sAlert.closeAll();


And what is ````configOverwrite````?
This is an object with all settings which you want to overwrite. So if you have your sAlert config (mentioned above) you can overwrite global config with each of your sAlert calls.

**For example:**

    sAlert.error('Boom! Something went wrong!', {effect: 'genie', position: 'right-bottom', timeout: 'no'});

This one particular error will be displayed in different way.

#### Avaible effects:

- scale
- slide
- genie
- jelly
- flip
- bouncyflip
- stackslide (right-top and left-top positions are the same here similar right-botton and left-bottom)

#### Avaible positions:

- left-top
- left-bottom
- right-top
- right-bottom

#### Timeout:

You can set up it in miliseconds or place 'no'.

### CSS styling

You can overwrite all css classes. Major classes which are defined by conditions are:

````.s-alert-blue, .s-alert-green, .s-alert-yellow, .s-alert-red````

For example if you want to overwrite .s-alert-red in scale effect

    .s-alert-effect-scale.s-alert-red {
        background: #bada55; //your background color here
        color: #fff //your text color here
    }


### Template overwriting

Here is a default template (it will be included when you use standard ````{{> sAlert}}````):

    <div class="s-alert-box s-alert-effect-{{effect}} s-alert-{{condition}} s-alert-{{position}} s-alert-show" id="{{_id}}">
        <div class="s-alert-box-inner">
            <p>{{message}}</p>
        </div>
        <span class="s-alert-close"></span>
    </div>

If you want to owerwrite it you should remember to be careful with all used helpers. They should remain in place.
**Here you have an example of overwriting an alert content template** (Place it somewhere in your html files, you can name it as you want):

    <template name="sAlertCustom">
        <div class="my-custom-alert-class s-alert-box s-alert-effect-{{effect}} s-alert-{{condition}} s-alert-{{position}} s-alert-show" id="{{_id}}">
            <div class="s-alert-box-inner">
                <div class="alert-header">
                    <h1>{{alertTitle}}</h1>
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

Place ````{{> sAlert template='sAlertCustom'}}```` in your main template.

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