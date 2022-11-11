const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 email: {
   type: String,
   required: true,
   unique: true
  },

 password: {
   type: String,
   required: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

 firstName: {
  type: String,
  required: true
 },

 lastName: {
  type: String,
  required: true
 }
});

//Hashing the password(s)
userSchema.pre('save', 
 async function (next) {
   const user = this;
   const hash = await bcrypt.hash(this.pasword, 10);

   this.password = hash;
   next();
 }
);

//Password verification
userSchema.methods.isValidPassword = async function(password) {
 const user = this;
 const compare = await bcrypt.compare(password, user.password);

 return compare;

}

userSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;