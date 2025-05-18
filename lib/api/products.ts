import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getDummyProductById, getDummyProducts } from "@/lib/data/products"

export async function getProducts(categoryId?: string) {
  try {
    const { db } = await connectToDatabase()

    if (!db) {
      // If no database connection, return dummy data
      return getDummyProducts(categoryId)
    }

    // With database connection, query MongoDB
    let query = {}
    if (categoryId) {
      query = { categoryId }
    }

    const products = await db.collection("products").find(query).toArray()
    return products
  } catch (error) {
    console.error("Failed to fetch products:", error)
    // Fall back to dummy data on error
    return getDummyProducts(categoryId)
  }
}

export async function getProductById(id: string) {
  try {
    const { db } = await connectToDatabase()

    if (!db) {
      // If no database connection, return dummy data
      return getDummyProductById(id)
    }

    // With database connection, query MongoDB
    let objectId
    try {
      objectId = new ObjectId(id)
    } catch (error) {
      // If ID is not a valid ObjectId, try to find by string ID
      const product = await db.collection("products").findOne({ id })
      if (product) return product
      return getDummyProductById(id)
    }

    const product = await db.collection("products").findOne({
      _id: objectId,
    })

    if (product) return product

    // If not found in database, try dummy data
    return getDummyProductById(id)
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error)
    // Fall back to dummy data on error
    return getDummyProductById(id)
  }
}
