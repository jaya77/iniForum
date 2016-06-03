// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCkeditor','ngSanitize','starter.controllers', 'starter.services','ngCookies','angular.filter','ngStorage'])

.run(function($ionicPlatform,$rootScope,$cookieStore,$localStorage,$state,$stateParams) {

    $rootScope.checkLogin= function(){
        if($localStorage.username != null){
           $state.go('app/kategori');
        }
    };

    //$rootScope.checkLogin();
    $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
      if ($localStorage.username != null && $localStorage.hasLogin == null) {
        //$cookieStore.put('hasLogin','1');
        $localStorage.hasLogin = '1';
        setTimeout(function(){$state.go('app.kategori');},1000);
        //console.log('wow');
      }else{
        //$state.go('login');
      }
    });



  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url:'/login',
      templateUrl:'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

    .state('app.ckeditor', {
      url: '/ckeditor',
      views: {
        'menuContent': {
          templateUrl: 'templates/ckeditor.html'
        }
      }
    })

    .state('app.latest',{
      url:'/latest',
      views: {
        'menuContent':{
          templateUrl: 'templates/latest.html'
        }
      }
    })

    .state('app.artikel',{
      url:'/artikel',
      views: {
        'menuContent':{
          templateUrl: 'templates/artikel.html',
          controller: 'artikelCtrl'
        }
      }
    })

    .state('app.bantuan',{
      url:'/bantuan',
      views: {
        'menuContent':{
          templateUrl: 'templates/bantuan.html',
          controller: 'bantuanCtrl'
        }
      }
    })

    .state('app.posting',{
     url:'/posting',
      views:{
        'menuContent':{
          templateUrl: 'templates/posting.html',
          controller:'postingCtrl'
        }
      }
    })

    .state('app.buatposting',{
      url:'/buatposting',
      views:{
        'menuContent':{
          templateUrl: 'templates/buatposting.html',
          controller:'buatpostingCtrl'
        }
      }
    })


    .state('app.member',{
      url:'/member',
      views:{
        'menuContent':{
          templateUrl: 'templates/member.html',
          controller: 'memberCtrl'
        }
      }
    })

    .state('app.register',{
      url:'/register',
      views:{
        'menuContent':{
          templateUrl:'templates/register.html',
          controller: 'registerCtrl'
        }
      }
    })


    .state('app.kategori',{
      url:'/kategori',
      views:{
        'menuContent':{
          templateUrl: 'templates/kategori.html',
          controller: 'kategoriCtrl'
        }
      }
    })

    .state('app.kategoridetail',{
      url:'/kategori/:kategoriId',
      views:{
        'menuContent':{
          templateUrl: 'templates/kategoridetail.html',
          controller: 'kategoridetailCtrl'
        }
      }
    })

    .state('app.postingdetail',{
      url:'/kategori/:kategoriId/:postingId',
      views:{
        'menuContent':{
          templateUrl: 'templates/postingdetail.html',
          controller: 'postingdetailCtrl'
        }
      }
    })


    .state('app.keluar',{
      url:'/keluar',
      views:{
        'menuContent':{
          controller : 'logoutCtrl'
        }
      }
    })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

    .state('app.adminartikel', {
      url: '/adminartikel',
      views: {
        'menuContent': {
          templateUrl: 'templates/adminartikel.html',
          controller: 'adminartikelCtrl'
        }
      }
    })

    .state('app.buatartikel', {
      url: '/buatartikel',
      views: {
        'menuContent': {
          templateUrl: 'templates/buatartikel.html',
          controller: 'buatartikelCtrl'
        }
      }
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

    .state('app.adminkategori',{
      url:'/adminkategori',
      views:{
        'menuContent':{
          templateUrl: 'templates/adminkategori.html',
          controller: 'adminkategoriCtrl'
        }
      }
    })

    .state('app.adminmember',{
      url:'/adminmember',
      views:{
        'menuContent':{
          templateUrl:'templates/adminMember.html',
          controller: 'adminmemberCtrl'
        }
      }
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
