import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name : String,
  email : String,
  password: {
    type: String,
    minLength: [8,"Password must have atleast 8 charcaters"],
    maxLength: [32,"Password can't be greater than 32 characters"], 
  },
  phone: String,
  accountVerified: {type: Boolean, default: false},
  verificationCode: Number,
  verificatonCodeExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date, 
    default: Date.now,
  },
});

//pre is a mongoose middleware that runs before saving the document, e.g. hashing password before saving so that you don't have to hash manually every time 

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  //hash(data,saltRounds) = saltRounds = numeber of times data is hashed/ strongth of hashing
  this.password = await bcrypt.hash(this.password, 10);
});

//this method compares the entered password with that of hashed passsword in db 
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateVerificationCode = function () {
  function generateRandomFiveDigitNumber() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const remainingDigits = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, 0);

    return parseInt(firstDigit + remainingDigits);
  }
  const verificationCode = generateRandomFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000;

  return verificationCode;
};



export const User = mongoose.model("User",userSchema);