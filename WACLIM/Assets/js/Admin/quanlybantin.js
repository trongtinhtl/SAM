VModule.define("quanlybantin", {
    mdlThemBanTin: null,
    vModuleThemBanTin: null,
    onInit: function (vModule) {
        let that = this;
        that.mdlThemBanTin = $('#mdlThemBanTin');
        that.vModuleThemBanTin = that.mdlThemBanTin.find('[vmodule-name="thembantin"]')

    },
    listeners: function () {
        this.control
            ({
                'quanlybantin': {
                    afterrender: this.onAfterrender,
                    onChange: this.onChangeValue
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
        let that = this;

        var data = {
            tieuDe : "Phan Trọng tính"

        }
        console.log("adjhad")
    },

    onChangeValue: function (vModule, data) {
    },

    onClick_BtnAddBanTin: function (vModule, btn, e) {
        e.stopImmediatePropagation();
        e.preventDefault();
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
