import { useMemo, useState } from "react";
import { Card, BlockStack, Text, TextField, InlineStack, Button, Box } from "@shopify/polaris";
import ProductTodoItem from "./ProductTodoItem";

export default function ProductTodoList({ products, onBulkToggle, onToggleEnabled }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const list = products || [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((p) => p.title?.toLowerCase().includes(q));
  }, [products, query]);
  const total = products?.length || 0;

  return (
    <Card>
      <BlockStack gap="300">
        <InlineStack align="space-between" blockAlign="center">
          <BlockStack gap="050">
            <Text as="h3" variant="headingMd">Product Todos</Text>
            <Text as="span" tone="subdued">{total} products</Text>
          </BlockStack>
          <InlineStack gap="200">
            {onBulkToggle && (
              <>
                <Button onClick={() => onBulkToggle(filtered.map(p => p.id), true)} primary>Enable on visible</Button>
                <Button onClick={() => onBulkToggle(filtered.map(p => p.id), false)}>Disable on visible</Button>
              </>
            )}
          </InlineStack>
        </InlineStack>

        <TextField
          label="Search products"
          labelHidden
          value={query}
          onChange={setQuery}
          placeholder="Search by title"
          autoComplete="off"
        />

        <BlockStack gap="200">
          {filtered.map((p) => (
            <Box key={p.id} padding="300" borderWidth="025" borderRadius="200" borderColor="border" background="bg-surface">
              <ProductTodoItem product={p} onToggleEnabled={onToggleEnabled} />
            </Box>
          ))}
          {filtered.length === 0 && (
            <Text as="p" tone="subdued">No matching products.</Text>
          )}
        </BlockStack>
      </BlockStack>
    </Card>
  );
}


