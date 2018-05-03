var myApp = angular.module('myApp', ["ui.router"]);
myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/home');
    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "templates/home.html"
        })
        .state("student", {
            url: "/student",
            templateUrl: "templates/student.htm",
            controller: "studentCtrl"

        })
        .state("course", {
            url: "/course",
            templateUrl: "templates/course.htm"
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
    $interval($scope.reload, 5000);

  
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
	    $interval($scope.reload, 5000);
                    
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
  
   myApp.controller('studentDetailCtrl', function($scope, $http,$interval,$window,$stateParams) {
   	
  $scope.editStudent2= function(student){
      var student={
   		 studentid: $scope.students1.studentid, 
   		 studentName: $scope.studentName,
   		 studentAge: $scope.studentAge,
   		 studentLocation: $scope.studentLocation
   	 };
        $http({
            method : 'PUT',
            url : 'http://localhost:8082/edit_student/',
            data: student
        }).then(function(response) {
                $window.location.href='http://localhost:8082';
                console.log("thanh cong roi")

                },function(errresponse){
                
                $scope.error='error getting';
                   alert("fail")
            });
    };

});


