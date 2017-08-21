'use strict';

var _ = require('underscore'),
	helpers = require('../helpers');

function Collection({baseUrl, request, transformParams}) {
	this.baseUrl = baseUrl.toLowerCase();
	this.request = request;
	this.transformParams = transformParams || function(params) {
		var transformed = helpers.normalizeQueryObject(params);

		if (transformed.sort) {
			transformed.sort = helpers.normalizeSortParam(transformed.sort);
		}

		return transformed;
	};
}

Collection.prototype.get = function(params = {}, options) {
	return this.request(_({
		method: 'get',
		url: this.baseUrl,
		params: this.transformParams(params)
	}).extend(options)).then(function(res) {
		return res.data;
	});
};

Collection.prototype.getOne = function(id, options) {
	return this.request(_({
		method: 'get',
		url: `${this.baseUrl}/${id}`
	}).extend(options)).then(function(res) {
		return _(res.data).chain().values().first().value();
	});
};

Collection.prototype.create = function(data, options) {
	return this.request(_({
		method: 'post',
		url: this.baseUrl,
		data
	}).extend(options)).then(function(res) {
		return res.data;
	});
};

Collection.prototype.update = function(data, options) {
	return this.request(_({
		method: 'patch',
		url: `${this.baseUrl}/${data._id}`,
		data: _(data).omit('_id')
	}).extend(options)).then(function(res) {
		return res.data;
	});
};

Collection.prototype.remove = function(id, options) {
	return this.request(_({
		method: 'delete',
		url: `${this.baseUrl}/${id}`
	}).extend(options));
};

Collection.prototype.exec = function(method, data = {}, options) {
	return this.request(_({
		method: 'put',
		url: `${this.baseUrl}/${method}`,
		data: data
	}).extend(options)).then(function(res) {
		return res.data;
	});
};

Collection.prototype.clone = function(options = {}) {
	return new Collection(_({}).defaults(options, this));
};

Collection.prototype.sub = function() {
	var args = _(arguments).toArray();
	if (_(args[0]).isArray()) {
		args = args[0];
	}

	return this.clone({baseUrl: `${this.baseUrl}/${args.join('/')}`});
};

module.exports = Collection;
