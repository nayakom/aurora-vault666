"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function publishToBlogger(formData: any, accessToken: string, postId?: string) {
  try {

    const BLOG_ID = process.env.BLOGGER_BLOG_ID;
    
    if (!BLOG_ID) {
      return { success: false, error: "Blogger Blog ID missing in environment." };
    }

    if (!accessToken) {
      return { success: false, error: "Unauthorized. Please login with Google." };
    }

    // 1. Format the HTML Content
    let htmlContent = "";

    // Images
    if (formData.images && formData.images.length > 0) {
      htmlContent += `<div style="text-align: center;">\n`;
      formData.images.forEach((img: string) => {
        if (img.trim()) {
          htmlContent += `  <img src="${img}" style="max-width: 100%; height: auto;" />\n`;
        }
      });
      htmlContent += `</div>\n<br/>\n`;
    }

    // Description
    if (formData.description) {
      htmlContent += `<h2>Description</h2>\n<p>${formData.description.replace(/\n/g, '<br/>')}</p>\n<br/>\n`;
    }

    // Purpose / Usage
    if (formData.purpose) {
      htmlContent += `<h2>Purpose</h2>\n<p>${formData.purpose.replace(/\n/g, '<br/>')}</p>\n<br/>\n`;
    }

    // Features
    if (formData.features) {
      htmlContent += `<h2>Features</h2>\n<p>${formData.features.replace(/\n/g, '<br/>')}</p>\n<br/>\n`;
    }

    // Warranty
    if (formData.warranty) {
      htmlContent += `<h2>Warranty</h2>\n<p>${formData.warranty}</p>\n<br/>\n`;
    }

    // Specifications
    if (formData.specifications && formData.specifications.length > 0) {
      htmlContent += `<h2>Specifications</h2>\n<ul>\n`;
      formData.specifications.forEach((spec: any) => {
        if (spec.key && spec.value) {
          htmlContent += `  <li>${spec.key}: ${spec.value}</li>\n`;
        }
      });
      htmlContent += `</ul>\n<br/>\n`;
    }

    // Affiliates (We embed custom data attributes so our parser can read them later if needed)
    htmlContent += `<h2>Affiliate Links</h2>\n<div>\n`;
    if (formData.rating) {
      htmlContent += `  <div data-product-rating="${formData.rating}"></div>\n`;
    }
    const platforms = ['amazon', 'flipkart', 'myntra', 'meesho'];
    platforms.forEach((platform) => {
      const data = formData.affiliates[platform];
      if (data && data.url) {
        htmlContent += `  <a href="${data.url}" data-rating="${data.rating}">${platform.charAt(0).toUpperCase() + platform.slice(1)}</a><br/>\n`;
      }
    });
    htmlContent += `</div>\n`;

    const postBody: any = {
      kind: "blogger#post",
      title: formData.title,
      content: htmlContent,
    };

    if (postId) {
      postBody.id = postId;
      postBody.blog = { id: BLOG_ID };
    }

    if (formData.labels && formData.labels.trim() !== "") {
      postBody.labels = formData.labels.split(',').map((l: string) => l.trim()).filter((l: string) => l.length > 0);
    }

    // 2. Make the API Call to Blogger
    const url = postId 
      ? `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${postId}`
      : `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts`;
      
    const method = postId ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Blogger API Error Details:", data);
      return { success: false, error: data.error?.message || "Failed to publish" };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Publish Error:", error);
    return { success: false, error: error.message };
  }
}
