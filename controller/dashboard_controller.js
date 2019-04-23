/*************************************************************************************************
 **				                        Modulo Controller		                         		**
 **************************************************************************************************/



/*------------------------------- Area Modulo Controller --------------------------------*/
// angular.module se compone de ('Nombre del modulo',[dependencias]) Inyectables
var app = angular.module("dashboard", []);
/*------------------------------- Area Modulo Controller --------------------------------*/

/*------------------------------- Area Modulo Controller --------------------------------*/
//.controller ('Nombre Controller', directiva en function($scope)) Inyectables
app.controller('dashboard_Controller', function($scope, $timeout, $rootScope, $http) {


  /*--------------------------    Area de Declaracion     ------------------------------*/
  //*************************(  Contenido del controller )********************************
  $scope.score = {
    puntos: 0,
    name: "None"
  };

  $scope.ciudadanos = [];

  /*--------------------------            $gui            ------------------------------*/
  //*************************(  Ejecuciones de la pantalla )******************************
  $scope.$gui = {
    consultaPuntos: function(correo) {

      var dataService = $http({
        method: 'GET',
        url: 'http://localhost:8084/EnSusManos/v1/ciudadanos',
        params: {
          correo: correo
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      dataService.then(function(response) {
        $scope.score.puntos = Number(response.data[0].puntajeTotal);
        $scope.score.name = response.data[0].nombre;
      }, function(response) {
        console.log("Error 500");
      });
    },
    consultaCiudadanos: function() {

      var dataService = $http({
        method: 'GET',
        url: 'http://localhost:8084/EnSusManos/v1/ciudadanos',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      dataService.then(function(response) {
        angular.forEach(response.data, function(value) {
          $scope.ciudadanos.push({
            id: value.id,
            nombre: value.nombre
          });
        });
      }, function(response) {
        console.log("Error 500");
      });
    }
  };
  //**************************************************************************************
  /*--------------------------            $gui            ------------------------------*/





  /*--------------------------           $tools           ------------------------------*/
  //************************* (    Ejecuciones Simples  ) ********************************
  $scope.$tools = {
    ejemplo: function() {
      $scope.variable = "Nuevo Valor Tools";
    }
  };
  //**************************************************************************************
  /*--------------------------           $tools           ------------------------------*/





  /*--------------------------        $complexSystem      ------------------------------*/
  //*************************(    Ejecuciones Complejas ) ********************************
  $scope.$complexSystem = {
    ejemplo: function() {
      $scope.variable = "Nuevo Valor Complejo";
    }
  };
  //**************************************************************************************
  /*--------------------------        $complexSystem      ------------------------------*/





  /*--------------------------            Arranque         ------------------------------*/
  let sessionState = document.cookie.split(';').length != 0 && document.cookie.split(';')[1] && document.cookie.split(';')[1].includes('correo') && document.cookie.split(';')[1].split('=').length == 2 ? document.cookie.split(';')[1].split('=')[1] : '';
  $scope.$gui.consultaPuntos(sessionState);
  $scope.$gui.consultaCiudadanos();
  /*--------------------------            Arranque         ------------------------------*/

})
/*---------------------------------------------Area Modulo Controller-----------------------------------------------*/

//************************************************************************************************************************
