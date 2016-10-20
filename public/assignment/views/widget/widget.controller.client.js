(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("WidgetChooserController", WidgetChooserController)
    /*.config(function($sceDelegateProvider) {
     $sceDelegateProvider.resourceUrlWhitelist(['**']);
     });*/

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
        vm.checkSafeHtml = checkSafeHtml;

        function init() {
            var widgetLocal = WidgetService.findWidgetByPageId(vm.pageId);
            if (widgetLocal != undefined) {
                vm.widgets = JSON.parse(JSON.stringify(widgetLocal));
            }
        }

        init();

        function checkSafeYoutubeUrl(url) {
            urlNew = url.split("/");
            urlNew = "https://www.youtube.com/embed/" + urlNew[urlNew.length - 1];
            return $sce.trustAsResourceUrl(urlNew);
        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }

    function WidgetChooserController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.setWidgetCreateFlag = setWidgetCreateFlag;

        function init() {
            WidgetService.widgetFlushMetaData();
            vm.widgetTypes = WidgetService.getWidgetTypes();
        }

        init();

        function setWidgetCreateFlag(widget) {
            widget.createFlag = true;
            WidgetService.setWidgetCreateFlag(widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
        }

        function clone(obj) {
            if (null == obj || "object" != typeof obj) return obj;
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
            }
            return copy;
        }

    }


    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widget = {};
        vm.createWidget = createWidget;

        function init() {
            vm.widgetMetaData = WidgetService.getWidgetByCreateFlag();
        }

        init();

        function createWidget(widget) {
            if (widget != undefined) {
                WidgetService.createWidget(vm.pageId, widget);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.wgid = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.buttonText = "Delete";

        function init() {
            var widgetLocal = WidgetService.findWidgetById(vm.wgid);
            if (widgetLocal != undefined) {
                vm.widget = JSON.parse(JSON.stringify(widgetLocal));
            }
        }

        init();


        function updateWidget(widget) {
            if (widget != undefined) {
                var widgetLocal = WidgetService.updateWidget(vm.wgid, vm.widget);
            }
            if (widgetLocal) {
                vm.page = JSON.parse(JSON.stringify(widgetLocal));
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            else {
                window.alert("Unable to Update");
            }

        }

        function deleteWidget() {
            if (vm.wgid != undefined) {
                WidgetService.deleteWidget(vm.wgid);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            else {
                window.alert("Unable to delete");
            }

        }


    }
})();
