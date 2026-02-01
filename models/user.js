const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true, trim: true },
    cookie:{ type: String, required: false, trim: false},
    headers:{ type: Object, required: false  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);