const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/f8_education-dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Ket noi thanh cong");
  } catch (error) {
    console.log("Ket noi that bai");
  }
}

module.exports = { connect };
