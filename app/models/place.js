var mongoose = require('mongoose')
var PlaceSchema = require('../schemas/place')
var Place = mongoose.model('Place', PlaceSchema)
PlaceSchema.index({ location: '2dsphere' });
module.exports = Place