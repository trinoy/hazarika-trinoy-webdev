(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        init();
    }


    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        init();

        function createWebsite(website) {
            if (website != undefined) {
                WebsiteService.createWebsite(vm.userId, website)
                    .success(function (websites) {
                        //vm.websites = websites;
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function (data) {
                        console.log(data);
                    });

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
            WebsiteService.findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (data) {
                    console.log(data);
                });

            WebsiteService.findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        init();

        function updateWebsite(website) {
            if (website != undefined) {
                WebsiteService.updateWebsite(vm.websiteId, vm.website)
                    .success(function () {
                        //vm.website = website;
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function () {
                        console.log(data);
                    });
            }
        }

        function deleteWebsite() {
            //$scope.user = user;
            if (vm.websiteId != undefined) {
                WebsiteService.deleteWebsite(vm.websiteId)
                    .success(function (data) {
                        //vm.website = website;
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            }

        }
    }
})();
