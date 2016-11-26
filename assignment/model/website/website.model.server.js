module.exports = function(mongoose,app) {

    var websiteSchema = require("./website.schema.server")(mongoose);
    var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
    var model = {};

    var api = {
        "createWebsite": createWebsite,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "findAllWebsitesForUser1" : findAllWebsitesForUser1,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite,
        "setModel": setModel
    };

    return api;

    function setModel(_model){
        model = _model;
    }

    function createWebsite(userId, website) {
        return websiteModel
            .create(website)
            .then(function(websiteObj){
                model.userModel
                    .findUserById(userId)
                    .then(function(userObj){
                        userObj.websites.push(websiteObj);
                        websiteObj._user = userObj._id;
                        websiteObj.save();
                        userObj.save();
                    });
        });

    }

    function findAllWebsitesForUser(userId) {
        return websiteModel.find({_user:userId});
    }

    function findAllWebsitesForUser1(userId) {
        return model.userModel.find({_user:userId});
    }

    function findWebsiteById(websiteId) {
        //var userId = req.params.uid;
        return websiteModel.findById({_id:websiteId});
    }

    function updateWebsite(websiteId,website){
        return websiteModel.update(
            {
                _id : websiteId
            } ,

            {
                name: website.name,
                description : website.description
            }
        )
    }

    function deleteWebsite(websiteId){
        return websiteModel.remove({_id:websiteId});

    }

};