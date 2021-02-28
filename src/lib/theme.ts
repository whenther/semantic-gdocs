import { extendTheme, Theme } from "@chakra-ui/react";

const config: Partial<Theme> = {
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      html: {
        height: "100%",
      },
      body: {
        height: "100%",
      },
      "#root": {
        height: "100%",
      },
    },
  },
};

export const theme = extendTheme(config);
