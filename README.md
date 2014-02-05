# Temple.js

Super-simple templating. It doesn't do much, but it's quite fast at what it's doing.

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

# How fast is it exactly?

According to my not-too-scientific tests in Chrome 32, very fast. The test consisted of compiling a simple template and rendering it 10000 times with random data. Here are the results (median of 10 runs):

* Handlebars: 35 ms
* Hogan: 29.5 ms
* John Resigs Micro Template: 37 ms
* Mustache.js: 56 ms
* Underscore: 29.5 ms
* Temple: **17.5 ms**

I attribute a lot of the speed gain to reduced functionality though. Temple does not escape things, there are no sections (hierarchies of templates), it can't handle arrays or functions, there is no inline scripting functionality...