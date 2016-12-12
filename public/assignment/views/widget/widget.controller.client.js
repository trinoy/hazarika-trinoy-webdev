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
            WidgetService.findWidgetByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                    //$("#wlist").sortable();
                })
                .error(function (data) {
                    console.log(data);
                });
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
                WidgetService.widgetFlushMetaData()
                .success(function (widgetTypes) {
                    vm.widgetTypes = widgetTypes;
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        init();

        function setWidgetCreateFlag(widget) {
            WidgetService.setWidgetCreateFlag(widget._id)
                .success(function (widgetTypes) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
                })
                .error(function (data) {
                    console.log(data);
                });

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
            WidgetService.getWidgetByCreateFlag()
                .success(function (widgetTypes) {
                    vm.widgetMetaData = widgetTypes;
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        init();

        function createWidget(widget) {
            if (widget != undefined) {
                if(!widget.name){
                    vm.error = "Widget Name is Mandatory";
                    return;
                }
                WidgetService.createWidget(vm.pageId, widget)
                    .success(function (widget) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function (data) {
                        console.log(data);
                    });
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
            var widgetLocal = WidgetService.findWidgetById(vm.wgid)
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        init();


        function updateWidget(widget) {
            if (widget != undefined) {
                if(!widget.name){
                    vm.error = "Widget Name is Mandatory";
                    return;
                }
                WidgetService.updateWidget(vm.wgid, vm.widget)
                    .success(function (widget) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId +
                         "/widget");
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            }
        }

        function deleteWidget() {
            if (vm.wgid != undefined) {
                WidgetService.deleteWidget(vm.wgid)
                    .success(function (widget) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            }
        }
    }
})();
