VModule.define("quanlybantin", {
    mdlThemBanTin: null,
    vModuleThemBanTin: null,
    onInit: function (vModule) {
        let that = this;
        that.mdlThemBanTin = $('#mdlThemBanTin');
        that.vModuleThemBanTin = that.mdlThemBanTin.find('[vmodule-name="thembantin"]')

        that.mdlTimKiemBanTin = $('#mdlTimKiemBanTin');

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
                'quanlybantin #btnTimKiemNangCao': {
                    click: this.onClick_BtnTimKiemNangCao
                },
                'quanlybantin .btnRemoveBanTin': {
                    click: this.onClick_BtnRemoveBanTin
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
        this.vModuleThemBanTin.setValue(null);
        this.mdlThemBanTin.modal('show');
    },

    onClick_BtnTimKiemNangCao: function (vModule, btn, e) {
        this.mdlTimKiemBanTin.modal('show');
    },

    onClick_BtnRemoveBanTin: function (vMudule, btn, e) {
        let that = this;
        let elBanTin = btn.closest('div.card-select');
        let dataBanTin = elBanTin ? elBanTin.data('bantin') : null;
        if (!elBanTin || !dataBanTin) return;

        let funcRemoveBanTin = function () {
            console.log('Delete');
            //TODO:  function Delete BanTin

        }

        $.confirm({
            title: 'Thông báo',
            theme: 'modern',
            type: 'red',
            icon: 'fa fa-bell-o',
            animationBounce: 2,
            content: "Bạn có chắc muốn xóa dữ liệu này không?",
            buttons: {
                ok: {
                    text: "Đồng ý",
                    btnClass:"btn-red",
                    action: function () {
                        funcRemoveBanTin();
                    }
                }, 
                no: {
                    text: "Hủy bỏ"
                }
            }
        })
    },

    onClick_BtnEditBanTin: function (vModule, btn, e) {
        debugger
        let that = this;
        let elBanTin = btn.closest('div.card-select');
        let dataBanTin = elBanTin ?  elBanTin.data('bantin') : null;
        if (!elBanTin || !dataBanTin) return;

        var data = {
            Id:3,
            tieuDe :  "Mùa hè, World Cup và lớp học Mô hình hóa",
            tomTat : "Sáng 27/6/2018, trên trang Web chính thức của Envim đã đăng thông báo về việc mở các lớp học đào tạo về Mô hình hóa dành cho nhiều đối tượng khác nhau,đặc biệt là sinh viên và học viên từ mọi miền đất nước.",
			ngayXuatBan: "21/8/2018",
			noiDung: "<img src='http://localhost/RUBI/FileHandler.ashx?id=5b98c489c1986da340769c00'></img>"
        }

        that.vModuleThemBanTin.setValue(data);
        that.mdlThemBanTin.modal('show');
    }
})

