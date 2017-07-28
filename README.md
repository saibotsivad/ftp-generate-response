# ftp-generate-response

[![Greenkeeper badge](https://badges.greenkeeper.io/saibotsivad/ftp-generate-response.svg)](https://greenkeeper.io/)

Generate RFC conforming strings for an FTP server connection.

Install the normal `node` way.

Use like this:

```js
var generate = require('ftp-generate-response')
var lines = [
	'Welcome to the server.',
	'Contact an admin for help.',
	'Vist the IRC at #our-site'
]
var output = generate(220, lines)
```

For which the expected output would be:

```txt
220-Welcome to the server
 Contact an admin for help.
220 Visit the IRC at #our-site
```

It is possible to specify a different string to prepend multi-line
strings, e.g. like this:

```js
var generate = require('ftp-generate-response')
var lines = [
	'Welcome to the server.',
	'Contact an admin for help.',
	'Vist the IRC at #our-site'
]
var output = generate(220, lines, '    ')
```

For which the expected output would be:

```txt
220-Welcome to the server
    Contact an admin for help.
220 Visit the IRC at #our-site
```

## Notes on a common style

The following response style is found in *many* FTP server implementations:

```txt
220-Welcome to the server
220-Contact an admin for help.
220 Visit the IRC at #our-site
```

Strictly speaking, according to [the RFC](https://tools.ietf.org/html/rfc959#page-36)
this is *not* acceptable:

> If an intermediary line begins with a 3-digit number, the Server
> must pad the front  to avoid confusion.

The reason the above style is interpreted by clients correctly
is because the RFC also states:

> The user-process then simply needs to search for the second
> occurrence of the same reply code, followed by <SP> (Space), at
> the beginning of a line, and ignore all intermediary lines.

This means that the above message would (after parsing) become:

```txt
Welcome to the server\r\n220-Contact an admin for help.\r\nVisit the IRC at #our-site
```

Additionally, although the RFC states that `the Server must pad`, it
is unclear what padding is required. The example in the RFC pads the
intermediary lines with `<SP><SP>`, but does not require it.

Although many FTP clients will interpret the above string correctly, we
recommend to *not* use this style and instead pad with `<SP><SP>` on
*all* intermediary lines, as shown in the RFC.

Multi-line messages contructed in this way will look like:

```
220-Welcome to the server
  Contact an admin for help.
220 Visit the IRC at #our-site
```

Parsing this can trim all `<SP>` characters at the start of each line,
generating the following usable string:

```
Welcome to the server\r\nContact an admin for help.\r\nVisit the IRC at #our-site
```

## License

[VOL](http://veryopenlicense.com)
