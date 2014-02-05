( function() {

	"use strict";

	window.Temple = function Temple() {
		var compiled = {};

		function save( id, func ) {
			compiled[ id ] = {
				"render": function render( obj ) {
					return func.call( obj );
				}
			};
			return compiled[ id ];
		}

		function template( templateSelector ) {
			if ( !templateSelector ) {
				throw new Error( "No template provided" );
			}

			// check if template is already compiled
			if ( compiled[ templateSelector ] ) {
				console.log( "using cached template", templateSelector);
				return compiled[ templateSelector ];
			}

			// get template
			var text = document.querySelector( templateSelector ).textContent;
			if ( !text ) {
				throw new Error( "Empty template" );
			}
			// remove tabs and line breaks
			text = text
					.trim()
					.replace( /\n/gi, "" )
					.replace( /\t/gi, "" );

			// find variables
			var match = text.match( /(\{\{.*?\}\})/gi );

			var compiler = "function compiler( ) {";
			
			// if there are no variables the compiler just returns the text
			if ( !match ) {
				compiler += "return '" + text + "';}";
				return save( templateSelector, eval( "(" + compiler + ")" ) );
			}

			compiler += " var b=''; ";
			var matchIndex = 0,
				startIndexInText = 0;

			do {
				var matchIndexInText = text.indexOf( match[ matchIndex ] );
				// append text before object attribute
				compiler += "b += '" + text.substring( startIndexInText, matchIndexInText ) + "'; ";
				// get object attribute
				var name = text
							.substr( matchIndexInText, match[ matchIndex].length )
							.replace( /[\{\}]*/gi, "" )
							.split(".");
				// append object attribute
				compiler += "b += this";
				for( var i = 0; i < name.length; i++ ) {
					compiler += "." + name[ i ];
				}
				compiler += "; ";

				matchIndex++;
				startIndexInText = matchIndexInText + name.join( "." ).length + 4;
			} while( matchIndex < match.length );

			compiler += "b += '" + text.substring( text.lastIndexOf( "}}" ) + 2, text.length ) + "'; ";
			compiler += "return b;}";
			compiler = "(" + compiler + ")";
			return save( templateSelector, eval( compiler ) );
		}

		return {
			"template": template
		};
	};
})();