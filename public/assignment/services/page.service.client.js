(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService($http) {


        var api = {
            "createPage": createPage,
            "findPageById": findPageById,
            "findPageByWebsiteId": findPageByWebsiteId,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            return $http.post("/api/website/"+websiteId+"/page", page);
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();


/*

 Blogger is a blog-publishing service that allows multi-user blogs with time-stamped entries. It was developed by Pyra Labs which was brough by google in 2003. Generally, the blogs are hosted by Google at the subdomain blogspot.com. Blogs can also be hosted in the registered custom domain of the user (like www.example.com). A user can have upto 100 blogs per account. He can use multiple accounts to host further
 */