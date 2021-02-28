import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, ButtonProps } from "@chakra-ui/react";

export interface DropButtonProps extends Omit<ButtonProps, "onChange"> {
  children: React.ReactNode;
  whenDragging: React.ReactNode;
  noDrag?: boolean;
  noClick?: boolean;
  onChange: (input: string) => void;
}

export const DropButton: React.FC<DropButtonProps> = ({
  children = "",
  whenDragging = "",
  noDrag = false,
  noClick = false,
  onChange,
  ...props
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();

        reader.onload = () => {
          onChange(reader.result as string);
        };

        reader.readAsText(file);
      });
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: ".html",
    noDrag,
    noClick,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button {...props}>{isDragActive ? whenDragging : children}</Button>
    </div>
  );
};
