// https://tools.ietf.org/html/rfc959#page-4
var endOfLineSequence = '\r\n'
var characterAfterFirstLineCode = '-'
var characterAfterLastLineCode = ' '

module.exports = function ftpGenerateResponse(responseNumber, lines, multiLinePrepend) {
	lines = lines || []
	if (typeof lines === 'string') {
		lines = [ lines ]
	} else if (lines.length === 0) {
		lines.push('')
	}

	multiLinePrepend = multiLinePrepend || ' '

	return addLineCodes(responseNumber, multiLinePrepend, lines).join(endOfLineSequence) + endOfLineSequence
}

function addLineCodes(responseNumber, multiLinePrepend, lines) {
	var first = 0
	var last = lines.length - 1
	return lines.map(function(line, index) {
		if (index === last) {
			return responseNumber + characterAfterLastLineCode + line
		} else if (index === first) {
			return responseNumber + characterAfterFirstLineCode + line
		} else if (multiLinePrepend) {
			return multiLinePrepend + line
		}
	})
}
