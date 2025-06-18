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
  organization: Organization
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
  unitHead: UnitHead
  organization: Organization
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
  unitHead: UnitHead
  organization: Organization
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
  unitHead: UnitHead
  organization: Organization
  parentUnit: ParentUnit
  createdAt: string
  updatedAt: string
  __v: number
}





        // addUnitodel //
export class addUnitModel{
   name!: string;
  isSubUnit!: boolean;
  unitHead!: UnitHead;
  description!: string;
  parentUnit!: ParentUnit;
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
  unitHead: UnitHead
  organization: Organization
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
  
  institutionName!: string
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
  unitHead: UnitHead
  organization: Organization
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
  unitHead: UnitHead
  organization: Organization
  parentUnit: ParentUnit
  createdAt: string
  updatedAt: string
  __v: number
}

// editEducationModel
export class educationModel{
  id?: string;
  institutionName!: string
  courseOfStudy!: string
  startDate!: string
  endDate!: string
  //   _id?: string;
  // educationDetails!: educationModel[];
}

export interface EducationEntry {
  _id?: string; 
  institutionName: string;
  courseOfStudy: string;
  startDate: string;
  endDate: string;
}
export interface PatchEducationPayload {
  _id: string;
  educationDetails: EducationEntry[];
}














export class editStaffModel{
  _id!: string
  profilePicture!: string
  firstName!: string
  lastName!: string
  otherName!: string
  email!: string
  dateOfBirth!: string
  nationality!: string
  gender!: string
  idType!: string
  phoneNumber!: string
  idNumber!: string
  maritalStatus!: string

}


export interface editStaffResponseModel {
  profilePicture: string
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
  jobTitle: string
  unit: string[]
  employmentType: string
  hireDate: string
  workLocation: string
  staffId: string
  supervisor: string[]
  role: string
  emergencyContactFullName: string
  emergencyContactRelationship: string
  emergencyContactPhoneNumber: string
  emergencyContactEmail: string
  emergencyContactCurrentAddress: string
  spouseName: string
  spousePhone: string
  spouseEmail: string
  marriageCertificateUrl: string
  numberOfChildren: number
  children: Children[]
  educationDetails: EducationDetail[]
  nextOfKinFullName: string
  nextOfKinRelationship: string
  nextOfKinPhoneNumber: string
  nextOfKinEmail: string
  nextOfKinCurrentAddress: string
}

export interface Children {
  fullName: string
  dob: string
  birthCertificateUrl: string
}

export interface EducationDetail {
  institutionName: string
  courseOfStudy: string
  startDate: string
  endDate: string
  certificateUrl: string
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
  supervisor: Supervisor
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
  unit?: Unit
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



// AllStaffModel//
export class allStaffModel {
  unit!: string;
  search!: string;
  page!: number;
  pageSize!: number;
  gender!: string;
  maritalStatus!: string;
  employmentType!: string;
  workLocation!: string;
  staffStatus!: string;
}

export interface Root {
  message: string
  data: Daum[]
  pagination: Pagination
}

export interface Daum {
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
  unit?: Unit
  jobTitle: string
  employmentType: string
  hireDate?: string
  workLocation: string
  supervisor: Supervisor
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
  organization: Organization
  createdAt: string
  updatedAt: string
  __v: number
  qrCode?: string
  refreshToken?: string
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

export interface Supervisor {
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
  organization: Organization
  createdAt: string
  updatedAt: string
  __v: number
  qrCode?: string
  refreshToken?: string
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

export interface Children2 {
  fullName: string
  dob: string
  _id: string
}

export interface EducationDetail2 {
  institutionName: string
  courseOfStudy: string
  startDate: string
  endDate: string
  _id: string
}

export interface Pagination {
  total: number
  page: number
  pageSize: number
  totalPages: number
}




// export class editFamilyModel{
//    spouseName!: string
//   spousePhone!: string
//   spouseEmail!: string
//   numberOfChildren!: number
//   children!: Children[]
// }

// export interface editFamilyModel {
//   supervisor: {
//     _id: string;
//     spouseName: string;
//     spousePhone: string;
//     spouseEmail: string;
//     numberOfChildren: number;
//     children: Children[];
//   };
 
// }

//  export interface Child {
//   fullName: string;
//   dob: string; // or Date, depending on your API
//   _id: string;
// }

export interface Child {
  fullName: string;
  dob: string;
  _id?: string;
}

export interface editFamilyModel {
  supervisor: string[]; // ✅ now an array of MongoDB ObjectIds
  spouseName: string;
  spousePhone: string;
  spouseEmail: string;
  numberOfChildren: number;
  children: Children[];
}





