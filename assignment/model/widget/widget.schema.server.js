module.exports = function(mongoose) {

    //var userSchema = require("../user/user.schema.server")(mongoose);

    var widgetSchema = mongoose.Schema({
        _page : String,
        widgetType : {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name : String,
        text : String,
        placeholder : String,
        description : String,
        url : String,
        width : String,
        height : String,
        rows : {type: Number, default: 1},
        size : {type: Number, default: 3},
        class : String,
        icon : String,
        deletable : Boolean,
        formatted : Boolean,
        seq: Number,
        dateCreated: {type: Date, default: Date.now}
    },  {collection: "assignment.widget"});

    return widgetSchema;
};