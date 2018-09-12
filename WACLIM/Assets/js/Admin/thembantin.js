VModule.define("thembantin", {
    froalaEditor: null,
	onInit: function (vModule) {
        let that = this;
        that.frmThemBanTin = vModule.find('#frmThemBanTin');
        that.frmThemBanTin.validate(GLOBAL.validateOptions);
        that.btnThemBanTin = vModule.find('#btnThemBanTin');
        that.btnCapNhatBanTin = vModule.find("#btnCapNhatBanTin");    
        
        this.froalaEditor = this.frmThemBanTin.find("#noiDungBanTin");
        this.froalaEditor.froalaEditor({
            height: 200,
            language: 'vi',
			toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo'],
			imageUploadURL: GLOBAL.linkRoot + 'BanTinAjax/UploadFile',
            imageUploadParams: {
                id: 'my_editor'
            }
        });  

        that.btnThemBanTin.show();
        that.btnCapNhatBanTin.hide();
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
        let that = this;
        var currentValue = vModule.getValue();
        that.btnThemBanTin.show();
        that.btnCapNhatBanTin.hide();
        GLOBAL.utils.clearFormData(that.frmThemBanTin);
        if (currentValue == null || currentValue == "") return;

        GLOBAL.utils.bindFormData(that.frmThemBanTin, currentValue);
        if (currentValue.noiDung) {
			that.froalaEditor.froalaEditor('html.set', currentValue.noiDung);
        }

        if (currentValue && currentValue.Id) {
            that.btnThemBanTin.hide();
            that.btnCapNhatBanTin.show();
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
