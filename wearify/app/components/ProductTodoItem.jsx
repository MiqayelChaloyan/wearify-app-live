import { useMemo } from "react";
import { InlineStack, Text, Thumbnail, BlockStack, Badge, Button } from "@shopify/polaris";

export default function ProductTodoItem({ product, onToggleEnabled }) {
  const image = product?.featuredImage?.url;
  const alt = product?.featuredImage?.altText || product?.title || "Product image";
  const price = useMemo(() => {
    const amount = product?.priceRangeV2?.minVariantPrice?.amount;
    const code = product?.priceRangeV2?.minVariantPrice?.currencyCode;
    if (!amount) return undefined;
    return `${Number(amount).toFixed(2)} ${code || ""}`.trim();
  }, [product]);
  const enabled = product?.metafield?.value === true || product?.metafield?.value === 'true';

  return (
    <InlineStack align="space-between" blockAlign="center" gap="300">
      <InlineStack gap="300" blockAlign="center">
        <Thumbnail source={image} alt={alt} size="small" />
        <BlockStack gap="050">
          <Text as="span" variant="bodyMd">{product.title}</Text>
          {price && (
            <Text as="span" tone="subdued">
              {price}
            </Text>
          )}
        </BlockStack>
      </InlineStack>
      <InlineStack gap="200" blockAlign="center">
        {enabled ? <Badge tone="success">Enabled</Badge> : <Badge>Disabled</Badge>}
        {onToggleEnabled && (
          <Button onClick={() => onToggleEnabled(product.id, !enabled)}>{enabled ? 'Disable' : 'Enable'}</Button>
        )}
      </InlineStack>
    </InlineStack>
  );
}


