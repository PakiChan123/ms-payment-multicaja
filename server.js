const express = require("express");
const bodyParser = require ("body-parser");
const cors = require ("cors");

const app = express ();

var corsOption = { origin: "http://localhost: 7000"};

app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route
app.get("/", (req, res) => {
    res.json({ message: "hello api!" });
});

require("./app/routes/payment.routes")(app);

//establecer puerto, escuchar solicitudes
const PORT = process.env.PORT || 7100;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}.`);
});

//coneción bd mongo
const db = require("./app/models");
db.mongoose
    .connect(db.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database mongo!")
    })
    .catch(err =>{
        console.log("Cannot connect to the database!", err);
        process.exit();
    })
