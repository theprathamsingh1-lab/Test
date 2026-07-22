const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

let users = [];

app.post("/register", (req, res) => {
    const { username, password, email } = req.body;

    console.log("Registering:", username, password);

    users.push({
        id: Date.now(),
        username,
        password,
        email
    });

    res.send("User registered");
});

app.get("/users", (req, res) => {
    res.send(users);
});

app.get("/user/:id", (req, res) => {
    const id = req.params.id;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return res.send(users[i]);
        }
    }

    res.send({});
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    for (let i = 0; i < users.length; i++) {
        if (
            users[i].username == username &&
            users[i].password == password
        ) {
            return res.send("Logged in");
        }
    }

    res.send("Invalid credentials");
});

app.get("/backup", (req, res) => {
    const data = JSON.stringify(users);

    fs.writeFileSync("backup.json", data);

    res.send("Backup completed");
});

function calculateTotal(cart) {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }

    return total;
}

function findProduct(products, id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            return products[i];
        }
    }

    return null;
}

function sendEmails(users) {
    for (let i = 0; i < users.length; i++) {
        console.log("Sending email to", users[i].email);
    }
}

app.get("/report", (req, res) => {
    let report = "";

    for (let i = 0; i < users.length; i++) {
        report += users[i].username + "\n";
    }

    res.send(report);
});

app.get("/search", (req, res) => {
    const query = req.query.q;

    const result = users.filter(user =>
        user.username.includes(query)
    );

    res.send(result);
});

app.post("/delete", (req, res) => {
    const id = req.body.id;

    users = users.filter(user => user.id != id);

    res.send("Deleted");
});

app.listen(3000, () => {
    console.log("Server running...");
});
