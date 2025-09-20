import { useEffect, useState, useCallback } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  Page,
  Text,
  Card,
  Button,
  BlockStack,
  InlineStack,
  TextField,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import ProductTodoList from "../components/ProductTodoList";
import ImageStep from "../components/ImageStep";
import InstallExtensionStep from "../components/InstallExtensionStep";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const response = await admin.graphql(
    `#graphql
      query appProductsForTodos {
        products(first: 20, sortKey: UPDATED_AT) {
          nodes {
            id
            title
            featuredImage {
              url
              altText
            }
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            metafield(namespace: "wearify", key: "enabled") {
              value
            }
          }
        }
      }
    `,
  );
  const responseJson = await response.json();
  const products = responseJson?.data?.products?.nodes ?? [];

  // Get the wearify_api_key from the database
  const shopSettings = await prisma.shopSettings.findUnique({
    where: { shop: session.shop },
    select: { wearifyApiKey: true }
  });

  return { products, wearifyApiKey: shopSettings?.wearifyApiKey || null };
};

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  
  if (intent === "save-api-key") {
    const apiKey = formData.get("apiKey");
    if (apiKey) {
      await prisma.shopSettings.upsert({
        where: { shop: session.shop },
        update: { wearifyApiKey: apiKey },
        create: { 
          shop: session.shop,
          wearifyApiKey: apiKey 
        }
      });
    }
    return { ok: true };
  }
  
  if (intent === "toggle-mult") {
    const ids = JSON.parse(formData.get("ids") || "[]");
    const enable = formData.get("enable") === "true";
    const apiKey = formData.get("apiKey");
    if (Array.isArray(ids) && ids.length > 0) {
      const metafieldUpsert = await admin.graphql(
        `#graphql
        mutation upsertMetafields($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
            metafields { id key namespace }
            userErrors { field message }
          }
        }
        `,
        {
          variables: {
            metafields: [
              ...ids.map((gid) => ({
                ownerId: gid,
                namespace: "wearify",
                key: "enabled",
                type: "boolean",
                value: enable ? "true" : "false",
              })),
              ...(apiKey
                ? ids.map((gid) => ({
                    ownerId: gid,
                    namespace: "wearify",
                    key: "key",
                    type: "single_line_text_field",
                    value: String(apiKey),
                  }))
                : []),
            ],
          },
        },
      );
      await metafieldUpsert.json();
    }
    return { ok: true };
  }
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return {
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  };
};

export default function Index() {
  const { products, wearifyApiKey } = useLoaderData();
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";
  const productId = fetcher.data?.product?.id.replace(
    "gid://shopify/Product/",
    "",
  );

  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId, shopify]);
  const generateProduct = () => fetcher.submit({}, { method: "POST" });

  // Removed checkbox todo tracking

  const bulkToggleWearify = useCallback(
    (ids, enable) => {
      const form = new FormData();
      form.append("intent", "toggle-mult");
      form.append("ids", JSON.stringify(ids));
      form.append("enable", String(enable));
      if (wearifyApiKey) {
        form.append("apiKey", wearifyApiKey);
      }
      fetcher.submit(form, { method: "POST", navigate: false, preventScrollReset: true, replace: true });
    },
    [fetcher, wearifyApiKey],
  );

  const toggleEnabled = useCallback(
    (id, enable) => {
      bulkToggleWearify([id], enable);
    },
    [bulkToggleWearify],
  );

  const [step, setStep] = useState(1);
  const [apiKeyInput, setApiKeyInput] = useState("");

  useEffect(() => {
    if (wearifyApiKey) {
      setApiKeyInput(wearifyApiKey);
      setStep(2);
    }
  }, [wearifyApiKey]);

  const handleNext = useCallback(() => {
    if (!apiKeyInput?.trim()) return;
    const form = new FormData();
    form.append("intent", "save-api-key");
    form.append("apiKey", apiKeyInput.trim());
    fetcher.submit(form, { method: "POST", navigate: false, preventScrollReset: true, replace: true });
    setStep(2);
  }, [apiKeyInput, fetcher]);

  return (
    <Page>
      <BlockStack gap="500">
        {step === 1 && (
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">Enter your key</Text>
              <TextField
                label="Key"
                labelHidden
                value={apiKeyInput}
                onChange={setApiKeyInput}
                autoComplete="off"
                placeholder="Enter your key"
                id="wearify-api-key"
              />
              <InlineStack gap="300">
                <Button primary onClick={handleNext} disabled={!apiKeyInput?.trim()}>Next</Button>
              </InlineStack>
            </BlockStack>
          </Card>
        )}
        {step === 2 && (
          <BlockStack gap="300">
            <InlineStack gap="300">
              <Button onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(4)}>How to install</Button>
            </InlineStack>
            <ProductTodoList
              products={products}
              onBulkToggle={bulkToggleWearify}
              onToggleEnabled={toggleEnabled}
            />
          </BlockStack>
        )}
        {step === 3 && (
          <ImageStep onBack={() => setStep(2)} onNext={() => setStep(4)} />
        )}
        {step === 4 && (
          <InstallExtensionStep onBack={() => setStep(2)} />
        )}
      </BlockStack>
    </Page>
  );
}
