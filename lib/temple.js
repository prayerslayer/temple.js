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
			var match = text.match( /(\{\{.*?\}\})/gi ),
				renderer = "";

			
			// if there are no variables the renderer just returns the text
			if ( !match ) {
				renderer += "return '" + text + "';";
				return save( templateSelector, new Function( renderer ) );
			}

			renderer += "var b=''; ";
			var matchIndex = 0,
				startIndexInText = 0;

			do {
				var matchIndexInText = text.indexOf( match[ matchIndex ] );
				// append text before object attribute
				renderer += "b += '" + text.substring( startIndexInText, matchIndexInText ) + "'; ";
				// get object attribute
				var name = text
							.substr( matchIndexInText, match[ matchIndex].length )
							.replace( /[\{\}]*/gi, "" )
							.split(".");
				// append object attribute
				renderer += "b += this";
				for( var i = 0; i < name.length; i++ ) {
					renderer += "." + name[ i ];
				}
				renderer += "; ";

				matchIndex++;
				startIndexInText = matchIndexInText + name.join( "." ).length + 4;
			} while( matchIndex < match.length );

			renderer += "b += '" + text.substring( text.lastIndexOf( "}}" ) + 2, text.length ) + "'; ";
			renderer += "return b;";
			return save( templateSelector, new Function( "obj", renderer ) );
		}

		return {
			"template": template
		};
	};
})();