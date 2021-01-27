var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContactsSchema = new Schema(
  {
    name: {type: String, required: true},
    cont: {type: String, required: true, maxlength: 100},
    picture:{type: String, required: true}
  }
);

ContactsSchema
.virtual('url')
.get(function () {
  return '/mainpage/contacts/' + this._id;
});

module.exports = mongoose.model('Contacts', ContactsSchema);