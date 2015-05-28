var mongoose = require('mongoose') 
var _ = require('underscore') 
require('../models/place.js')
var Place = mongoose.model('Place')
 

exports.list = function(request,response) {
  Place.find(function (err, places) {
    if (err) response.json({'mensanje':'error'})
     var data = []
    _.each(places,function(item) {
      
        data.push({
          infoWindow:item.name,
          latitude:item.location.coordinates[1],
          longitude:item.location.coordinates[0],
          icon:item.icon
        })
    })
    response.json(data)
  })
};
exports.near = function(request,response) {
  var place = request.body.item;
  var radius = request.body.radius;
  
  Place.find({ location :
   { '$near' :{
    '$geometry':{
      'type':'Point',
      'coordinates': [parseFloat(place.longitude),
    parseFloat(place.latitude)]
    }
   },
    '$maxDistance':radius
   }
   },function (err, places) {
    
    if (err) response.json({'mensanje':'error'})
     var data = []
    _.each(places,function(item) {
        data.push({
          infoWindow:item.name,
          latitude:item.location.coordinates[1],
          longitude:item.location.coordinates[0],
          icon:item.icon
        })
    })
    if (data.length === 0)
      response.json({'mensaje':'error data es 0'})
    response.json(data)
  })
};

exports.addPlace = function(request,response) {
  var place = request.body;
  Place.findOne({'name':place.infoWindow},{},function(err,person) {
    if (err) response.json({'mensanje1':err})
      console.dir(person)
    if(person === null){
    var  nuevo = new Place(
        {'name':place.infoWindow,
        icon:place.icon,
        location:{
        type:'Point', 
        coordinates:[ parseFloat(place.longitude) ,
          parseFloat(place.latitude) ]
        }})
      nuevo.save(function(err,place) {
        if (err) response.json({'mensanje2':err})
          response.json({'mensaje':'ok'})
      })
    }
  })
    response.json({'mensaje':'ok'})
};

exports.Test = function(request,response) {
    response.json({'mensaje':'ok'})
  }