import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/nextshop"
const options = {}

let client
let clientPromise: Promise<MongoClient>

// This is a wrapper to prevent errors when MongoDB is not connected
// It will use dummy data instead
export async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      // If no MongoDB URI is provided, return a mock DB object
      // that won't actually connect to a database
      console.log("No MongoDB URI provided, using dummy data")
      return {
        client: null,
        db: {
          collection: (name) => ({
            find: () => ({
              toArray: async () => {
                // Return dummy data based on collection name
                if (name === "products") {
                  return (await import("./data/products")).getDummyProducts()
                }
                if (name === "categories") {
                  return (await import("./data/categories")).getDummyCategories()
                }
                return []
              },
            }),
            findOne: async ({ _id }) => {
              // Return dummy data based on collection name and ID
              if (name === "products") {
                return (await import("./data/products")).getDummyProductById(_id.toString())
              }
              if (name === "categories") {
                return (await import("./data/categories")).getCategoryById(_id.toString())
              }
              return null
            },
            insertOne: async () => ({ insertedId: "dummy-id" }),
            updateOne: async () => ({ matchedCount: 1 }),
            deleteOne: async () => ({ deletedCount: 1 }),
          }),
        },
      }
    }

    // If MongoDB URI is provided, try to connect to the database
    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
      }
      clientPromise = global._mongoClientPromise
    } else {
      // In production mode, it's best to not use a global variable.
      client = new MongoClient(uri, options)
      clientPromise = client.connect()
    }

    const connectedClient = await clientPromise
    const db = connectedClient.db()

    return { client: connectedClient, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)

    // If connection fails, fall back to dummy data
    return {
      client: null,
      db: {
        collection: (name) => ({
          find: () => ({
            toArray: async () => {
              // Return dummy data based on collection name
              if (name === "products") {
                return (await import("./data/products")).getDummyProducts()
              }
              if (name === "categories") {
                return (await import("./data/categories")).getDummyCategories()
              }
              return []
            },
          }),
          findOne: async ({ _id }) => {
            // Return dummy data based on collection name and ID
            if (name === "products") {
              return (await import("./data/products")).getDummyProductById(_id.toString())
            }
            if (name === "categories") {
              return (await import("./data/categories")).getCategoryById(_id.toString())
            }
            return null
          },
          insertOne: async () => ({ insertedId: "dummy-id" }),
          updateOne: async () => ({ matchedCount: 1 }),
          deleteOne: async () => ({ deletedCount: 1 }),
        }),
      },
    }
  }
}
