(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages =
            [
                {"_id": "321", "name": "Post 1", "title": "Demo Page Title 1", "websiteId": "321"},
                {"_id": "432", "name": "Post 2", "title": "Demo Page Title 2", "websiteId": "456"},
                {"_id": "543", "name": "Post 3", "title": "Demo Page Title 3", "websiteId": "456"},
                {"_id": "123", "name": "Post 3", "title": "Demo Page Title 4", "websiteId": "789"}
            ];

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
            page._id = pages.length;
            //var _website1 = {"_id": "123", "name": page.name, "developerId": pageId};
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var pageList = [];
            for (index in pages) {
                if (pages[index].websiteId == websiteId) {
                    pageList.push(pages[index]);
                }
            }
            return pageList;
        }

        function findPageById(pageId) {
            for (index in pages) {
                if (pages[index]._id == pageId) {
                    return pages[index];
                }
            }
        }

        function updatePage(pageId, page) {
            for (index in pages) {
                if (pages[index]._id == pageId) {
                    pages[index] = page;
                    return page;
                }
            }

        }

        function deletePage(pageId) {
            for (index in pages) {
                if (pages[index]._id == pageId) {
                    delete pages[index];
                }
            }

        }

    }
})();


/*

 Blogger is a blog-publishing service that allows multi-user blogs with time-stamped entries. It was developed by Pyra Labs which was brough by google in 2003. Generally, the blogs are hosted by Google at the subdomain blogspot.com. Blogs can also be hosted in the registered custom domain of the user (like www.example.com). A user can have upto 100 blogs per account. He can use multiple accounts to host further
 */