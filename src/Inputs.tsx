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
} from "@chakra-ui/react";

import { processInput } from "./lib/semantic-gdocs";

export const Inputs: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast();

  useEffect(() => {
    processInput(input).then(setOutput);
  }, [input]);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.target.name === "input") {
      setInput(event.target.value);
    } else {
      setOutput(event.target.value);
    }
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
      <Grid as="section" templateColumns="repeat(2, 1fr)" gap={3}>
        <Box>
          <InputHeading>Input</InputHeading>

          <InputTextArea value={input} name="input" onChange={handleChange} />
        </Box>

        <Box>
          <Flex justify="space-between" align="center">
            <InputHeading>Clean Output</InputHeading>
            <Button
              disabled={!output}
              colorScheme="purple"
              size="xs"
              name="output"
              onClick={handleCopy}
            >
              Copy
            </Button>
          </Flex>

          <InputTextArea
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
  return <Heading as="h2" size="md" pb={2} {...props}></Heading>;
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

const copyElement = (textarea: HTMLTextAreaElement | null) => {
  if (!textarea) return;

  textarea.select();
  textarea.setSelectionRange(0, 99999); /* For mobile devices */

  document.execCommand("copy");
};
