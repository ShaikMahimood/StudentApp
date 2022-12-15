const Schema = require("validate");
const student = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: String,
    required: true,
  },
});

//validation function is used to validate requested fields with the schema
function Validation(req, res, next) {
  let {
    body: {
      name,
      dob,
      totalMarks,
      cgpa,
      mobile,
      address,
      email,
      course,
      graduationYear,
    },
  } = req;

  const studentData = {
    name,
    dob,
    totalMarks,
    cgpa,
    mobile,
    address,
    email,
    course,
    graduationYear,
  };

  //check validate conditions and send next() otherwise send error
  let errors = student.validate(studentData);
  if (errors.length) {
    errors = errors.map((eRec) => {
      return { path: eRec.path, message: eRec.message };
    });
    res.send(errors);
  } else {
    next();
  }
}

module.exports = { Validation };
