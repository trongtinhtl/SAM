VModule.define("thembantin", {
    froalaEditor: null,
	onInit: function (vModule) {
        let that = this;
        this.frmThemBanTin = vModule.find('#frmThemBanTin');
        this.frmThemBanTin.validate(GLOBAL.validateOptions);

        this.froalaEditor = this.frmThemBanTin.find("#noiDungBanTin");
        this.froalaEditor.froalaEditor({
            height: 200,
            language: 'vi',
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo'],
            imageUploadURL: 'UploadFiles',
            imageUploadParams: {
                id: 'my_editor'
            }
        });       
	},

	listeners: function () {
		this.control
			({
				'thembantin': {
                    changeValue: this.updateView
                },
                'thembantin #btnThemBanTin': {
                    click: this.onClick_BtnThemBanTin
                },
			})
    },

	updateView: function (vModule) {
        var currentValue = vModule.getValue();
		if (currentValue == null || currentValue == "") {
			value = {
				tieuDe: null,

			};
			vModule.setValue(value, false);
		}

		GLOBAL.utils.bindFormData(value);
		if (value.noiDung) {
			this.froalaEditor.froalaEditor('html.set', value.noiDung);
		}
    },

    validateEditor: function () {
        if (this.froalaEditor.froalaEditor('core.isEmpty')) {

            let element = this.froalaEditor.siblings('div[role="application"]');

            _tooltip = element.tooltip({
                trigger: "manual",
                placement: "auto",
                container: "body",
                animation: false,
                title: "Dữ liệu không được để trống",
                template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
            });
            element.tooltip("show");
            setTimeout(function () { element.tooltip("hide"); }, 2000);

            return false;
        }
        return true
    },
    onClick_BtnThemBanTin: function (vModule, btn, e) {

		if (this.frmThemBanTin.valid() && this.validateEditor()) {
			let frmData = GLOBAL.utils.getFormValue();
			if (!frmData || !frmData.tieuDe || !frmData.tomTat || !frmData.duongDanAnh) return;
			let content = this.froalaEditor.froalaEditor('html.get');
			frmData.noiDung = content;

			//TODO : Add database

			vModule.trigger('db.saved');
        }       
    }
})
