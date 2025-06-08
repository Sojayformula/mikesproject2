export class unitModel{
    search!: string;
    page!: string;
    pageSize!: string;
    maritalStatus!: string
}

export interface unitModelResponseModel {
  success: boolean
  message: string
  data: Daum[]
  pagination: Pagination
  timestamp: string
}

export interface Daum {
  _id: string
  name: string
  description: string
  isSubUnit: boolean
  unitHead: UnitHead
  organization: Organization
  parentUnit?: ParentUnit
  createdAt: string
  updatedAt: string
  __v: number
}

export interface UnitHead {
  _id: string
  profilePicture?: string
  firstName: string
  lastName: string
  otherName: string
  email: string
  dateOfBirth: string
  nationality: string
  gender: string
  idType: string
  phoneNumber: string
  idNumber: string
  maritalStatus: string
  employmentStatus: string
  unit: string
  jobTitle: string
  employmentType: string
  hireDate?: string
  workLocation: string
  supervisor: string
  staffId?: string
  spouseName?: string
  spousePhone?: string
  spouseEmail?: string
  numberOfChildren: number
  children: Children[]
  educationDetails: EducationDetail[]
  nextOfKinFullName?: string
  nextOfKinRelationship?: string
  nextOfKinPhoneNumber?: string
  nextOfKinEmail?: string
  nextOfKinCurrentAddress?: string
  emergencyContactFullName?: string
  emergencyContactRelationship?: string
  emergencyContactPhoneNumber?: string
  emergencyContactEmail?: string
  emergencyContactCurrentAddress?: string
  faceEmbedding: any[]
  password: string
  isFirstLogin: boolean
  isOrganizationalHead: boolean
  isUnitHead: boolean
  role?: string
  organization: string
  createdAt: string
  updatedAt: string
  __v: number
  qrCode?: string
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

export interface Organization {
  _id: string
  name: string
  industry: string
  location: string
  email: string
  phone: string
  createdBy: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ParentUnit {
  _id: string
  name: string
  description: string
  isSubUnit: boolean
  unitHead: string
  organization: string
  parentUnit: ParentUnit
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Pagination {
  total: number
  page: number
  pageSize: number
  totalPages: number
}



        // get unit by id //
export class unitbyIdModel{
  id!: string;
}

export interface unitbyIdResponseModel {
  success: boolean
  message: string
  data: Data
  timestamp: string
}

export interface Data {
  unit: Unit
  parentUnit: ParentUnit2
}

export interface Unit {
  _id: string
  name: string
  description: string
  isSubUnit: boolean
  unitHead: UnitHead
  organization: Organization
  parentUnit: ParentUnit
  createdAt: string
  updatedAt: string
  __v: number
}

export interface UnitHead {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface Organization {
  _id: string
  name: string
  location: string
  email: string
}

export interface ParentUnit {
  _id: string
  name: string
  description: string
  isSubUnit: boolean
  unitHead: string
  organization: string
  parentUnit: ParentUnit
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ParentUnit2 {
  _id: string
  name: string
  description: string
  isSubUnit: boolean
  unitHead: string
  organization: string
  parentUnit: any
  createdAt: string
  updatedAt: string
  __v: number
}





        // addUnitodel //
export class addUnitModel{
   name!: string;
  isSubUnit!: boolean;
  unitHead!: string;
  description!: string;
  parentUnit!: string;
}


export interface addUnitResponseModel {
  response: Response
  status: number
  message: string
  name: string
}

export interface Response {
  success: boolean
  message: string
  data: Data
  timestamp: string
}

export interface Data {
  name: string
  description: string
  isSubUnit: boolean
  unitHead: string
  organization: string
  // parentUnit!: any
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}






       
      // editUnitModel//
export class updateUnitModel {
  id?: string;
  name!: string;
  description!: string;
  unitHead?: string;        
   organization?: string;     
   parentUnit?: string; 
  isSubUnit!: boolean;     
}

export interface updateUnitResponseModel{
  success: boolean
  message: string
  data: Data
  timestamp: string
}

export interface Data {
  unit: Unit
  // parentUnit: ParentUnit
}

export interface Unit {
  _id: string
  name: string
  description: string
  isSubUnit: boolean
  unitHead: UnitHead
  organization: Organization
  parentUnit: ParentUnit
  createdAt: string
  updatedAt: string
  __v: number
}

export interface UnitHead {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface Organization {
  _id: string
  name: string
  location: string
  email: string
}

export interface ParentUnit {
  _id: string
  name: string
  description: string
  isSubUnit: boolean
  unitHead: string
  organization: string
  parentUnit: ParentUnit
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ParentUnit2 {
  _id: string
  name: string
  description: string
  isSubUnit: boolean
  unitHead: string
  organization: string
  parentUnit: any
  createdAt: string
  updatedAt: string
  __v: number
}









      //Get Staff Model //
      export class getStaffModel {
        nationality!: string;
        maritalStatus!: string;
      }

export interface getStaffResponseModel {
  success: boolean
  message: string
  data: Daum[]
  timestamp: string
}

export interface Daum {
  _id: string
  firstName: string
  lastName: string
  email: string
  employmentStatus: string
  numberOfChildren: number
  faceEmbedding: any[]
  password: string
  isFirstLogin: boolean
  isOrganizationalHead: boolean
  isUnitHead: boolean
  organization: Organization
  children: Children[]
  educationDetails: EducationDetail[]
  createdAt: string
  updatedAt: string
  __v: number
  refreshToken?: string
  supervisor: string
  gender: string
  nationality: string
  otherName: string
  idNumber: string
  idType: string
  maritalStatus: string
  phoneNumber: string
  employmentType: string
  jobTitle: string
  workLocation: string
  dateOfBirth: string
  unit: string
  profilePicture?: string
  hireDate?: string
  staffId?: string
  spouseName?: string
  spousePhone?: string
  spouseEmail?: string
  nextOfKinFullName?: string
  nextOfKinRelationship?: string
  nextOfKinPhoneNumber?: string
  nextOfKinEmail?: string
  nextOfKinCurrentAddress?: string
  emergencyContactFullName?: string
  emergencyContactRelationship?: string
  emergencyContactPhoneNumber?: string
  emergencyContactEmail?: string
  emergencyContactCurrentAddress?: string
  role?: string
  qrCode?: string
}

export interface Organization {
  _id: string
  name: string
  email: string
  location: string
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



