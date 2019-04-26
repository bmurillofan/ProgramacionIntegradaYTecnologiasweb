/*************************************************************************************************
 **				                        Modulo Controller		                         		**
 **************************************************************************************************/



/*------------------------------- Area Modulo Controller --------------------------------*/
// angular.module se compone de ('Nombre del modulo',[dependencias]) Inyectables
var app = angular.module("dashboard", []);
/*------------------------------- Area Modulo Controller --------------------------------*/

/*------------------------------- Area Modulo Controller --------------------------------*/
//.controller ('Nombre Controller', directiva en function($scope)) Inyectables
app.controller('dashboard_Controller', function($scope, $timeout, $rootScope, $http, $filter) {


  /*--------------------------    Area de Declaracion     ------------------------------*/
  //*************************(  Contenido del controller )********************************
  $scope.score = {
    puntos: 0,
    name: "None"
  };

  $scope.ciudadanos = [];

  $scope.state = {
    home:true,
    other: false,
    idUser: ''
  };

  $scope.target = [];

  /*--------------------------            $gui            ------------------------------*/
  //*************************(  Ejecuciones de la pantalla )******************************
  $scope.$gui = {
    resetAll: ()=>{
      $scope.state.other = false;
      $scope.state.home = true;
      $scope.target = [];
      $scope.score.puntos = 0;
      $scope.$gui.consultaPuntos(sessionState);
    },
    consultarOther: id => {
      $scope.state.other = true;
      $scope.state.home = false;
      $scope.target = [];
      $scope.score.puntos = 0;

      var dataService = $http({
        method: 'GET',
        url: 'http://localhost:8084/EnSusManos/v1/eventos/ciudadano',
        params: {
          id: Number(id)
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      dataService.then(function(response) {
        angular.forEach(response.data, function(value) {
          $scope.target.push({
            fechaevento: $filter('date')(new Date(value.fechaevento),'shortDate') ,
            stuacion: value.stuacion,
            idciudadano: value.idciudadano.nombre + ' ' + value.idciudadano.apellido,
            correo: value.idciudadano.correo,
            descripcion: value.idcriterio.descripcion,
            puntuacion: Number(value.idcriterio.puntuacion)
          });
        });
        $scope.score.puntos = 0;
        angular.forEach(response.data, function(value) {
          $scope.score.puntos = $scope.score.puntos + Number(value.idcriterio.puntuacion);
        });

        $scope.score.name = $scope.target && $scope.target[0] && $scope.target[0].idciudadano ? $scope.target && $scope.target[0] && $scope.target[0].idciudadano : 'NO NAME';

      }, function(response) {
        console.log("Error 500");
      });
    },
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
        $scope.state.idUser = response.data[0].id;
        $scope.$gui.consultaMe();
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
    },
    consultaMe: function() {

          var dataService = $http({
            method: 'GET',
            url: 'http://localhost:8084/EnSusManos/v1/eventos/ciudadano',
            params: {
              id: Number($scope.state.idUser)
            },
            headers: {
              'Content-Type': 'application/json'
            }
          });

          dataService.then(function(response) {
            angular.forEach(response.data, function(value) {
              $scope.target.push({
                fechaevento: $filter('date')(new Date(value.fechaevento),'shortDate') ,
                stuacion: value.stuacion,
                idciudadano: value.idciudadano.nombre + ' ' + value.idciudadano.apellido,
                correo: value.idciudadano.correo,
                descripcion: value.idcriterio.descripcion,
                puntuacion: Number(value.idcriterio.puntuacion)
              });
            });
            $scope.score.puntos = 0;
            angular.forEach(response.data, function(value) {
              $scope.score.puntos = $scope.score.puntos + Number(value.idcriterio.puntuacion);
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
