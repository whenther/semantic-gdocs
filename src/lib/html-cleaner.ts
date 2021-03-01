import $ from "jquery";
import { html_beautify } from "js-beautify";

const STYLE_REGEX = /<style[^>]*>.*<\/style>/g;
const EMPTY_P_REGEX = /<p><\/p>/g;
const EMPTY_DIV_REGEX = /<div><\/div>/g;
const BR_REGEX = /<br\s*\/?>/g;

/**
 * Renders the HTML in an iframe, including style tags.
 * Then uses the styles from the css to replace <span>s with classes,
 * with semantic formatting like <em> and <strong>.
 */
export class HtmlCleaner {
  inputText: string = "";
  $iframe: JQuery<HTMLIFrameElement> = $(
    '<iframe id="input-zone" style="display: none" />'
  );
  styleTags: JQuery<HTMLStyleElement>[] = [];
  $input: JQuery = $('<div id="input"></div>');

  constructor() {
    $(document.body).append(this.$iframe);
    this.body.append(this.$input);
  }

  get body(): JQuery<HTMLBodyElement> {
    return this.$iframe.contents().find("body");
  }

  tearDown() {
    this.$iframe.remove();
  }

  pullStyleTagsIntoDom(): void {
    // Get all the style tags in the document
    const styleTags = this.inputText.match(STYLE_REGEX);

    if (!styleTags) return;

    // Append each style tag to the body of the page.
    styleTags.forEach((tag) => {
      const $tag = $<HTMLStyleElement>(tag);

      this.body.append($tag);
    });

    // Remove the style markup
    this.inputText = this.inputText.replace(STYLE_REGEX, "");
  }

  stripHeadTag() {
    // Strip out header tag
    this.inputText = this.inputText
      .replace("<!DOCTYPE html>", "")
      .replace("<html>", "")
      .replace("</html>", "")
      .replace(/<head[^>]*>.*<\/head>/g, "")
      .replace(/<body[^>]*>/, "")
      .replace("</body>", "");
  }

  putInputOntoDom() {
    this.$input.html(this.inputText);
  }

  /**
   * If an element has a specific CSS style,
   * wrap it in a semantic tag that applies the same style.
   */
  wrapElementWithStyle = (
    $element: JQuery,
    property: string,
    style: string,
    wrapper: string
  ) => {
    if ($element.css(property) === style) {
      $element.wrap(wrapper);
    }
  };

  makeElementSemantic($element: JQuery) {
    this.wrapElementWithStyle($element, "font-style", "italic", "<em></em>");
    this.wrapElementWithStyle(
      $element,
      "font-weight",
      "bold",
      "<strong></strong>"
    );
    this.wrapElementWithStyle(
      $element,
      "font-weight",
      "700",
      "<strong></strong>"
    );
    this.wrapElementWithStyle(
      $element,
      "text-decoration",
      "line-through",
      "<s></s>"
    );
    this.wrapElementWithStyle(
      $element,
      "text-decoration",
      "underline",
      "<u></u>"
    );
  }

  makeElementsSemantic() {
    this.$input.find("*").each((index, element) => {
      const $element = $(element);

      this.makeElementSemantic($element);
      $element.removeAttr("class");
    });
  }

  getOutputText = (withLineBreaks: boolean): string => {
    let output = this.$input
      .html()
      // remove the spans, since they should all be replaced by semantic tags
      .replace(/<span[^>]*>/g, "")
      .replace(/<\/span>/g, "");

    if (!withLineBreaks) {
      output = this.removeLineBreaks(output);
    }

    return this.cleanHtmlOutput(output);
  };

  removeLineBreaks = (output: string): string => {
    return output
      .replace(EMPTY_P_REGEX, "")
      .replace(EMPTY_DIV_REGEX, "")
      .replace(BR_REGEX, "");
  };

  cleanHtmlOutput(output: string) {
    return html_beautify(output);
  }

  cleanUp() {
    this.body.find("style").remove();
    this.$input.html("");
  }

  /** Process and clean incoming HTML. */
  processInput = (input: string, withLineBreaks: boolean): string => {
    this.inputText = input;

    if (!this.inputText) {
      return "";
    }

    this.pullStyleTagsIntoDom();
    this.stripHeadTag();
    this.putInputOntoDom();
    this.makeElementsSemantic();

    const output = this.getOutputText(withLineBreaks);

    this.cleanUp();

    return output;
  };
}

const cleaner = new HtmlCleaner();

/** Take some HTML input, put if in an iframe, process it, and return the cleaned text. */
export const processInput = (
  input: string,
  withLineBreaks: boolean
): string => {
  return cleaner.processInput(input, withLineBreaks);
};
