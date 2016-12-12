module.exports = function (app, model) {

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    /*   var users =
     [
     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
     ];
     */

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {

        model.userModel
            .findUserByUsername(username)
            .then(
                function (user ) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/loggedin', loggedin);

    // app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', unregisterUser);

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));


    var facebookConfig = {
        // clientID        : process.env.FACEBOOK_CLIENT_ID,
        //clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
        // callbackURL     : process.env.FACEBOOK_CALLBACK_URL

        clientID: "1842311796007396",
        clientSecret: "75064f7300ed97cea116988f819424be",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            //username: names[0],
                            //password: names[0],
                            lastName: names[1],
                            firstName: names[0],
                            email: profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

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

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.userModel.createUser(user)
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
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
                function (user) {
                    if (user) {
                        res.json(user);
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

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }
};