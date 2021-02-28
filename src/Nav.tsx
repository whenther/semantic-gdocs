import React from "react";
import { Container, Text, Box } from "@chakra-ui/react";

export const Nav: React.FC = () => {
  return (
    <Box as="nav" paddingY={3} background="purple" color="white">
      <Container maxW="container.xl">
        <Text>Semantic GDocs</Text>
      </Container>
    </Box>
  );
};
