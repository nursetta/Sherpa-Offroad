
angular.module('ProductInfo')
.config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LogInCtrl'
      })
      .when('/4runner-products', {
        templateUrl: 'templates/4runner-products.html',
        controller: '4RunnerProductsCtrl'
      })
      .when('/fj-cruiser-products', {
        templateUrl: 'templates/fj-cruiser-products.html',
        controller: 'FjCruiserProductsCtrl'
      })
      .when('/gx-460-products', {
        templateUrl: 'templates/gx-460-products.html',
        controller: 'GX460ProductsCtrl'
      })
      .when('/gx-470-products', {
        templateUrl: 'templates/gx-470-products.html',
        controller: 'GX470ProductsCtrl'
      })
      .when('/colorado-products', {
        templateUrl: 'templates/colorado-products.html',
        controller: 'ColoradoProductsCtrl'
      })
      .when('/the-armory', {
        templateUrl: 'templates/the-armory.html',
        controller: 'TheArmoryCtrl'
      })
      .when('/toughdog-suspension', {
        templateUrl: 'templates/toughdog-suspension.html',
        controller: 'ToughDogSuspensionCtrl'
      })
      .when('/treaty-oak-recovery', {
        templateUrl: 'templates/treaty-oak-recovery.html',
        controller: 'TreatyOakRecoveryCtrl'
      })
      .when('/add-products', {
        templateUrl: 'templates/add-products.html',
        controller: 'AddProductsCtrl'
      })
      .when('/all-products', {
        templateUrl: 'templates/all-products.html',
        controller: 'AllProductsCtrl'
      })
      .when('/add-image', {
        templateUrl: 'templates/add-image.html',
        controller: 'AddImageCtrl2'
      })
      .when('/product/:id', {
        templateUrl: 'templates/product-show.html',
        controller: 'ShowProductCtrl'
      });
});

// 
// PRODUCT SERVICE
// 
angular.module('ProductInfo')
 .factory('ProductService', function($resource){
    return $resource('/api/product/', null,
      {'get':   {method:'GET', isArray:true},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}
      });
  });

// 
// SIGNATURE SERVICE
// 
angular.module('ProductInfo')
 .factory('SignatureService', function($resource){
    var data = $resource('./sign_s3', null,
      { 'get':    {method:'GET', isArray:false},
        'save':   {method:'POST'},
        'query':  {method:'GET', isArray:false},
        'remove': {method:'DELETE'},
        'delete': {method:'DELETE'}
    });
    return data;
});

// 
// IMAGE SERVICE
// 
angular.module('ProductInfo')
 .factory('ImageService', function($resource, $http){
    var data = $resource('https://sherpa-offroad-image-upload.s3.amazonaws.com/', null,
      { 'get':    {method:'GET', isArray:true},
        'save':   {method:'POST'},
        'query':  {method:'GET', isArray:true},
        'remove': {method:'DELETE'},
        'delete': {method:'DELETE'}
    });
    return data;
});

// 
// PRODUCT UPDATE SERVICE
// 
angular.module('ProductInfo')
 .factory('ProductUpdateService', function($resource){
    return $resource('/api/products/:id', null,
      {'get':   {method:'GET', isArray:false},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray:false},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}
      });
  });

angular.module('ProductInfo')
  .controller('ProductUpdateCtrl', function ($scope, ProductUpdateService, ProductService, $routeParams) {
    console.log("In Product Update Controller");
    $scope.update = function() {
      ProductUpdateService.update({id: $routeParams.id}, {product_info: $scope.newProduct.product_info});
      window.location.assign('/#/api/products/' + $routeParams.id);
    };

  });

angular.module('ProductInfo')
  .controller('ShowProductCtrl', function ($scope, ProductUpdateService, ProductService, $routeParams) {
    console.log("In ShowProductCtrl");
      $scope.product = ProductUpdateService.get({id: $routeParams.id});
      console.log($scope.product);
      // $scope.description = $scope.product;
      // console.log($scope.description);
// 
  });        

