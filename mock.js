//
// Route
//
var routes = [
  {
    id: '33',

  }
]

angular.extend(routes[0], {

});

$httpBackend.whenGET(/mock\/routes([^\/]+)?$/)
            .respond(function(method, url, data, headers) {
              $log.debug(method, url);
              return [200, routes];
            });

$httpBackend.whenGET(/mock\/routes\/([^\/]+)$/)
            .respond(function(method, url, data, headers) {
              $log.debug(method, url);
              return [200, routes[0]];
            });

$httpBackend.whenPUT(/mock\/routes\/([^\/]+)$/)
            .respond(function(method, url, data, headers) {
              data = JSON.parse(data);
              data = angular.extend(routes[0], data);
              $log.debug(method, url);
              return [200, routes[0]];
            });

var savedData;
$httpBackend.whenPOST(/mock\/routes$/)
            .respond(function(method, url, data, headers) {
              data = JSON.parse(data);
              savedData = angular.extend(routes[0], data, {id: randomID()});
              $log.debug(method, url);
              return [200, routes[0]];
            });

$httpBackend.whenDELETE(/mock\/routes\/(.+)/)
            .respond(function(method, url, data, headers) {
              $log.debug(method, url);
              return [204];
            });
