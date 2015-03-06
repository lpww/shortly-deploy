var crypto = require('crypto');
var mongoose = require('mongoose');

var linksSchema = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
});

var Link = mongoose.model('Link', linksSchema);

Link.pre('save', function(next){
      var shasum = crypto.createHash('sha1');
      shasum.update(this.url);
      this.code = shasum.digest('hex').slice(0, 5);
      next();
    });

module.exports = Link;