angular.module('ProductInfo')
.controller('HomeCtrl', function ($scope, ProductService, $routeParams) {
    $('.navbar-collapse a:not(.nav-toyota, .nav-lexus, .nav-cheverolet)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    console.log("In HomeCtrl");
    $scope.sendEmail = function() { 
      window.alert("In sendEmail Function");
    };
});

angular.module('ProductInfo')
.controller('4RunnerProductsCtrl', function ($scope, ProductService, $routeParams) {
    $('.navbar-collapse a:not(.nav-toyota, .nav-lexus, .nav-cheverolet)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    console.log("In 4RunnerProductsCtrl");
});

angular.module('ProductInfo')
.controller('FjCruiserProductsCtrl', function ($scope, ProductService, $routeParams) {
    $('.navbar-collapse a:not(.nav-toyota, .nav-lexus, .nav-cheverolet)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    console.log("In FjCruiserProductsCtrl");
});

angular.module('ProductInfo')
.controller('GX460ProductsCtrl', function ($scope, ProductService, $routeParams) {
    $('.navbar-collapse a:not(.nav-toyota, .nav-lexus, .nav-cheverolet)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    console.log("In GX460ProductsCtrl");
});

angular.module('ProductInfo')
.controller('GX470ProductsCtrl', function ($scope, ProductService, $routeParams) {
    $('.navbar-collapse a:not(.nav-toyota, .nav-lexus, .nav-cheverolet)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    console.log("In GX470ProductsCtrl");
});

angular.module('ProductInfo')
.controller('ColoradoProductsCtrl', function ($scope, ProductService, $routeParams) {
    $('.navbar-collapse a:not(.nav-toyota, .nav-lexus, .nav-cheverolet)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    console.log("In ColoradoProductsCtrl");
});

angular.module('ProductInfo')
.controller('TheArmoryCtrl', function ($scope, ProductService, $routeParams) {
    $('.navbar-collapse a:not(.nav-toyota, .nav-lexus, .nav-cheverolet)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    console.log("TheArmoryCtrl");
});

angular.module('ProductInfo')
.controller('ToughDogSuspensionCtrl', function ($scope, ProductService, $routeParams) {
    $('.navbar-collapse a:not(.nav-toyota, .nav-lexus, .nav-cheverolet)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    console.log("In ToughDogSuspensionCtrl");
});
angular.module('ProductInfo')
.controller('TreatyOakRecoveryCtrl', function ($scope, ProductService, $routeParams) {
    $('.navbar-collapse a:not(.nav-toyota, .nav-lexus, .nav-cheverolet)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    console.log("In TreatyOakRecoveryCtrl");
});



angular.module('ProductInfo')
.controller('AddProductsCtrl', function ($scope, ProductService, $routeParams) {
    $('.navbar-collapse a:not(.nav-toyota, .nav-lexus, .nav-cheverolet)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    $scope.submit = {};
      $scope.submit = function() {
        console.log($scope.newProduct);
        ProductService.save($scope.newProduct, function(product, headers) {
            window.alert("product is saved");
            // window.location.assign('/api/product/');
        });
    };
});

angular.module('ProductInfo')
.controller('AllProductsCtrl', function ($scope, ProductService, $routeParams) {
    console.log("In AllProductsCtrl");
    $scope.product = ProductService.query(); 
    // console.log($scope.product);

});

angular.module('ProductInfo')
.controller('AddImageCtrl2', function ($scope, ImageService, SignatureService, ProductService, $routeParams, Upload, $http) {
  
    console.log("In AddImageCtrl2");

    $scope.signatureCreate = {};
    $scope.signatureCreate = SignatureService.query(); 
    // console.log($scope.signatureCreate);

    $scope.submit = {};
    $scope.submit = function() {
        ProductService.save($scope.newProduct, function(product, headers) {
            $scope.newProduct.product_info.image_url = $scope.image_url;
            window.alert("product is saved");
            console.log($scope.newProduct);
            window.location.assign('/#/all-products');
        });
    };

    $scope.onImageUpload = function() {
        $scope.newProduct.product_info.image_url = $scope.image_url;
        // console.log($scope.newProduct);
    };
     

    $scope.onFileSelect = function(file) {    
      $scope.signature = $scope.signatureCreate.signature;
        // console.log("signature = " + $scope.signature);
      $scope.policyBase64 = $scope.signatureCreate.policy;
        // console.log("policy = " + $scope.policyBase64);
      $scope.date = $scope.signatureCreate.date;
        // console.log("date = " + $scope.date);
      $scope.credentials = $scope.signatureCreate.credentials;
        // console.log("credentials = " + $scope.credentials);
      $scope.expiration = $scope.signatureCreate.expiration;
      // console.log("expiration = " + $scope.expiration);
      $scope.awsAuthId = $scope.signatureCreate.awsAuthId;
      // console.log("awsAuthId = " + $scope.awsAuthId);
      $scope.awsAuthSecret = $scope.signatureCreate.awsAuthSecret;
      // console.log("awsAuthSecret = " + $scope.awsAuthSecret);

      if (file.length > 0) {
        var filename = file[0].name;
        var type = file[0].type;
        var query = {
            filename: filename,
            type: type
        };

    // console.log("In sendTasks Function");
    console.log(file);
    file.upload = Upload.upload({
      url: 'https://sherpa-offroad-image-upload.s3.amazonaws.com/',
        method: 'POST',
        data: {
          key: 'public/${filename}',
          acl: 'public-read',
          policy: $scope.policyBase64,
          'x-amz-server-side-encryption': "AES256",
          'x-amz-credential': $scope.credentials,
          'x-amz-algorithm': "AWS4-HMAC-SHA256",
          'x-amz-date': $scope.date,
          'x-amz-meta-tag': "",
          'x-amz-Signature': $scope.signature,
          success_action_status: 201,
          'Content-Type': 'image/',
          file: file[0]
        }
      });

      file.upload.progress(function(evt) {
          console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
      })
      .success(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
          var parseXml;

          if (typeof window.DOMParser != "undefined") {
              parseXml = function(xmlStr) {
                  return new window.DOMParser().parseFromString(xmlStr, "text/xml");
              };
              var xml = parseXml(data);
              var locationNode = xml.documentElement.childNodes[0].textContent;
              $scope.image_url = locationNode;
              $scope.toString(locationNode);
              // console.log($scope.image_url);
          } 
          else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
              parseXml = function(xmlStr) {
                  var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                  xmlDoc.async = "false";
                  xmlDoc.loadXML(xmlStr);
                  return xmlDoc;
              };
              var xml2 = parseXml(data);
              var locationNode2 = xml2.documentElement.childNodes[0].textContent;
              // alert(locationNode);
              $scope.image_url = locationNode2;
              console.log($scope.image_url);
              } 
          else {
              throw new Error("No XML parser found");
          }
      })
      .error(function(data, status, headers, config) {
      });
    }
  };
});