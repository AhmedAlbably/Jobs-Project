const mongoose = require("mongoose");

const lastJobIdSchema = new mongoose.Schema({
  lastId: { type: Number, default: 0 }
});

const LastJobId = mongoose.model("LastJobId", lastJobIdSchema);

module.exports = LastJobId;
