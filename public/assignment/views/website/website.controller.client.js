(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        //vm.websiteId = $routeParams["wid"];

        function init() {
            vm.websites = JSON.parse(JSON.stringify(WebsiteService.findWebsitesByUser(vm.userId)));
        }

        init();
    }


    function NewWebsiteController($routeParams,$location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = JSON.parse(JSON.stringify(WebsiteService.findWebsitesByUser(vm.userId)));
        }

        init();

        function createWebsite(website) {
            if (website != undefined) {
                WebsiteService.createWebsite(vm.userId,website);
                $location.url("/user/" + vm.userId + "/website");
            }
        }

    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = JSON.parse(JSON.stringify(WebsiteService.findWebsitesByUser(vm.userId)));
            vm.website = clone(WebsiteService.findWebsiteById(vm.websiteId));
        }

        init();


        function clone(obj) {
            if (null == obj || "object" != typeof obj) return obj;
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
            }
            return copy;
        }

        function updateWebsite(website) {
            //$scope.user = user;
            if (website != undefined) {
                var websiteLocal = WebsiteService.updateWebsite(vm.websiteId, vm.website);
            }
            if (websiteLocal) {
                vm.website = clone(websiteLocal);
                $location.url("/user/" + vm.userId + "/website");
            }
            else {
                window.alert("Unable to Update");
            }

        }

        function deleteWebsite() {
            //$scope.user = user;
            if (vm.websiteId != undefined) {
                WebsiteService.deleteWebsite(vm.websiteId);
                $location.url("/user/" + vm.userId + "/website");
            }
            else {
                window.alert("Unable to delete");
            }

        }

    }
})();
