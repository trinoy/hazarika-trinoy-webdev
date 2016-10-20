(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {
        var websites =
            [
                {"_id": "123", "name": "Facebook", "developerId": "456", "description" : "test"},
                {"_id": "234", "name": "Tweeter", "developerId": "456", "description" : "test"},
                {"_id": "456", "name": "Gizmodo", "developerId": "456", "description" : "test"},
                {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description" : "test"},
                {"_id": "678", "name": "Checkers", "developerId": "123", "description" : "test"},
                {"_id": "321", "name": "Chess", "developerId": "234", "description" : "test"}
            ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };

        return api;

        function createWebsite(userId, website) {
            website.developerId = userId;
            website._id=websites.length;
            //var _website1 = {"_id": "123", "name": website.name, "developerId": userId};
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            var websiteList = [];
            for (index in websites) {
                if (websites[index].developerId == userId) {
                    websiteList.push(websites[index]);
                }
            }
            return websiteList;
        }

        function findWebsiteById(websiteId) {
            for (index in websites) {
                if (websites[index]._id == websiteId) {
                    return websites[index];
                }
            }
        }

        function updateWebsite(websiteId, website) {
            for (index in websites) {
                if (websites[index]._id == websiteId) {
                    websites[index] = website;
                    return website;
                }
            }

        }

        function deleteWebsite(websiteId) {
            for (index in websites) {
                if (websites[index]._id == websiteId) {
                    delete websites[index];
                }
            }

        }

    }
})();




/*

 Blogger is a blog-publishing service that allows multi-user blogs with time-stamped entries. It was developed by Pyra Labs which was brough by google in 2003. Generally, the blogs are hosted by Google at the subdomain blogspot.com. Blogs can also be hosted in the registered custom domain of the user (like www.example.com). A user can have upto 100 blogs per account. He can use multiple accounts to host further
 */