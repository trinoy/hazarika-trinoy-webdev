module.exports = function(mongoose) {

    //var userSchema = require("../user/user.schema.server")(mongoose);

    var pageSchema = mongoose.Schema({
        _website: String,
        name : String,
        title :String,
        description  : String,
        dateCreated: {type: Date, default: Date.now}

    },  {collection: "assignment.page"});

    return pageSchema;
};