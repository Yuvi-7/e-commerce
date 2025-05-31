import { MongoClient, ObjectId } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/eshop"
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

type CollectionName = "products" | "categories" | "users" | "addresses" | "orders" | "cart"
type Query = {
  _id?: string | ObjectId
  id?: string
  email?: string
}

type ProjectionType = {
  projection?: Record<string, number>
}

type DummyData = Record<string, any>

// This is a wrapper to prevent errors when MongoDB is not connected
// It will use dummy data instead
export async function connectToDatabase() {
  console.log('called m')
  try {
    if (!process.env.MONGODB_URI) {
      // If no MongoDB URI is provided, return a mock DB object
      // that won't actually connect to a database
      console.log("No MongoDB URI provided, using dummy data")
      return {
        client: null,
        db: {
          collection: (name: CollectionName) => ({
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
              project: () => ({
                toArray: async () => {
                  // Return dummy data based on collection name
                  if (name === "users") {
                    return [
                      { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" },
                      { id: "2", name: "Customer User", email: "customer@example.com", role: "customer" },
                    ]
                  }
                  return []
                },
              }),
            }),
            findOne: async (query: Query, options?: ProjectionType) => {
              // Return dummy data based on collection name and query
              let result: DummyData | null = null;
              
              if (name === "products") {
                if (query._id) {
                  const data = await (await import("./data/products")).getDummyProductById(query._id.toString())
                  result = data || null
                }
                if (query.id) {
                  const data = await (await import("./data/products")).getDummyProductById(query.id)
                  result = data || null
                }
              }
              if (name === "categories") {
                if (query._id) {
                  const data = await (await import("./data/categories")).getCategoryById(query._id.toString())
                  result = data || null
                }
                if (query.id) {
                  const data = await (await import("./data/categories")).getCategoryById(query.id)
                  result = data || null
                }
              }
              if (name === "users") {
                if (query.email === "admin@example.com") {
                  result = {
                    _id: "1",
                    name: "Admin User",
                    email: "admin@example.com",
                    password: "$2b$10$XfAeSU/ZzIhQ6q5AF9HyEOFOeHBGoVjXEDbEucwGdIUO.g0LH1.Oa", // hashed "password"
                    role: "admin",
                  }
                }
                if (query.email === "customer@example.com") {
                  result = {
                    _id: "2",
                    name: "Customer User",
                    email: "customer@example.com",
                    password: "$2b$10$XfAeSU/ZzIhQ6q5AF9HyEOFOeHBGoVjXEDbEucwGdIUO.g0LH1.Oa", // hashed "password"
                    role: "customer",
                  }
                }
              }

              // Apply projection if specified
              if (result && options?.projection) {
                const filtered: DummyData = {};
                for (const key in result) {
                  if (options.projection[key] !== 0) {
                    filtered[key] = result[key];
                  }
                }
                return filtered;
              }

              return result;
            },
            insertOne: async (data: unknown) => ({ insertedId: "dummy-id" }),
            updateOne: async () => ({ matchedCount: 1 }),
            updateMany: async () => ({ matchedCount: 1 }),
            deleteOne: async () => ({ deletedCount: 1 }),
            countDocuments: async () => 0,
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
        collection: (name: CollectionName) => ({
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
            project: () => ({
              toArray: async () => {
                // Return dummy data based on collection name
                if (name === "users") {
                  return [
                    { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" },
                    { id: "2", name: "Customer User", email: "customer@example.com", role: "customer" },
                  ]
                }
                return []
              },
            }),
          }),
          findOne: async (query: Query, options?: ProjectionType) => {
            // Return dummy data based on collection name and query
            let result: DummyData | null = null;
              
            if (name === "products") {
              if (query._id) {
                const data = await (await import("./data/products")).getDummyProductById(query._id.toString())
                result = data || null
              }
              if (query.id) {
                const data = await (await import("./data/products")).getDummyProductById(query.id)
                result = data || null
              }
            }
            if (name === "categories") {
              if (query._id) {
                const data = await (await import("./data/categories")).getCategoryById(query._id.toString())
                result = data || null
              }
              if (query.id) {
                const data = await (await import("./data/categories")).getCategoryById(query.id)
                result = data || null
              }
            }
            if (name === "users") {
              if (query.email === "admin@example.com") {
                result = {
                  _id: "1",
                  name: "Admin User",
                  email: "admin@example.com",
                  password: "$2b$10$XfAeSU/ZzIhQ6q5AF9HyEOFOeHBGoVjXEDbEucwGdIUO.g0LH1.Oa", // hashed "password"
                  role: "admin",
                }
              }
              if (query.email === "customer@example.com") {
                result = {
                  _id: "2",
                  name: "Customer User",
                  email: "customer@example.com",
                  password: "$2b$10$XfAeSU/ZzIhQ6q5AF9HyEOFOeHBGoVjXEDbEucwGdIUO.g0LH1.Oa", // hashed "password"
                  role: "customer",
                }
              }
            }

            // Apply projection if specified
            if (result && options?.projection) {
              const filtered: DummyData = {};
              for (const key in result) {
                if (options.projection[key] !== 0) {
                  filtered[key] = result[key];
                }
              }
              return filtered;
            }

            return result;
          },
          insertOne: async (data: unknown) => ({ insertedId: "dummy-id" }),
          updateOne: async () => ({ matchedCount: 1 }),
          updateMany: async () => ({ matchedCount: 1 }),
          deleteOne: async () => ({ deletedCount: 1 }),
          countDocuments: async () => 0,
        }),
      },
    }
  }
}
