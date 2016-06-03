angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal,$cookieStore,$localStorage, $timeout) {

    $scope.namauser = $localStorage.username
    var aksesId = $localStorage.akses;
    switch(aksesId){
      case '1' : $scope.akses = 'User';break;
      case '2' : $scope.akses = 'Administrator'; break;
      default: $scope.akses = 'aduh';
  }


    //menu

    $scope.menuList = [
      {
        href: '#/app/latest',
        labels:'latest',
        icon: 'ion-clock',
        show: aksesId == '1' ? true : false
      },
      {
        href: '#/app/artikel',
        labels:'Artikel',
        icon: 'ion-clock',
        show: aksesId == '1' ? true : false
      },
      {
        href: '#/app/kategori',
        labels:'Kategori',
        icon: 'ion-android-time',
        show: aksesId == '1' ? true : false
      },
      {
        href: '#/app/member',
        labels:'Member',
        icon: 'ion-android-people',
        show: aksesId == '1' ? true : false
      },
      {
        href:'#/app/posting',
        labels:'Posting',
        icon: 'ion-android-create',
        show: aksesId == '1' ? true : false
      },
      {
        href:'#/app/adminkategori',
        labels:'Kategori',
        icon: 'ion-ios-list-outline',
        show: aksesId == '2' ? true : false
      },
      {
        href:'#/app/adminmember',
        labels:'Member',
        icon: 'ion-person-stalker',
        show: aksesId == '2' ? true : false
      },
      {
        href:'#/app/adminartikel',
        labels:'Artikel',
        icon: 'ion-person-stalker',
        show: aksesId == '2' ? true : false
      },
      {
        href: '#/app/bantuan',
        labels:'Bantuan',
        icon: 'ion-log-out',
        show: true
      },
      {
        href: '#/app/keluar',
        labels:'Keluar',
        icon: 'ion-log-out',
        show: true
      }

    ];
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later


  // Triggered in the login modal to close it


  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('kategoriCtrl',function($scope, kategoriService){

 $scope.showData = function() {
    kategoriService.getAll().success(function(data) {
      $scope.datakategoris = data;
    });
  };

 $scope.showData();

    $scope.cek = function(tampil){
      alert(tampil.id_kategori);
    }
})

.controller('kategoridetailCtrl',function($scope, $stateParams,postService){
    $scope.showDataId = function() {
      postService.ambilSatu($stateParams.kategoriId).success(function(tampil) {
        $scope.kategori = tampil;
      });
    };

    $scope.showDataId();

    $scope.klik = function(tampil){
      alert(tampil.id_post);
    }

  })

.controller('postingCtrl', function($scope, $cookieStore){
    $scope.namauser = $cookieStore.get('username');
})

.controller('artikelCtrl', function($scope, artikelService){
  $scope.showData = function() {
      artikelService.getAll().success(function(data) {
        $scope.dataartikel = data;
      });
    };

   $scope.showData();
   

})

.controller('buatpostingCtrl', function($scope,$state,kategoriService, postService,$localStorage,$cookieStore,$ionicPopup){
    $scope.showAlert = function(msg){
      $ionicPopup.alert({
        title : msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
      });
    };

    $scope.showData = function() {
      kategoriService.getAll().success(function(data) {
        $scope.datakategoris = data;
        $scope.namauser = $cookieStore.get('username');
      });

    };

    $scope.showData();


    $scope.simpan = function(postku){

      postku.username = $localStorage.username;

      if(!postku.judul){
        $scope.showAlert({
          title: "Information",
          message: "Judul Mohon Diisi"
        });
      }else if(!postku.selectedItem){
        $scope.showAlert({
          title: "Information",
          message: "Kategori Mohon Diisi"
        });
      }else if(!postku.isi){
        $scope.showAlert({
          title: "Information",
          message: "Isi Posting Mohon Diisi"
        });
      }else if(!postku.username){
        $scope.showAlert({
          title: "Information",
          message: "Username Mohon Diisi"
        });
      }else{
        postService.simpan({
          data: postku
        }).then(function(resp){
          console.log(resp);

          $scope.showAlert({
            title: "Information",
            message: "Data Telah Disimpan"
          });

           $state.go("app.kategori");
           postku.judul = '';
           postku.selectedItem = '';
           postku.isi = '';

        },function(err) {
          console.error('Error', err);
        });
      }
    };

  })


.controller('buatartikelCtrl',function($scope,artikelService,$ionicPopup,$state){

    $scope.showAlert = function(msg){
      $ionicPopup.alert({
        title : msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
      });
    };


    $scope.showData = function() {
      artikelService.getAll().success(function(data) {
        $scope.dataartikel = data;
      });
    };

   
  $scope.simpan = function(artikel){
    if(!artikel.judul){
      $scope.showAlert({
        title: "Information",
        message: "Judul Artikel Mohon Diisi"
      });
    }else if(!artikel.isi){
      $scope.showAlert({
        title: "Information",
        message: "Isi Artikel Mohon Diisi"
      });
    }else{
      artikelService.simpan({
        data: artikel
      }).then(function(resp){
        console.log(resp);

        $scope.showAlert({
          title: "Information",
          message: "Data Telah Disimpan"
        });
        $state.go("app.adminartikel");
        $scope.showData();
        $scope.artikel.judul = '';
        $scope.artikel.isi = '';
         
      },function(err) {
        console.error('Error', err);
      });
    }
  };

  $scope.kosong = {};
  $scope.reset = function(){
      $scope.artikel = angular.copy($scope.kosong);
  };
  $scope.reset();

})

.controller('adminartikelCtrl',function($scope,artikelService,$ionicPopup){
   $scope.showAlert = function(msg){
      $ionicPopup.alert({
        title : msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
      });
    };
    
    $scope.showData = function() {
      artikelService.getAll().success(function(data) {
        $scope.dataartikel = data;
      });
    };

    $scope.showData();

    $scope.edit = function(tampil){
      //alert(tampil.jdul_artikel)



    };

    $scope.remove = function(tampil){
      //alert(tampil.id);
      artikelService.hapus(tampil.id).then(function(resp) {
        console.log(resp);
        $scope.showAlert({
          title: "Information",
          message: "Data Telah Dihapus"
        });
        $scope.showData();
      }, function(err) {
        console.log('Error', err);
      });

    };


})


.controller('memberCtrl',function($scope,usersService){
    usersService.getAnggota().success(function(data){
      $scope.dataMember = data;
    });
  })

.controller('postingdetailCtrl',function($scope,$stateParams,postService){

  })


.controller('registerCtrl',function($scope,usersService,$ionicPopup){
  $scope.showAlert = function(msg){
    $ionicPopup.alert({
      title : msg.title,
      template: msg.message,
      okText: 'Ok',
      okType: 'button-positive'
    });
  };

    $scope.simpan = function(register){

      if(!register.username){
        $scope.showAlert({
          title: "Information",
          message: "Username Mohon Diisi"
        });
      }else if(!register.email){
        $scope.showAlert({
          title: "Information",
          message: "Email Mohon Diisi"
        });
      }else if(!register.password){
        $scope.showAlert({
          title: "Information",
          message: "Password Mohon Diisi"
        });
      }else{
        usersService.simpan({
          data: register
        }).then(function(resp){
          console.log(resp);

          $scope.showAlert({
            title: "Information",
            message: "Data Telah Disimpan"
          });

        },function(err) {
          console.error('Error', err);
        });

      }

    };

  })


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('loginCtrl',function($scope,$cookieStore,$localStorage,loginService,$ionicModal,$state,usersService,$ionicPopup){


    $scope.doLogin = function(login){
      //untuk login
      loginService.anggitGanteng(login).success(function(data){
          $cookieStore.put('username',data[0].username);
          $cookieStore.put('password',data[0].password);
          $cookieStore.put('akses',data[0].akses);
          
          $scope.username = data[0].username;
          $localStorage.username = $scope.username;
          $scope.password = data[0].password;
          $localStorage.password = $scope.password;
          $scope.akses = data[0].akses;
          $localStorage.akses = $scope.akses;

          $state.go('app.kategori');
      }).error(function(data){

      });

    };


    //register
    $scope.showAlert = function(msg){
      $ionicPopup.alert({
        title : msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
      });
    };

    $ionicModal.fromTemplateUrl('register.html', function(modal){
      $scope.registerModal = modal;
    }, {
      scope : $scope,
      animation : 'slide-in-up'
    });

    $scope.batal = function(){
      $scope.registerModal.hide();
    };

    $scope.baru = function(){
      $scope.registerModal.show();
    };

    //simpan register user
    $scope.simpan = function(register){

      if(!register.username){
        $scope.showAlert({
          title: "Information",
          message: "Username Mohon Diisi"
        });
      }else if(!register.email){
        $scope.showAlert({
          title: "Information",
          message: "Email Mohon Diisi"
        });
      }else if(!register.password){
        $scope.showAlert({
          title: "Information",
          message: "Password Mohon Diisi"
        });
      }else{
        usersService.simpan({
          data: register
        }).then(function(resp){
          console.log(resp);

          $scope.showAlert({
            title: "Information",
            message: "Registrasi Berhasil"
          });
          $scope.registerModal.hide();

        },function(err) {
          console.error('Error', err);
        });
      }
    };

  })

.controller('logoutCtrl',function($scope,$cookieStore,$state){
    $cookieStore.remove('username');
    $cookieStore.remove('password');
    $cookieStore.remove('hasLogin');

    setTimeout(function(){$state.go('login');},1000);

  })

  .controller('bantuanCtrl',function($scope){

  })





.controller('adminkategoriCtrl',function($scope,kategoriService,$ionicModal,$ionicPopup){
    $scope.showAlert = function(msg) {
      $ionicPopup.alert({
        title: msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
      });
    };

    $scope.showData = function() {
      kategoriService.getAll().success(function(data) {
        $scope.datakategoris = data;
      });
    };

    $scope.showData();

    $scope.remove = function(tampilktgr){
      //alert(tampilktgr.judul_kategori);

      kategoriService.hapus(tampilktgr.id_kategori).then(function(resp) {
        console.log(resp);
        $scope.showAlert({
          title: "Information",
          message: "Data Telah Dihapus"
        });
        $scope.showData();
      }, function(err) {
        console.log('Error', err);
      });

    };

    $scope.editsimpan = function(tampilktgr){
      if(!tampilktgr.judul_kategori){
        $scope.showAlert({
          title: "Information",
          message: "Nama Mohon Diisi"
        });
      }else{
        kategoriService.ubah({
          data: tampilktgr
        }).then(function(resp) {
          console.log(resp);

          $scope.showAlert({
            title: "Information",
            message: "Data Telah Diupdate"
          });

          $scope.taskeModal.hide();
          $scope.showData();
          // $state.go("tab.buku");
        },function(err) {
          console.error('Error', err);
        });
      }

    };

    $scope.batal = function(){
      $scope.taskModal.hide();
    };

    $scope.bataledit = function(){
      $scope.taskeModal.hide();
    };

    $ionicModal.fromTemplateUrl('edit.html', function(modal){
      $scope.taskeModal = modal;
    }, {
      scope : $scope,
      animation : 'slide-in-up'
    });

    $scope.edit = function(tampilktgr){
      $scope.tampilktgr = tampilktgr;
      $scope.taskeModal.show();
    };

    $ionicModal.fromTemplateUrl('tambah.html', function(modal){
      $scope.taskModal = modal;
    }, {
      scope : $scope,
      animation : 'slide-in-up'
    });

    $scope.tambahModal = function(){
      $scope.taskModal.show();
    };

    $scope.simpan = function(kategori){

      if(!kategori.nama){
        $scope.showAlert({
          title: "Information",
          message: "Nama Kategori Mohon Diisi"
        });
      }else{
        kategoriService.simpan({
          data: kategori
        }).then(function(resp) {
          console.log(resp);

          $scope.showAlert({
            title: "Information",
            message: "Data Telah Disimpan"
          });
          $scope.showData();
          kategori.nama = '';
          $scope.taskModal.hide();
          // $state.go("tab.buku");
        },function(err) {
          console.error('Error', err);
        });
      }

    }

  })

  .controller('adminmemberCtrl',function($scope,usersService,$ionicPopup, $ionicModal){

    $scope.showData = function(){
      usersService.getAnggota().success(function(data){
        $scope.dataMember = data;

      });
    }
    $scope.showData();

    $scope.showAlert = function(msg) {
      $ionicPopup.alert({
        title: msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
      });
    };

    $scope.remove = function(tampilAnggota){

      usersService.hapus(tampilAnggota.username).then(function(resp) {
        console.log(resp);
        $scope.showAlert({
          title: "Information",
          message: "Data Telah Dihapus"
        });
        $scope.showData();
      }, function(err) {
        console.log('Error', err);
      });

    }



    $ionicModal.fromTemplateUrl('edit.html', function(modal){
      $scope.taskModal = modal;
    }, {
      scope : $scope,
      animation : 'slide-in-up'
    });

    $scope.edit = function(tampilAnggota){
      $scope.tampilAnggota = tampilAnggota;
      $scope.taskModal.show();
    }

    $scope.batal = function(){
      $scope.taskModal.hide();
    };

    $scope.editsimpan = function(tampilAnggota){
      if(!tampilAnggota.username){
        $scope.showAlert({
          title: "Information",
          message: "Username Mohon Diisi"
        });
      }else if(!tampilAnggota.email){
        $scope.showAlert({
          title: "Information",
          message: "Email Mohon Diisi"
        });
      }else if(!tampilAnggota.password){
        $scope.showAlert({
          title: "Information",
          message: "Password Mohon Diisi"
        });
      }else{
        usersService.ubah({
          data: tampilAnggota
        }).then(function(resp) {
          console.log(resp);

          $scope.showAlert({
            title: "Information",
            message: "Data Telah Diupdate"
          });

          $scope.taskModal.hide();
          //$scope.showData();
          // $state.go("tab.buku");
        },function(err) {
          console.error('Error', err);
        });
      }

    };

  });




