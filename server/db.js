import mongoose from "mongoose"
import { MONGODB_URI } from './config.js'

export async function connectDB() {
  try {
    const db = await mongoose.connect(MONGODB_URI)
    console.log(`🔵 DB is connected to`, db.connection.db.databaseName)
  } catch (error) {
    console.error(error.message)
  }
}
