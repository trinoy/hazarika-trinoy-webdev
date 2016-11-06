(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetById": findWidgetById,
            "findWidgetByPageId": findWidgetByPageId,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getWidgetTypes": getWidgetTypes,
            "setWidgetCreateFlag": setWidgetCreateFlag,
            "getWidgetByCreateFlag": getWidgetByCreateFlag,
            "widgetFlushMetaData": widgetFlushMetaData,
            "sort" : sort
        };

        return api;


        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            return $http.post("/api/page/"+pageId+"/widget", widget);
        }

        function findWidgetByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        function getWidgetTypes() {
            var url = "/api/widget/widtype";
            return $http.get(url);
        }

        function getWidgetCount() {
            var url = "/api/widget/widlen";
            return $http.get(url);
        }

        function setWidgetCreateFlag(widgetId) {
            var url = "/api/widget/widgetFlag/" + widgetId;
            return $http.post(url);
        }

        function getWidgetByCreateFlag() {
            var url = "/api/widget/widgetFlag";
            return $http.get(url);
        }

        function widgetFlushMetaData() {
            var url = "/api/widget/widgetFlush";
            return $http.get(url);
        }

        function sort(index1,index2,pageId) {
            console.log("sort called");
            var url = "/api/page/"+pageId+"/widget?initial="+index1+"&final="+index2;
            return $http.put(url);
        }
    }
})();
