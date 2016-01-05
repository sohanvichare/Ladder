angular.module('starter.controllers', [])

.factory('API', function($http) {
  var api = {};
  var baseURL = 'https://ladderserver.herokuapp.com';

  api.sendMsg = function(to, text) {
    return $http.post(baseURL + '/sendmsg', {
      "to": to,
      "text": text
    });
  };

  api.triggerCall = function(to) {
    return $http.post(baseURL + '/triggercall', {
      "to": to
    });
  };

  return api;
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


.controller('PlaylistsCtrl', function($scope, $ionicSlideBoxDelegate, API) {
  var duration = 5;
  var classes = [];
  var grades = [];
  $scope.items = [];
  /*var elements = document.querySelectorAll('.box');
  var screenHeight = document.getElementById('fullMid').clientHeight;
  var pixelHeight = Math.floor(screenHeight);
  var str1 = pixelHeight.toString() + "px"
  console.log(str1)
  for(var i=0; i<elements.length; i++){
      var clr = randomColor();
      elements[i].style.height = str1;
      elements[i].style.backgroundColor = randomColor();
  }*/
  var div10 = document.getElementById('sldBox');
  var div47 = document.getElementById('exitBtn');
  $scope.items.push({title: "Get Ready", description: "Your schedule will start in five seconds", honorsOrAp: false});
  $ionicSlideBoxDelegate.update();
  div10.style.opacity = "0";
  div47.style.opacity = "0";
  /*var screenHeight = document.getElementById('fullMid').clientHeight;
  console.log(screenHeight.toString())
  var pixelHeight = Math.floor(screenHeight);
  var str = pixelHeight.toString();
  console.log(str)
  var h = str + "px"
  console.log(h);
  var elements = document.querySelectorAll('.item-content');
  for(var i=0; i<elements.length; i++){
      var clr = randomColor();
      elements[i].style.height = h;
      elements[i].style.backgroundColor = clr.toString();
  }
  $scope.playlists = [
  ];*/

  $scope.doExit = function() {
    div10.style.opacity = "0";
    div47.style.opacity = "0";
    var div80 = document.getElementById('cd-timeline');
    div80.style.display = 'block';
    var div2 = document.getElementById('foot');
    div2.style.opacity = "1";
  }

  $scope.newEvent = function() {
    //4084785682
    API.sendMsg($scope.msgTo, $scope.msgText).then(function(data) {

      if (data.data.status == 'success') {
        $scope.msgTo = '+14084251030';
        $scope.msgText = 'yo';
        $scope.showAlert({
          title: "Success",
          message: "Message sent successfully"
        });
      } else {
        $scope.showAlert({
          title: "Oops!!",
          message: "Oops something went wrong! Please try again later."
        });
      }
      $scope.hide();
      $scope.processing = false;

    });
    /*
    var n = document.getElementById("new").value;
    var idNum = $scope.playlists.length + 1;
    var na = {title: n, id: idNum}
    var screenHeight = document.getElementById('fullMid').clientHeight;
    console.log(screenHeight.toString())
    var pixelHeight = Math.floor(screenHeight/idNum);
    var str = pixelHeight.toString();
    console.log(str)
    var h = str + "px"
    console.log(h);
    $scope.playlists.push(na);
    var elements = document.querySelectorAll('.newEvent');
    for(var i=0; i<elements.length; i++){
        var clr = randomColor();
        elements[i].style.height = h;
        elements[i].style.backgroundColor = clr.toString();
    }
    document.getElementById("new").value = '';
    console.log($scope.playlists);*/
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
    var duration = time;
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
      div.innerHTML = div.innerHTML + "<div class='cd-timeline-block animated fadeInDown'><div class='cd-timeline-img animated bounceIn cd-picture center'></div> <!-- cd-timeline-img --><div class='cd-timeline-content animated bounceIn animated fadeInDown'><h2>"+title+"</h2><p>" + text + "</p><p><button class='button animated bounceIn button-outline button-energized' ng-click='info()'>Help me with this class!</button></p><span class='cd-date'>"+date+"</span></div> <!-- cd-timeline-content --></div> <!-- cd-timeline-block -->";
      document.getElementById("new").value = '';
      n2.value = '';
    }

  }
var oldDuration;
  $scope.doStart = function () {

    var GameScore = Parse.Object.extend("Data");
    var gameScore = new GameScore();

    gameScore.set("Classes", classes);
    gameScore.set("Grades", grades);

    gameScore.save(null, {
      success: function(gameScore) {
        Parse.Cloud.run('findRatios', {
          success: function(results) {
            var res = results.RatiosAndClasses
            console.log(res);
          },
          error: function(error) {
          }
        });

      },
      error: function(gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.

      }
    });





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
            duration = ((oldDuration*60)*1000);
            console.log($scope.items.length);
            var n = $scope.items.length
            duration = ((duration)/(parseInt($scope.items.length)))/n;
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
            $cordovaVibration.vibrate(100);
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
          var sec = duration/1000;
          var timer = '<div class="countdown" data-role="countdown" data-seconds="'+sec+'" data-background-color="ribbed-darkRed"></div>';
          mainBox.innerHTML = "<div class='list card animated fadeIn'><div class='item item-avatar'><button class='button button-icon ion-cube'></button><h1>"+tit+"</h1> <p>"+des+"</p> </div><div class='item item-body'><p>"+honap+"</p><p><a href='#' class='subdued'>"+timer+"</a></p></div><div class='item tabs tabs-secondary tabs-icon-left'><button class='ng-action:addTime() button-clear'><a class='tab-item' href='#'><i class='icon ion-android-add-circle'></i><br>Add more time</a></button><button class='ng-action: getHelp() button-clear'><a class='tab-item' href='#'><i class='icon ion-lightbulb'></i><br> Get Help! </a></button></div></div>";
          $cordovaVibration.vibrate(100);
          i=i+1;
          console.log(i);

        // recurse
        loop();

      }, duration);
        })();
        /*var id = setTimeout(function(){
          var elem = $scope.items[i];
          var tit = elem.title
          console.log(tit);
          var des = elem.description
          var honap = "Regular-paced class."
          if (elem.honorsOrAp)
          {
            honap = "Honors or Advanced-Placement level class."
          }
          //add html for timer here:
          var timer = "time"
          mainBox.innerHTML = "<div class='list card animated fadeIn'><div class='item item-avatar'><button class='button button-icon ion-cube'></button><h1>"+tit+"</h1> <p>"+des+"</p> </div><div class='item item-body'><p>"+honap+"</p><p><a href='#' class='subdued'>"+timer+"</a></p></div><div class='item tabs tabs-secondary tabs-icon-left'><button class='ng-action:addTime() button-clear'><a class='tab-item' href='#'><i class='icon ion-android-add-circle'></i>Add more time</a></button><button class='ng-action: getHelp() button-clear'><a class='tab-item' href='#'><i class='icon ion-lightbulb'></i> Get Help! </a></button></div></div>"
          i=i+1;
          console.log(i);
          /*if (i == $scope.items.length)
          {
            clearInterval(refreshIntervalId);
          }*//*
        }, duration)*/
    }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
