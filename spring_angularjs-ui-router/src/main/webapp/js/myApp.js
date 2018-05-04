var myApp = angular.module('myApp', ["ui.router"]);
myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/home');
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "templates/home.htm"
        })
        .state("student", {
            url: "/student",
            templateUrl: "templates/student.htm",
            controller: "studentCtrl"

        })
        .state("course", {
            url: "/course",
            templateUrl: "templates/course.htm",
            controller: "courseCtrl"
        })
        .state("studentDetail",{
        	url:"/student/:studentid",
        	templateUrl: "templates/viewStudent.htm",
        	controller: "studentDetailCtrl"
        })
         .state("studentEdit",{
        	url:"/student/:studentid",
        	templateUrl: "templates/editStudent.htm",
        	controller: "studentEditCtrl"
        })
         .state("addStudent",{
            url:"/addStudent",
            templateUrl: "templates/addStudent.htm",
            controller: "studentAddCtrl"
        })
         .state("courseDetail",{
            url:"/course/:courseid",
            templateUrl: "templates/viewCourse.htm",
            controller: "courseDetailCtrl"
        })
         .state("addCourse",{
            url:"/addCourse",
            templateUrl: "templates/addCourse.htm",
            controller: "courseAddCtrl"
        })
         .state("courseEdit",{
            url:"/course/:courseid",
            templateUrl: "templates/editCourse.htm",
            controller: "courseEditCtrl"
        })
        
        

});


//student controller
myApp.controller('studentCtrl', function($scope, $http,$interval,$window,$stateParams) {

   
    //reload 
    $scope.reload = function () {
		$http.get("http://localhost:8082/getAllStudent")     //get all student
		    .then(function(response) {
		        $scope.students= response.data;       
		    },
		    function(errResponse){
		            console.error('Error while fetching Users');
		            deferred.reject(errResponse);
		            $scope.error='error getting'

		    });
    };
    $scope.reload();
    $interval($scope.reload, 10000);

  
    $scope.deleteStudent = function(id) {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8082/deleteStudent/'+id,   //delete student by id
                    }).then(function(response) {
                    		$scope.reload();
    						},function(errResponse){
				            console.error('Error while fetching Users');
				            deferred.reject(errResponse);
				            $scope.error='error getting'
   				 		});
					};







});
  

//student detail controller
  myApp.controller('studentDetailCtrl', function($scope, $http,$interval,$window,$stateParams) {
	  
	  $scope.reload = function () {
		  $http.get("http://localhost:8082/getAllCourse") //get all course
		    .then(function(response) {
		        $scope.courses= response.data; 

		    },
		    function(errResponse){
		            console.error('Error while fetching Users');
		            deferred.reject(errResponse);
		            $scope.error='error getting'
		    });

		    $http({
                        method : 'GET',
                        url : 'http://localhost:8082/viewStudent/',
                        params: {studentid: $stateParams.studentid}

                    }).then(function(response) {
                    	$scope.students1=response.data
    						},function(errResponse){
				            console.error('Error while fetching Users');
				            deferred.reject(errResponse);
				            $scope.error='error getting'
   				 		});
                    
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8082/viewStudent2/',
                        params: {studentid: $stateParams.studentid}
                    }).then(function(response) {
                    	$scope.students2=response.data;	
    						},function(errResponse){
				            console.error('Error while fetching Users');
				            deferred.reject(errResponse);
				            $scope.error='error getting'
	   				 		});
	    };
	    $scope.reload();
	    $interval($scope.reload, 10000);
                    
	        //delete student's course
                     
               $scope.deleteStudentCourse=function(students1id,deletedcourseid){

         		var stcourse2={
         			studentid:students1id,
         			courseid:deletedcourseid
         		};
         		 $http({
                         method : 'POST',
                         url : 'http://localhost:8082/delete_course_student/',
                         data: stcourse2
                     }).then(function(response) {
                             $scope.reload();
                            

                             },function(errresponse){
                             
                             $scope.error='error getting';
                                alert("fail")
                         });
         };

         	//add course for student
          $scope.addCourseForStudent=function(stcourse2){
                    var stcourse2 ={
                      studentid:$scope.students1.studentid,
                      courseid:$scope.id2
                  };
                    
                    
                    $http({
                         method : 'POST',
                         url : 'http://localhost:8082/add_course_student/',
                         data: stcourse2
                     }).then(function(response) {
                             $scope.reload();
                             },function(errresponse){
                             
                             $scope.error='error getting';
                             console.log(stcourse2);
                                
                         });
         };

         //


});
  //edit student controller
   myApp.controller('studentEditCtrl', function($scope, $http,$interval,$window,$stateParams) {

    //get editted student detail
    $http({
                        method : 'GET',
                        url : 'http://localhost:8082/viewStudent/',
                        params: {studentid: $stateParams.studentid}

                    }).then(function(response) {
                        $scope.students1=response.data
                            },function(errResponse){
                            console.error('Error while fetching Users');
                            deferred.reject(errResponse);
                            $scope.error='error getting'
                        });
    //edit 
  $scope.editStudent2= function(student){
      var student={
   		 studentid: $stateParams.studentid, 
   		 studentName: $scope.studentName,
   		 studentAge: $scope.studentAge,
   		 studentLocation: $scope.studentLocation
   	 };
        $http({
            method : 'PUT',
            url : 'http://localhost:8082/edit_student/',
            data: student
        }).then(function(response) {
                $window.location.href='http://localhost:8082/#!/student';
                },function(errresponse){
                
                $scope.error='error getting';
                   alert("fail")
            });
    };

});


