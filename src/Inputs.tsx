import React, {
  ChangeEventHandler,
  useEffect,
  useState,
  forwardRef,
  useRef,
} from "react";
import {
  Box,
  Grid,
  Heading,
  Textarea,
  TextareaProps,
  HeadingProps,
  Flex,
  Button,
  useToast,
  ButtonProps,
  Checkbox,
  HStack,
  Tooltip,
} from "@chakra-ui/react";

import { processInput } from "./lib/html-cleaner";
import { DropButton } from "./Dropzone";

export const Inputs: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [removeLineBreaks, setRemoveLineBreaks] = useState(true);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast();

  useEffect(() => {
    const newOutput = processInput(input, !removeLineBreaks);
    setOutput(newOutput);
  }, [input, removeLineBreaks]);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.target.name === "input") {
      setInput(event.target.value);
    } else {
      setOutput(event.target.value);
    }
  };

  const handleRemoveLineBreaks: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setRemoveLineBreaks(event.target.checked);
  };

  const handleCopy = () => {
    copyElement(outputRef.current);
    toast({
      title: "Output Copied!",
      description: "You can now paste it wherever.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box pb={3}>
        <DropButton
          colorScheme="purple"
          variant="outline"
          whenDragging="Drop your HTML file here!"
          isFullWidth
          onChange={setInput}
        >
          Drag HTML files here, or click to open a file picker
        </DropButton>
      </Box>

      <Grid as="section" templateColumns="repeat(2, 1fr)" gap={3}>
        <Box>
          <Flex justify="space-between" align="center" pb={2}>
            <InputHeading>Import</InputHeading>

            <SmallButton disabled={!input} onClick={() => setInput("")}>
              Clear
            </SmallButton>
          </Flex>

          <InputTextArea
            name="input"
            placeholder="You can paste HTML here."
            value={input}
            onChange={handleChange}
          />
        </Box>

        <Box>
          <Flex justify="space-between" align="center" pb={2}>
            <HStack>
              <InputHeading>Clean Output</InputHeading>

              <Tooltip
                label="If checked, remove any extra line breaks between paragraphs."
                hasArrow
                placement="top-start"
              >
                <span tabIndex={0}>
                  <Checkbox
                    colorScheme="purple"
                    isChecked={removeLineBreaks}
                    onChange={handleRemoveLineBreaks}
                  >
                    Remove Line Breaks
                  </Checkbox>
                </span>
              </Tooltip>
            </HStack>

            <SmallButton disabled={!output} onClick={handleCopy}>
              Copy
            </SmallButton>
          </Flex>

          <InputTextArea
            placeholder="Your clean HTML will show up here."
            name="output"
            value={output}
            onChange={handleChange}
            ref={outputRef}
          />
        </Box>
      </Grid>
    </>
  );
};

const InputHeading: React.FC<HeadingProps> = (props) => {
  return <Heading as="h2" size="md" {...props}></Heading>;
};

const InputTextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return (
      <Textarea
        minHeight="200px"
        fontFamily="mono"
        fontSize="sm"
        ref={ref}
        {...props}
      />
    );
  }
);

const SmallButton: React.FC<ButtonProps> = (props) => {
  return <Button colorScheme="purple" size="xs" name="output" {...props} />;
};

const copyElement = (textarea: HTMLTextAreaElement | null) => {
  if (!textarea) return;

  textarea.select();
  textarea.setSelectionRange(0, 99999); /* For mobile devices */

  document.execCommand("copy");
};
