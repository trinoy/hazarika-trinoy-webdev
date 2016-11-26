module.exports = function(mongoose,app) {

    var widgetSchema = require("./widget.schema.server")(mongoose);
    var widgetModel = mongoose.model("WidgetModel", widgetSchema);

    var api = {
        "createWidget": createWidget,
        "findWidgetById": findWidgetById,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        //"getWidgetTypes": getWidgetTypes,
        //"setWidgetCreateFlag": setWidgetCreateFlag,
       // "getWidgetByCreateFlag": getWidgetByCreateFlag,
       // "widgetFlushMetaData": widgetFlushMetaData,
        "reorderWidget" : reorderWidget
    };

    return api;

    function createWidget(widget) {
        return widgetModel.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return widgetModel.find({_page:pageId}).sort('seq');
    }

    function findWidgetById(widgetId) {
        //var userId = req.params.uid;
        return widgetModel.findById({_id:widgetId});
    }

    function updateWidget(widgetId,widget){
        return widgetModel.update(
            {
                _id : widgetId
            } ,

            {
                name : widget.name,
                text : widget.text,
                placeholder : widget.placeholder,
                description : widget.description,
                url : widget.url,
                width : widget.width,
                height : widget.height,
                rows : (widget.rows === undefined) ? 0 : widget.rows,
                size : (widget.size === undefined) ? 3: widget.size,
                class : widget.class,
                icon : widget.icon,
                deletable : widget.deletable,
                formatted : widget.formatted
            }
        )
    }

    function deleteWidget(widgetId){
        return widgetModel.remove({_id:widgetId});

    }

    function reorderWidget(pageId, start, end) {
        //return widgetModel.create(widget);
        return findAllWidgetsForPage(pageId).then(
            function(widgets){
                widgets.splice(end, 0, widgets.splice(start, 1)[0]);
                for(index in widgets){
                    widgets[index].seq = parseInt(index);
                    widgets[index].save();
                }
            }
        )
    }

};