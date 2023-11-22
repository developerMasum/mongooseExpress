import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';


const createStudent = async (req: Request, res: Response) => {
  try {
    // create joi validation using joii mama

    


    const { student: studentData } = req.body;
    // validate by joi 
    const { value , error } = studentValidationSchema.validate(studentData);
    // console.log({error}, {value});
    const result = await StudentServices.createStudentIntoDB(value);
    if (error) {
res.status(500).json({
  success:false,
  message: 'something wrong',
  error:error.details
})
    }

    

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
