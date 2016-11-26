module.exports = function (app, model) {

    var users =
        [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', unregisterUser);

    function unregisterUser(req, res) {
        var uid = req.params.uid;

        model.userModel.deleteUser(uid)
            .then(function (user) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send(err);

                }
            )
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;

        model.userModel.updateUser(uid, user)
            .then(function (user) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send(err);

                }
            )
    }

    function createUser(req, res) {
        var user = req.body;
        model.userModel.createUser(user)
            .then(function (user) {
                    res.send(user);
                },
                function (error) {
                    res.sendStatus(400).send(err);

                }
            )
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model.userModel.findUserByCredentials(username, password)
            .then(
                function (users) {
                    if (users.length != 0) {
                        res.send(users[0]);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(err);
                }
            )
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserById(req, res) {
        //var userId = parseInt(req.params.uid);
        var userId = req.params.uid;
        model.userModel.findUserById(userId)
            .then(function (user) {
                    if (user) {
                        res.send(user);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(err);

                }
            )
    }
};