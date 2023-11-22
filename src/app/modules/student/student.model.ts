import { Schema, model } from 'mongoose';
// import { Guardian } from './student.interface';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'first Name is required'],
    trim: true, // remove space from obj
    maxlength: [20, 'first name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalized format ',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'first name is required '], // with custom messages
  },
  occupation: {
    type: String,
    required: [true, 'occupation is required'],
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid as gender',
    },

    required: [true, 'gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not right formatted email',
    },
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  // bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddres: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuradianSchema, required: true },
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('Student', studentSchema);
