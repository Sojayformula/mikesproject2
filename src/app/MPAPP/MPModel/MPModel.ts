//   CREATE TICKET MODEL //
export interface Root {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  subject: string
  description: string
  priority: string
  status: string
  organizationId: string
  source: string
  comments: any[]
  unitId: string
  createdBy: string
  threadMessageIds: any[]
  taggedUsers: string[]
  unwatchedUserIds: any[]
  docUrls: any[]
  placeholders: Placeholders
  _id: string
  ref: string
  emailThread: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Placeholders {
  Institution: string
  "Phone Number": string
  "Customer Type": string
  "Issue Channel": string
}


// CREATE TICKET //
export class ticketModel {
     description!: string
      subject!: string
      priority!: string
      status!: string
}



//   MANAGE TICKET TABLE MODEL //
export class tableDataModel {
  search!: string
  status!: string
  priority!: string
  startDate!: string
  endDate!: string
  page: number = 1
  pageSize: number = 10
}

export interface Daum {
  _id: string
  subject: string
  description: string
  priority: string
  status: string
  organizationId: string
  source: string
  comments: Comment[]
  unitId: string
  createdBy: CreatedBy
  threadMessageIds: any[]
  taggedUsers: TaggedUser[]
  unwatchedUserIds: string[]
  docUrls: any[]
  placeholders: Placeholders
  ref: string
  emailThread: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Comment {
  _id: string
  ticketId: string
  comment: string
  createdBy: string
  organizationId: string
  parentCommentId: any
  replies: string[]
  createdAt: string
  updatedAt: string
  __v: number
  createdByName?: string
}

export interface CreatedBy {
  _id: string
  firstName: string
  lastName: string
  email: string
  profileUrl: any
}

export interface TaggedUser {
  _id: string
  firstName: string
  lastName: string
  email?: string
  profileUrl: any
}

export interface Placeholders {}

export interface Pagination {
  total: number
  page: string
  pageSize: string
  totalPages: number
}

