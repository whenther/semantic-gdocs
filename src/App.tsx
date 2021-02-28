import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <nav className="light-blue lighten-1" role="navigation">
        <div className="container">
          <div className="nav-wrapper">Semantic GDocs</div>
        </div>
      </nav>
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br />
          <br />
          <h1 className="header center orange-text">Semantic Google Docs</h1>
          <div className="row center">
            <h5 className="header col s12 light">
              Convert exported Google Docs HTML to semantic HTML
            </h5>
          </div>
          <div className="row center">
            <p>
              Google Docs can export a document as HTML. But if you want to
              import that HTML somewhere else, you'll have problems. This cleans
              up the Google Docs export (and will probably work on similar
              HTML), and gives you clean, semantic HTML that you can import into
              a rich text editor.
            </p>

            <p>
              In Google Docs, go to File {">"} Download As {">"} Webpage, open
              the HTML in a text editor, and copy the whole thing. Make sure to
              get everything, especially the head tag! Then paste it all in the
              <strong>Import</strong> box, and copy out clean HTML from the
              <strong>Semantic</strong> box. That's all there is to it! Note
              that you may see some funny characters - but it should render
              fine.
            </p>
          </div>
          <br />
          <br />
        </div>
      </div>

      <div className="container">
        <div className="section">
          {/* Icon Section */}
          <div className="row">
            <div className="col s12 m6">
              <h4>Input</h4>

              <textarea id="input"></textarea>
            </div>

            <div className="col s12 m6">
              <h4>Semantic Output</h4>

              <textarea id="output"></textarea>
            </div>

            <div id="input-zone" style={{ display: "none" }}></div>
          </div>
        </div>
      </div>

      <footer className="page-footer orange">
        <div className="footer-copyright">
          <div className="container">Made by Will Ockelmann-Wagner</div>
        </div>
      </footer>
    </ChakraProvider>
  );
};
