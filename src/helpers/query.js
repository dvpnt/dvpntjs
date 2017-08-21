'use strict';

var _ = require('underscore');

exports.normalizeQueryObject = function(object) {
	return _(object).chain()
		.mapObject(function(filter) {
			return _(filter).isArray() ? filter.join(',') : filter;
		})
		.pick(function(filter) {
			return filter || _(filter).isBoolean() || _(filter).isNumber();
		}).value();
};

exports.normalizeSortParam = function(sort) {
	if (_(sort).isObject()) {
		return _(sort).map(function(direction, field) {
			return (direction > 0 ? '' : '-') + field;
		});
	} else {
		return sort;
	}
};
