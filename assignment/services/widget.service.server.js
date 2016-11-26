module.exports = function (app, model) {

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

    var widgetsTypes =
        [
            {"_id": "1", "widgetType": "HEADER", "text": "header", "createFlag": false},
            {"_id": "2", "widgetType": "YOUTUBE", "text": "youtube", "createFlag": false},
            {"_id": "3", "widgetType": "IMAGE", "text": "image", "createFlag": false},
            {"_id": "4", "widgetType": "HTML", "text": "html", "createFlag": false},
            {"_id": "5", "widgetType": "TEXT", "text": "text", "createFlag": false}
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
        //widget._id = (widgetId === "new") ? (new Date()).getTime().toString() : widgetId;
        widget.name = name;
        widget.text = text;
        widget.widgetType = "IMAGE";
        widget._page = pageId;
        widget.width = width;
        widget.url = (myFile === undefined) ? url : newFileName;

        if (widgetId === "new") {
            model.widgetModel.createWidget(widget)
                .then(function (widget) {
                        //res.send(widget);
                    },
                    function (error) {
                        res.sendStatus(400).send(err);

                    }
                )
        }
        else {
            model.widgetModel.updateWidget(widgetId, widget)
                .then(function (widget) {
                       // res.send(widget);
                    },
                    function (error) {
                        res.sendStatus(400).send(err);

                    }
                )
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
        var pageId = req.params.pageId;
        widget._page = pageId;
        model.widgetModel.createWidget(widget)
            .then(function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400).send(err);

                }
            )
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        model.widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.sendStatus(400).send(err);

                }
            )
    }


    function findWidgetById(req, res) {
        //var userId = parseInt(req.params.uid);
        var widgetId = req.params.widgetId;
        model.widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                    if (widget) {
                        res.send(widget);
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


    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;

        model.widgetModel.updateWidget(widgetId, widget)
            .then(function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400).send(err);

                }
            )
    }


    function updateWidgets(req, res) {
        var start = req.query.initial;
        var end = req.query.final;
        var pageId = req.params.pageId;

        model.widgetModel.reorderWidget(pageId,start,end)
            .then(function (data) {
                    res.send(200)
                },
                function (error) {
                    res.sendStatus(400).send(err);
                }
            )
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel.deleteWidget(widgetId)
            .then(function (widget) {
                    if (widget) {
                        res.send(widget);
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
}