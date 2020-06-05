module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        payment_name: String,
        payment_proc: String,
        activate: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Payment = mongoose.model("payment", schema);
    return Payment;
  };