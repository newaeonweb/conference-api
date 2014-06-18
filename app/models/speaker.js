var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var SpeakerSchema   = new Schema({
    name:           { type: String, default: '' },
    company:        { type: String, default: '' },
    title:          { type: String, default: '' },
    description:    { type: String, default: '' },
    picture:        { type: String, default: '' },
    schedule:       { type: String, default: '' },
    createdOn:      { type: Date,   default: Date.now}
});

module.exports = mongoose.model('Speaker', SpeakerSchema);