module.exports = function (app,model) {

    var websites =
        [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "test"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "test"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "test"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "test"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "test"},
            {"_id": "321", "name": "Chess", "developerId": "234", "description": "test"}
        ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        model.websiteModel.createWebsite(userId,website)
            .then(function (website) {
                    res.send(website);
                },
                function (error) {
                    res.sendStatus(400).send(err);

                }
            )
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        model.websiteModel.findAllWebsitesForUser(userId)
            .then(function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(400).send(err);

                }
            )
    }

    function findWebsiteById(req, res) {
        //var userId = parseInt(req.params.uid);
        var websiteId = req.params.websiteId;

        model.websiteModel.findWebsiteById(websiteId)
            .then(function (website) {
                    if (website) {
                        res.send(website);
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


    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        model.websiteModel.updateWebsite(websiteId, website)
            .then(function (website) {
                    if (website) {
                        res.send(website);
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

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        model.websiteModel.deleteWebsite(websiteId)
            .then(function (website) {
                    if (website) {
                        res.send(website);
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