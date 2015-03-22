'use strict';

(function ($) {
    $(function () {
        var STYLE_REGEX = /<style[^>]*>.*<\/style>/g,
            $INPUT_BOX = $('textarea#input'),
            $OUTPUT_BOX = $('textarea#output'),
            $BODY = $('body'),
            $INPUT_ZONE = $('#input-zone'),
            inputText,
            $styleTags,
            $input,
            getInputText = function () {
                inputText = $INPUT_BOX.val();
            },
            pullStyleTagsIntoDom = function () {
                // Get all the style tags in the document
                var styleTags = inputText.match(STYLE_REGEX),
                    i;
                
                // Reset $styleTags;
                $styleTags = [];
                
                // Finish if no styles found.
                if (!styleTags) {
                    return $styleTags;
                }
                
                // Append each style tag to the body of the page.
                for (i = 0; i < styleTags.length; i++) {
                    // Save a referance to the tag, so it can be removed later.
                    $styleTags.push($(styleTags[i]));
                    // Append it to the DOM.
                    $($styleTags[i]).appendTo($BODY);
                }
                
                // Remove the style markup
                inputText = inputText.replace(STYLE_REGEX, '');
            },
            stripHeadTag = function () {
                // Strip out header tag
                inputText = inputText
                    .replace('<!DOCTYPE html>', '')
                    .replace('<html>', '')
                    .replace('</html>', '')
                    .replace(/<head[^>]*>.*<\/head>/g, '')
                    .replace(/<body[^>]*>/, '')
                    .replace('</body>', '');
            },
            putInputOntoDom = function () {
                // Wrap the input in a div, so find() and html() work on the actual input.
                var $inputWrapper = $('<div></div>');
                $input = $inputWrapper.append($(inputText));
                
                $INPUT_ZONE.append($input);
            },
            wrapElementWithStyle = function ($element, property, style, wrapper) {
                if ($element.css(property) === style) {
                    $element.wrap(wrapper);
                }
            },
            makeElementSemantic = function (index, $element) {
                wrapElementWithStyle($element, 'font-style', 'italic', '<em></em>');
                wrapElementWithStyle($element, 'font-weight', 'bold', '<strong></strong>');
                wrapElementWithStyle($element, 'font-weight', '700', '<strong></strong>');
                wrapElementWithStyle($element, 'text-decoration', 'line-through', '<s></s>');
                wrapElementWithStyle($element, 'text-decoration', 'underline', '<u></u>');
            },
            makeElementsSemantic = function (element) {
                $input.find('*').each(function (index, element) {
                    var $element = $(element);
                    
                    makeElementSemantic(index, $element);
                    $element.removeAttr('class');
                });
            },
            setOutputText = function () {
                var outputText = $input
                    .html()
                    // remove the spans, since they should all be replaced by semantic tags
                    .replace(/<span[^>]*>/g, '')
                    .replace(/<\/span>/g, '');
                
                $OUTPUT_BOX.val(outputText);
            },
            cleanUpDom = function () {
                $.each($styleTags, function () {
                    this.remove();
                });
                
                $input.remove();
            },
            reset = function () {
                inputText = '';
                $styleTags = [];
                $input = undefined;
            },
            processInput = function () {
                getInputText();
                
                if (!inputText) {
                    return;
                }
                
                pullStyleTagsIntoDom();
                stripHeadTag();
                putInputOntoDom();
                
                setTimeout(function () {
                    makeElementsSemantic();
                    setOutputText();
                    cleanUpDom();
                    reset();
                }, 0);
            };
        
        // Parse the input on input if possible, or change otherwise.
        if ('oninput' in window) {
            $INPUT_BOX.on('input', processInput);
        } else {
            $INPUT_BOX.change(processInput);
        }
        
    }); // end of document ready
})(jQuery); // end of jQuery name space