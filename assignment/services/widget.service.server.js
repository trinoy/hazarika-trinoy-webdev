module.exports = function (app) {

    var multer = require('multer'); // npm install multer --save
    var mime = require('mime');


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../public/assignment/uploads')
        },
        filename: function (req, file, cb) {
            //cb(null, Date.now() + '-' + file.originalname + mime.extension(file.mimetype))
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
        }
    });

    var upload = multer({storage: storage})

    //var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

    var widgets =
        [
            {
                "_id": "991",
                "name": "Header Size 2 Demo",
                "widgetType": "HEADER",
                "pageId": "123",
                "size": 2,
                "text": "GIZMODO"
            },
            {
                "_id": "123",
                "name": "Header Size 2 Demo",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 2,
                "text": "GIZMODO"
            },
            {
                "_id": "234",
                "name": "Header Size 4 Demo",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 4,
                "text": "Lorem ipsum"
            },
            {
                "_id": "345",
                "name": "Image Demo",
                "widgetType": "IMAGE",
                "pageId": "321",
                "width": "100%",
                "text": "Image Demo",
                "url": "http://lorempixel.com/400/200/"
            },
            {
                "_id": "992",
                "name": "Header Size 1 Demo",
                "widgetType": "HEADER",
                "pageId": "123",
                "size": 1,
                "text": "GIZMODO2"
            },
            {
                "_id": "456",
                "name": "Html Demo",
                "widgetType": "HTML",
                "pageId": "321",
                "text": "<p>Lorem" + " ipsum</p>"
            },
            {
                "_id": "567",
                "name": "Header Size 1 Demo",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 1,
                "text": "Lorem ipsum"
            },
            {
                "_id": "678",
                "name": "Youtube Demo",
                "widgetType": "YOUTUBE",
                "pageId": "321",
                "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {
                "_id": "789",
                "name": "Html Demo",
                "widgetType": "HTML",
                "pageId": "321",
                "text": "<p>Lorem" + " ipsum</p>"
            }
        ];

    var widgetsTypes =
        [
            {"_id": "1", "widgetType": "HEADER", "text": "header", "createFlag": false},
            {"_id": "2", "widgetType": "YOUTUBE", "text": "youtube", "createFlag": false},
            {"_id": "3", "widgetType": "IMAGE", "text": "image", "createFlag": false},
            {"_id": "4", "widgetType": "HTML", "text": "html", "createFlag": false}
        ];

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get('/api/widget/widtype', getWidgetTypes);
    app.get('/api/widget/widlen', getWidgetCount);
    app.get('/api/widget/widgetFlag', getWidgetByCreateFlag);
    app.get('/api/widget/widgetFlush', widgetFlushMetaData);
    app.post('/api/widget/widgetFlag/:widgetId', setWidgetCreateFlag);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/page/:pageId/widget', updateWidgets);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);


    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var width = req.body.width;
        var name = req.body.name;
        var text = req.body.text;
        var url = req.body.url;
        var myFile = req.file;

        if (myFile != undefined) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            var newFileName = "uploads/" + filename;
        }
        var widget = {};
        widget._id = (widgetId === "new") ? (new Date()).getTime().toString() : widgetId;
        widget.name = name;
        widget.text = text;
        widget.widgetType = "IMAGE";
        widget.pageId = pageId;
        widget.width = width;
        widget.url = (myFile === undefined) ? url : newFileName;

        if (widgetId === "new") {
            widgets.push(widget);
        }
        else {
            for (var index in widgets) {
                if (widgets[index]._id === widget._id) {
                    widgets[index] = widget;
                }
            }
        }
        res.redirect("../assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
    }


    function getWidgetTypes(req, res) {
        res.send(widgetsTypes);
    }

    function getWidgetCount(req, res) {
        res.send(widgets.length);
    }

    function getWidgetByCreateFlag(req, res) {
        for (index in widgetsTypes) {
            if (widgetsTypes[index].createFlag == true) {
                res.send(widgetsTypes[index]);
                return;
            }
        }
        res.send('0');
    }

    function widgetFlushMetaData(req, res) {
        var result = [];
        for (index in widgetsTypes) {
            widgetsTypes[index].createFlag = false;
            result.push(widgetsTypes[index]);
        }
        res.send(widgetsTypes);
    }

    function setWidgetCreateFlag(req, res) {
        var widgetId = req.params.widgetId;
        for (var index in widgetsTypes) {
            if (widgetsTypes[index]._id === widgetId) {
                widgetsTypes[index].createFlag = true;
            }
        }
        res.send(200);
    }

    function createWidget(req, res) {
        var widget = req.body;
        widget._id = (new Date()).getTime().toString();
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var result = [];
        for (var index in widgets) {
            if (widgets[index].pageId == pageId) {
                result.push(widgets[index]);
            }
        }
        res.json(result);
    }


    function findWidgetById(req, res) {
        //var userId = parseInt(req.params.uid);
        var widgetId = req.params.widgetId;
        for (var index in widgets) {
            if (widgets[index]._id === widgetId) {
                res.send(widgets[index]);
                return;
            }
        }
        res.send('0');
    }


    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        for (var index in widgets) {
            if (widgets[index]._id === widgetId) {
                widgets[index] = widget;
            }
        }
        res.send(200);
    }


    function updateWidgets(req, res) {
        var start = req.query.initial;
        var end = req.query.final;
        var pageId = req.params.pageId;

        //filter
        var count =0;
        var result = [];

        var i = widgets.length;

        while (i--) {
            if (widgets[i].pageId === pageId) {
                result.push(widgets[i]);
                //delete widgets[index];
                count++;
                widgets.splice(i, 1);
            }
        }
        //splice
        result = result.reverse();
        result.splice(end, 0, result.splice(start, 1)[0]);

        // insert back to original list
        widgets.push.apply(widgets, result);
        res.send(200);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var index in widgets) {
            if (widgets[index]._id === widgetId) {
                //delete widgets[index];
                widgets.splice(index, 1);
            }
        }
        res.send(200);
    }
}