/*
 *  jquery-form-designer - v0.0.1
 *  Bootstrap form designer jQuery plugin.
 *  http://github.com/diegodrumond/form-designer
 *
 *  Made by Diego Drumond
 *  Under Apache License, version 2.0
 */
(function($, window, document, undefined) {

    "use strict";

    var pluginName = "formDesigner",
        defaults = {
            showToolbar: true,
            editMode: true,
            widgets: {
                groups: [{
                    id: "wg_layout",
                    name: "Layout",
                    items: [{
                        id: "wg_two_cols",
                        name: "2 cols"
                    }, {
                        id: "wg_four_cols",
                        name: "4 cols"
                    }, {
                        id: "wg_custom_cols",
                        name: "Custom"
                    }]
                }, {
                    id: "wg_form",
                    name: "Form",
                    items: [{
                        id: "wg_button",
                        name: "button"
                    }, {
                        id: "wg_text",
                        name: "text"
                    }]
                }]
            }
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
            var self = this,
                workspace = "<div class='fd-workspace " + (this.settings.editMode ? "fd-edit-mode" : "fd-view-mode") + "'>" +
                (this.settings.showToolbar ? this.buildToolbar() : "") +
                this.buildCanvas() +
                "</div>";

            $(this.element)
                .append(workspace)
                .find("input[name='opt_edit_mode']")
                .on("change", function(evt) {
                    self.onEditModeChange(evt);
                });
        },
        buildToolbar: function() {
            var widgetsHtml, toolbarHtml;

            toolbarHtml = "<ul class='nav fd-nav nav-tabs' role='tablist'>";
            widgetsHtml = "<div class='tab-content'>";

            $(this.settings.widgets.groups).each(function(ig, eg) {
                toolbarHtml += "<li role='presentation' class='" + (ig === 0 ? "active" : "") + "'>" +
                    "<a href='#" + eg.id + "' aria-controls='" + eg.id + "' role='tab' data-toggle='tab'>" + eg.name + "</a>" +
                    "</li>";

                widgetsHtml += "<div role='tabpanel' class='tab-pane fd-tab-pane " + (ig === 0 ? "active" : "") + "' id='" + eg.id + "'>" +
                    "<ul>";

                $(eg.items).each(function(iw, ew) {
                    widgetsHtml += "<li>" + ew.name + "</li>";
                });

                widgetsHtml += "</ul>" +
                    "</div>";
            });

            toolbarHtml += "<li role='presentation' class='tab-control'>" +
                "<div class='btn-group' data-toggle='buttons'>" +
                "<label class='btn btn-sm btn-primary active'>" +
                "<input type='radio' name='opt_edit_mode' id='opt_edit_mode_on' autocomplete='off' checked value='1'> Edit" +
                "</label>" +
                "<label class='btn btn-sm btn-primary'>" +
                "<input type='radio' name='opt_edit_mode' id='opt_edit_mode_off' autocomplete='off' value='0'> Preview" +
                "</label>" +
                "</div>" +
                "</li>" +
                "</ul>";

            widgetsHtml += "</div>";

            return toolbarHtml + widgetsHtml;
        },
        buildCanvas: function() {
            return "<div class='fd-canvas'>" +
                "<div class='row'>" +
                "<div class='col-sm-4'>" +
                "<div class='form-group'>" +
                "<label for='exampleInputEmail1'>Email address</label>" +
                "<input type='email' class='form-control' id='exampleInputEmail1' placeholder='Email'>" +
                "</div>" +
                "</div>" +
                "<div class='col-sm-4'>" +
                "<div class='form-group'>" +
                "<label for='exampleInputEmail1'>Email address</label>" +
                "<input type='email' class='form-control' id='exampleInputEmail1' placeholder='Email'>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
        },
        onEditModeChange: function() {
            $(this.element)
                .find(".fd-workspace")
                .toggleClass("fd-edit-mode")
                .toggleClass("fd-view-mode");
        },
        getEditMode: function () {
			return $(this.element)
				.find("input[name='opt_edit_mode']:checked")
				.val() === "1";
        },
        html: function() {
            return null;
        },
        json: function() {
            return null;
        }
    });

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
