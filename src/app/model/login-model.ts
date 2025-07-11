export class loginModel{
    email!:string
    password!:string
}

export class resetPasswordModel {
  newPassword!: string
  confirmPassword!: string
}


 export interface Root {
  _id: string
  firstName: string
  lastName: string
  email: string
  employmentStatus: string
  numberOfChildren: number
  faceEmbedding: any[]
  isFirstLogin: boolean
  isOrganizationalHead: boolean
  isUnitHead: boolean
  organization: string
  children: Children[]
  educationDetails: EducationDetail[]
  createdAt: string
  updatedAt: string
  __v: number
  dateOfBirth: string
  emergencyContactCurrentAddress: string
  emergencyContactEmail: string
  emergencyContactFullName: string
  emergencyContactPhoneNumber: string
  emergencyContactRelationship: string
  employmentType: string
  gender: string
  hireDate: string
  idNumber: string
  idType: string
  jobTitle: string
  maritalStatus: string
  nationality: string
  nextOfKinCurrentAddress: string
  nextOfKinEmail: string
  nextOfKinFullName: string
  nextOfKinPhoneNumber: string
  nextOfKinRelationship: string
  otherName: string
  phoneNumber: string
  profilePicture: string
  role: string
  spouseEmail: string
  spouseName: string
  spousePhone: string
  staffId: string
  supervisor: any
  unit: string
  workLocation: string
  token: string
  refreshToken: string
}

export interface Children {
  fullName: string
  dob: string
  _id: string
}

export interface EducationDetail {
  institutionName: string
  courseOfStudy: string
  startDate: string
  endDate: string
  _id: string
}
