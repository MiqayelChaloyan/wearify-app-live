import { json } from "@remix-run/node";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  try {
    // Extract shop from the request URL or headers
    const url = new URL(request.url);
    const shop = url.searchParams.get('shop');
    
    if (!shop) {
      return json({ 
        apiKey: null, 
        success: false, 
        error: "Shop parameter is required" 
      }, { status: 400 });
    }

    // Get the wearify_api_key from the database
    const shopSettings = await prisma.shopSettings.findUnique({
      where: { shop: shop },
      select: { wearifyApiKey: true }
    });

    return json({ 
      apiKey: shopSettings?.wearifyApiKey || null,
      success: true 
    });
  } catch (error) {
    console.error("Error fetching wearify API key:", error);
    return json({ 
      apiKey: null, 
      success: false, 
      error: "Failed to fetch API key" 
    }, { status: 500 });
  }
};
