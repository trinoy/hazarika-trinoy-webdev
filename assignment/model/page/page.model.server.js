module.exports = function(mongoose,app) {

    var pageSchema = require("./page.schema.server")(mongoose);
    var pageModel = mongoose.model("PageModel", pageSchema);

    var api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "deletePage": deletePage
    };

    return api;

    function createPage(page) {
        return pageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return pageModel.find({_website:websiteId});
    }

    function findPageById(PageId) {
        //var userId = req.params.uid;
        return pageModel.findById({_id:PageId});
    }

    function updatePage(PageId,page){
        return pageModel.update(
            {
                _id : PageId
            } ,

            {
                name: page.name,
                description : page.description
            }
        )
    }

    function deletePage(PageId){
        return pageModel.remove({_id:PageId});

    }

};