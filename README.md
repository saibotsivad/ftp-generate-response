# ftp-generate-response

Generate RFC conforming strings for an FTP server connection.

Install the normal `node` way.

Use like this:

	var generate = require('ftp-generate-response')
	var lines = [
		'Welcome to the server.',
		'Contact an admin for help.',
		'Vist the IRC at #our-site'
	]
	var output = generate(220, lines)

For which the expected output would be:

	220-Welcome to the server
	 Contact an admin for help.
	220 Visit the IRC at #our-site

It is possible to specify a different string to prepend multi-line
strings, e.g. like this:

	var generate = require('ftp-generate-response')
	var lines = [
		'Welcome to the server.',
		'Contact an admin for help.',
		'Vist the IRC at #our-site'
	]
	var output = generate(220, lines, '    ')

For which the expected output would be:

	220-Welcome to the server
	    Contact an admin for help.
	220 Visit the IRC at #our-site

## Notes on a common style

The following response style is found in *many* FTP server implementations:

	220-Welcome to the server
	220-Contact an admin for help.
	220 Visit the IRC at #our-site

Strictly speaking, according to [the RFC](https://tools.ietf.org/html/rfc959#page-36)
this is *not* acceptable:

> If an intermediary line begins with a 3-digit number, the Server
> must pad the front  to avoid confusion.

Although many FTP clients will interpret the string correctly, we
advise to *not* use this style.

## License

Published under the [VOL](http://veryopenlicense.com).

	Very Open License (VOL)

	The contributor(s) to this creative work voluntarily grant permission
	to any individual(s) or entities of any kind
	- to use the creative work in any manner,
	- to modify the creative work without restriction,
	- to sell the creative work or derivatives thereof for profit, and
	- to release modifications of the creative work in part or whole under any license
	with no requirement for compensation or recognition of any kind.
