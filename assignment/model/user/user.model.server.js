module.exports = function(mongoose,app) {

    var userSchema = require("./user.schema.server")(mongoose);
    var userModel = mongoose.model("UserModel", userSchema);
    var model = {};



    var api = {
        "createUser": createUser,
        "findUserById": findUserById,
        "updateUser" : updateUser,
        //"findUserByUsername": findUserByUsername,
        "findUserByCredentials": findUserByCredentials,
       // "updateUser": updateUser,
        "deleteUser": deleteUser,
        "setModel": setModel

    };
    return api;

    function setModel(_model){
        model = _model;
    }

    function createUser(user) {
        return userModel.create(user);
    }

    function findUser(req, res) {
        return userModel.find();
    }

    function findUserById(userId) {
        //var userId = req.params.uid;
        return userModel.findById({_id:userId})
            .populate("websites", "name")
            .exec();
    }

    function updateUser(userId,user){
        return userModel.update(
            {
              _id : userId
            } ,

            {
                firstName: user.firstName,
                lastName : user.lastName
            }
        )
    }

    function findUserByCredentials(username,password){
        return userModel.find(
            {
                username:username,
                password:password
            });
    }

    function deleteUser(userId){
        return userModel.remove({_id:userId});

    }
/*
    function findAllMessages(req, res) {
        TestModel
            .find()
            .then(
                function(tests) {
                    res.json(tests);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        TestModel
            .create(req.body)
            .then(
                function(test) {
                    res.json(test);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        TestModel
            .remove({_id: req.params.id})
            .then(
                function(result) {
                    res.json(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
    */


};