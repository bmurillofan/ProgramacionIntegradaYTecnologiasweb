/*************************************************************************************************
 **				                        Modulo Controller		                         		**
 **************************************************************************************************/



/*------------------------------- Area Modulo Controller --------------------------------*/
// angular.module se compone de ('Nombre del modulo',[dependencias]) Inyectables
var app = angular.module("home", []);
/*------------------------------- Area Modulo Controller --------------------------------*/

/*------------------------------- Area Modulo Controller --------------------------------*/
//.controller ('Nombre Controller', directiva en function($scope)) Inyectables
app.controller('home_Controller', function($scope, $timeout, $rootScope, $http) {


  /*--------------------------    Area de Declaracion     ------------------------------*/
  //*************************(  Contenido del controller )********************************
  $scope.logStatus = {
    init: false,
    onLogin: false
  };


  /*--------------------------            $gui            ------------------------------*/
  //*************************(  Ejecuciones de la pantalla )******************************
  $scope.$gui = {
    login: function(id, pass) {

      var dataService = $http({
        method: 'POST',
        url: 'http://localhost:8084/EnSusManos/v1/ciudadano',
        data: {
          correo: id,
          contrasenia: pass
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      dataService.then(function(response) {
        $scope.logStatus.onLogin = false;
        if (response && response.data && response.data.tokenSession) {
          document.cookie = "session=true";
          document.cookie = "correo=" + $scope.usuarioID;
          window.location.replace("http://localhost:8081/examples/dashboard.html");
        } else {
          $scope.logStatus.init = true;
          $timeout(function() {
            $scope.logStatus.init = false;
          }, 2000);
        }
      }, function(response) {
        $scope.logStatus.onLogin = true;
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
  //Ejemplo de ejecucion

  // /**
  //  * Request GET
  //  */
  // $scope.$api.consultaGet();

  // /**
  //  * Request POST
  //  */
  // $scope.$api.consultaPost();
  /*--------------------------            Arranque         ------------------------------*/

})
/*---------------------------------------------Area Modulo Controller-----------------------------------------------*/

//************************************************************************************************************************
