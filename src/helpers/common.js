'use strict';

var url = require('url');

exports.extractDomain = function(parsingUrl, withoutWeb) {
	var domain = url.parse(parsingUrl).hostname;

	if (withoutWeb && domain.indexOf('www.') === 0) {
		domain = domain.slice(4);
	}

	return domain;
};

exports.capitalize = function(str, lowercaseRest) {
	var remainingChars = !lowercaseRest ?
		str.slice(1) : str.slice(1).toLowerCase();

	return str.charAt(0).toUpperCase() + remainingChars;
};
