import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
    firstname:{
        type:String,
        required:[false, 'Enter your first name'],
    },
    lastname:{
        type:String,
        required:[false, 'Enter your last name'],
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Email is required'],
    },
    role:{
        type:String,
        enum:['guest', 'receptionist', 'manager', 'admin', 'housekeeping'],
        default: 'guest',
    },
    password:{
        type:String,
        minlength:6,
        required:[false, 'Enter your password'],
    },
        image: {
        type: String,
        default: '',
    },
    phone: { type: String },
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    }

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });


UserSchema.virtual('name').get(function () {
  const fullName = `${this.firstname || ''} ${this.lastname || ''}`.trim();

  if (fullName) return fullName;

  // Fallback: derive name from email (before @)
  if (this.email) {
    const [username] = this.email.split('@');
    return username.charAt(0).toUpperCase() + username.slice(1); // Capitalize
  }

  return 'Anonymous';
});



const User = models.User || model('User', UserSchema)

export default User;

