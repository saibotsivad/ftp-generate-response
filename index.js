// https://tools.ietf.org/html/rfc959#page-4
var endOfLineSequence = '\r\n'
  , characterAfterFirstLineCode = '-'
  , characterAfterLastLineCode = ' '

module.exports = function ftpGenerateResponse(responseNumber, lines, multiLinePrepend) {
	lines = lines || []
	if (typeof lines === 'string') {
		lines = [ lines ]
	}

	multiLinePrepend = multiLinePrepend || ' '

	var response

	if (lines.length === 0) {
		response = responseNumber.toString()
	} else if (lines.length > 1) {
		var firstLine = responseNumber + characterAfterFirstLineCode + lines.splice(0, 1)
		var allLinesExceptLast = lines.splice(0, lines.length - 1)
		var lastLine = responseNumber + characterAfterLastLineCode + lines.splice(0)
		response = firstLine + endOfLineSequence
			+ (allLinesExceptLast.length > 0 ? multiLinePrepend + allLinesExceptLast.join(endOfLineSequence + multiLinePrepend) + endOfLineSequence : '')
			+ lastLine
	} else {
		response = response = responseNumber + characterAfterLastLineCode + lines[0]
	}

	response = response + endOfLineSequence

	return response
}
