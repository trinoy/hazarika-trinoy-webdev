module.exports = function (app) {

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
        page._id = (new Date()).getTime().toString();
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var userId = req.params.userId;
        var result = [];
        for (var index in pages) {
            if (pages[index].developerId == userId) {
                result.push(pages[index]);
            }
        }
        res.json(result);
    }


    function findPageById(req, res) {
        //var userId = parseInt(req.params.uid);
        var pageId = req.params.pageId;
        for (var index in pages) {
            if (pages[index]._id === pageId) {
                res.send(pages[index]);
                return;
            }
        }
        res.send('0');
    }


    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;
        for (var index in pages) {
            if (pages[index]._id === pageId) {
                pages[index] = page;
            }
        }
        res.send(200);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var index in pages) {
            if (pages[index]._id == pageId) {
                delete pages[index];
            }
        }
        res.send(200);
    }
};