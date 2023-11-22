import Joi from 'joi'; 
const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .trim()
      .max(20)
      .pattern(/^[A-Z][a-z]*$/),
    middleName: Joi.string(),
    lastName: Joi.string()
      .required()
      .pattern(/^[A-Za-z]+$/),
  });

  // Define Joi schema for guardian
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  });

  // Define Joi schema for local guardian
  const localguardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });

  // Define Joi schema for blood group
//   const bloodGroupValidationSchema = Joi.string().valid(
//     'A+',
//     'A-',
//     'B+',
//     'B-',
//     'AB+',
//     'AB-',
//     'O+',
//     'O-',
//   );

  // Define Joi schema for student
  const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female').required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    // bloodGroup: Joi.array().items(bloodGroupValidationSchema).required(),
    presentAddress: Joi.string().required(),
    permanentAddres: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localguardianValidationSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').required(),
  });
export default studentValidationSchema;