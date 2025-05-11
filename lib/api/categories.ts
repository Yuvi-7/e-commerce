import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getCategoryById, getDummyCategories } from "@/lib/data/categories"

export async function getCategories() {
  try {
    const { db } = await connectToDatabase()

    if (!db) {
      // If no database connection, return dummy data
      return getDummyCategories()
    }

    // With database connection, query MongoDB
    const categories = await db.collection("categories").find({}).toArray()
    return categories
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    // Fall back to dummy data on error
    return getDummyCategories()
  }
}

export async function getCategoryByIdFromDb(id: string) {
  try {
    const { db } = await connectToDatabase()

    if (!db) {
      // If no database connection, return dummy data
      return getCategoryById(id)
    }

    // With database connection, query MongoDB
    let objectId
    try {
      objectId = new ObjectId(id)
    } catch (error) {
      // If ID is not a valid ObjectId, try to find by string ID
      const category = await db.collection("categories").findOne({ id })
      if (category) return category
      return getCategoryById(id)
    }

    const category = await db.collection("categories").findOne({
      _id: objectId,
    })

    if (category) return category

    // If not found in database, try dummy data
    return getCategoryById(id)
  } catch (error) {
    console.error(`Failed to fetch category with id ${id}:`, error)
    // Fall back to dummy data on error
    return getCategoryById(id)
  }
}
