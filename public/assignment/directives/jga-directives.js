(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        console.log("Hello from Sortable");


        return {
            scope :{},
            link:linker,
            controller:sortableController,
            controllerAs : 'sortableController'
        }

        function sortableController(WidgetService) {
            var vm =this;
            vm.sort = sort;

            function sort(start,end,pageId) {
                console.log([start,end,pageId]);
                WidgetService.sort(start,end,pageId);
            }
        }

        function  linker(scope,element,attributes) {
            console.log("Hello from Sortable");
            pageId = attributes.jgaSortable;
            model1 = scope.$parent.model;
            //console.log(pageId);
            element.
            sortable({
                start : function(event,ui){
                    console.log(pageId);
                    start = $(ui.item).index();
                },

                stop : function(event,ui){
                    end = $(ui.item).index();
                    scope.sortableController.sort(start,end,pageId);
                }
            });
        }
    }
})();