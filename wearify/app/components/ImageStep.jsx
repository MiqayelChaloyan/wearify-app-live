import { useState, useCallback } from "react";
import { Card, BlockStack, Text, InlineStack, Button, Thumbnail } from "@shopify/polaris";

export default function ImageStep({ onBack, onNext }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = useCallback((event) => {
    const selected = Array.from(event.target.files || []);
    setFiles(selected);
  }, []);

  return (
    <Card>
      <BlockStack gap="300">
        <Text as="h2" variant="headingMd">Add product images</Text>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        <BlockStack gap="200">
          {files.map((file) => (
            <InlineStack key={file.name} gap="200" blockAlign="center">
              <Thumbnail size="small" source={URL.createObjectURL(file)} alt={file.name} />
              <Text as="span" tone="subdued">{file.name}</Text>
            </InlineStack>
          ))}
          {files.length === 0 && (
            <Text as="span" tone="subdued">No images selected yet.</Text>
          )}
        </BlockStack>
        <InlineStack gap="300">
          <Button onClick={onBack}>Back</Button>
          <Button primary onClick={onNext} disabled={files.length === 0}>Next</Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}







