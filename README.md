### Simple and fancy notifications for Meteor (especially for [Scotty](https://github.com/juliancwirko/scotty) boilerplate) (in progress...)

CSS based on : [Codrops Article - Notification Styles Inspiration](http://tympanus.net/codrops/2014/07/23/notification-styles-inspiration/)

### Demo

[http://s-alert-demo.meteor.com/](http://s-alert-demo.meteor.com/)

##### Usage

Just place ````{{> sAlert}}```` in your main template. Recomended usage:
````
<body>
    {{> sAlert}}
</body>
````

#### Use session variable to set up alert type and message, examples:

Default config (condition: 'green', type: 'growl', effect: 'genie', timeout: 12000) 
````
Session.set('sAlert', {message: 'Mission accomplished!'});
````
With changed condition, type and effect:
````
Session.set('sAlert', {condition: 'yellow', type: 'attached', effect: 'flip', message: 'Unknown vessel spotted!'});
````
With only condition changed:
````
Session.set('sAlert', {condition: 'red', message: 'Prepare for combat!'});
````
Clear/Close alert:
````
Session.set('sAlert', null);
````
You can set a timeout after which the Alert box will close itself. Just add a timeout param like:
````
Session.set('sAlert', {condition: 'red', type: 'attached', effect: 'bouncyflip', message: 'lorem ipsum dolor sit', timeout: 2000});
````
It is in milliseconds, default value is set to 12000 milliseconds (12 seconds). If you want do disable auto closing just set timeout to 'no' string ````timeout: 'no'````

You should remember that if you don't match 'type' and 'effect' with each other then sAlert box will appear with standard config.

##### Avaible conditions:

- red (similar to danger, error)
- yellow (similar to warning)
- blue (similar to info)
- green (similar to success)

##### Avaible types:

- growl
- attached
- bar

##### Avaible effects for the specified type:

- for growl type:
    - scale
    - slide
    - genie
    - jelly
- for attached type:
    - flip
    - bouncyflip
- for bar type:
    - slidetop
    - exploader

### CSS styling

You can overwrite all css classes. Major classes which are defined by conditions are:

````.s-alert-blue, .s-alert-green, .s-alert-yellow, .s-alert-red````

For example if you want to overwrite .s-alert-red in growl -> scale effect
````
.s-alert-effect-scale.s-alert-red {
    background: #bada55; //your background color here
    color: #fff //your text color here
}
````

### TODO

- gneral config and logic for sAlerts (this is important part)
- clean css files
- flatten effects combinations
- (if time permits..) more fancy styles
- (if time permits..) for now SVG examples and all effects from 'other' type (from codrops example) are removed