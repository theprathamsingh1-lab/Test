function login(username, password) {
    console.log(password); // security issue
}

function sum(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}

function findUser(users, id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return users[i];
        }
    }
}

function fetchData(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
    });
}
