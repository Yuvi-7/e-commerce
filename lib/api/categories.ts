import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getCategoryById, getDummyCategories } from "@/lib/data/categories";

export async function getCategories() {
  try {
    const { db } = await connectToDatabase();

    if (!db) {
      // If no database connection, return dummy data
      return getDummyCategories();
    }

    // Query MongoDB
    const categories = await db.collection("categories").find({}).toArray();

    // Convert ObjectId to string for serialization
    const sanitized = categories.map((cat) => ({
      ...cat,
      _id: cat._id.toString(),
    }));

    return sanitized;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // Fall back to dummy data on error
    return getDummyCategories();
  }
}

export async function getCategoryByIdFromDb(id: string) {
  try {
    const { db } = await connectToDatabase();

    if (!db) {
      // If no database connection, return dummy data
      return getCategoryById(id);
    }

    let category;

    try {
      // Try to create ObjectId from string
      const objectId = new ObjectId(id);
      category = await db.collection("categories").findOne({ _id: objectId });
    } catch (error) {
      // Fallback to string ID search
      category = await db.collection("categories").findOne({ id });
    }

    if (category) {
      // Convert _id to string
      return {
        ...category,
        _id: category._id.toString(),
      };
    }

    // If not found, return dummy data
    return getCategoryById(id);
  } catch (error) {
    console.error(`Failed to fetch category with id ${id}:`, error);
    // Fall back to dummy data on error
    return getCategoryById(id);
  }
}
