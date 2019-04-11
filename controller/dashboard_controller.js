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
        url: 'http://localhost:8084/EnSusManos-1.0.0/v1/ciudadano',
        data: {
          correo: id,
          contrasenia: pass
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      dataService.then(function(response) {
        if (response.data.data == 'Usuario o contraseña invalidos.') {
          $scope.logStatus.init = true;
          $timeout(function() {
            $scope.logStatus.init = false;
          }, 2000);
        } else {
          document.cookie = "session=true";
          window.location.replace("http://localhost:8081/examples/dashboard.html");
        }
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
