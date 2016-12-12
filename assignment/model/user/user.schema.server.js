module.exports = function(mongoose)
{
    //var websiteSchema = require("../website/website.schema.server")(mongoose);
    var userSchema = mongoose.Schema({
        username : String,
        password  : String,
        firstName : String,
        lastName : String,
        email : String,
       // phone : String,
        //websites : [websiteSchema],
        websites : [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        dateCreated: {type: Date, default: Date.now},
        facebook:   {
            id:    String,
            token: String
        }

    },  {collection: "assignment.user"});

    return userSchema;
};                                                                                                                                                                                                                                                                                                                                                                                                          