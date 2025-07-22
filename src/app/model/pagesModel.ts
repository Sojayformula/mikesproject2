//import { Child } from "../modelchild/modelchild";

export class unitModel{
    search!: string;
    page!: number;
    pageSize!: number;
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
  _id?: string;
   name!: string;
  isSubUnit!: boolean;
  unitHead!: string;
  description!: string;
  parentUnit!: ParentUnit;
}

export interface ParentUnit {
  _id: string;
  name: string; 
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



  //  ADD NEW StAFF MODEL //
// export class addNewStaffModel{
//  _id?: string;
//  profilePicture!: string;
//   firstName!: string;
//   lastName!: string;
//   otherName!: string;
//   email!: string;
//   dateOfBirth!: string;
//   nationality!: string;
//   gender!: string;
//   idType!: string;
//   phoneNumber!: string;
//   idNumber!: string;
//   maritalStatus!: string;
//   jobTitle!: string;
//   unit!: string[]; 
//   employmentType!: string;
//   hireDate!: string;
//   workLocation!: string;
//   staffId!: string;
//   supervisor!: string[]; 
//   role!: string; 
//   emergencyContactFullName!: string;
//   emergencyContactRelationship!: string;
//   emergencyContactPhoneNumber!: string;
//   emergencyContactEmail!: string;
//   emergencyContactCurrentAddress!: string;
//   spouseName!: string;
//   spousePhone!: string;
//   spouseEmail!: string;
//   marriageCertificateUrl!: string;
//   numberOfChildren!: number;
//   children!: Child[];
//   //educationDetails!: EducationDetail[];
//   nextOfKinFullName!: string;
//   nextOfKinRelationship!: string;
//   nextOfKinPhoneNumber!: string;
//   nextOfKinEmail!: string;
//   nextOfKinCurrentAddress!: string;

//   // institutionName!: string
//   // courseOfStudy!: string
//   // startDate!: string
//   // endDate!: string
//     educationDetails!: [
//     { institutionName: '', courseOfStudy: '', startDate: '', endDate: '' },
//     { institutionName: '', courseOfStudy: '', startDate: '', endDate: '' },
//   ]
//   // children!: [
//   //   { fullName: '', dob: '' },
//   //   { fullName: '', dob: '' }
//   // ]
// }
export class addNewStaffModel {
  _id?: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  email?: string;
  dateOfBirth?: string;
  nationality?: string;
  gender?: string;
  idType?: string;
  phoneNumber?: string;
  idNumber?: string;
  maritalStatus?: string;
  jobTitle?: string;
  unit?: string[]; 
  employmentType?: string;
  hireDate?: string;
  workLocation?: string;
  staffId?: string;
  supervisor?: string[]; 
  role?: string; 

  emergencyContactFullName?: string;
  emergencyContactRelationship?: string;
  emergencyContactPhoneNumber?: string;
  emergencyContactEmail?: string;
  emergencyContactCurrentAddress?: string;

  spouseName?: string;
  spousePhone?: string;
  spouseEmail?: string;
  marriageCertificateUrl?: string;

  numberOfChildren?: number;
  children?: Child[];

  educationDetails?: EducationDetail[];

  nextOfKinFullName?: string;
  nextOfKinRelationship?: string;
  nextOfKinPhoneNumber?: string;
  nextOfKinEmail?: string;
  nextOfKinCurrentAddress?: string;
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


export interface Doum {
  _id: string
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

export interface Child {
  fullName: string;
  dob: string;
}




export interface EditEmploymentModel {
  _id: string;
  employmentType: string;
  jobTitle: string;
  staffId: string
  unit: string[]; 
  hireDate: string;
  workLocation: string;
  //supervisor: string[]; 
  //educationDetails: EducationDetail[];
}

export interface EditProfileNextOfKinModel {
  _id: string;
  employmentType: string;
  jobTitle: string;
  unit: string[]; 
  hireDate: string;
  workLocation: string;
  supervisor: string[]; 
  educationDetails: EducationDetail[];
}

export interface EducationDetail {
  educationDetails: EducationDetail[];
  institutionName: string;
  courseOfStudy: string;
  startDate: string;
  endDate: string;
  _id: string;
  // certificateUrl: string;
}


export interface EditEmmergencyModel {
  _id: string;
   emergencyContactFullName: string
  emergencyContactRelationship: string
  emergencyContactPhoneNumber: string
  emergencyContactEmail: string
  emergencyContactCurrentAddress: string
 
}

export interface EditNextOfKingsModel {
  _id: string;
   nextOfKinFullName: string
  nextOfKinRelationship: string
  nextOfKinPhoneNumber: string
  nextOfKinEmail: string
  nextOfKinCurrentAddress: string
 
}

// education.model.ts
export interface EducationDetailModel {
  institutionName: string;
  courseOfStudy: string;
  startDate: string;
  endDate: string;
  _id?: string
}















      //Get Staff Model //
      export class getStaffModel {
        // nationality!: string;
        // maritalStatus!: string;
         firstName!: string
         lastName!: string
          email!: string
           gender!: string
          nationality!: string
          otherName!: string
          idNumber!: string
          idType!: string
          maritalStatus!: string
          phoneNumber!: string
          dateOfBirth!: string
         supervisor!: Supervisor

      }




export interface getStaffResponseModel {
  success: boolean
  message: string
  data: Daum[]
  timestamp: string
}

export interface  Daum   {
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
  _id!: string
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

export interface responseDaumModel {
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




export interface Child {
  fullName: string;
  dob: string;
  _id?: string;
}

export interface editFamilyModel {
  // supervisor: string[]; 
  // spouseName: string;
  // spousePhone: string;
  // spouseEmail: string;
  // numberOfChildren: number;
  // children: Children[];
   _id?: string;
  spouseName: string;
  spousePhone: string;
  spouseEmail: string;
  numberOfChildren: number;
  children: {
    fullName: string;
    dob: string;
    _id?: string;
  }[];
}






