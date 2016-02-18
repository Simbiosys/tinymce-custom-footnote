(function() {
    tinymce.PluginManager.add( 'custom_footnote', function( editor, url ) {
        // Add Button to Visual Editor Toolbar
        editor.addButton('custom_footnote', {
            title: 'Insert foot note',
            cmd: 'custom_footnote',
            image: url + '/icon.png'
        });
 
        // Add Command when Button Clicked
        editor.addCommand('custom_footnote', function() {
            // Check we have selected some text selected
            var text = editor.selection.getContent({
                'format': 'html'
            });
            
            var previous = editor.selection.getNode();
            var title = "";
            
            if (previous.hasAttribute("title")) {
            	title = previous.getAttribute("title");
            }

            if ( text.length === 0 ) {
                alert( 'Please select some text.' );
                return;
            }

            // Ask the user to enter a CSS class
            var result = prompt('Enter the note', title);
            
			result = result.trim();
			
			var element = ' <a class="footnote-text" title="' + result + '">' + text + '</a>';
			
			if (result.length === 0) {
				element = ' ' + text;
			}
			
            // Insert selected text back into editor, wrapping it in an anchor tag
            editor.execCommand('mceReplaceContent', false, element);
        });

        // Enable/disable the button on the node change event
        editor.onNodeChange.add(function( editor ) {
            // Get selected text, and assume we'll disable our button
            var selection = editor.selection.getContent();
            var disable = true;

            // If we have some text selected, don't disable the button
            if ( selection ) {
                disable = false;
            }

            // Define whether our button should be enabled or disabled
            editor.controlManager.setDisabled( 'custom_footnote', disable );
        });
    });
})();