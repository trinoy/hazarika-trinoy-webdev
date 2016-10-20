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
        };

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        };

        function login(user) {
            vm.alerts.pop();
            if (user != undefined) {
                user = UserService.findUserByCredentials(user.username, user.password);
            }
            if (user) {
                $location.url("/user/" + user._id);
            }
            else {
                //window.alert("Unable to log in. Invalid Credentials");
                addAlert();
            }

        }

    }


    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        function register(user) {
            if (user != undefined) {
                //user._id = Math.floor(Math.random() * 900) + 100;
                user.firstname = "";
                user.lastname = "";
                user = UserService.createUser(user);
            }
            if (user) {
                $location.url("/user/" + user._id);
            }
            else {
                window.alert("Unable to register");
            }

        }

    }

    function ProfileController($scope, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateProfile = updateProfile;
        vm.init = init;
        vm.title = "hello";
        vm.user = {};
        //$scope.user = {};

        function init() {
            vm.user = clone(UserService.findUserById(vm.userId));
        }

        init();

        function clone(obj) {
            if (null == obj || "object" != typeof obj) return obj;
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
            }
            return copy;
        }


        function updateProfile(user) {
            //$scope.user = user;
            if (user != undefined) {
                var userOutput = UserService.updateUser(vm.userId, user);
            }
            if (userOutput) {
                vm.user = clone(userOutput);
                //$scope.model.user.username = userOutput.username;
                //$location.url("/user/" + user._id);
            }
            else {
                window.alert("Unable to log in. Invalid Credentials");
            }

        }

    }
})();
