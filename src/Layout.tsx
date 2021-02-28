import React from "react";
import { Box, Flex, Container } from "@chakra-ui/react";

import { Docs } from "./Docs";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Inputs } from "./Inputs";

export const Layout: React.FC = () => {
  return (
    <Flex height="100%" direction="column" justify="space-between">
      <Nav />
      <Box className="body" flex={1} overflow="auto">
        <Container
          maxW="container.xl"
          height="100%"
          display="flex"
          paddingY={3}
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box flex={1}>
            <Docs />
          </Box>
          <Inputs />
        </Container>
      </Box>
      <Footer />
    </Flex>
  );
};
