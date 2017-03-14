(function(){

NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService){
    var narrowit = this;
    narrowit.click = function(searchItem){
        if (searchItem){
            var promise = MenuSearchService.getMatchedMenuItems(searchItem);
            promise.then(function(respose){
                narrowit.found = respose;
            });            
        } else {
            narrowit.found = [];
        }

    }
    narrowit.removeItem = function(index){
        narrowit.found.splice(index,1);
    }
}

MenuSearchService.$inject = ['$http'];    
function MenuSearchService($http){
    var searchservice = this;
    searchservice.getMatchedMenuItems = function(searchItem){
        return $http({
                    url: "https://davids-restaurant.herokuapp.com/menu_items.json"
                }).then(function(result){
                    var foundItem = [];
                    result.data.menu_items.forEach(function(eachitem){
                        if(eachitem.description.indexOf(searchItem) >=0){
                            foundItem.push(eachitem);
                        }
                    })
                    return foundItem;
                })
        }
}    

function foundItemsDirectiveCtrl(){
    
}     
function foundItemsDirective(){
    var DDO = {
        restrict: "E",
        templateUrl: "view/foundItem.html",
        controller: foundItemsDirectiveCtrl,
        controllerAs: "found",
        bindToController:true,
        scope:{
            foundItems: "<",
            onRemove: "&"
        }
    }
    return DDO;
}
    
angular
    .module("NarrowItDownApp",[])
    .controller("NarrowItDownController",NarrowItDownController)
    .service("MenuSearchService",MenuSearchService)
    .directive("foundItems",foundItemsDirective);
})();