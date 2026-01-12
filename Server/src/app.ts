import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import gigRouter from "./routes/gig.route.js"
import bidRouter from "./routes/bid.route.js"

app.use("/api/users", userRouter)
app.use("/api/gigs", gigRouter)
app.use("/api/bids", bidRouter)

export { app };