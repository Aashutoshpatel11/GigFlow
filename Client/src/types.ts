export interface User {
  _id: string
  name: string
  email: string
}

export interface Gig {
  _id: string
  title: string
  description: string
  budget: number
  ownerId: User | string
  status: "open" | "assigned"
  createdAt: string
  updatedAt: string
}

export interface Bid {
  _id: string
  gigId: string
  freelancerId: User 
  message: string
  price: number
  status: "pending" | "hired" | "rejected"
  createdAt: string
}