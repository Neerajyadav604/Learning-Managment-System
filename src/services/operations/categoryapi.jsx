import { toast } from "react-hot-toast";
import { apiconnector } from "../Apiconector";
import { categoryEndpoints } from "../apis";

const {
  CREATE_CATEGORY_API,
  GET_ALL_CATEGORIES_API,
  GET_CATEGORY_DETAILS_API,
} = categoryEndpoints;

// Create a new category (Admin only)
export async function createCategory(token, categoryData) {
  const toastId = toast.loading("Creating category...");
  let result = null;
  
  try {
    const response = await apiconnector(
      "POST",
      CREATE_CATEGORY_API,
      categoryData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Category created successfully");
    result = response.data;
  } catch (error) {
    console.log("CREATE CATEGORY API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not create category");
  }
  
  toast.dismiss(toastId);
  return result;
}

// Get all categories
export async function getAllCategories(token) {
  let result = [];
  
  try {
    const response = await apiconnector(
      "GET",
      GET_ALL_CATEGORIES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.categories || response.data.data || [];
  } catch (error) {
    console.log("GET ALL CATEGORIES API ERROR:", error);
    toast.error("Could not fetch categories");
  }
  
  return result;
}

// Get category details by ID
export async function getCategoryDetails(token, categoryId) {
  const toastId = toast.loading("Loading category details...");
  let result = null;

  try {
    const response = await apiconnector(
      "POST",                       // change from GET to POST
      GET_CATEGORY_DETAILS_API,      // endpoint URL (no categoryId in path)
      { categoryId },                // send categoryId in the body
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    );
    result = response.data;
  } catch (error) {
    console.log(error);
  }

  toast.dismiss(toastId);
  return result;
}


// Update category (Admin only) - if you have this route
export async function updateCategory(token, categoryId, categoryData) {
  const toastId = toast.loading("Updating category...");
  let result = null;
  
  try {
    const response = await apiconnector(
      "PUT",
      `${CREATE_CATEGORY_API}/${categoryId}`,
      categoryData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Category updated successfully");
    result = response.data;
  } catch (error) {
    console.log("UPDATE CATEGORY API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not update category");
  }
  
  toast.dismiss(toastId);
  return result;
}

// Delete category (Admin only) - if you have this route
export async function deleteCategory(token, categoryId) {
  const toastId = toast.loading("Deleting category...");
  let result = false;
  
  try {
    const response = await apiconnector(
      "DELETE",
      `${CREATE_CATEGORY_API}/${categoryId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Category deleted successfully");
    result = true;
  } catch (error) {
    console.log("DELETE CATEGORY API ERROR:", error);
    toast.error(error?.response?.data?.message || "Could not delete category");
  }
  
  toast.dismiss(toastId);
  return result;
}