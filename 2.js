angular.module('app', [])
.controller('MainController', MainController)
.directive('myMenu', myMenu)
.directive('myMenuItem', myMenuItem);

function MainController() {
  this.menu = [{ name : 'Parent Company',menu:[ 
    { name : 'Corporate HQ' },
    { name : 'LE 1', menu : [{ name: 'level 2', menu: [{ name : 'level 3' ,menu : [{name : 'level4'}]}]}] },
    { name : 'LE 2',menu :[{ name : 'LE2 - CORP'},{ name : 'LE2 - PLANT 1'},{name :'LE2 - PLANT 2'},{name :'LE2 - PLANT 3'}] },]}
  ];


}

function myMenu() {
    return {
      scope : {
        myMenu : '=myMenu'
      },
      template: '<li ng-repeat="item in myMenu"><my-menu-item></my-menu-item></li>',
      link: function(scope, elem) {
      }
    }
}

myMenuItem.$inject = ['$compile'];
function myMenuItem($compile) {
    return {
      template: '<h4 ng-bind="item.name" ng-click="show($event)"></h4>',
      link: function(scope, element) {
        if (angular.isArray(scope.item.menu)) {
              element.append($compile('<ul ng-if="collapsed" my-menu="item.menu" style="list-style-type:none;"></ul>')(scope));
              
        }
        scope.show = function($event) {
          scope.collapsed = !scope.collapsed;
        }
      }
    }
}



