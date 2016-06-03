angular.module('starter.services', [])

.factory('kategoriService', function($http) {
    var baseUrl = 'http://localhost/Backend/index.php/kategori/';
    return{
        getAll: function(){
          return $http.get(baseUrl+'ambil');
        },
        ambilSatu: function (id_kategori){
          return $http.get(baseUrl+'ambilSatu/?id='+id_kategori);
        },
        ubah: function (tampilktgr){
        return $http.post(baseUrl+'ubah',tampilktgr,{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
            }
          });
        },
        hapus: function (id_kategori){
            return $http.get(baseUrl+'hapus/?id_kategori='+id_kategori);
      },
      simpan: function(kategori){
        return $http.post(baseUrl+'simpan',kategori,{
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
          }
        });
      }
    };
})


.factory('postService', function($http) {
    var baseUrl = 'http://localhost/Backend/index.php/post/';
    return{
      ambilSatu: function (id_kategori){
        return $http.get(baseUrl+'ambilSatu/?id='+id_kategori);
      },
      simpan: function(postku){
        return $http.post(baseUrl+'simpan',postku,{
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
          }
        });
      },
      mypost: function (namauser){
        return $http.get(baseUrl+'hapus/?id_kategori='+namauser);
      },
      ambilisi: function (id_post){
        return $http.get(baseUrl+'ambilisi/?id='+id_post);
      }
    };
})


.factory('usersService', function($http) {
    var base = 'http://localhost/Backend/index.php/users/';
    return{
      simpan: function(register){
        return $http.post(base+'simpan',register,{
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
          }
        });
      },
      getAnggota: function(){
          return $http.get(base+'ambil');
      },
      hapus: function (username){
        return $http.get(base+'hapus/?username='+username);
      }

    };
})

.factory('loginService',function($http){
  var base = 'http://localhost/Backend/index.php/users/';
   return {
     anggitGanteng : function(params){
       console.log(params);
       return $http.post(base+'loginuser',params,{
         headers:{
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
         }
       })
     }
   }
})


.factory('artikelService',function($http){
    var base = 'http://localhost/Backend/index.php/artikel/';
    return {
      simpan : function(artikel){
        //console.log(params);
        return $http.post(base+'simpan',artikel,{
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
          }
        })
      },
      getAll: function(){
        return $http.get(base+'ambil');
      },
      hapus: function (id){
        return $http.get(base+'hapus/?id='+id);
      }
    }
});





