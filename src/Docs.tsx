import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export const Docs: React.FC = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" pt={4} pb={3}>
        Semantic Google Docs
      </Heading>
      <Heading as="h5" size="md" pb={3}>
        Convert exported Google Docs HTML to semantic HTML
      </Heading>

      <Text pb={3}>
        Google Docs can export a document as HTML. But if you want to import
        that HTML somewhere else, you'll have problems. This cleans up the
        Google Docs export (and will probably work on similar HTML), and gives
        you clean, semantic HTML that you can import into a rich text editor.
      </Text>

      <Text>
        In Google Docs, go to File {">"} Download As {">"} Webpage. Then make
        sure to un-zip the downloaded zip file. Next, open the HTML in a text
        editor, and copy the whole thing. Make sure to get everything,
        especially the head tag! Then paste it all in the
        <Text as="strong"> Import </Text>
        box. The
        <Text as="strong"> Clean Output </Text> box should now show your cleaned
        HTML code. Just click the copy button to put it in your clipboard.
        That's all there is to it! Note that you may see some funny characters -
        but it should render fine.
      </Text>
    </Box>
  );
};
