'use strict';

var url = require('url'),
	punycode = require('punycode');

exports.extractDomain = function(parsingUrl, withoutWeb) {
	var domain = url.parse(parsingUrl).hostname;

	if (withoutWeb && domain.indexOf('www.') === 0) {
		domain = domain.slice(4);
	}

	return punycode.toUnicode(domain);
};

exports.capitalize = function(str, lowercaseRest) {
	var remainingChars = !lowercaseRest ?
		str.slice(1) : str.slice(1).toLowerCase();

	return str.charAt(0).toUpperCase() + remainingChars;
};
