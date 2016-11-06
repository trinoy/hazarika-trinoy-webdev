module.exports = function (app) {

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
        website._id = (new Date()).getTime().toString();
        websites.push(website);
        res.send(website);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var result = [];
        for (var index in websites) {
            if (websites[index].developerId == userId) {
                result.push(websites[index]);
            }
        }
        res.json(result);
    }


    function findWebsiteById(req, res) {
        //var userId = parseInt(req.params.uid);
        var websiteId = req.params.websiteId;
        for (var index in websites) {
            if (websites[index]._id === websiteId) {
                res.send(websites[index]);
                return;
            }
        }
        res.send('0');
    }


    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        for (var index in websites) {
            if (websites[index]._id === websiteId) {
                websites[index] = website;
            }
        }
        res.sendStatus(200);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var index in websites) {
            if (websites[index]._id == websiteId) {
                delete websites[index];
            }
        }
        res.sendStatus(200);
    }
};