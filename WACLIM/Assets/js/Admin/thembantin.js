VModule.define("thembantin", {
    froalaEditor: null,
	onInit: function (vModule) {
        let that = this;        
        this.froalaEditor = vModule.find("#noiDungBanTin");
        this.froalaEditor = this.froalaEditor.froalaEditor({
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
                    afterrender: this.onAfterrender
				},
			})
    },

	onAfterrender: function () {
		
    },
    
})
