import React from "react";
import { Container, Text, Box } from "@chakra-ui/react";

export const Footer: React.FC = () => {
  return (
    <Box as="footer" paddingY={3} background="purple" color="white">
      <Container maxW="container.xl">
        <Text>Made by Will Ockelmann-Wagner</Text>
      </Container>
    </Box>
  );
};
