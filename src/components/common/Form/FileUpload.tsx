import React, { useRef } from 'react';

import { Button } from '@/components/common/Buttons';

interface FileUploadButtonProps {
  onFileUpload: (content: string) => void;
  className?: string;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  className,
  onFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          const content = event.target.result as string;
          resolve(content);
        } else {
          reject(new Error('Failed to read file content.'));
        }
      };

      reader.onerror = (event) => {
        reject(
          new Error(`Error reading file: ${event.target?.error?.message}`),
        );
      };

      reader.readAsText(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type === 'application/json') {
      const fileContent = await readFileContent(file);
      onFileUpload(fileContent);
    } else {
      // Handle invalid file type or no file selected
      console.error('Invalid file type. Please select a JSON file.');
    }

    // Reset the input field to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button
        theme="base"
        className={className}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload job description
      </Button>
    </>
  );
};
