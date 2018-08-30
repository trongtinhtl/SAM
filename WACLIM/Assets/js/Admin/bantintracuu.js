VModule.define("bantintracuu", {
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
                },
            })
    },

    
})