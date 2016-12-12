(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);


    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.addAlert = addAlert;
        vm.closeAlert = closeAlert;

        //vm.alerts = [{msg: 'Try Demo User bob and password bob'}];

        vm.alerts = [{msg: 'Please Login/Register to Continue'}];

        function addAlert() {
            vm.alerts.push({msg: 'Invalid Login Credentials'});
        }

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }

        /*function login(user) {
         vm.alerts.pop();
         if (user != undefined) {
         var promise = UserService.findUserByCredentials(user.username, user.password);
         promise
         .success(function (user) {
         if (user === '0') {
         addAlert();
         } else {
         $location.url("/user/" + user._id);
         }
         })
         .error(function (data) {
         console.log(data);
         });
         }
         else {
         addAlert();
         }
         }*/

        function login(user) {
            // var promise = UserService.findUserByCredentials(username, password);
            var promise = UserService.login(user);
            promise
                .success(function (user) {
                    if (user.length == 0) {
                        vm.error = "No such user";
                        addAlert();
                    } else {
                        $rootScope.currentUser = user;
                        $location.url("/user");
                    }
                })
                .error(function (error) {
                    console.log(error);
                    addAlert();
                });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    },
                    function (error) {
                        console.log(error);
                    });
        }
    }

    function RegisterController($location, UserService,$rootScope) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if (user != undefined) {
                if(user.password !=user.verpassword){
                    vm.error = "Password and Verify Password Don`t Match";
                    //vm.user.password="";
                    //vm.user.verpassword="";
                    return;
                }
                user.firstName = "Test";
                user.lastName = "Test";
                UserService.register(user)
                    .success(function (user) {
                        if (user === '0') {
                            //addAlert();
                        } else {
                            vm.user = user;
                            $rootScope.currentUser = user;
                            $location.url("/user");
                        }
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            }
        }
    }

    function ProfileController($location, $routeParams, UserService,$rootScope) {
        var vm = this;
        vm.userId =  $rootScope.currentUser._id;
        //vm.userId = $routeParams["uid"];
        vm.title = "hello";
        vm.user = {};

        vm.updateProfile = updateProfile;
        vm.init = init;
        vm.deleteUser = deleteUser;

        function init() {
            UserService.findUserById(vm.userId)
                .success(function (user) {
                    if (user === '0') {
                        //addAlert();
                    } else {
                        vm.user = user;
                    }
                })
                .error(function (data) {
                    console.log(data);
                });
        }

        init();

        function updateProfile(user) {
            if (user != undefined) {
                UserService.updateUser(vm.userId, user)
                    .success(function (user) {
                        init();
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            }
        }

        function deleteUser(user) {
            if (user != undefined) {
                UserService.deleteUser(user._id)
                    .success(function (data) {
                        $location.url("/login");
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            }
        }


    }

})();
