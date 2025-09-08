import { Card, BlockStack, Text, InlineStack, Button, Link } from "@shopify/polaris";

export default function InstallExtensionStep({ onBack }) {
  return (
    <Card>
      <BlockStack gap="300">
        <Text as="h2" variant="headingMd">Install the Wearify extension</Text>
        <Text as="p" tone="subdued">
          1. Go to your Shopify theme editor and open the product template.
        </Text>
        <Text as="p" tone="subdued">
          2. Click Add block and search for "Wearify Try On". Add it to your product section.
        </Text>
        <Text as="p" tone="subdued">
          3. Save the theme. The extension will render only on products you enabled.
        </Text>
        <InlineStack gap="300">
          <Button onClick={onBack}>Back</Button>
          <Button url="shopify:admin/themes/current/editor" target="_blank" primary>Open Theme Editor</Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}


