/*
 *  jquery-form-designer - v0.0.1
 *  Bootstrap form designer jQuery plugin.
 *  http://github.com/diegodrumond/form-designer
 *
 *  Made by Diego Drumond
 *  Under Apache License, version 2.0
 */
;(function($, window, document, undefined) {

	"use strict";

	var pluginName = "formDesigner",
		defaults = {
			template: "workspace.html",
			showToolbar: true,
			editMode: true
		};

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function() {
			$(this.element).load(this.settings.template, function() {
				console.log("content loaded");
			});
		},
		html: function() {},
		json: function() {}
	});

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);