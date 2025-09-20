import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    
    // Get the wearify_api_key from the database
    const shopSettings = await prisma.shopSettings.findUnique({
      where: { shop: session.shop },
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
