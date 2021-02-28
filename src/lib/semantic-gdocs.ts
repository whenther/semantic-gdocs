import $ from "jquery";

const STYLE_REGEX = /<style[^>]*>.*<\/style>/g;
const $BODY = $("body");

let inputText: string;
let $inputZone: JQuery = $("#input-zone");
let $styleTags: JQuery<HTMLStyleElement>[];
let $input: JQuery;

const pullStyleTagsIntoDom = () => {
  // Get all the style tags in the document
  const styleTags = inputText.match(STYLE_REGEX);

  // Reset $styleTags;
  $styleTags = [] as JQuery<HTMLStyleElement>[];

  // Finish if no styles found.
  if (!styleTags) {
    return $styleTags;
  }

  // Append each style tag to the body of the page.
  styleTags.forEach((tag) => {
    const $tag = $<HTMLStyleElement>(tag);
    // Save a reference to the tag, so it can be removed later.
    $styleTags.push($tag);
    // Append it to the DOM.
    $tag.appendTo($BODY);
  });

  // Remove the style markup
  inputText = inputText.replace(STYLE_REGEX, "");
};

const stripHeadTag = () => {
  // Strip out header tag
  inputText = inputText
    .replace("<!DOCTYPE html>", "")
    .replace("<html>", "")
    .replace("</html>", "")
    .replace(/<head[^>]*>.*<\/head>/g, "")
    .replace(/<body[^>]*>/, "")
    .replace("</body>", "");
};

const putInputOntoDom = () => {
  // Wrap the input in a div, so find() and html() work on the actual input.
  const $inputWrapper = $("<div></div>");
  $input = $inputWrapper.append($(inputText));

  $inputZone = $('<div id="input-zone"></div>');
  $inputZone.append($input);

  $(document.body).append($inputZone);
};

const wrapElementWithStyle = (
  $element: JQuery,
  property: string,
  style: string,
  wrapper: string
) => {
  if ($element.css(property) === style) {
    $element.wrap(wrapper);
  }
};

const makeElementSemantic = ($element: JQuery) => {
  wrapElementWithStyle($element, "font-style", "italic", "<em></em>");
  wrapElementWithStyle($element, "font-weight", "bold", "<strong></strong>");
  wrapElementWithStyle($element, "font-weight", "700", "<strong></strong>");
  wrapElementWithStyle($element, "text-decoration", "line-through", "<s></s>");
  wrapElementWithStyle($element, "text-decoration", "underline", "<u></u>");
};

const makeElementsSemantic = () => {
  $input.find("*").each((index, element) => {
    const $element = $(element);

    makeElementSemantic($element);
    $element.removeAttr("class");
  });
};

const setOutputText = () => {
  return (
    $input
      .html()
      // remove the spans, since they should all be replaced by semantic tags
      .replace(/<span[^>]*>/g, "")
      .replace(/<\/span>/g, "")
  );
};

const cleanUpStyles = () => {
  $.each($styleTags, function () {
    this.remove();
  });

  $input.remove();
  $inputZone.remove();
};

const reset = () => {
  $styleTags = [];
};

/** Process and clean incoming HTML. */
export const processInput = (input: string): Promise<string> => {
  inputText = input;

  if (!inputText) {
    return Promise.resolve("");
  }

  pullStyleTagsIntoDom();
  stripHeadTag();
  putInputOntoDom();

  return new Promise((resolve) => {
    setTimeout(() => {
      makeElementsSemantic();
      const output = setOutputText();
      cleanUpStyles();
      reset();

      resolve(output);
    }, 0);
  });
};
