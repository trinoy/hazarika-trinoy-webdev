(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users =
            [
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
            ];

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findByUsername": findByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser

        };
        return api;

        function createUser(user) {
            user._id = users.length;
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            for (index in users) {
                if (users[index]._id == userId) {
                    return users[index];
                }
            }

        }

        function findByUsername(username) {
            for (index in users) {
                if (users[index].username == username) {
                    return users[index];
                }
            }
        }

        function findUserByCredentials(username, password) {
            if (username != undefined && password != undefined) {
                for (index in users) {
                    if ((users[index].username == username) && (users[index].password == password)) {
                        return users[index];
                    }
                }
            }
        }

        function updateUser(userId, user) {
            for (index in users) {
                if (users[index]._id == userId) {
                    users[index] = user;
                    return user;
                }
            }
        }

        function deleteUser(userId) {
            for (index in users) {
                if (users[index]._id == userId) {
                    delete users[index];
                }
            }
        }
    }
})();