//add student controller
myApp.controller('studentAddCtrl', function($scope, $http,$interval,$window,$stateParams) {

    $scope.addStudent= function(student){
                     var student={
                                studentid: $scope.studentid,
                                studentName:$scope.studentName,
                                studentAge:$scope.studentAge,
                                 studentLocation:$scope.studentLocation
                             };
             
                     $http({
                         method : 'POST',
                         url : 'http://localhost:8082/add_student/',
                         data: student
                     }).then(function(response) {
                             $window.location.href='http://localhost:8082/#!/student';
                             },function(errresponse){
                             deferred.reject(errResponse);
                             $scope.error='error getting';
                                alert("failse")
                         });
                 };

});


myApp.controller('courseCtrl', function($scope, $http,$interval,$window,$stateParams) {
     $scope.reload = function () {
          $http.get("http://localhost:8082/getAllCourse") //get all course
            .then(function(response) {
                $scope.courses= response.data; 

            },
            function(errResponse){
                    console.error('Error while fetching Users');
                    deferred.reject(errResponse);
                    $scope.error='error getting'
            });
        };
    $scope.reload();
    $interval($scope.reload, 10000);
        $scope.init = function(id){
           $scope.leader = {};
                $http.get('http://localhost:8082/numberofStudent/'+id)
                .then(function (response) {
                    $scope.leader[id] = response.data;// gan gia tri cung voi id cua no
                })
                ,function(errResponse){
                    console.error('Error while fetching Users');
                    deferred.reject(errResponse);
                    $scope.error='error getting'
                }
            };
     //delete by id
    $scope.deleteCourse = function(id) {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8082/deleteCourse/'+id,
                    }).then(function(response) {
                        $scope.reload();
                            },function(errResponse){
                            console.error('Error while fetching Users');
                            deferred.reject(errResponse);
                            $scope.error='error getting'
                        });
                    };


});

myApp.controller('courseDetailCtrl', function($scope, $http,$interval,$window,$stateParams) {
     $scope.reload = function () {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8082/viewCourse',
                        params: {courseid: $stateParams.courseid}
                    }).then(function(response) {
                        $scope.courses1=response.data;  
                            },function(errResponse){
                            console.error('Error while fetching Users');
                            deferred.reject(errResponse);
                            $scope.error='error getting'
                        });
                 
                $http({
                        method : 'GET',
                        url : 'http://localhost:8082/courseDetail',
                        params: {courseid: $stateParams.courseid}
                    }).then(function(response) {
                        $scope.courses2=response.data;   
                            },function(errResponse){
                            console.error('Error while fetching Users');
                            deferred.reject(errResponse);
                            $scope.error='error getting'
                        });

        };
    $scope.reload();
    $interval($scope.reload, 10000);

});


myApp.controller('courseAddCtrl', function($scope, $http,$interval,$window,$stateParams) {

    //add course
    $scope.addCourse= function(course){
                     var course={
                                courseid: $scope.studentid,
                                coursename:$scope.coursename
                             };
             
                     $http({
                         method : 'POST',
                         url : 'http://localhost:8082/add_course/',
                         data: course
                             }).then(function(response) {
                             $window.location.href='http://localhost:8082/#!/course';
                             },function(errresponse){
                             deferred.reject(errResponse);
                             $scope.error='error getting';
                                alert("failse")
                         });
                 };


});


//edit course controller
   myApp.controller('courseEditCtrl', function($scope, $http,$interval,$window,$stateParams) {

    //get editted course detail
    $http({
                        method : 'GET',
                        url : 'http://localhost:8082/viewCourse',
                        params: {courseid: $stateParams.courseid}
                    }).then(function(response) {
                        $scope.courses1=response.data;  
                            },function(errResponse){
                            console.error('Error while fetching Users');
                            deferred.reject(errResponse);
                            $scope.error='error getting'
                        });
    //edit 
  $scope.editCourse= function(course){
                   var course={
                         courseid: $stateParams.courseid, 
                         coursename: $scope.coursename
                     };
                     $http({
                         method : 'PUT',
                         url : 'http://localhost:8082/edit_course/',
                         data: course
                     }).then(function(response) {
                             $window.location.href='http://localhost:8082/#!/course';
                             },function(errresponse){
                             
                             $scope.error='error getting';
                                alert("fail")
                         });
                 };


});
