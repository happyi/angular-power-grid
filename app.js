var app = angular.module("app", []);

	
app.controller("mygrid", function($scope) {

	$scope.datasource = {
		header:['id','name','pass','user','desc','abc'],
		data:[[0," "," "," "," "," "]]
			};
})

app.directive('ngPaste', function($parse, $timeout){  
  return function(scope, element, attrs){
    fn = $parse(attrs['ngPaste']);
    element.on('paste', function(event){
      $timeout(function(){
        scope.$apply(function(){
          fn(scope, {$event: event});
        });
      });
    });
  };
});

app.directive('myTable', function(){  
	   return {
        scope: {
            datasource: '=',
        },
        restrict: 'AE',
		replace: true,
		template: '<table width="100%" id="table" cellspacing="0px" style="border-bottom:1px solid #ddd">'
				 +'	<tr>'
				 +'			<th ng-repeat="h in datasource.header">'
				 +'				{{h}}'
				 +'			</th>'
				 +'		</tr>'
				 +'		<tr ng-repeat="row in datasource.data track by $index">'
				 +'			<td ng-repeat="col in row track by $index">'
				 +'				<input type="text" ng-paste="paste($event)" ng-value="col" id="{{$parent.$index}}-{{$index}}">'
				 +'			</td>'
				 +'		</tr>'
				 +'	</table>',
        link: function (scope, element, attrs) {
			
			scope.paste = function(event){
		
			event = event || window.event;
			event.preventDefault();

			var clipboardData = event.clipboardData || window.clipboardData;
			var text = clipboardData.getData("text");
			if(text=='') return;
			
			var element  = event.target;
			var row  = parseInt(element.id.split("-")[0]);
			var col  = parseInt(element.id.split("-")[1]);

			
			var data = text.split(/\r?\n/);
			var addrow = data.length-scope.datasource.data.length+row;
			if(addrow>0){
				for(var i =0 ;i <addrow;i++){
					scope.datasource.data.push([i+1," "," "," "," "," "]);
				}
			}
			
			for(var i = 0;i<data.length;i++){
				var rows = data[i].split(/\s+/g);
				for(var j = 0;j<rows.length;j++){
					scope.datasource.data[row+i][col+j] = rows[j];
				}
			}
		 }
        }
    };
});