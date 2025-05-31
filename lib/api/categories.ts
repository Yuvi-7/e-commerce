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

    // Get all categories
    const categories = await db.collection("categories").find({}).toArray();

    // Get product counts for each category
    const categoryCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await db.collection("products").countDocuments({
          categoryId: category.id.toString(),
        });
        return {
          ...category,
          _id: category._id.toString(),
          count, // Add real product count
        };
      })
    );

    return categoryCounts;
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

      if (category) {
        // Get real product count for this category
        const count = await db.collection("products").countDocuments({
          categoryId: category.id.toString(),
        });

        return {
          ...category,
          _id: category._id.toString(),
          count, // Add real product count
        };
      }
    } catch (error) {
      // Fallback to string ID search
      category = await db.collection("categories").findOne({ id });
      
      if (category) {
        // Get real product count for this category
        const count = await db.collection("products").countDocuments({
          categoryId: category.id.toString(),
        });

        return {
          ...category,
          _id: category._id.toString(),
          count, // Add real product count
        };
      }
    }

    // If not found, return dummy data
    return getCategoryById(id);
  } catch (error) {
    console.error(`Failed to fetch category with id ${id}:`, error);
    // Fall back to dummy data on error
    return getCategoryById(id);
  }
}
