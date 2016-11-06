(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);


    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.addAlert = addAlert;
        vm.closeAlert = closeAlert;

        vm.alerts = [{msg: 'Try Demo User bob and password bob'}];

        function addAlert() {
            vm.alerts.push({msg: 'Invalid Login Credentials'});
        }

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }

        function login(user) {
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
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if (user != undefined) {
                user.firstName = "Test";
                user.lastName = "Test";
                UserService.createUser(user)
                    .success(function (user) {
                        if (user === '0') {
                            //addAlert();
                        } else {
                            vm.user = user;
                            $location.url("/user/" + user._id);
                        }
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            }
        }
    }

    function ProfileController($location,$routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
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
