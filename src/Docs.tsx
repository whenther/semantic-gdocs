import React from "react";
import { Box, Code, Heading, Text, VStack } from "@chakra-ui/react";

export const Docs: React.FC = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" pt={4} pb={3}>
        Google Docs HTML Cleaner
      </Heading>

      <VStack align="stretch" spacing={3}>
        <Heading as="h5" size="md">
          Convert exported Google Docs HTML to clean, semantic HTML
        </Heading>

        <Text>
          Google Docs can export a document as HTML. But if you want to import
          that HTML somewhere else, you'll have problems. This cleans up the
          Google Docs export (and will probably work on similar HTML), and gives
          you clean, semantic HTML that you can import into a rich text editor.
        </Text>

        <Text>
          In Google Docs, go to File {">"} Download As {">"} Webpage. Then make
          sure to un-zip the downloaded zip file. Next, just grab the HTML file,
          drag it into this site, and drop it on the big button. The{" "}
          <Text as="strong"> Clean Output </Text> box should now show your
          cleaned-up HTML code! Just click the copy button to put it in your
          clipboard. That's all there is to it! Note that you may see some funny
          characters - but it should render fine.
        </Text>

        <Text>
          If you want to copy/paste in HTML, that works too! Just make sure to
          get everything, especially the <Code>{"<head>"}</Code> tag, then paste
          it all in the
          <Text as="strong"> Import </Text>
          box.
        </Text>
      </VStack>
    </Box>
  );
};
