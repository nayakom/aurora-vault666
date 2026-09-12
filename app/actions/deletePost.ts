"use server";

export async function deleteBloggerPost(postId: string, accessToken: string) {
  try {
    const BLOG_ID = process.env.BLOGGER_BLOG_ID;
    
    if (!BLOG_ID) {
      return { success: false, error: "Blogger Blog ID missing in environment." };
    }

    if (!accessToken) {
      return { success: false, error: "Unauthorized. Please login with Google." };
    }

    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      console.error("Blogger API Delete Error Details:", data);
      return { success: false, error: data.error?.message || "Failed to delete post" };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Delete Error:", error);
    return { success: false, error: error.message };
  }
}
