module.exports = function(mongoose) {

    //var userSchema = require("../user/user.schema.server")(mongoose);

    var websiteSchema = mongoose.Schema({
        _user: String,
        name : String,
        description  : String,
        dateCreated: {type: Date, default: Date.now}

    },  {collection: "assignment.website"});

    return websiteSchema;
};