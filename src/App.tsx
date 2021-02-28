import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./lib/theme";
import { Layout } from "./Layout";

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Layout />
    </ChakraProvider>
  );
};
