# Temple.js

Super-simple templating on steroids on top of regular steroids. Only for nested objects, the speed comes at a price.

# Features

* Define your templates as you would do in Handlebars or Mustache
* ...but note that all Temple can handle at the moment are nested object literals. This means
* ...no arrays, no functions, no string escaping, just nothing else.

If your object doesn't look like this:

    { 
    	"key": 4,
    	"parent": {
    		"key": 55,
    		"name": "foo"
    	}
    }

but more like this:

    {
    	"key": function() { return "<b>hello</b>"; },
    	"matcher": /.*?/gi,
    	"children": [ 1, 3, 5 ]
    }

Then Temple is unfortunately not for you.

# Other gotchas

Right now unnecessary spaces in template variables (such as ``{{ variable }}``) are not supported. Use ``{{variable}}`` meanwhile.

# Usage

Define your template:

    <script id="person-template" type="temple/template">
    	<div>
    		<h1>{{name}}</h1>
    	</div>
    </script>

Construct a Temple object:

    var temple = new Temple();

Load a template that's somewhere in your DOM:

    var person = temple.template( "#person-template" );

Render the template:

    var dom = person.render( { "name": "Larry" } );

Display the generated HTML:

    $( "body" ).append( dom );