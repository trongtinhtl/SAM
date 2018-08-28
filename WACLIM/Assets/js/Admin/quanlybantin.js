VModule.define("quanlybantin", {
    mdlThemBanTin: null,
    vModuleThemBanTin: null,
    onInit: function (vModule) {
        let that = this;
        that.mdlThemBanTin = $('#mdlThemBanTin');
        that.vModuleThemBanTin = that.mdlThemBanTin.find('[vmodule-name="thembantin"]')

		that.listBanTin = vModule.find('#listBanTin');

    },
    listeners: function () {
        this.control
            ({
                'quanlybantin': {
                    afterrender: this.onAfterrender,
                    changeValue: this.updateView
                },
                'quanlybantin #btnAddBanTin': {
                    click: this.onClick_BtnAddBanTin
                },
                'quanlybantin .btnEditBanTin': {
                    click: this.onClick_BtnEditBanTin
                }
            })
    },

	onAfterrender: function () {
		$('.item-bantin').lazy({
			effect: "fadeIn",
			effectTime: 2000,
			threshold: 0
		});

		let that = this;
		that.listBanTin.scroll(function () {
			if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {


			}
		});
    },

	onChangeValue: function (vModule, data) {

    },

    onClick_BtnAddBanTin: function (vModule, btn, e) {
        console.log(true)
        this.mdlThemBanTin.modal('show');
    },

    onClick_BtnEditBanTin: function (vModule, btn) {
        let that = this;
        let item = btn.closest('li');

        let data = item.data("bantin");       

        this.mdlThemBanTin.modal('show');
    }
})

//$('#btnAddBanTin').on('click', function () {
//    $('#mdlThemBanTin').modal('show');
//})
