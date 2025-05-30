export class unitModel{
    search!: string;
    page!: string;
    pageSize!: string;
}

export interface Root {
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
  parentUnit?: string
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

       
      // editModel//
export class updateUnitModel {
  id!: '683727b5a625599a49949573';
  name!: string;
  description!: string;
  unitHead?: string;        
  organization?: string;     
  parentUnit?: string;      
}

export interface Root {
  success: boolean;
  message: string;
  timestamp: string;
  // data: Data;
}

export interface Data {
  _id: string;
  name: string;
  description: string;
  isSubUnit: boolean;
  unitHead: UnitHead;
  organization: Organization;
  parentUnit: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UnitHead {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Organization {
  _id: string;
  name: string;
  location: string;
  email: string;
}

