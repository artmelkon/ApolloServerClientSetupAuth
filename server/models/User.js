const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: String,
  token: String,
});

userSchema.pre("save", function (next) {
  /** for isModefied() method check mongoose docs */
  if (!this.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

module.exports = model("User", userSchema);
