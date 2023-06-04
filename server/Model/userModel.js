const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  photo: { type: String, default: "default.jpg" },
  role: {
    type: String,
    required: [true, "A user must have a role"],
    enum: ["user", "manager", "admin"],
    default: "user",
  },
  name: {
    required: [true, "Please insert user's name"],
    type: String,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have a password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
});

userSchema.index({ email: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (typedInPassword, dbSavedPassword) {
  return await bcrypt.compare(typedInPassword, dbSavedPassword);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
