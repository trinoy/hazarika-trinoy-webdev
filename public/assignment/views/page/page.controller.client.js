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
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (data) {
                    console.log(data);
                });
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
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (data) {
                    console.log(data);
                });
        }


        init();

        function createPage(page) {
            if (page != undefined) {
                if(!page.name){
                    vm.error = "Page Name is Mandatory";
                    return;
                }
                PageService.createPage(vm.websiteId, page)
                    .success(function (page) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function (data) {
                        console.log(data);
                    });

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

            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (data) {
                    console.log(data);
                });

            PageService.findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        init();

        function updatePage(page) {
            //$scope.user = user;
            if (page != undefined) {
                if(!page.name){
                    vm.error = "Page Name is Mandatory";
                    return;
                }
                var pageLocal = PageService.updatePage(vm.pageId, vm.page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function () {
                        console.log(data);
                    });
            }
        }

        function deletePage() {
            //$scope.user = user;
            if (vm.pageId != undefined) {
                PageService.deletePage(vm.pageId)
                    .success(function (data) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            }
        }
    }
})();
