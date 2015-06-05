'use strict';

// only client side collections for now..
sAlert.collection = new Mongo.Collection(null);
// local observer to free copy of objects
sAlert.collection.find().observe({
    removed: function(oldDoc){
        if(sAlert.messageData[oldDoc._id]) delete sAlert.messageData[oldDoc._id];
    }
});