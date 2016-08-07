var test = require('tape')
var validate = require('ftp-validate-response')
var generate = require('../')

test('when only a number', function(t) {
	var out = generate(100)
	t.equals(out, '100 \r\n')
	t.ok(validate(out))
	t.end()
})

test('when number is a string', function(t) {
	var out = generate('100')
	t.equals(out, '100 \r\n')
	t.ok(validate(out))
	t.end()
})

test('when lines is a single string', function(t) {
	var out = generate(100, 'test')
	t.equals(out, '100 test\r\n')
	t.ok(validate(out))
	t.end()
})

test('when lines is an array with one entry', function(t) {
	var out = generate(100, [ 'test' ])
	t.equals(out, '100 test\r\n')
	t.ok(validate(out))
	t.end()
})

test('when lines is an array with two entries', function(t) {
	var out = generate(100, ['first', 'second'])
	t.equals(out, '100-first\r\n100 second\r\n')
	t.ok(validate(out))
	t.end()
})

test('when lines is an array with three entries', function(t) {
	var out = generate(100, ['first', 'second', 'third'])
	t.equals(out, '100-first\r\n  second\r\n100 third\r\n')
	t.ok(validate(out))
	t.end()
})
