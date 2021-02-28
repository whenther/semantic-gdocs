const STYLE_REGEX = /<style[^>]*>.*<\/style>/g;
const $INPUT_BOX = $("textarea#input");
const $OUTPUT_BOX = $("textarea#output");
const $BODY = $("body");
const $INPUT_ZONE = $("#input-zone");

let inputText: string;
let $styleTags: HTMLStyleElement[];
let $input: HTMLInputElement;

const pullStyleTagsIntoDom = () => {
  // Get all the style tags in the document
  const styleTags = inputText.match(STYLE_REGEX);

  // Reset $styleTags;
  $styleTags = [] as HTMLStyleElement[];

  // Finish if no styles found.
  if (!styleTags) {
    return $styleTags;
  }

  // Append each style tag to the body of the page.
  for (let i = 0; i < styleTags.length; i++) {
    // Save a referance to the tag, so it can be removed later.
    $styleTags.push($(styleTags[i]));
    // Append it to the DOM.
    $($styleTags[i]).appendTo($BODY);
  }

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
  var $inputWrapper = $("<div></div>");
  $input = $inputWrapper.append($(inputText));

  $INPUT_ZONE.append($input);
};
const wrapElementWithStyle = ($element, property, style, wrapper) => {
  if ($element.css(property) === style) {
    $element.wrap(wrapper);
  }
};
const makeElementSemantic = (index, $element) => {
  wrapElementWithStyle($element, "font-style", "italic", "<em></em>");
  wrapElementWithStyle($element, "font-weight", "bold", "<strong></strong>");
  wrapElementWithStyle($element, "font-weight", "700", "<strong></strong>");
  wrapElementWithStyle($element, "text-decoration", "line-through", "<s></s>");
  wrapElementWithStyle($element, "text-decoration", "underline", "<u></u>");
};
const makeElementsSemantic = () => {
  $input.find("*").each((index, element) => {
    var $element = $(element);

    makeElementSemantic(index, $element);
    $element.removeAttr("class");
  });
};
const setOutputText = () => {
  var outputText = $input
    .html()
    // remove the spans, since they should all be replaced by semantic tags
    .replace(/<span[^>]*>/g, "")
    .replace(/<\/span>/g, "");

  $OUTPUT_BOX.val(outputText);
};
const cleanUpDom = () => {
  $.each($styleTags, function () {
    this.remove();
  });

  $input.remove();
};
const reset = () => {
  inputText = "";
  $styleTags = [];
  $input = undefined;
};
/** Process and clean incoming HTML. */
export const processInput = (text: string) => {
  inputText = text;

  if (!inputText) {
    return;
  }

  pullStyleTagsIntoDom();
  stripHeadTag();
  putInputOntoDom();

  setTimeout(() => {
    makeElementsSemantic();
    setOutputText();
    cleanUpDom();
    reset();
  }, 0);
};
