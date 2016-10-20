(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
        var widgets =
            [
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


        var api = {
            "createWidget": createWidget,
            "findWidgetById": findWidgetById,
            "findWidgetByPageId": findWidgetByPageId,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getWidgetTypes": getWidgetTypes,
            "setWidgetCreateFlag": setWidgetCreateFlag,
            "getWidgetByCreateFlag": getWidgetByCreateFlag,
            "widgetFlushMetaData": widgetFlushMetaData
        };

        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widget._id = widgets.length;
            //var _website1 = {"_id": "123", "name": widget.name, "developerId": pageId};
            widgets.push(widget);
        }

        function findWidgetByPageId(pageId) {
            var widgetList = [];
            for (index in widgets) {
                if (widgets[index].pageId == pageId) {
                    widgetList.push(widgets[index]);
                }
            }
            return widgetList;
        }

        function findWidgetById(widgetId) {
            for (index in widgets) {
                if (widgets[index]._id == widgetId) {
                    return widgets[index];
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for (index in widgets) {
                if (widgets[index]._id == widgetId) {
                    widgets[index] = widget;
                    return widget;
                }
            }
        }

        function deleteWidget(pageId) {
            for (index in widgets) {
                if (widgets[index]._id == pageId) {
                    delete widgets[index];
                }
            }
        }

        function getWidgetTypes() {
            return JSON.parse(JSON.stringify(widgetsTypes));
        }

        function getWidgetCount() {
            return widgets.length;
        }

        function setWidgetCreateFlag(widget) {
            for (index in widgetsTypes) {
                if (widgetsTypes[index]._id == widget._id) {
                    widgetsTypes[index] = widget;
                    return JSON.parse(JSON.stringify(widgetsTypes));
                }
            }
        }

        function getWidgetByCreateFlag() {
            for (index in widgetsTypes) {
                if (widgetsTypes[index].createFlag == true) {
                    return JSON.parse(JSON.stringify(widgetsTypes[index]));
                }
            }
        }

        function widgetFlushMetaData() {
            widgetsTypes =
                [
                    {"_id": "1", "widgetType": "HEADER", "text": "header", "createFlag": false},
                    {"_id": "2", "widgetType": "YOUTUBE", "text": "youtube", "createFlag": false},
                    {"_id": "3", "widgetType": "IMAGE", "text": "image", "createFlag": false},
                    {"_id": "4", "widgetType": "HTML", "text": "html", "createFlag": false}
                ];
        }
    }
})();


/*

 Blogger is a blog-publishing service that allows multi-user blogs with time-stamped entries. It was developed by Pyra Labs which was brough by google in 2003. Generally, the blogs are hosted by Google at the subdomain blogspot.com. Blogs can also be hosted in the registered custom domain of the user (like www.example.com). A user can have upto 100 blogs per account. He can use multiple accounts to host further
 */