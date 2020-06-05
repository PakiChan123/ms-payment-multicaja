module.exports = app =>{
    const payments = require("../controllers/payment.controller.js");

    var router = require("express").Router();

    //crear nuevo payment
    router.post("/", payments.create);

    //Encontrar payment por ID
    router.get("/:id", payments.findOne);
    
    //Encontrar payment por process 
    router.get("/",payments.findAll)

    app.use('/api/payments', router);
};