const db = require ("../models");
const Payment = db.payments;

// Crear y guardar nuevo payment
exports.create = (req, res) => {
  
    // Validate request
    if (!req.body.payment_name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Crear payment
    const payment = new Payment({
        payment_name: req.body.payment_name,
        payment_proc: req.body.payment_proc,
        activate:req.body.activate ? req.body.activate : true
    });
  
    // Guardar payment en DB 
    payment
      .save(payment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Payment process."
        });
      });
  
  };

  // Encontrar Payment con ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Payment.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Payment and process with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Payment and process with id=" + id });
      });

};

//Encontrar payment segun proceso 
exports.findAll = (req, res) => {
    const payment_proc = req.query.payment_proc;
    var condition = payment_proc ? { payment_proc: { $regex: new RegExp(payment_proc), $options: "i" } } : {};
  
    Payment.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving payments process."
        });
      });
  };