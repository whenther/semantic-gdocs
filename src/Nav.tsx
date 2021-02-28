import React from "react";
import {
  Container,
  Box,
  IconButton,
  Flex,
  useColorMode,
  Heading,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const Nav: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="nav" paddingY={3} background="purple.800">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Heading size="sm" color="white">
            Google Docs HTML Cleaner
          </Heading>

          <IconButton
            icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            aria-label={colorMode === "light" ? "Light Mode" : "Dark Mode"}
            onClick={() => toggleColorMode()}
          />
        </Flex>
      </Container>
    </Box>
  );
};
