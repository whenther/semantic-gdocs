import React from "react";
import { Container, Flex, Link, Box } from "@chakra-ui/react";

export const Footer: React.FC = () => {
  return (
    <Box as="footer" paddingY={3} background="purple.800" color="white">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link href="https://twitter.com/WowItsWillWow" isExternal>
            Made by Will Ockelmann-Wagner
          </Link>

          <Link
            href="https://github.com/will-wow/semantic-gdocs/issues"
            isExternal
          >
            Issues?
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};
