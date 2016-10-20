(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init() {
            var pagesLocal = PageService.findPageByWebsiteId(vm.websiteId);
            if (pagesLocal != undefined) {
                vm.pages = JSON.parse(JSON.stringify(pagesLocal));
            }
        }

        init();
    }


    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.createPage = createPage;


        function init() {
            var pagesLocal = PageService.findPageByWebsiteId(vm.websiteId);
            if (pagesLocal != undefined) {
                vm.pages = JSON.parse(JSON.stringify(pagesLocal));
            }
        }


        init();

        function createPage(page) {
            if (page != undefined) {
                PageService.createPage(vm.websiteId, page);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }

    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {

            var pagesLocal = PageService.findPageByWebsiteId(vm.websiteId);
            if (pagesLocal != undefined) {
                vm.pages = JSON.parse(JSON.stringify(pagesLocal));
            }

            var pageLocal = PageService.findPageById(vm.pageId);
            if (pageLocal != undefined) {
                vm.page = JSON.parse(JSON.stringify(pageLocal));
            }
        }

        init();

        function updatePage(page) {
            //$scope.user = user;
            if (page != undefined) {
                var pageLocal = PageService.updatePage(vm.pageId, vm.page);
            }
            if (pageLocal) {
                vm.page = JSON.parse(JSON.stringify(pageLocal));
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
            else {
                window.alert("Unable to Update");
            }

        }

        function deletePage() {
            //$scope.user = user;
            if (vm.pageId != undefined) {
                PageService.deletePage(vm.pageId);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
            else {
                window.alert("Unable to delete");
            }

        }

    }
})();
