module.exports = function (app,model) {

    var pages =
        [
            {"_id": "321", "name": "Post 1", "title": "Demo Page Title 1", "websiteId": "321"},
            {"_id": "432", "name": "Post 2", "title": "Demo Page Title 2", "websiteId": "456"},
            {"_id": "543", "name": "Post 3", "title": "Demo Page Title 3", "websiteId": "456"},
            {"_id": "123", "name": "Post 3", "title": "Demo Page Title 4", "websiteId": "789"}
        ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        page._website = websiteId;
        model.pageModel.createPage(page)
            .then(function (page) {
                    res.send(page);
                },
                function (error) {
                    res.sendStatus(400).send(err);

                }
            )
    }


    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        model.pageModel.findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.sendStatus(400).send(err);

                }
            )
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        model.pageModel.findPageById(pageId)
            .then(function (page) {
                    if (page) {
                        res.send(page);
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


    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;
        model.pageModel.updatePage(pageId, page)
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

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        model.pageModel.deletePage(pageId)
            .then(function (page) {
                    if (page) {
                        res.send(page);
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