var customMatchers = {
	toBeInitialized: function () {
		return {
			compare: function (actual) {
				var result = {};

				result.pass = actual.data("plugin_formDesigner") !== undefined;
				if (!result.pass) {
					result.message = "Form designer plugin not initialized";
				}

				return result;
			}
		};
	}
};

describe("jquery.form-designer", function () {

	beforeEach(function () {
		jasmine.addMatchers(customMatchers);
		$("body").append("<div id='fixture'></div>");
	});

	afterEach(function () {
		$("#fixture").remove();
	});

	it("should be able to initialize", function () {
		var fixture = $("#fixture");
		fixture.formDesigner();
		expect(fixture).toBeInitialized();
	});

	it("should be in edit mode", function () {
		var formDesigner = $("#fixture").formDesigner().data("plugin_formDesigner");

		expect(formDesigner.getEditMode()).toBe(true);
		expect($(".fd-edit-mode").length).not.toBe(0);
		expect($(".fd-view-mode").length).toBe(0);
	});

	it("should toggle to view mode", function () {
		var formDesigner = $("#fixture").formDesigner().data("plugin_formDesigner");

		$("input[name='opt_edit_mode']").trigger("click");

		expect(formDesigner.getEditMode()).not.toBe(true);
		expect($(".fd-edit-mode").length).toBe(0);
		expect($(".fd-view-mode").length).not.toBe(0);
	});

	// FIXME: implement
	xit("should return form structure in html format", function () {
		var formDesigner = $("#fixture").formDesigner().data("plugin_formDesigner");

		expect(formDesigner.html()).not.toBe(null);
	});

	// FIXME: implement
	xit("should return form structure in json format", function () {
		var formDesigner = $("#fixture").formDesigner().data("plugin_formDesigner");

		expect(formDesigner.json()).not.toBe(null);
	});
});
