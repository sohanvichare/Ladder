angular.module('starter.controllers', [])

.factory('API', function($http) {
  var api = {};
  var baseURL = 'https://ladderserver.herokuapp.com';

  api.message = function(x, y) {
    return $http.post(baseURL + '/message', {
      to: x,
      message: y
    });
  };

  return api;
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    Parse.User.logIn( $scope.loginData.username,  $scope.loginData.password, {
      success: function(user) {
        var divOne = document.getElementById('loginCard');
        divOne.style.display='none';
        var divTwo = document.getElementById('createCard');
        divTwo.style.display='none';
        var divThree = document.getElementById('successCard');
        divThree.style.display='block';
        var divFour = document.getElementById('logoutCard');
        divFour.style.display='block';
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
      }
    });
  };



  $scope.doCreate = function() {
    console.log('Doing account creation', $scope.loginData["password"]);
    if ($scope.loginData.password == $scope.loginData.rpassword)
    {
      var user = new Parse.User();
      user.set("username", $scope.loginData.username);
      user.set("password", $scope.loginData.password);
      user.signUp(null, {
        success: function(user) {
          var divOne = document.getElementById('loginCard');
          divOne.style.display='none';
          var divTwo = document.getElementById('createCard');
          divTwo.style.display='none';
          var divThree = document.getElementById('successCard');
          divThree.style.display='default';
          var divFour = document.getElementById('logoutCard');
          divFour.style.display='default';
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
  };

})




.controller('PlaylistsCtrl', function($scope, $ionicSlideBoxDelegate, API, $ionicModal, $http) {
  $ionicModal.fromTemplateUrl('templates/coursera.html', {
    scope: $scope
  }).then(function(mod) {
    $scope.modal = mod;
  });


  var duration = 5;
  var classes = [];
  var grades = [];
  $scope.items = [];
  var div10 = document.getElementById('sldBox');
  var div47 = document.getElementById('exitBtn');
  $scope.items.push({title: "Get Ready", description: "Your schedule will start in five seconds", honorsOrAp: false});
  $ionicSlideBoxDelegate.update();
  div10.style.opacity = "0";
  div47.style.opacity = "0";
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };


  jQuery('#fullMid').on('click', '.btnClick', function() {
  $scope.modal.show();
  var id = this.id;
  var strid = id.toString()
  document.getElementById("headr").innerHTML = strid + " Help";
  document.getElementById('frame').src = "https://www.coursera.org/courses?query="+strid+"&output=embed"

  });



  $scope.doExit = function() {
    div10.style.opacity = "0";
    div47.style.opacity = "0";
    var div80 = document.getElementById('cd-timeline');
    div80.style.display = 'block';
    var div2 = document.getElementById('foot');
    div2.style.opacity = "1";
  }


  $scope.newEvent = function() {

    var n = document.getElementById("new").value;
    var n2 = document.getElementById("newGrade").value;
    var title = n.toString();
    classes.push(title);
    var title2 = n2.toString();
    grades.push(parseInt(title2));
    //console.log();
    var num = title.toLowerCase().search("honors");
    var num2 = title.search("AP");
    var x = false;
    var time = parseInt(document.getElementById("newHomework").value);
    duration = time;
    console.log(duration);
    var text = "Regular-level class. Percent grade: " + title2 + "%";
    if (num>=0) {
      text = "Honors class detected." + " Percent grade: " + title2;
      x = true;
    }
    if (num2>=0) {
      text = "AP class detected." + " Percent grade: " + title2;
      x = true;
    }
    var date = n.toString();
    $scope.items.push({title: n, description: title2, honorsOrAp: x});
    $ionicSlideBoxDelegate.update();
    var div = document.getElementById('cd-timeline');
    if (title!="")
    {
      div.innerHTML = div.innerHTML + "<div class='cd-timeline-block animated fadeInDown'><div class='cd-timeline-img animated bounceIn cd-picture center'></div> <!-- cd-timeline-img --><div class='cd-timeline-content animated bounceIn animated fadeInDown'><h2>"+title+"</h2><p>" + text + "</p><p><button id="+title+" class='btnClick button animated bounceIn button-outline button-energized' ng-click='doInfo()'>Help me with this class!</button></p><span class='cd-date'>"+date+"</span></div> <!-- cd-timeline-content --></div> <!-- cd-timeline-block -->";
      document.getElementById("new").value = '';
      n2.value = '';
    }

  }
var oldDuration;
console.log(classes);
console.log(grades);
var arr01 = determine(classes, grades);
console.log(arr01);
  $scope.doStart = function () {
    arr01 = determine(classes, grades);
    oldDuration = duration;
    var isFirst = true;
    var getReady = true;
    //console.log($scope.items)
    div10.style.opacity="1";
    div47.style.opacity="1";
    var div80 = document.getElementById('cd-timeline');
    div80.style.display = 'none';
    var div2 = document.getElementById('foot');
    div2.style.opacity = '0';
    var mainBox = document.getElementById("sldBox");
    var i = 0;
    //duration = 5000;
  //  duration=(duration*1000)
      if (isFirst) {
        duration = 0;
        isFirst = false;
      }
      (function loop(){
        setTimeout(function(){
          if (!isFirst && !getReady)
          {
            console.log(duration);
            console.log($scope.items.length);
            var n = $scope.items.length
            duration = Math.floor(((oldDuration)*(arr01[i]/100))*60000);
            console.log(duration);
          }
          if (getReady){
            duration = 5000;
            getReady = false;
          }
          var elem = $scope.items[i];
          var tit = elem.title;
          if (tit==null)
          {

          }
          console.log(tit);
          var des = elem.description;
          var honap = "Regular-paced class.";
          if (elem.honorsOrAp)
          {
            honap = "Honors or Advanced-Placement level class.";
          }
          console.log(duration)
          //add html for timer here:
          var sec = Math.floor(((oldDuration)*(arr01[i]/100))*60);
          var timer = '<div class="countdown" data-role="countdown" data-seconds="'+sec+'" data-background-color="ribbed-darkRed"></div>';
          mainBox.innerHTML = "<div class='list card animated fadeIn'><div class='item item-avatar'><h1>"+tit+"</h1> <p>"+des+"</p> </div><div class='item item-body'><p>"+honap+"</p><p><a href='#' class='subdued'>"+timer+"</a></p></div><div class='item tabs tabs-secondary tabs-icon-left'><button class='ng-action:addTime() button-clear'><a class='tab-item' href='#'><i class='icon ion-android-add-circle'></i><br>Add more time</a></button><button class='ng-action: getHelp() button-clear'><a class='tab-item' href='#'><i class='icon ion-lightbulb'></i><br> Get Help! </a></button></div></div>";

          //API.message('+14084251030', 'GOOD JOB! Now treat yourself to a slice of cake.');
          i=i+1;
          console.log(i);

        // recurse
        loop();

      }, duration);
        })();
      }
      function determine(classes, grades){
        grades.sort();
      	var max=100;
        return findPercentages(100,classes.length,grades);
      }
      function findPercentages(max,numbers,grades){
      	var step= (max/numbers);
      	var finale=[];
      	for(var i=(step/numbers);i<max/2;i+=(step/2)){
      		finale.push(i);
      	}
      	var differenceArray=[];
      	for(var a =1;a<finale.length;a++){
      		var cur= finale[a]-finale[a-1];
      		differenceArray.push(cur);
      	}
        differenceArray.push(finale[finale.length-1]-finale[finale.length-2])
      	var sum=0;
      	for(var b =0;b<differenceArray.length;b++){
      		if(differenceArray[i]==0){
      			finale[b]=finale[b+1];
      		}else if(differenceArray<=5){
      			finale[b]=finale[b+1]-(step/4);
      		}else if(differenceArray<=15){
      			finale[b]=finale[b+1]-(step/8);
      		}else{
      			finale[b]=finale[b];
      		}
      		sum+=finale[b];
      		if(b<=numbers/2 && sum>= 50){
      			var dif=sum-50;
      			finale[0]-=(dif/2);
      			finale[0]-=(dif/2);
      		}else if(sum>=100){
      			var dif=sum-100;
      			for(var c=0;c<finale.length;c++){
      				finale[c]-=(dif/4);
      			}
      		}
      	}
        return finale;
      }
});
