const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  _id: { type: Number },
  title: String,
  type: String,
  location: String,
  description: String,
  salary: String,
  company: {
    name: String,
    description: String,
    contactEmail: String,
    contactPhone: String,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
