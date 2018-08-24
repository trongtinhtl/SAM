// #region thư viện VBDLIS
var VBDLIS = {
    Global: {
        LoaiBienDong: {
            BANNHA: { ma: 'BN', ten: 'Chủ đầu tư xây dựng nhà chung cư bán căn hộ và làm thủ tục đăng ký biến động đợt đầu' },
            BOSUNGTAISAN: { ma: 'BTS', ten: 'Bổ sung tài sản' },
            CHUYENDOIQUYEN: { ma: 'CD', ten: 'Chuyển đổi quyền sử dụng đất' },
            CAPLAIGCN: { ma: 'CL', ten: 'Cấp lại giấy chứng nhận quyền sử dụng đất' },
            CHUYENMUCDICHSUDUNG: { ma: 'CM', ten: 'Chuyển loại đất sử dụng, chuyển mục đích sử dụng' },
            CHUYENMUCDICHTACH: { ma: 'CMT', ten: 'Chuyển mục đích có tách thửa' },
            CHUYENNHUONGQUYEN: { ma: 'CN', ten: 'Chuyển nhượng quyền sử dụng đất' },
            CHUYENNHUONGNHA: { ma: 'CNN', ten: 'Chuyển nhượng nhà' },
            CHUYENCONGTY: { ma: 'CP', ten: 'Trường hợp chuyển đổi công ty; chia, tách, hợp nhất, sáp nhập doanh nghiệp' },
            CHUYENQUYENMOTPHAN: { ma: 'CQM', ten: 'Chuyển quyền và chuyển mục đích một phần thửa' },
            CHUYENQUYENTRONTHUA: { ma: 'CQT', ten: 'Chuyển quyền và chuyển mục đích trọn thửa' },
            CHOTHUEDAT: { ma: 'CT', ten: 'Cho thuê đất, cho thuê lại đất' },
            CHINHLYTS: { ma: 'CLS', ten: 'Chỉnh lý thông tin tài sản' },
            CHUYENCANHAN: { ma: 'DC', ten: 'Chuyển đổi hộ gia đình, cá nhân sử dụng đất thành tổ chức kinh tế của hộ gia đình cá nhân đó mà không thuộc trường hợp chuyển nhượng quyền sử dụng đất, quyền sở hữu tài sản gắn liền với đất' },
            DINHCHINHGCN: { ma: 'SN', ten: 'Phát hiện có sai sót, nhầm lẫn về nội dung thông tin trong hồ sơ địa chính và trên Giấy chứng nhận' },
            CHUYENQUYENDAUGIA: { ma: 'DG', ten: 'Chuyển quyền sử dụng đất, tài sản gắn liền với đất theo kết quả đấu giá đất' },
            THAYDOIHANHCHINH: { ma: 'DH', ten: 'Thay đổi tên đơn vị hành chính, điều chỉnh địa giới hành chính. Thay đổi tên đơn vị hành chính, điều chỉnh địa giới hành chính theo quyết định của cơ quan nhà nước có thẩm quyền' },
            CHINHLYTENCSD: { ma: 'DT', ten: 'Người sử dụng đất, chủ sở hữu tài sản gắn liền với đất đổi tên, thay đổi thông tin về giấy tờ pháp nhân, nhân thân hoặc địa chỉ' },
            CHUYENQUYENTOAAN: { ma: 'GA', ten: 'Chuyển quyền theo QĐ của tòa án, QĐ của cơ quan thi hành án' },
            GIAODAT: { ma: 'GD', ten: 'Giao đất' },
            THAYDOITHOIHANSUDUNG: { ma: 'GH', ten: 'Thay đổi thời hạn sử dụng' },
            CHUYENQUYENKIEUNAI: { ma: 'GK', ten: 'Chuyển quyền theo QĐ hành chính giải quyết khiếu nại, tố cáo về đất đai của UBND cấp có thẩm quyền' },
            GOPVONQUYEN: { ma: 'GP', ten: 'Góp vốn bằng quyền sử dụng đất, tài sản gắn liền với đất' },
            CHUYENQUYENTRANHCHAP: { ma: 'GT', ten: 'Chuyển quyền sử dụng đất, tài sản gắn liền với đất theo kết quả giải quyết tranh chấp đất đai' },
            GOPVONGIATRI: { ma: 'GV', ten: 'Góp vốn bằng giá trị quyền sử dụng đất' },
            HANCHEQUYEN: { ma: 'HC', ten: 'Hạn chế về quyền sử dụng đất' },
            THAYDOITHUA: { ma: 'HD', ten: 'Thay đổi hình dạng thửa. Thay đổi vị trí góc thửa' },
            THAYDOILIENKE: { ma: 'LK', ten: 'Xác lập hoặc thay đổi, chấm dứt quyền sử dụng hạn chế thửa đất liền kề' },
            THIENTAI: { ma: 'SA', ten: 'Thay đổi diện tích do sạt lở tự nhiên' },
            DINHCHINHNOIDUNGGCN: { ma: 'DGN', ten: 'Đính chính nội dung giấy chứng nhận' },
            CHOTANG: { ma: 'TA', ten: 'Cho tặng' },
            CHOTANGNHA: { ma: 'TAN', ten: 'Cho tặng nhà' },
            THECHAPQUYEN: { ma: 'TC', ten: 'Thế chấp quyền sử dụng đất' },
            THECHAPNHA: { ma: 'TCN', ten: 'Thế chấp nhà' },
            QUYDOITHUA: { ma: 'TCQ', ten: 'Quy đổi số thửa tạm sang số thửa chính quy' },
            THAYDOIDODAC: { ma: 'TD', ten: 'Trường hợp đo đạc lại thửa đất mà có thay đổi diện tích, số hiệu thửa đất, số hiệu tờ bản đồ' },
            THUESANGGIAO: { ma: 'TG', ten: 'Chuyển từ hình thức được Nhà nước cho thuê đất sang giao đất có thu tiền' },
            THUHOIDAT: { ma: 'TH', ten: 'Thu hồi đất, thu hồi giấy chứng nhận quyền sử dụng đất' },
            THUAKEQUYEN: { ma: 'TK', ten: 'Thừa kế quyền sử dụng đất' },
            THUAKENHA: { ma: 'TKN', ten: 'Thừa kế nhà' },
            THUELAI: { ma: 'TL', ten: 'Doanh nghiệp đầu tư hạ tầng trong khu công nghiệp, cụm công nghiệp, khu chế xuất, khu công nghệ cao, khu kinh tế cho thuê, cho thuê lại đất' },
            THAYDOIDAT: { ma: 'TM', ten: 'Thay đổi số thứ tự thửa đất và số thứ tự tờ bản đồ' },
            TACHGOP: { ma: 'TN', ten: 'Gộp thửa, tách thửa' },
            CHIAQUYEN: { ma: 'TQ', ten: 'Hợp nhất hoặc phân chia quyền sử dụng đất, tài sản gắn liền với đất của hộ gia đình cho thành viên hộ gia đình hoặc của nhóm người cùng sở hữu, sử dụng cho thành viên nhóm người đó theo thoả thuận hoặc theo quy định của pháp luật' },
            THAYDOITAISAN: { ma: 'TS', ten: 'Thay đổi thông tin về tài sản gắn liền với đất đã ghi trên Giấy chứng nhận hoặc đã thể hiện trong cơ sở dữ liệu' },
            THUOCTINH: { ma: 'TT', ten: 'Chỉnh lý thuộc tính thửa' },
            VOCHONG: { ma: 'VC', ten: 'Hợp nhất hoặc phân chia quyền sử dụng đất, quyền sở hữu nhà ở và tài sản khác gắn liền với đất của vợ hoặc của chồng thành của chung hai vợ, chồng' },
            XOATHECHAPQUYEN: { ma: 'XC', ten: 'Xoá thế chấp quyền sử dụng đất' },
            XOATHECHAPNHA: { ma: 'XCN', ten: 'Xóa thế chấp nhà' },
            CHUYENQUYENXYLYNO: { ma: 'XN', ten: 'Chuyển quyền sử dụng đất, tài sản gắn liền với đất theo thỏa thuận xử lý nợ thế chấp' },
            KETTHUCCHOTHUE: { ma: 'XT', ten: 'Kết thúc cho thuê đất, kết thúc cho thuê lại đất' },
            CHAMDUTGOPVON: { ma: 'XV', ten: 'Chấm dứt góp vốn bằng giá trị quyền sử dụng đất' },
            BIENDOITHUA: { ma: 'XX', ten: 'Biến động do dồn điền đổi thửa' }
        },
        EnumBienDong: {
            CapGiayLanDau: 0,
            ChuyenQuyen: 1,
            TachThua: 2,
            GopThua: 3,
            TheChap: 4,
            XoaTheChap: 5,
            BoSungTaiSan: 6,
            CapDoi: 7,
            GiaoThueNhaNuoc: 8,
            GiaoThueCaNhan: 9,
            ChuyenMucDichSuDung: 10,
            DinhChinhGiayChungNhan: 11,
            KetThucChoThue: 12,
            ChuyenHinhThucGiaoThue: 13,
            GiaHanSuDungDat: 14,
            ThuHoiGiayChungNhan: 15,
            ChoThueLai: 16,
            HanCheQuyen: 17,
            HanCheThuaLienKe: 18,
            TachThuaChuyenQuyen: 19,
            ThayDoiHanCheThuaLienKe: 20,
            ChamDutHanCheThuaLienKe: 21,
            DinhChinhNoiDungGiayChungNhan: 22,
            TheChapBoSung: 23,
            RutTaiSanTheChap: 24,
        },
        treeTypes: {
            CANHAN: {
                icon: "fa fa-user"
            },
            CANHO: {
                icon: "fa fa-university"
            },
            CAYLAUNAM: {
                icon: "fa fa-map-pin"
            },
            CHUSOHUU: {
                icon: "fa fa-child"
            },
            CHUSUDUNG: {
                icon: "fa fa-child"
            },
            CONGDONG: {
                icon: "fa fa-connectdevelop"
            },
            CONGTRINHNGAM: {
                icon: "fa fa-industry"
            },
            CONGTRINHXAYDUNG: {
                icon: "fa fa-legal"
            },
            HANGMUCCONGTRINH: {
                icon: "fa fa-navicon"
            },
            DIACHI: {
                icon: "fa fa-address-book"
            },
            DONDANGKY: {
                icon: "fa fa-id-card"
            },
            TINHHINHDANGKY: {
                icon: "fa fa-id-card"
            },
            HOPDONG: {
                icon: "fa fa-handshake-o"
            },
            QUYETDINH: {
                icon: "fa fa-glass"
            },
            GIAYCHUNGNHAN: {
                icon: "fa fa-list-alt"
            },
            GIAYTOTOCHUC: {
                icon: "fa fa-briefcase"
            },
            GIAYTOTUYTHAN: {
                icon: "fa fa-photo"
            },
            HANCHETHUALIENKE: {
                icon: "fa fa-ban"
            },
            VANBANBANHANH: {
                icon: "fa fa-newspaper-o"
            },
            HOGIADINH: {
                icon: "fa fa-group"
            },
            KHUCHUNGCU: {
                icon: "fa fa-map"
            },
            LIENKETTAISANTHUADAT: {
                icon: "fa fa-cubes"
            },
            LOGIAYCHUNGNHAN: {
                icon: "fa fa-database"
            },
            MUCDICHSUDUNG: {
                icon: "fa fa-flag"
            },
            NGUONGOCSUDUNGDAT: {
                icon: "fa fa-filter"
            },
            HANGMUCSOHUUCHUNG: {
                icon: "fa fa-gears"
            },
            NHACHUNGCU: {
                icon: "fa fa-building"
            },
            HANGMUCNHARIENGLE: {
                icon: "fa fa-id-badge"
            },
            NHARIENGLE: {
                icon: "fa fa-home"
            },
            RUNG: {
                icon: "fa fa-braille"
            },
            RUNGTRONG: {
                icon: "fa fa-braille"
            },
            TAISAN: {
                icon: "fa fa-money"
            },
            THANHVIENHOGIADINH: {
                icon: "fa fa-heart"
            },
            THUADAT: {
                icon: "fa fa-square"
            },
            TOCHUC: {
                icon: "fa fa-sitemap"
            },
            VOCHONG: {
                icon: "fa fa-heart"
            },
            VO: {
                icon: "fa fa-female"
            },
            CHONG: {
                icon: "fa fa-male"
            },
            BENTHECHAP: {
                icon: 'fa fa-users'
            },
            BENNHANTHECHAP: {
                icon: 'fa fa-bank'
            },
            GIAODICHBAODAM: {
                icon: 'fa fa-briefcase'
            },
            DANHSACHDIACHI: {
                icon: 'fa fa-map-marker'
            },
            DANHSACHGIAYTO: {
                icon: 'fa fa-newspaper-o'
            },
            DANHSACHLIENKETTAISAN: {
                icon: 'fa fa-sitemap'
            },
            DANHSACHHANGMUC: {
                icon: 'fa fa-institution'
            },
            FIELD: {
                icon: 'fa fa-caret-right green'
            },
            LINK: {
                icon: 'fa fa-link'
            },
            CHUYENQUYEN: {
                icon:'fa fa-share'
            }
        },
        listThongTinDangKy: [],
        duLieuBienDong: {},
        SearchType: 'Graph' //Graph or Json
    },
    VModule: {},
    TraCuu: {},
    DangKy: {},
    SearchDetailData: {},
    BienDong: {},
    SaveLocal: {
        //Chủ sử dụng
        //CANHAN
        CaNhan: function (caNhan) {
            if (!caNhan) return null;

            if (!caNhan.caNhanId) {
                caNhan.caNhanId = 0 - new Date().getTime();
            }


            if (caNhan.ListGiayToTuyThan) {
                caNhan.ListGiayToTuyThan.forEach((item, index) => {
                    item.caNhanId = caNhan.caNhanId;

                    if (!item.giayToTuyThanId) {
                        item.giayToTuyThanId = 0 - (index + 1);
                    }

                });
            }

            if (caNhan.ListDiaChi) {
                caNhan.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }
                    item.itemId = caNhan.caNhanId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("CANHAN");
                });
            }
            return caNhan;
        },
        //VOCHONG
        VoChong: function (voChong) {
            if (!voChong) return null;
            if (!voChong.voChongId) {
                voChong.voChongId = 0 - new Date().getTime();
            }

            voChong.voId = voChong.Vo.caNhanId;
            voChong.chongId = voChong.Chong.caNhanId;

            return voChong;
        },
        //HOGIADINH
        HoGiaDinh: function (hoGiaDinh) {
            if (!hoGiaDinh) return null;

            if (!hoGiaDinh.hoGiaDinhId) {
                hoGiaDinh.hoGiaDinhId = 0 - new Date().getTime();
            }

            if (hoGiaDinh.ChuHo != null) {
                hoGiaDinh.chuHoId = hoGiaDinh.ChuHo.caNhanId;
            }

            if (hoGiaDinh.VoChong != null) {
                hoGiaDinh.voChongChuHoId = hoGiaDinh.VoChong.voChongId;
            }

            if (hoGiaDinh.ListDiaChi) {
                hoGiaDinh.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }
                    item.itemId = hoGiaDinh.hoGiaDinhId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("HOGIADINH");
                });
            }

            if (hoGiaDinh.ListThanhVienHoGiaDinh) {
                hoGiaDinh.ListThanhVienHoGiaDinh.forEach((thanhVien, index) => {
                    if (!thanhVien.thanhVienHoGiaDinhId) {
                        thanhVien.thanhVienHoGiaDinhId = 0 - (index + 1);
                    }
                    thanhVien.hoGiaDinhId = hoGiaDinh.hoGiaDinhId;
                    thanhVien.caNhanId = thanhVien.CaNhan.caNhanId;
                });

            }

            return hoGiaDinh;
        },
        //CONGDONG
        CongDong: function (congDong) {
            if (!congDong) return null;

            if (!congDong.congDongId) {
                congDong.congDongId = 0 - new Date().getTime();
            }

            if (congDong.NguoiDaiDien != null) {
                congDong.nguoiDaiDienId = congDong.NguoiDaiDien.caNhanId;
            }

            if (congDong.ListDiaChi) {
                congDong.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }

                    item.itemId = congDong.congDongId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("CONGDONG");
                });
            }

            return congDong;
        },
        //TOCHUC
        ToChuc: function (toChuc) {
            if (!toChuc) return null;

            if (!toChuc.toChucId) {
                toChuc.toChucId = 0 - new Date().getTime();
            }

            if (toChuc.NguoiDaiDien != null) {
                toChuc.nguoiDaiDienId = toChuc.NguoiDaiDien.caNhanId;
            }

            if (toChuc.ListGiayToBoSung) {
                toChuc.ListGiayToBoSung.forEach((item, index) => {
                    if (!item.giayToToChucId) {
                        item.giayToToChucId = 0 - (index + 1);
                    }

                    item.toChucId = toChuc.toChucId;
                });
            }

            if (toChuc.ListDiaChi) {
                toChuc.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }

                    item.itemId = toChuc.toChucId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("TOCHUC");
                });
            }

            return toChuc;
        },

        //Tài sản
        ThuaDat: function (thuaDat) {
            if (!thuaDat) return null;

            if (!thuaDat.thuaDatId) {
                thuaDat.thuaDatId = 0 - new Date().getTime();
            }


            if (thuaDat.ListDiaChi) {
                thuaDat.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }

                    item.itemId = thuaDat.thuaDatId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("THUADAT");
                });
            }

            if (thuaDat.ListMucDichSuDung) {
                thuaDat.ListMucDichSuDung.forEach((mucDich, index) => {
                    if (!mucDich.mucDichSuDungId) {
                        mucDich.mucDichSuDungId = 0 - (index + 1);
                    }

                    mucDich.thuaDatId = thuaDat.thuaDatId;
                });
            }

            if (thuaDat.TaiLieuDoDac) {
                if (!thuaDat.TaiLieuDoDac.taiLieuDoDacId) {
                    thuaDat.TaiLieuDoDac.taiLieuDoDacId = 0 - 1;
                }

                thuaDat.TaiLieuDoDac.thuaDatId = thuaDat.thuaDatId;
            }

            return thuaDat;
        },

        NhaRiengLe: function (nhaRiengLe) {
            if (!nhaRiengLe) return null;

            if (!nhaRiengLe.nhaRiengLeId) {
                nhaRiengLe.nhaRiengLeId = 0 - new Date().getTime();
            }

            if (nhaRiengLe.ListDiaChi) {
                nhaRiengLe.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }

                    item.itemId = nhaRiengLe.nhaRiengLeId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("NHARIENGLE");
                });
            }

            if (nhaRiengLe.ListHangMucNhaRiengLe) {
                nhaRiengLe.ListHangMucNhaRiengLe.forEach((item, index) => {
                    if (!item.hangMucNhaRiengLeId) {
                        item.hangMucNhaRiengLeId = 0 - (index + 1);
                    }

                    item.nhaRiengLeId = nhaRiengLe.nhaRiengLeId;
                });
            }

            if (nhaRiengLe.ListThuaLienKet) {
                nhaRiengLe.ListThuaLienKet.forEach((item, index) => {
                    if (!item.lienKetTaiSanThuaDatId) {
                        item.lienKetTaiSanThuaDatId = 0 - (index + 1);
                    }

                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("NHARIENGLE");
                    item.itemId = nhaRiengLe.nhaRiengLeId;
                })
            }

            return nhaRiengLe;
        },

        NhaChungCu: function (nhaChungCu) {
            if (!nhaChungCu) return null;

            if (!nhaChungCu.nhaChungCuId) {
                nhaChungCu.nhaChungCuId = 0 - new Date().getTime();
            }


            if (nhaChungCu.ListDiaChi) {
                nhaChungCu.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }

                    item.itemId = nhaChungCu.nhaChungCuId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("NHACHUNGCU");
                });
            }

            if (nhaChungCu.ListHangMucSoHuuChung) {
                nhaChungCu.ListHangMucSoHuuChung.forEach((item, index) => {
                    if (!item.hangMucSoHuuChungId) {
                        item.hangMucSoHuuChungId = 0 - (index + 1);
                    }

                    item.nhaChungCuId = nhaChungCu.nhaChungCuId;
                });
            }

            if (nhaChungCu.ListThuaLienKet) {
                nhaChungCu.ListThuaLienKet.forEach((item, index) => {
                    if (!item.lienKetTaiSanThuaDatId) {
                        item.lienKetTaiSanThuaDatId = 0 - (index + 1);
                    }

                    item.itemId = nhaChungCu.nhaChungCuId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("NHACHUNGCU");
                });
            }

            return nhaChungCu;
        },

        CanHo: function (canHo) {
            if (!canHo) return null;

            if (!canHo.canHoId) {
                canHo.canHoId = 0 - new Date().getTime();
            }

            return canHo;
        },

        CongTrinhXayDung: function (congTrinhXayDung) {
            if (!congTrinhXayDung) return null;

            if (!congTrinhXayDung.congTrinhXayDungId) {
                congTrinhXayDung.congTrinhXayDungId = 0 - new Date().getTime();
            }


            if (congTrinhXayDung.ListDiaChi) {
                congTrinhXayDung.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }

                    item.itemId = congTrinhXayDung.congTrinhXayDungId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("CONGTRINHXAYDUNG");
                });

            }

            if (congTrinhXayDung.ListHangMucCongTrinh) {
                congTrinhXayDung.ListHangMucCongTrinh.forEach((item, index) => {
                    if (!item.hangMucCongTrinhId) {
                        item.hangMucCongTrinhId = 0 - (index + 1);
                    }

                    item.congTrinhXayDungId = congTrinhXayDung.congTrinhXayDungId;
                });
            }

            if (congTrinhXayDung.ListThuaLienKet) {
                congTrinhXayDung.ListThuaLienKet.forEach((item, index) => {
                    if (!item.lienKetTaiSanThuaDatId) {
                        item.lienKetTaiSanThuaDatId = 0 - (index + 1);
                    }
                    item.itemId = congTrinhXayDung.congTrinhXayDungId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("CONGTRINHXAYDUNG");
                });
            }

            return congTrinhXayDung;
        },

        CongTrinhNgam: function (congTrinhNgam) {
            if (!congTrinhNgam) return null;

            if (!congTrinhNgam.congTrinhNgamI) {
                congTrinhNgam.congTrinhNgamId = 0 - new Date().getTime();
            }

            if (congTrinhNgam.ListDiaChi) {
                congTrinhNgam.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }

                    item.itemId = congTrinhNgam.congTrinhNgamId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("CONGTRINHNGAM");
                });
            }

            if (congTrinhNgam.ListThuaLienKet) {
                congTrinhNgam.ListThuaLienKet.forEach((item, index) => {
                    if (!item.lienKetTaiSanThuaDatId) {
                        item.lienKetTaiSanThuaDatId = 0 - (index + 1);
                    }

                    item.itemId = congTrinhNgam.congTrinhNgamId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.GetTypeId("CONGTRINHNGAM");
                });
            };

            return congTrinhNgam;
        },

        RungTrong: function (rung) {
            if (!rung) return null;

            if (!rung.rungTrongId) {
                rung.rungTrongId = 0 - new Date().getTime();
            }

            if (rung.ListDiaChi) {
                rung.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }

                    item.itemId = rung.rungTrongId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.RungTrong;
                });
            }

            if (rung.ListThuaLienKet) {
                rung.ListThuaLienKet.forEach((item, index) => {
                    if (!item.lienKetTaiSanThuaDatId) {
                        item.lienKetTaiSanThuaDatId = 0 - (index + 1);
                    }

                    item.itemId = rung.rungTrongId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.RungTrong;
                });
            }

            return rung;
        },

        CayLauNam: function (cayLauNam) {
            if (!cayLauNam) return null;

            if (!cayLauNam.cayLauNamId) {
                cayLauNam.cayLauNamId = 0 - new Date().getTime();
            }


            if (cayLauNam.ListDiaChi) {
                cayLauNam.ListDiaChi.forEach((item, index) => {
                    if (!item.diaChiId) {
                        item.diaChiId = 0 - (index + 1);
                    }

                    item.itemId = cayLauNam.cayLauNamId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.CayLauNam;
                });
            }

            if (cayLauNam.ListThuaLienKet) {
                cayLauNam.ListThuaLienKet.forEach((item, index) => {
                    if (!item.lienKetTaiSanThuaDatId) {
                        item.lienKetTaiSanThuaDatId = 0 - (index + 1);
                    }

                    item.itemId = cayLauNam.cayLauNamId;
                    item.typeItem = VBDLIS.Global.ObjectTypes.CayLauNam;
                });
            }

            return cayLauNam;
        },

        //giao dịch bảo đảm
        QuyetDinh: function (quyetDinh) {
            if (!quyetDinh) return null;

            if (!quyetDinh.quyetDinhId) {
                quyetDinh.quyetDinhId = 0 - new Date().getTime();
            }

            return quyetDinh;
        },
        HopDong: function (hopDong) {
            if (!hopDong) return null;

            if (!hopDong.hopDongId) {
                hopDong.hopDongId = 0 - new Date().getTime();
            }

            return hopDong;
        },
        VanBanBanHanh: function (vanBanBanHanh) {
            if (!vanBanBanHanh) return null;

            if (!vanBanBanHanh.vanBanBanHanhId) {
                vanBanBanHanh.vanBanBanHanhId = 0 - new Date().getTime();
            }

            return vanBanBanHanh;
        }
    },
    ConvertData: {},
    Utils: {},
    BuildJsTree: {
        TextCompare: function (displayName, oldValue, newValue, subfix) {
            let className = "old-data";

            if (typeof (oldValue) === "string" && typeof (newValue) === "string") {
                if (oldValue.replace(/\n|\r/g, "") != newValue.replace(/\n|\r/g, "")) {
                    className = "new-data";
                }
            }
            else if (oldValue != newValue) {
                className = "new-data";
            }

            subfix = subfix || "";

            if (newValue == null || newValue == "") {
                newValue = "-/-";
            }
            else {
                newValue = newValue + subfix;
            }
						
            if (displayName && displayName != "") {
                return `${displayName}: <span class="${className}">${newValue}</span>`
            } else {
                return `<span class="${className}">${newValue}</span>`
            }
        },
        renderChildrenTreeThuaDat: function (changeData, oldData) {
            let children = [];
            if (changeData.ListDiaChi && changeData.ListDiaChi.length > 0) {
                children.push({
                    text: "<b>Danh sách địa chỉ</b>",
                    data: changeData.ListDiaChi,
                    children: VBDLIS.BuildJsTree.createListNodeTree("DIACHI", changeData.ListDiaChi, oldData.ListDiaChi),
                    type: 'DANHSACHDIACHI',
                    state: { opened: true }
                })
            }
            if (changeData.ListMucDichSuDung && changeData.ListMucDichSuDung.length > 0) {
                children.push({
                    text: "<b>Mục đích sử dụng</b>",
                    data: changeData.ListMucDichSuDung,
                    children: VBDLIS.BuildJsTree.createListNodeTree("MUCDICHSUDUNG", changeData.ListMucDichSuDung, oldData.ListMucDichSuDung),
                    type: 'MUCDICHSUDUNG',
                    state: { opened: true }
                })
            }
            if (changeData.ChuSoHuu != null) {
                children.push({
                    text: "<b>Chủ sở hữu</b>",
                    data: changeData.ChuSoHuu,
                    children: VBDLIS.BienDong.TaoListNodeConTreeData(changeData.ChuSoHuu,true),
                    type: 'CHUSOHUU',
                    state: { opened: true }
                })
            }
            if (changeData.TaiSan != null) {
                children.push({
                    text: "<b>Tài sản</b>",
                    data: changeData.ChuSoHuu,
                    children: VBDLIS.BienDong.TaoListNodeConTreeData(changeData.TaiSan, true),
                    type: 'TAISAN',
                    state: { opened: true }
                })
            }

            return children;
        },
        createListNodeTree: function (type, list1, list2) {
            let that = this;
            let arr = [];
            if (list1 && list1.length > 0) {
                $.each(list1, function (i, data1) {
                    var check = false;
                    $.each(list2, function (i, data2) {
                        switch (type) {
                            case 'DIACHI':
                                if (data1.diaChiId == data2.diaChiId) {
                                    check = true;
                                    arr.push({
                                        text: VBDLIS.BuildJsTree.compareChildren(type, data1, data2),
                                        data: data1,
                                        icon: true,
                                        type: type
                                    });
                                    return false;
                                }
                                break
                            case 'MUCDICHSUDUNG':
                                if (data1.mucDichSuDungId == data2.mucDichSuDungId) {
                                    check = true;
                                    arr.push({
                                        text: VBDLIS.BuildJsTree.compareChildren(type, data1, data2),
                                        data: data1,
                                        icon: true,
                                        type: type
                                    });
                                    return false;
                                }
                            default:
                                break
                        }
                    });
                    if (!check) {
                        var str = VBDLIS.Global.TextGenertor(type, data1);
                        arr.push({
                            text: `<i class='red'>${str}</i>`,
                            data: data1,
                            icon: true,
                            type: type
                        });
                    }

                })
            }
            return arr;
        },
        compareChildren: function (layer, changeData, oldData) {
            switch (layer) {
                case 'DIACHI':
                    var thuaDat = changeData;
                    var thuaDatCu = oldData;


                    var strdiaChiChiTiet = thuaDat.diaChiChiTiet == thuaDatCu.diaChiChiTiet ? thuaDatCu.diaChiChiTiet : `<i class='red'>${thuaDat.diaChiChiTiet}</i>`;

                    Formated = `${strdiaChiChiTiet}`;
                    break;


                case 'TAILIEUDODAC':
                    var thuaDat = changeData;
                    var thuaDatCu = oldData;
                    strtenBanDo = "";
                    strphuongPhapDo = "";
                    strdonViDo = "";
                    if (thuaDat.taiLieuDoDacId == -1) {
                        strtenBanDo = `<i class='red'>${DanhMucAjax.GetLoaiBanDoDiaChinhById(thuaDat.loaiBanDoDiaChinhId).tenLoaiBanDoDiaChinh}</i>`;
                    } else if (thuaDat.taiLieuDoDacId == thuaDatCu.taiLieuDoDacId) {
                        {
                            strtenBanDo = DanhMucAjax.GetLoaiBanDoDiaChinhById(thuaDatCu.loaiBanDoDiaChinhId).tenLoaiBanDoDiaChinh
                            strphuongPhapDo = thuaDatCu.phuongPhapDo;
                            strdonViDo = thuaDatCu.donViDoDac
                        }
                    }
                    strphuongPhapDo = `<i class ='red'>${thuaDat.phuongPhapDo}</i>`;

                    strdonViDo = `<i class='red'>${thuaDat.donViDoDac}</i>`;


                    Formated = `Loại bản đồ địa chính: ${strtenBanDo} - Phương pháp đo: ${strphuongPhapDo} - Đơn vị đo: ${strdonViDo} `;
                    break;
                case 'MUCDICHSUDUNG':
                    var thuaDat = changeData;
                    var thuaDatCu = oldData;

                    strLoaiMucdich = "";
                    strTen = "";
                    if (thuaDat.loaiMucDichSuDungId == thuaDatCu.loaiMucDichSuDungId) {
                        strLoaiMucdich = DanhMucAjax.GetLoaiMucDichSuDungById(thuaDatCu.loaiMucDichSuDungId).loaiMucDichSuDungId;
                        strTen = DanhMucAjax.GetLoaiMucDichSuDungById(thuaDatCu.loaiMucDichSuDungId).tenLoaiMucDichSuDung;
                    } else {
                        strLoaiMucdich = `<i class='red'>${DanhMucAjax.GetLoaiMucDichSuDungById(thuaDat.loaiMucDichSuDungId).loaiMucDichSuDungId}</i>`;
                        strTen = `<i class = 'red'>${DanhMucAjax.GetLoaiMucDichSuDungById(thuaDat.loaiMucDichSuDungId).tenLoaiMucDichSuDung}</i>`
                    }


                    var strdienTich = thuaDat.dienTich == oldData.dienTich ? oldData.dienTich : `<i class = 'red'>${thuaDat.dienTich}</i>`;
                    var strthoiHanSuDung = thuaDat.thoiHanSuDung == oldData.thoiHanSuDung ? oldData.thoiHanSuDung : `<i class='red'>${thuaDat.thoiHanSuDung}</i>`;


                    Formated = `${strLoaiMucdich} (${strTen}): Diện tích: ${strdienTich} m² - Thời hạn sử dụng: ${strthoiHanSuDung} `;
                    break;
                case 'NHACHUNGCU':
                    var thuaDat = changeData;
                    var thuaDatCu = oldData;

                    strtenChungCu = "";
                    strDiaChi = "";
                    if (thuaDat.nhaChungCuId == thuaDatCu.nhaChungCuId) {
                        strtenChungCu = thuaDatCu.tenChungCu;
                        strDiaChi = thuaDatCu.diaChi;
                    } else {
                        strtenChungCu = `<i class= 'red'>${thuaDat.tenChungCu}</i>`;
                        strDiaChi = `<i class='red'>${thuaDat.diaChi}</i>`
                    }

                    Formated = `Tên chung cư : ${strtenChungCu} - Địa chỉ : ${strDiaChi}`;
                    break;
                default:
                    Formated = layer + "Chưa được định nghĩa";
            }
            return Formated;
        },
        TextGenertorDetail: function (layer, obj, old, color) {
            let result = "";
            let _t = function (text) {
                return `<i class="red">${text}</i>`;
            };
            let _r = function (text) {
                if (text && text != "") {
                    return text;
                }
                return "-/-";
            };
            let _con = function (obj, old, name, isBool) {
                let result = true;
                if (!old || !obj || !obj[name]) {
                    result = false;
                } else if (!old[name]) {
                    result = true;
                } else if (old[name] == obj[name]) {
                    result = false;
                }
                if (isBool === true) {
                    let str = (obj && obj[name]) ? obj[name] : "";
                    if (result) {
                        return _t(str);
                    }
                    return str;
                }
                return result;
            };

            switch (layer) {				
                case "DIACHI":
                    let diaChiChiTiet = "";
                    if (obj.diaChiChiTiet) {
                        diaChiChiTiet = _con(obj, old, "diaChiChiTiet", true);
                    }
                    result = _r(diaChiChiTiet);
                    break;
                case "GIAYTOTUYTHAN":
                    let loaiGiayTo = "";
                    if (obj.loaiGiayToTuyThanId) {
                        let tenLoaiGiayTo = DanhMucAjax.GetLoaiGiayToTuyThanById(obj.loaiGiayToTuyThanId).tenLoaiGiayTo;
                        loaiGiayTo = _con(obj, old, "loaiGiayToTuyThanId") ? _t(tenLoaiGiayTo) : tenLoaiGiayTo;
                    }
                    let soGiayTo = "";
                    if (obj.soGiayTo) {
                        soGiayTo = _con(obj, old, "soGiayTo", true);
                    }
                    let ngayCap = "";
                    if (obj.ngayCap) {
                        ngayCap = _con(obj, old, "ngayCap") ? _t(GLOBAL.utils.dateTimeReviver(obj.ngayCap).toString()) : GLOBAL.utils.dateTimeReviver(obj.ngayCap).toString()
                    }
                    let ngayHetHan = "";
                    if (obj.ngayHetHan) {
                        ngayHetHan = _con(obj, old, "ngayHetHan") ? _t(GLOBAL.utils.dateTimeReviver(obj.ngayHetHan).toString()) : GLOBAL.utils.dateTimeReviver(obj.ngayHetHan).toString();
                    }
                    let noiCap = "";
                    if (obj.noiCap) {
                        noiCap = _con(obj, old, "noiCap", true);
                    }

                    result = `Loại giấy tờ: ${_r(loaiGiayTo)} - Số giấy tờ: ${_r(soGiayTo)} - Ngày cấp: ${_r(ngayCap)} - Ngày hết hạn: ${_r(ngayHetHan)} - Nơi cấp: ${_r(noiCap)} `;
                    break;
                case "THANHVIENHOGIADINH":
                    let thongTinCaNhan = "";
                    if (obj.CaNhan) {
                        let _old = (old && old.CaNhan) ? old.CaNhan : null;
                        thongTinCaNhan = VBDLIS.BuildJsTree.TextGenertorDetail("CANHAN", obj.CaNhan, _old);
                    }
                    let quanHeVoiChuHo = _con(obj, old, "quanHeVoiChuHo", true) ;

                    result = `${thongTinCaNhan} - Quan hệ với chủ hộ: ${quanHeVoiChuHo} `;
                    break;
                case "GIAYTOTOCHUC":
                case "GIAYTOBOSUNG":
                    var tenLoaiGiayToToChuc = "";
                    if (obj.loaiGiayToToChucId) {
                        let loaiGiayToToChuc = DanhMucAjax.GetLoaiGiayToToChucById(obj.loaiGiayToToChucId);
                        if (loaiGiayToToChuc) {
                            tenLoaiGiayToToChuc = _con(obj, old, "loaiGiayToToChucId") ? _t(loaiGiayToToChuc.tenLoaiGiayTo) : loaiGiayToToChuc.tenLoaiGiayTo;
                        }
                    }
                    let soGiayToToChuc = "";
                    if (obj.soGiayTo) {
                        soGiayToToChuc = _con(obj, old, "soGiayTo", true);
                    }
                    let ngayCapGiayTo = "";
                    if (obj.ngayCap) {
                        ngayCapGiayTo = _con(obj, old, "ngayCap", true);
                    }
                    let noiCapGiayTo = "";
                    if (obj.noiCap) {
                        noiCapGiayTo = _con(obj, old, "noiCap", true);
                    }
                    result = `Loại tổ chức: ${_r(tenLoaiGiayToToChuc)} - Số giấy tờ: ${_r(soGiayToToChuc)} - Ngày cấp: ${_r(ngayCapGiayTo)} - Nơi cấp: ${_r(noiCapGiayTo)} `;
                    break;
                case "LIENKETTAISANTHUADAT":
                    let vmLienKetThua = obj.ThuaDat ? obj.ThuaDat : obj;
                    let oldLienKetThua = (old && old.ThuaDat) ? old.ThuaDat : old;

                    let soThuTuThuaLienKet = "";
                    if (vmLienKetThua.soThuTuThua) {
                        soThuTuThuaLienKet = _con(vmLienKetThua, oldLienKetThua, "soThuTuThua", true);
                    }

                    let soHieuToBanToLienKet = "";
                    if (vmLienKetThua.soHieuToBanDo) {
                        soHieuToBanToLienKet = _con(vmLienKetThua, oldLienKetThua, "soHieuToBanDo", true);
                    }

                    let dienTichThuaLienKet = "";
                    if (vmLienKetThua.dienTich) {
                        dienTichThuaLienKet = _con(vmLienKetThua, oldLienKetThua, "dienTich", true);
                    }

                    let diaChiThuaLienKet = "";
                    if (vmLienKetThua.ListDiaChi && vmLienKetThua.ListDiaChi.length > 0) {
                        let oldDiaChi = (oldLienKetThua && oldLienKetThua.ListDiaChi && oldLienKetThua.ListDiaChi.length > 0)
							? oldLienKetThua.ListDiaChi[0] : null
                        diaChiThuaLienKet = _con(vmLienKetThua.ListDiaChi[0], oldDiaChi, "diaChiChiTiet", true);
                    }

                    result = `Thuộc thửa đất: ${_r(soThuTuThuaLienKet)} (${_r(soHieuToBanToLienKet)}) - Diện tích: ${_r(dienTichThuaLienKet)} m² - Địa chỉ: ${_r(diaChiThuaLienKet)} `;
                    break;
                default:
            }
			
            if (color) {
                result = _t(result)
            }

            return result
        },
        Simple: {},
        Detail:
        {
            NhaRiengLe: function (newData, oldData) {
                if (!newData) return { text: `Không có dữ liệu` };
                if (!oldData) oldData = newData;

                let jstreeData = {
                    text: `<b>Nhà riêng lẻ</b>`,
                    type: "NHARIENGLE",
                    state: { opened: true },
                    data: newData,
                    children: []
                };


                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích xây dựng", oldData.dienTichXayDung, newData.dienTichXayDung, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });


                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích sử dụng", oldData.dienTichSuDung, newData.dienTichSuDung, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });


                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích sàn", oldData.dienTichSan, newData.dienTichSan, "m²"),
					type: "FIELD",
					state: { disabled: true },
                });


                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích sàn phụ", oldData.dienTichSanPhu, newData.dienTichSanPhu, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });


                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Thời hạn sở hữu", oldData.thoiHanSoHuu, newData.thoiHanSoHuu),
					type: "FIELD",
					state: { disabled: true },
                });


                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Cấp hạng", oldData.loaiCapNhaId, newData.loaiCapNhaId),
					type: "FIELD",
					state: { disabled: true }
                });


                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Kết cấu nhà ở", oldData.ketCau, newData.ketCau),
					type: "FIELD",
					state: { disabled: true }
                });


                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số tầng", oldData.soTang, newData.soTang),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số tầng hầm", oldData.soTangHam, newData.soTangHam),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Nguồn gốc hình thành", oldData.nguonGocHinhThanh, newData.nguonGocHinhThanh),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: "Sơ đồ nhà: " + (newData.tenFileSoDoNha ? "<a>Xem sơ đồ nhà</a>" : "Không có"),
					type: "FIELD",
					state: { disabled: true }
                });


                let listThuaLienKet = [{
                    text: "Không có thửa liên kết"
                }];

                if (newData.ListLienKetTaiSanThuaDat && newData.ListLienKetTaiSanThuaDat.length > 0) {
                    listThuaLienKet = newData.ListLienKetTaiSanThuaDat.map(function (lienKetThua) {
                        return {
                            text: VBDLIS.Global.TextGenertor("LIENKETTAISANTHUADAT", lienKetThua),
                            type: "LIENKETTAISANTHUADAT"
                        };
                    });
                }


                jstreeData.children.push({
                    text: "Danh sách thửa đất liên kết",
                    type: "LIENKETTAISANTHUADAT",
					state: { opened: true, disabled: true},
                    children: listThuaLienKet
                });

                let listDiaChi = [{
                    text: "Không có địa chỉ"
                }];


                if (newData.ListDiaChi && newData.ListDiaChi.length > 0) {
                    listDiaChi = newData.ListDiaChi.map(function (diaChi) {
                        return {
                            text: VBDLIS.Global.TextGenertor("DIACHI", diaChi),
                            type: "DIACHI"
                        };
                    });
                }


                jstreeData.children.push({
                    text: "Danh sách địa chỉ",
                    type: "DIACHI",
					state: { opened: true, disabled: true },
                    children: listDiaChi
                });


                let listHangMuc = [{
                    text: "Không có hạng mục nhà"
                }];


                if (newData.ListHangMucNhaRiengLe && newData.ListHangMucNhaRiengLe.length > 0) {
                    listHangMuc = newData.ListHangMucNhaRiengLe.map(function (hangMucNhaRiengLe) {
                        return {
                            text: VBDLIS.Global.TextGenertor("HANGMUCNHARIENGLE", hangMucNhaRiengLe),
                            type: "HANGMUCNHARIENGLE"
                        };
                    });
                }


                jstreeData.children.push({
                    text: "Danh sách hạng mục nhà",
                    type: "HANGMUCNHARIENGLE",
					state: { opened: true, disabled: true },
                    children: listHangMuc
                });


                return jstreeData;
            },

            ThuaDat: function (changeData, oldData) {
                if (!changeData) return { text: `Không có dữ liệu` };
                if (!oldData) oldData = changeData;

                let tdObj = {
                    text: `<b>Thửa đất</b>`,
                    type: "THUADAT",
                    state: { opened: true },
                    data: changeData,
                    children: []
                };


                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số thứ tự thửa", oldData.soThuTuThua, changeData.soThuTuThua),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số hiệu tờ bản đồ", oldData.soHieuToBanDo, changeData.soHieuToBanDo),
					type: "FIELD",
					state: { disabled: true }
                });


                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số thứ tự thửa củ", oldData.soThuTuThuaCu, changeData.soThuTuThuaCu),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số hiệu tờ bản đồ củ", oldData.soHieuToBanDoCu, changeData.soHieuToBanDoCu),
					type: "FIELD",
					state: { disabled: true }
                });


                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích", oldData.dienTich, changeData.dienTich, "m²"),
					type: "FIELD",
					state: { disabled: true },
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích pháp lý", oldData.dienTichPhapLy, changeData.dienTichPhapLy, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });


                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Quá trình sử dụng", oldData.quaTrinhSuDung, changeData.quaTrinhSuDung),
					type: "FIELD",
					state: { disabled: true }
                });


                tdObj.children.push({
                    text: "Sơ đồ thửa : " + (changeData.duongDanSoDo ? "<a>Xem sơ đồ nhà</a>" : "Không có"),
					type: "FIELD",
					state: { disabled: true }
                });


                if (changeData.TaiLieuDoDac != null) {
                    if (oldData.TaiLieuDoDac == null) {
                        oldData.TaiLieuDoDac = changeData.TaiLieuDoDac
                    }
                    tdObj.children.push({
                        text: `<b>${VBDLIS.BuildJsTree.compareChildren("TAILIEUDODAC", changeData.TaiLieuDoDac, oldData.TaiLieuDoDac)}</b>`,
                        type: "TAILIEUDODAC",
						state: { opened: true, disabled: true}
                    })

                } else {
                    tdObj.children.push({
                        text: "Tài liệu đo đạc : Không có",
                        type: "TAILIEUDODAC"
                    })
                }
                let arr = VBDLIS.BuildJsTree.renderChildrenTreeThuaDat(changeData, oldData);
                tdObj.children = tdObj.children.concat(arr);

                return tdObj;
            },

            NhaChungCu: function (changeData, oldData) {
                if (!changeData) return { text: `Không có dữ liệu` };
                if (!oldData) oldData = changeData;

                let tdObj = {
                    text: `<b>Nhà chung cư</b>`,
                    type: "NHACHUNGCU",
                    state: { opened: true },
                    data: changeData,
                    children: []
                };

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tên chung cư", oldData.tenChungCu, changeData.tenChungCu),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Địa chỉ", oldData.diaChi, changeData.diaChi),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Kết cấu", oldData.ketCau, changeData.ketCau),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích xây dựng", oldData.dienTichXayDung, changeData.dienTichXayDung, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích sàn", oldData.dienTichSan, changeData.dienTichSan, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số tầng", oldData.soTang, changeData.soTang),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số tầng hầm", oldData.soTangHam, changeData.soTangHam),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tổng số căn hộ", oldData.tongSoCanHo, changeData.tongSoCanHo),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Năm xây dựng", oldData.namXayDung, changeData.namXayDung),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Năm hoàn thành", oldData.namHoanThanh, changeData.namHoanThanh),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Thời hạn sở hữu", oldData.thoiHanSoHuu, changeData.thoiHanSoHuu),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: "Sơ đồ nhà: " + (newData.duongDanSoDoNhaChungCu ? "<a>Xem sơ đồ nhà</a>" : "Không có"),
					type: "FIELD",
					state: { disabled: true }
                });

                let listThuaLienKet = [{
                    text: "Không có thửa liên kết"
                }];

                if (changeData.ListLienKetTaiSanThuaDat && changeData.ListLienKetTaiSanThuaDat.length > 0) {
                    listThuaLienKet = changeData.ListLienKetTaiSanThuaDat.map(function (lienKetThua) {
                        return {
                            text: VBDLIS.Global.TextGenertor("LIENKETTAISANTHUADAT", lienKetThua),
                            type: "LIENKETTAISANTHUADAT"
                        };
                    });
                }


                tdObj.children.push({
                    text: "Danh sách thửa đất liên kết",
                    type: "LIENKETTAISANTHUADAT",
					state: { opened: true, disabled: true },
                    children: listThuaLienKet
                });

                let listHangMucSoHuuChung = [{
                    text: "Không có hạng mục sở hữu chung"
                }];

                if (changeData.ListHangMucSoHuuChung && changeData.ListHangMucSoHuuChung.length > 0) {
                    listHangMucSoHuuChung = changeData.ListHangMucSoHuuChung.map(function (sohuuchung) {
                        return {
                            text: VBDLIS.Global.TextGenertor("HANGMUCSOHUUCHUNG", sohuuchung),
                            type: "HANGMUCSOHUUCHUNG"
                        };
                    });
                }

                tdObj.children.push({
                    text: "Hạng mục sở hữu chung",
                    type: "HANGMUCSOHUUCHUNG",
					state: { opened: true, disabled: true},
                    children: listHangMucSoHuuChung
                });

                return tdObj;
            },

            CanHo: function (changeData, oldData) {
                if (!changeData) return { text: `Không có dữ liệu` };
                if (!oldData) oldData = changeData;

                let tdObj = {
                    text: `<b>Căn hộ</b>`,
                    type: "CANHO",
                    state: { opened: true },
                    data: changeData,
                    children: []
                }; 
                
                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số hiệu căn hộ", oldData.soHieuCanHo, changeData.soHieuCanHo),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tầng số", oldData.tangSo, changeData.tangSo),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích sàn", oldData.dienTichSan, changeData.dienTichSan, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích sử dụng", oldData.dienTichSuDung, changeData.dienTichSuDung, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: "Sơ đồ nhà: " + (changeData.duongDanSoDoCanHo ? "<a>Xem sơ đồ nhà</a>" : "Không có"),
                    type: "FIELD"
                });

                if (changeData.nhaChungCu != null) {
                    if (oldData.nhaChungCu == null) {
                        oldData.nhaChungCu = changeData.nhaChungCu
                    }
                    tdObj.children.push({
                        text: `<b>${VBDLIS.BuildJsTree.compareChildren("NHACHUNGCU", changeData.nhaChungCu, oldData.nhaChungCu)}</b>`,
                        type: "NHACHUNGCU",
                        state: { opened: true }
                    })

                } else {
                    tdObj.children.push({
                        text: "Nhà chung cư : Không có",
                        type: "NHACHUNGCU"
                    })
                }

                return tdObj
            },

            CongTrinhXayDung: function (changeData, oldData) {
                if (!changeData) return { text: `Không có dữ liệu` };
                if (!oldData) oldData = changeData;

                let tdObj = {
                    text: `<b>Công trình xây dựng</b>`,
                    type: "CONGTRINHXAYDUNG",
                    state: { opened: true },
                    data: changeData,
                    children: []
                };

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tên công trình", oldData.tenCongTrinh, changeData.tenCongTrinh),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Cấp công trình", oldData.loaiCapCongTrinhId, changeData.loaiCapCongTrinhId),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Đặc điểm", oldData.dacDiem, changeData.dacDiem),
					type: "FIELD",
					state: { disabled: true }
                });


                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Năm xây dựng", oldData.namXayDung, changeData.namXayDung),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Năm hoàn thành", oldData.namHoanThanh, changeData.namHoanThanh),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Thời hạn sở hữu", oldData.thoiHanSoHuu, changeData.thoiHanSoHuu),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích", oldData.dienTichXayDung, changeData.dienTichXayDung, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích sàn", oldData.dienTichSan, changeData.dienTichSan, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số tầng", oldData.soTang, changeData.soTang),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số tầng hầm", oldData.soTangHam, changeData.soTangHam),
					type: "FIELD",
					state: { disabled: true }
                });
   
                let listThuaLienKet = [{
                    text: "Không có thửa liên kết"
                }];

                if (changeData.ListThuaLienKet && changeData.ListThuaLienKet.length > 0) {
                    listThuaLienKet = changeData.ListThuaLienKet.map(function (lienKetThua) {
                        return {
                            text: VBDLIS.Global.TextGenertor("LIENKETTAISANTHUADAT", lienKetThua),
                            type: "LIENKETTAISANTHUADAT"
                        };
                    });
                }


                tdObj.children.push({
                    text: "Danh sách thửa đất liên kết",
                    type: "LIENKETTAISANTHUADAT",
					state: { opened: true, disabled: true },
                    children: listThuaLienKet
                });

                let listDiaChi = [{
                    text: "Không có địa chỉ"
                }];


                if (changeData.ListDiaChi && changeData.ListDiaChi.length > 0) {
                    listDiaChi = changeData.ListDiaChi.map(function (diaChi) {
                        return {
                            text: VBDLIS.Global.TextGenertor("DIACHI", diaChi),
                            type: "DIACHI"
                        };
                    });
                }


                tdObj.children.push({
                    text: "Danh sách địa chỉ",
                    type: "DIACHI",
                    state: { opened: true },
                    children: listDiaChi
                });

                let listHangMucCongTrinh = [{
                    text: "Không có hạng mục"
                }]

                if (changeData.ListHangMucCongTrinh && changeData.ListHangMucCongTrinh.length > 0) {
                    listHangMucCongTrinh = changeData.ListHangMucCongTrinh.map(function (hangmuccongtrinh) {
                        return {
                            text: VBDLIS.Global.TextGenertor("HANGMUCCONGTRINH", hangmuccongtrinh),
                            type: "HANGMUCCONGTRINH"
                        };
                    });
                }

                tdObj.children.push({
                    text: "Danh sách hạng mục",
                    type: "HANGMUCCONGTRINH",
					state: { opened: true, disabled: true},
                    children: listHangMucCongTrinh
                })

                return tdObj;
            },

            CongTrinhNgam: function (changeData, oldData) {
                if (!changeData) return { text: `Không có dữ liệu` };
                if (!oldData) oldData = changeData;

                let tdObj = {
                    text: `<b>Công trình ngầm</b>`,
                    type: "CONGTRINHNGAM",
                    state: { opened: true },
                    data: changeData,
                    children: []
                };

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Loại công trình", oldData.LoaiCongTrinhNgam, changeData.LoaiCongTrinhNgam),
					type: "FIELD",
					state: { disabled: true }
                });   

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tên công trình", oldData.tenCongTrinh, changeData.tenCongTrinh),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích công trình", oldData.dienTichCongTrinh, changeData.dienTichCongTrinh, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Độ sâu tối đa", oldData.doSauToiDa, changeData.doSauToiDa),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Vị trí đầu nối", oldData.viTriDauNoi, changeData.viTriDauNoi),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Năm xây dựng", oldData.namXayDung, changeData.namXayDung),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Năm hoàn thành", oldData.namHoanThanh, changeData.namHoanThanh),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Thời hạn sở hữu", oldData.thoiHanSoHuu, changeData.thoiHanSoHuu),
					type: "FIELD",
					state: { disabled: true }
                });

                tdObj.children.push({
                    text: "Sơ đồ thửa : " + (changeData.duongDanSoDoCongTrinhNgam ? "<a>Xem sơ đồ nhà</a>" : "Không có"),
					type: "FIELD",
					state: { disabled: true }
                });

                let listThuaLienKet = [{
                    text: "Không có thửa liên kết"
                }];

                if (changeData.ListLienKetTaiSanThuaDat && changeData.ListLienKetTaiSanThuaDat.length > 0) {
                    listThuaLienKet = changeData.ListLienKetTaiSanThuaDat.map(function (lienKetThua) {
                        return {
                            text: VBDLIS.Global.TextGenertor("LIENKETTAISANTHUADAT", lienKetThua),
                            type: "LIENKETTAISANTHUADAT"
                        };
                    });
                }

                tdObj.children.push({
                    text: "Danh sách thửa đất liên kết",
                    type: "LIENKETTAISANTHUADAT",
					state: { opened: true, disabled: true },
                    children: listThuaLienKet
                });

                let listDiaChi = [{
                    text: "Không có địa chỉ"
                }];


                if (changeData.ListDiaChi && changeData.ListDiaChi.length > 0) {
                    listDiaChi = changeData.ListDiaChi.map(function (diaChi) {
                        return {
                            text: VBDLIS.Global.TextGenertor("DIACHI", diaChi),
                            type: "DIACHI"
                        };
                    });
                }

                tdObj.children.push({
                    text: "Danh sách địa chỉ",
                    type: "DIACHI",
					state: { opened: true, disabled: true},
                    children: listDiaChi
                });

                return tdObj;
            },

            CayLauNam: function (changeData, oldData) {
                if (!changeData) return { text: `Không có dữ liệu` };
                if (!oldData) oldData = changeData;

                let tdObj = {
                    text: `<b>Cây lâu năm</b>`,
                    type: "CAYLAUNAM",
                    state: { opened: true },
                    data: changeData,
                    children: []
                };

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Loại cây trồng", oldData.loaiCayTrong, changeData.loaiCayTrong),
					type: "FIELD",
					state: { disabled: true }
                });   

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tên cây lâu năm", oldData.tenCayLauNam, changeData.tenCayLauNam),
					type: "FIELD",
					state: { disabled: true }
                });   

                tdObj.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích", oldData.dienTich, changeData.dienTich, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });   

                let listThuaLienKet = [{
                    text: "Không có thửa liên kết"
                }];

                if (changeData.ListLienKetTaiSanThuaDat && changeData.ListLienKetTaiSanThuaDat.length > 0) {
                    listThuaLienKet = changeData.ListLienKetTaiSanThuaDat.map(function (lienKetThua) {
                        return {
                            text: VBDLIS.Global.TextGenertor("LIENKETTAISANTHUADAT", lienKetThua),
                            type: "LIENKETTAISANTHUADAT"
                        };
                    });
                }

                tdObj.children.push({
                    text: "Danh sách thửa đất liên kết",
                    type: "LIENKETTAISANTHUADAT",
					state: { opened: true, disabled: true },
                    children: listThuaLienKet
                });

                let listDiaChi = [{
                    text: "Không có địa chỉ"
                }];


                if (changeData.ListDiaChi && changeData.ListDiaChi.length > 0) {
                    listDiaChi = changeData.ListDiaChi.map(function (diaChi) {
                        return {
                            text: VBDLIS.Global.TextGenertor("DIACHI", diaChi),
                            type: "DIACHI"
                        };
                    });
                }

                tdObj.children.push({
                    text: "Danh sách địa chỉ",
                    type: "DIACHI",
					state: { opened: true, disabled: true },
                    children: listDiaChi
                });

                return tdObj;
            },

            RungTrong: function (newData, old) {
                if (!newData) return { text: `Không có dữ liệu` };

                let oldData = old || newData;

                let jstreeData = {
                    text: `<b>RỪNG TRỒNg</b>`,
                    type: "RUNGTRONG",
                    state: { opened: true },
                    data: newData,
                    children: []
                };

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tên rừng", oldData.tenRung, newData.tenRung),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Loại cây rừng", oldData.loaiCayRung, newData.loaiCayRung),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Diện tích", oldData.dienTich, newData.dienTich, "m²"),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Địa chỉ", oldData.diaChi, newData.diaChi),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: "Sơ đồ rừng: " + (newData.tenFileSoDoRung ? "<a>Xem sơ đồ rừng</a>" : "<small> (không có)</small>"),
					type: "FIELD",
					state: { disabled: true }
                });

                let listThuaLienKet = [{
                    text: "<small>Không có thửa liên kết</small>"
                }];
                if (newData.ListLienKetTaiSanThuaDat && newData.ListLienKetTaiSanThuaDat.length > 0) {
                    listThuaLienKet = newData.ListLienKetTaiSanThuaDat.map(function (vmLienKetThua) {
                        if (old) {
                            let arr = old.ListLienKetTaiSanThuaDat || [];
                            arr = arr.filter(x => x.lienKetTaiSanThuaDatId == vmLienKetThua.lienKetTaiSanThuaDatId);
                            let oldLienKetThua = arr.length == 1 ? arr[0] : null;
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("LIENKETTAISANTHUADAT", vmLienKetThua, oldLienKetThua, oldLienKetThua == null),
                                type: "LIENKETTAISANTHUADAT"
                            }
                        } else {
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("LIENKETTAISANTHUADAT", vmLienKetThua),
                                type: "LIENKETTAISANTHUADAT"
                            };
                        }
                    });
                }
                jstreeData.children.push({
                    text: "<b> Danh sách thửa đất liên kết </b>",
                    type: "DANHSACHLIENKETTAISAN",
					state: { opened: true, disabled: true },
                    children: listThuaLienKet
                });

                let listDiaChi = [{
                    text: "<small>Không có địa chỉ</small>"
                }];
                if (newData.ListDiaChi && newData.ListDiaChi.length > 0) {
                    listDiaChi = newData.ListDiaChi.map(function (vmDiaChi) {
                        if (old) {
                            let arr = old.ListDiaChi || [];
                            arr = arr.filter(x => x.diaChiId == vmDiaChi.diaChiId)
                            let oldDiaChi = arr.length == 1 ? arr[0] : null;
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("DIACHI", vmDiaChi, oldDiaChi, oldDiaChi == null),
                                type: "DIACHI"
                            }
                        }
                        return {
                            text: VBDLIS.BuildJsTree.TextGenertorDetail("DIACHI", vmDiaChi),
                            type: "DIACHI"
                        };
                    });
                }
                jstreeData.children.push({
                    text: "<b>Danh sách địa chỉ</b>",
                    type: "DANHSACHDIACHI",
					state: { opened: true, disabled: true },
                    children: listDiaChi
                });
            },

            CaNhan: function (newData, old) {
                if (!newData) return { text: `Không có dữ liệu` };

                let oldData = old || newData;

                let jstreeData = {
                    text: `<b>CÁ NHÂN</b>`,
                    type: "CANHAN",
                    state: { opened: true },
                    data: newData,
                    children: []
                };

                let _newGioiTinh = newData.gioiTinh ? "Ông" : "Bà",
					_oldGioiTinh = oldData.gioiTinh ? "Ông" : "Bà";
                let gioiTinh = VBDLIS.BuildJsTree.TextCompare("", _oldGioiTinh, _newGioiTinh);
                let hoTen = VBDLIS.BuildJsTree.TextCompare("", oldData.hoTen, newData.hoTen);
                jstreeData.children.push({
                    text: `${gioiTinh}: ${hoTen}`,
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Ngày sinh", GLOBAL.utils.dateTimeReviver(oldData.ngaySinh || "").toString(), GLOBAL.utils.dateTimeReviver(newData.ngaySinh || "").toString()),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Mã số định danh", oldData.maSoDinhDanh, newData.maSoDinhDanh),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Mã số thuế", oldData.maSoThue, newData.maSoThue),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số điện thoại", oldData.soDienThoai, newData.soDienThoai),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Email", oldData.diaChiEmail, newData.diaChiEmail),
					type: "FIELD",
					state: { disabled: true }
                });

                let _oldQuocTich = DanhMucAjax.GetQuocTichById(oldData.quocTichId1) || "";
                let _newQuocTich = DanhMucAjax.GetQuocTichById(newData.quocTichId1) || "";
                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Quốc tịch", _oldQuocTich, _newQuocTich),
					type: "FIELD",
					state: { disabled: true }
                });

                let _oldDanToc = oldData.danTocId ? DanhMucAjax.GetDanTocById(oldData.danTocId) : "";
                let _newDanToc = newData.danTocId ? DanhMucAjax.GetDanTocById(newData.danTocId) : "";
                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Dân tộc", _oldDanToc, _newDanToc),
					type: "FIELD",
					state: { disabled: true }
                });


                let listGiayToTuyThan = [{
                    text: "<small>Không có giấy tờ tùy thân</small>"
                }];
                if (newData.ListGiayToTuyThan && newData.ListGiayToTuyThan.length > 0) {
                    listGiayToTuyThan = newData.ListGiayToTuyThan.map(function (vmGiayToTuyThan) {
                        if (old) {
                            let arr = old.ListGiayToTuyThan || [];
                            arr = arr.filter(x => x.giayToTuyThanId == vmGiayToTuyThan.giayToTuyThanId)
                            let oldGiayToTuyThan = arr[0] || null;
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("GIAYTOTUYTHAN", vmGiayToTuyThan, oldGiayToTuyThan, oldGiayToTuyThan == null),
                                type: "GIAYTOTUYTHAN"
                            }
                        }
                        return {
                            text: VBDLIS.BuildJsTree.TextGenertorDetail("GIAYTOTUYTHAN", vmGiayToTuyThan, null),
                            type: "GIAYTOTUYTHAN"
                        };
                    });
                }
                jstreeData.children.push({
                    text: "<b>Danh sách giấy tờ tùy thân</b>",
                    type: "DANHSACHGIAYTO",
					state: { opened: true, disabled: true },
                    children: listGiayToTuyThan
                });


                let listDiaChi = [{
                    text: "<small>Không có địa chỉ</small>"
                }];
                if (newData.ListDiaChi && newData.ListDiaChi.length > 0) {
                    listDiaChi = newData.ListDiaChi.map(function (vmDiaChi) {
                        if (old) {
                            let arr = old.ListDiaChi || [];
                            arr = arr.filter(x => x.diaChiId == vmDiaChi.diaChiId)
                            let oldDiaChi = arr[0] || null;
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("DIACHI", vmDiaChi, oldDiaChi, oldDiaChi == null),
                                type: "DIACHI"
                            }
                        }
                        return {
                            text: VBDLIS.BuildJsTree.TextGenertorDetail("DIACHI", vmDiaChi),
                            type: "DIACHI"
                        };
                    });
                }
                jstreeData.children.push({
                    text: "<b>Danh sách địa chỉ</b>",
                    type: "DANHSACHDIACHI",
					state: { opened: true, disabled: true },
                    children: listDiaChi
                });

                return jstreeData;
            },

            HoGiaDinh: function (newData, old) {
                if (!newData) return { text: `Không có dữ liệu` };

                let oldData = old || newData;

                let jstreeData = {
                    text: `<b>HỘ GIA ĐÌNh</b>`,
                    type: "HOGIADINH",
                    state: { opened: true },
                    data: newData,
                    children: []
                };

                let tenChuHo = "Chủ hộ: -/-";
                if (newData.ChuHo) {
                    let _oldChuHo = oldData.ChuHo || {};
                    tenChuHo = VBDLIS.BuildJsTree.TextCompare("Chủ hộ", _oldChuHo.hoTen, newData.ChuHo.hoTen);
                }
                jstreeData.children.push({
                    text: tenChuHo,
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số sổ hộ khẩu", oldData.soSoHoKhau, newData.soSoHoKhau),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Hồ sơ hộ khẩu số", oldData.hoSoHoKhauSo, newData.hoSoHoKhauSo),
					type: "FIELD",
					state: { disabled: true }
                });

                if (newData.ChuHo) {
                    let dataTree = VBDLIS.BuildJsTree.Detail.CaNhan(newData.ChuHo, oldData.ChuHo);
                    dataTree.children = dataTree.children || [];
                    let thongTinChuHo = dataTree.children.filter(x => x && x.text && x.type === "FIELD").map(x => { return x.text }).join(" - ");

                    jstreeData.children.push({
                        text: "<b>Chủ hộ || </b>" + thongTinChuHo,
                        data: newData.ChuHo,
                        type: "CANHAN",
                        children: dataTree.children.filter(x => x && x.children && x.type !== "FIELD")
                    });
                } else {
                    jstreeData.children.push({
                        text: "<b>Chủ hộ</b>: <small>(không có thông tin)</small>",
                        type: "CANHAN",
                    });
                }

                if (newData.VoChong) {
                    let _oldVoChong = oldData.VoChong || null;
                    let dataTree = that.CaNhan(newData.VoChong, _oldVoChong);
                    dataTree.children = dataTree.children || [];
                    let thongTinChuHo = dataTree.children.filter(x => x && x.text && x.type === "FIELD").map(x => { return x.text }).join(" - ");
                    jstreeData.children.push({
                        text: "<b>Vợ/Chồng chủ hộ || </b>" + thongTinChuHo,
                        data: newData.ChuHo,
                        type: "VOCHONG",
                        children: dataTree.children.filter(x => x && x.children && x.type !== "FIELD")
                    });
                } else {
                    jstreeData.children.push({
                        text: "<b>Vợ/Chồng chủ hộ</b>: <small>(không có thông tin)</small>",
                        type: "VOCHONG"
                    });
                }

                let listDiaChi = [{
                    text: "<small>Không có địa chỉ</small>"
                }];
                if (newData.ListDiaChi && newData.ListDiaChi.length > 0) {
                    listDiaChi = newData.ListDiaChi.map(function (vmDiaChi) {
                        if (old) {
                            let arr = old.ListDiaChi || [];
                            arr = arr.filter(x => x.diaChiId == vmDiaChi.diaChiId)
                            let oldDiaChi = arr.length == 1 ? arr[0] : null;
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("DIACHI", vmDiaChi, oldDiaChi, oldDiaChi == null),
                                type: "DIACHI"
                            }
                        }
                        return {
                            text: VBDLIS.BuildJsTree.TextGenertorDetail("DIACHI", vmDiaChi),
                            type: "DIACHI"
                        };
                    });
                }
                jstreeData.children.push({
                    text: "<b>Danh sách địa chỉ</b>",
                    type: "DANHSACHDIACHI",
					state: { opened: true, disabled: true },
                    children: listDiaChi
                });

                let listThanhVienHoGiaDinh = [{
                    text: "<small>Không có thành viên</small>"
                }];
                if (newData.ListThanhVienHoGiaDinh && newData.ListThanhVienHoGiaDinh.length > 0) {
                    listThanhVienHoGiaDinh = newData.ListThanhVienHoGiaDinh.map(function (vmThanhVien) {
                        if (old) {
                            let arr = old.ListThanhVienHoGiaDinh || [];
                            arr = arr.filter(x => x && x.hoGiaDinhId == vmThanhVien.hoGiaDinhId && x.caNhanId == x.caNhanId);
                            let oldThanhVien = arr.length == 1 ? arr[0] : null;
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("THANHVIENHOGIADINH", vmThanhVien, oldThanhVien, oldThanhVien != null),
                                type: "THANHVIENHOGIADINH"
                            }
                        } else {
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("THANHVIENHOGIADINH", vmThanhVien),
                                type: "THANHVIENHOGIADINH"
                            };
                        }
                    });
                }
                jstreeData.children.push({
                    text: "<b>Thành viên hô gia đình</b>",
                    type: "THANHVIENHOGIADINH",
					state: { opened: true, disabled: true },
                    children: listThanhVienHoGiaDinh
                });

                return jstreeData;
            },

            VoChong: function (newData, old) {
                if (!newData) return { text: `Không có dữ liệu` };

                let oldData = old || newData;

                let jstreeData = {
                    text: `<b>VỢ CHỒNG</b>`,
                    type: "VOCHONG",
                    state: { opened: true },
                    data: newData,
                    children: []
                };

                let tenChong = "Ông: -/-";
                if (newData.Chong && newData.Chong.hoTen) {
                    let _oldChong = oldData.Chong || {};
                    tenChong = VBDLIS.BuildJsTree.TextCompare("Ông", _oldChong.hoTen, newData.Chong.hoTen);
                };
                let tenVo = "Bà: -/-";
                if (newData.Vo && newData.Vo.hoTen) {
                    let _oldVo = oldData.Vo || {};
                    tenVo = VBDLIS.BuildJsTree.TextCompare("Bà", _oldVo.hoTen, newData.Vo.hoTen);
                };
                jstreeData.children.push({
                    text: `Vợ chồng:${tenChong} và ${tenVo}`,
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số giấy chứng nhận kết hôn", oldData.soGiayChungNhanKetHon, newData.soGiayChungNhanKetHon),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Quyển số giấy chứng nhận kết hôn", oldData.quyenSoGiayChungNhanKetHon, newData.quyenSoGiayChungNhanKetHon),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Thời điểm hình thành", GLOBAL.utils.dateTimeReviver(oldData.thoiDiemHinhThanh || "").toString(), GLOBAL.utils.dateTimeReviver(newData.thoiDiemHinhThanh || "").toString()),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Thời điểm kết thúc", GLOBAL.utils.dateTimeReviver(oldData.thoiDiemKetThuc || "").toString(), GLOBAL.utils.dateTimeReviver(newData.thoiDiemKetThuc || "").toString()),
					type: "FIELD",
					state: { disabled: true }
                });

                if (newData.Chong) {
                    let dataTree = VBDLIS.BuildJsTree.Detail.CaNhan(newData.Chong, oldData.Chong);
                    dataTree.children = dataTree.children || [];
                    let thongTinChong = dataTree.children.filter(x => x && x.text && x.type === "FIELD").map(x => { return x.text }).join(" - ");

                    jstreeData.children.push({
                        text: "<b>Chồng || </b>" + thongTinChong,
                        type: "CHONG",
                        data: newData.Chong,
                        children: dataTree.children.filter(x => x && x.children && x.type !== "FIELD")
                    });
                } else {
                    jstreeData.children.push({
                        text: "<b>Chồng</b>: <small>(không có thông tin)</small>",
                        type: "CHONG"
                    });
                }

                if (newData.Vo) {
                    let dataTree = VBDLIS.BuildJsTree.Detail.CaNhan(newData.Vo, oldData.Vo);
                    dataTree.children = dataTree.children || [];
                    let thongTinVo = dataTree.children.filter(x => x && x.text && x.type === "FIELD").map(x => { return x.text }).join(" - ");

                    jstreeData.children.push({
                        text: "<b>Vợ || </b>" + thongTinVo,
                        type: "VO",
                        data: newData.Vo,
                        children: dataTree.children.filter(x => x && x.children && x.type !== "FIELD")
                    });
                } else {
                    jstreeData.children.push({
                        text: "<b>Vợ</b>: <small>(không có thông tin)</small>",
                        type: "VO"
                    });
                }

                return jstreeData;
            },

            ToChuc: function (newData, old) {
                if (!newData) return { text: `Không có dữ liệu` };

                let oldData = old || newData;

                let jstreeData = {
                    text: `<b>TỔ CHỨC</b>`,
                    type: "TOCHUC",
                    state: { opened: true },
                    data: newData,
                    children: []
                };

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tên tổ chức", oldData.tenToChuc, newData.tenToChuc),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Mã số định danh", oldData.maSoDinhDanh, newData.maSoDinhDanh),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tên viết tắt", oldData.tenVietTat, newData.tenVietTat),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tên tổ chức Tiếng Anh", oldData.tenToChucTA, newData.tenToChucTA),
					type: "FIELD",
					state: { disabled: true }
                });

                let nguoiDaiDien = "-/-";
                if (newData.NguoiDaiDien && newData.NguoiDaiDien.hoTen) {
                    let _oldNguoiDaiDien = oldData.NguoiDaiDien || {};
                    let _newGioiTinh = newData.NguoiDaiDien.gioiTinh ? "Ông" : "Bà",
						_oldGioiTinh = _oldNguoiDaiDien.gioiTinh ? "Ông" : "Bà";
                    let gioiTinh = VBDLIS.BuildJsTree.TextCompare("", _oldGioiTinh, _newGioiTinh);
                    let hoTen = VBDLIS.BuildJsTree.TextCompare("", _oldNguoiDaiDien.hoTen, newData.NguoiDaiDien.hoTen);

                    nguoiDaiDien = `${gioiTinh}: ${hoTen}`;
                }
                jstreeData.children.push({
                    text: "Người đại diện:" + nguoiDaiDien,
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Mã doanh nghiệp", oldData.maDoanhNghiep, newData.maDoanhNghiep),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Mã số thuế", oldData.maSoThue, newData.maSoThue),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Loại quyết định thành lập", oldData.loaiQuyetDinhThanhLap, newData.loaiQuyetDinhThanhLap),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số quyết định", oldData.soQuyetDinh, newData.soQuyetDinh),
					type: "FIELD",
					state: { disabled: true }
                });

                if (newData.NguoiDaiDien) {
                    let dataTree = VBDLIS.BuildJsTree.Detail.CaNhan(newData.NguoiDaiDien, oldData.NguoiDaiDien);
                    dataTree.children = dataTree.children || [];
                    let thongTinNguoiDaiDien = dataTree.children.filter(x => x && x.text && x.type === "FIELD").map(x => { return x.text }).join(" - ");

                    jstreeData.children.push({
                        text: "<b>Người địa diện || </b>" + thongTinNguoiDaiDien,
                        type: "CANHAN",
                        data: newData.NguoiDaiDien,
                        children: dataTree.children.filter(x => x && x.children && x.type !== "FIELD")
                    });
                } else {
                    jstreeData.children.push({
                        text: "<b>Người đại diện</b>: <small>(không có thông tin)</small>",
                        type: "CANHAN"
                    });
                }

                let listDiaChi = [{
                    text: "<small>Không có địa chỉ</small>"
                }];
                if (newData.ListDiaChi && newData.ListDiaChi.length > 0) {
                    listDiaChi = newData.ListDiaChi.map(function (vmDiaChi) {
                        if (old) {
                            let arr = old.ListDiaChi || [];
                            arr = arr.filter(x => x.diaChiId == vmDiaChi.diaChiId)
                            let oldDiaChi = arr.length == 1 ? arr[0] : null;
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("DIACHI", vmDiaChi, oldDiaChi, oldDiaChi == null),
                                type: "DIACHI"
                            }
                        }
                        return {
                            text: VBDLIS.BuildJsTree.TextGenertorDetail("DIACHI", vmDiaChi),
                            type: "DIACHI"
                        };
                    });
                }
                jstreeData.children.push({
                    text: "<b>Danh sách địa chỉ</b>",
                    type: "DANHSACHDIACHI",
					state: { opened: true, disabled: true },
                    children: listDiaChi
                });

                let listGiayToBoSung = [{
                    text: "<small>Không có giấy tờ</small>"
                }];
                if (newData.ListGiayToBoSung && newData.ListGiayToBoSung.length > 0) {
                    listGiayToBoSung = newData.ListGiayToBoSung.map(function (vmThanhVien) {
                        if (old) {
                            let arr = old.ListGiayToBoSung || [];
                            arr = arr.filter(x => x && x.giayToToChucId == vmThanhVien.giayToToChucId);
                            let oldGiayTo = arr.length == 1 ? arr[0] : null;
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("THANHVIENHOGIADINH", vmThanhVien, oldGiayTo, oldGiayTo == null),
                                type: "GIAYTOTOCHUC"
                            }
                        } else {
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("GIAYTOTOCHUC", vmThanhVien),
                                type: "GIAYTOTOCHUC"
                            };
                        }
                    });
                }
                jstreeData.children.push({
                    text: "<b>Giấy tờ bổ sung</b>",
                    type: "DANHSACHGIAYTO",
					state: { opened: true, disabled: true },
                    children: listGiayToBoSung
                });

                return jstreeData;
            },

            CongDong: function (newData, old) {
                if (!newData) return { text: `Không có dữ liệu` };

                let oldData = old || newData;

                let jstreeData = {
                    text: `<b>CỘNg ĐỒNG</b>`,
                    type: "CONGDONG",
                    state: { opened: true },
                    data: newData,
                    children: []
                };

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Tên công đồng", oldData.tenCongDong, newData.tenCongDong),
					type: "FIELD",
					state: { disabled: true }
                });

                let nguoiDaiDien = "-/-";
                if (newData.NguoiDaiDien && newData.NguoiDaiDien.hoTen) {
                    let _oldNguoiDaiDien = oldData.NguoiDaiDien || {};
                    let _newGioiTinh = newData.NguoiDaiDien.gioiTinh ? "Ông" : "Bà",
						_oldGioiTinh = _oldNguoiDaiDien.gioiTinh ? "Ông" : "Bà";
                    let gioiTinh = VBDLIS.BuildJsTree.TextCompare("", _oldGioiTinh, _newGioiTinh);
                    let hoTen = VBDLIS.BuildJsTree.TextCompare("", _oldNguoiDaiDien.hoTen, newData.NguoiDaiDien.hoTen);

                    nguoiDaiDien = `${gioiTinh}: ${hoTen}`;
                }
                jstreeData.children.push({
                    text: "Người đại diện:" + nguoiDaiDien,
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Loại giấy tờ", oldData.loaiGiayTo, newData.loaiGiayTo),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số giấy tờ", oldData.soGiayTo, newData.soGiayTo),
					type: "FIELD",
					state: { disabled: true }
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Địa danh cư trú", oldData.diaDanhCuTru, newData.diaDanhCuTru),
					type: "FIELD",
					state: { disabled: true }
                });

                if (newData.NguoiDaiDien) {
                    let dataTree = VBDLIS.BuildJsTree.Detail.CaNhan(newData.NguoiDaiDien, oldData.NguoiDaiDien);
                    dataTree.children = dataTree.children || [];
                    let thongTinNguoiDaiDien = dataTree.children.filter(x => x && x.text && x.type === "FIELD").map(x => { return x.text }).join(" - ");

                    jstreeData.children.push({
                        text: "<b>Người địa diện || </b>" + thongTinNguoiDaiDien,
                        type: "CANHAN",
                        data: newData.NguoiDaiDien,
                        children: dataTree.children.filter(x => x && x.children && x.type !== "FIELD")
                    });
                } else {
                    jstreeData.children.push({
                        text: "<b>Người đại diện</b>: <small>(không có thông tin)</small>",
                        type: "CANHAN"
                    });
                }

                let listDiaChi = [{
                    text: "<small>Không có địa chỉ</small>"
                }];
                if (newData.ListDiaChi && newData.ListDiaChi.length > 0) {
                    listDiaChi = newData.ListDiaChi.map(function (vmDiaChi) {
                        if (old) {
                            let arr = old.ListDiaChi || [];
                            arr = arr.filter(x => x.diaChiId == vmDiaChi.diaChiId)
                            let oldDiaChi = arr.length == 1 ? arr[0] : null;
                            return {
                                text: VBDLIS.BuildJsTree.TextGenertorDetail("DIACHI", vmDiaChi, oldDiaChi, oldDiaChi == null),
                                type: "DIACHI"
                            }
                        }
                        return {
                            text: VBDLIS.BuildJsTree.TextGenertorDetail("DIACHI", vmDiaChi),
                            type: "DIACHI"
                        };
                    });
                }
                jstreeData.children.push({
                    text: "<b>Danh sách địa chỉ</b>",
                    type: "DANHSACHDIACHI",
					state: { opened: true, disabled: true },
                    children: listDiaChi
                });

                return jstreeData;
            },

            GiayChungNhan: function (newData, old) {
                if (!newData) return { text: `Không có dữ liệu` };

                let oldData = old || newData;

                let jstreeData = {
                    text: `<b>Giấy Chứng Nhận</b>`,
                    type: "GIAYCHUNGNHAN",
                    state: { opened: true },
                    data: newData,
                    children: []
                };

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số phát hành", oldData.GiayChungNhan.soPhatHanh, newData.GiayChungNhan.soPhatHanh),
					type: "FIELD",
					state: { disabled: true },
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số hồ sơ gốc", oldData.GiayChungNhan.soHoSoGoc, newData.GiayChungNhan.soHoSoGoc),
					type: "FIELD",
					state: { disabled: true },
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số hồ sơ gốc cũ", oldData.GiayChungNhan.soHoSoGocCu, newData.GiayChungNhan.soHoSoGocCu),
					type: "FIELD",
					state: { disabled: true },
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số vào sổ", oldData.GiayChungNhan.soVaoSo, newData.GiayChungNhan.soVaoSo),
					type: "FIELD",
					state: { disabled: true },
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Số vào sổ cũ", oldData.GiayChungNhan.soVaoSoCu, newData.GiayChungNhan.soVaoSoCu),
					type: "FIELD",
					state: { disabled: true },
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Ngày vào sổ", oldData.GiayChungNhan.ngayVaoSo, newData.GiayChungNhan.ngayVaoSo),
					type: "FIELD",
					state: { disabled: true },
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Mã vạch", oldData.GiayChungNhan.maVach, newData.GiayChungNhan.maVach),
					type: "FIELD",
					state: { disabled: true },
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Người ký", oldData.GiayChungNhan.tenNguoiKy, newData.GiayChungNhan.tenNguoiKy),
					type: "FIELD",
					state: { disabled: true },
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("CCPL", oldData.GiayChungNhan.canCuPhapLy, newData.GiayChungNhan.canCuPhapLy),
					type: "FIELD",
					state: { disabled: true },
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Ghi chú 1", oldData.GiayChungNhan.ghiChuTrang1, newData.GiayChungNhan.ghiChuTrang1),
					type: "FIELD",
					state: { disabled: true },
                });

                jstreeData.children.push({
                    text: VBDLIS.BuildJsTree.TextCompare("Ghi chú 2", oldData.GiayChungNhan.ghiChuTrang2, newData.GiayChungNhan.ghiChuTrang2),
					type: "FIELD",
					state: { disabled: true },
                });


                let listTaiSan = [];

                if (newData.TaiSan) {
                    for (let loaiTaiSan in newData.TaiSan) {
                        if (newData.TaiSan[loaiTaiSan] && newData.TaiSan[loaiTaiSan].length > 0) {
                            for (let i = 0; i < newData.TaiSan[loaiTaiSan].length; i++) {
								let taiSanDinhChinh = newData.TaiSan[loaiTaiSan][i];
								let tenLoaiTaiSan = loaiTaiSan.substr(0, loaiTaiSan.length - 1);  
								let oldTaiSanDinhChinh = null;
								if (old) {
									let arr = (old.TaiSan && old.TaiSan[loaiTaiSan]) ? old.TaiSan[loaiTaiSan] : [];
									let fieldName = VBDLIS.ToCamel(tenLoaiTaiSan, { suffixes: 'Id' });
									arr = arr.filter(x => x[fieldName] == taiSanDinhChinh[fieldName]);
									oldTaiSanDinhChinh = arr.length == 1 ? arr[0] : null; 
								}                             
								listTaiSan.push(VBDLIS.BuildJsTree.Detail[tenLoaiTaiSan](taiSanDinhChinh, oldTaiSanDinhChinh));                                
                            }
                        }
                    }
                }

                jstreeData.children.push({
                    text: "Tài sản",
                    type: "TAISAN",
					state: { opened: true, disabled: true},
                    children: listTaiSan
                })

                let listChuSoHuu = [];

                if (newData.ChuSoHuu) {
                    for (let loaiSoHuu in newData.ChuSoHuu) {
                        if (newData.ChuSoHuu[loaiSoHuu] && newData.ChuSoHuu[loaiSoHuu].length > 0) {
                            for (let i = 0; i < newData.ChuSoHuu[loaiSoHuu].length; i++) {
								let chuSoHuuDinhChinh = newData.ChuSoHuu[loaiSoHuu][i];
								let tenloaiChuSoHuu = loaiSoHuu.substr(0, loaiSoHuu.length - 1);
								let oldChuSoHuuDinhChinh = null;
								if (old) {
									let arr = (old.ChuSoHuu && old.ChuSoHuu[loaiSoHuu]) ? old.ChuSoHuu[loaiSoHuu] : [];
									let fieldName = VBDLIS.ToCamel(tenloaiChuSoHuu, { suffixes: 'Id' });
									arr = arr.filter(x => x[fieldName] == chuSoHuuDinhChinh[fieldName]);
									oldChuSoHuuDinhChinh = arr.length == 1 ? arr[0] : null; 
								}                               

								listChuSoHuu.push(VBDLIS.BuildJsTree.Detail[tenloaiChuSoHuu](chuSoHuuDinhChinh, oldChuSoHuuDinhChinh));
                            }
                        }
                    }
                }

                jstreeData.children.push({
                    text: "Chủ sở hữu",
                    type: "CHUSOHUU",
					state: { opened: true, disabled: true},
                    children: listChuSoHuu
                })

                return jstreeData;
            }
        }
    },
}


VBDLIS.Global.GetLoaiDoiTuongById = function (doiTuongId) {
    var loaiDoiTuong = {};
    loaiDoiTuong.doiTuongId = doiTuongId;
    if (doiTuongId == 0) {
        loaiDoiTuong.TenMaDoiTuong = "CANHAN";
        loaiDoiTuong.TenDoiTuong = "Cá nhân";
    }
    else if (doiTuongId == 1) {
        loaiDoiTuong.TenMaDoiTuong = "VOCHONG";
        loaiDoiTuong.TenDoiTuong = "Vợ chồng";
    }
    else if (doiTuongId == 2) {
        loaiDoiTuong.TenMaDoiTuong = "HOGIADINH";
        loaiDoiTuong.TenDoiTuong = "Hộ gia đình";
    }
    else if (doiTuongId == 3) {
        loaiDoiTuong.TenMaDoiTuong = "TOCHUC";
        loaiDoiTuong.TenDoiTuong = "Tổ chức";
    }
    else if (doiTuongId == 4) {
        loaiDoiTuong.TenMaDoiTuong = "CONGDONG";
        loaiDoiTuong.TenDoiTuong = "Cộng đồng";
    }
    else if (doiTuongId == 6) {
        loaiDoiTuong.TenMaDoiTuong = "THUADAT";
        loaiDoiTuong.TenDoiTuong = "Thửa đất";
    }
    else if (doiTuongId == 7) {
        loaiDoiTuong.TenMaDoiTuong = "NHARIENGLE";
        loaiDoiTuong.TenDoiTuong = "Nhà riêng lẻ";
    }
    else if (doiTuongId == 8) {
        loaiDoiTuong.TenMaDoiTuong = "CANHO";
        loaiDoiTuong.TenDoiTuong = "Căn hộ";
    }
    else if (doiTuongId == 9) {
        loaiDoiTuong.TenMaDoiTuong = "NHACHUNGCU";
        loaiDoiTuong.TenDoiTuong = "Nhà chung cư";
    }
    else if (doiTuongId == 10) {
        loaiDoiTuong.TenMaDoiTuong = "KHUCHUNGCU";
        loaiDoiTuong.TenDoiTuong = "Khu chung cư";
    }
    else if (doiTuongId == 11) {
        loaiDoiTuong.TenMaDoiTuong = "CONGTRINHXAYDUNG";
        loaiDoiTuong.TenDoiTuong = "Công trình xây dựng";
    }
    else if (doiTuongId == 12) {
        loaiDoiTuong.TenMaDoiTuong = "CONGTRINHNGAM";
        loaiDoiTuong.TenDoiTuong = "Công trình ngầm";
    }
    else if (doiTuongId == 13) {
        loaiDoiTuong.TenMaDoiTuong = "RUNGTRONG";
        loaiDoiTuong.TenDoiTuong = "Rừng trồng";
    }
    else if (doiTuongId == 14) {
        loaiDoiTuong.TenMaDoiTuong = "CAYLAUNAM";
        loaiDoiTuong.TenDoiTuong = "Cây lâu năm";
    }
    return loaiDoiTuong;
}

VBDLIS.Global.TextGenertor = function (layer, obj) {
    var gioiTinh, Formated;
    switch (layer) {
        case "CANHAN":
            if (obj instanceof Array && obj.length > 0) obj = obj[0];
            var soCMND = "-/-";
            var tenGiayTo = "Số CMND";
            if (obj.ListGiayToTuyThan && obj.ListGiayToTuyThan.length > 0) {
                for (var i = 0; i < obj.ListGiayToTuyThan.length; i++) {
                    var giayTo = obj.ListGiayToTuyThan[i];
                    var loaiGiayToTuyThan = DanhMucAjax.GetLoaiGiayToTuyThanById(giayTo.loaiGiayToTuyThanId);
                    if (loaiGiayToTuyThan)
                        tenGiayTo = 'Số ' + loaiGiayToTuyThan.maLoaiGiayTo;
                    soCMND = giayTo.soGiayTo;
                    break;
                    //if (giayTo.loaiGiayToTuyThanId == 2) {
                    //    soCMND = giayTo.soGiayTo;
                    //    break;
                    //} else if (giayTo.loaiGiayToTuyThanId === 3) {
                    //    tenGiayTo="Số CMSQQĐND";
                    //    soCMND = giayTo.soGiayTo;
                    //    break;
                    //}
                }
            }

            Formated = `<b>Cá nhân</b>: ${obj.gioiTinh === 0 || obj.gioiTinh === false ? 'Bà' : 'Ông'}: ${obj.hoTen.firstCharToUpper()} - Năm sinh: ${parseInt(obj.namSinh) >0 ? obj.namSinh:"-/-"} - Quốc tịch: ${DanhMucAjax.GetQuocTichById(obj.quocTichId1 || obj.quocTichId2)} - Dân tộc: ${DanhMucAjax.GetDanTocById(obj.danTocId)} - ${tenGiayTo}: ${soCMND} `;
            break;
        case "NGUONGOCSUDUNGDAT":
            var nguonGocSuDung = DanhMucAjax.GetLoaiNguonGocSuDungDatById(obj.loaiNguonGocSuDungDatId);
            Formated = `Diện tích: ${obj.dienTich} m² - Nguồn gốc chi tiết: ${obj.chiTiet} - Loại nguồn gốc: ${nguonGocSuDung ? nguonGocSuDung.tenLoaiNguonGocInGiay : obj.loaiNguonGocSuDungDatId} `;
            break;
        case "DIACHI":
            let strDiaChi = VBDLIS.Global.GetDiaChiChiTiet(obj);
            Formated = `${strDiaChi} `;
            break;
        case "TAILIEUDODAC":
            Formated = `Loại bản đồ địa chính: ${DanhMucAjax.GetLoaiBanDoDiaChinhById(obj.loaiBanDoDiaChinhId).tenLoaiBanDoDiaChinh} - Phương pháp đo: ${obj.phuongPhapDo} - Đơn vị đo: ${obj.donViDoDac} `;
            break;
        case "GIAYTOTUYTHAN":
            var loaiGiayToTuyThan = "";
            if (obj.LoaiGiayToTuyThan && obj.LoaiGiayToTuyThan.tenLoaiGiayTo !== "") {
                loaiGiayToTuyThan = obj.LoaiGiayToTuyThan.tenLoaiGiayTo;
            }
            else {
                loaiGiayToTuyThan = DanhMucAjax.GetLoaiGiayToTuyThanById(obj.loaiGiayToTuyThanId).tenLoaiGiayTo;
            }

            Formated = `Loại giấy tờ: ${loaiGiayToTuyThan} - Số giấy tờ: ${obj.soGiayTo} - Ngày cấp: ${GLOBAL.utils.dateTimeReviver(obj.ngayCap || "-/-").toString()} - Nơi cấp: ${obj.noiCap} `;
            break;
        case "GIAYTOTOCHUC":
            var tenLoaiGiayToToChu = "-/-";
            var loaiGiayToToChuc = DanhMucAjax.GetLoaiGiayToToChucById(obj.loaiGiayToToChucId);

            if (loaiGiayToToChuc) {
                tenLoaiGiayToToChu = loaiGiayToToChuc.tenLoaiGiayTo;
            }


            Formated = `Loại tổ chức: ${tenLoaiGiayToToChu} - Số giấy tờ: ${obj.soGiayTo} - Ngày cấp: ${obj.ngayCap} - Nơi cấp: ${obj.noiCap} `;
            break;
        case "MUCDICHSUDUNG":
            var thoiHanSuDung = `${obj.ngaySuDung && obj.ngaySuDung != null ? `sử dụng đến ` + GLOBAL.utils.dateTimeReviver(obj.ngaySuDung || "").toString() : obj.thoiHanSuDung}`;
            if(obj.LoaiMucDichSuDung!=null && obj.LoaiMucDichSuDung.loaiMucDichSuDungId=="ODT" || obj.LoaiMucDichSuDung!=null && obj.LoaiMucDichSuDung.loaiMucDichSuDungId=="ONT")
                thoiHanSuDung= "Lâu dài";
            Formated = `${obj.LoaiMucDichSuDung != null ? obj.LoaiMucDichSuDung.loaiMucDichSuDungId : obj.loaiMucDichSuDungId} (${obj.LoaiMucDichSuDung != null ? obj.LoaiMucDichSuDung.tenLoaiMucDichSuDung : obj.loaiMucDichSuDungId}): Diện tích: ${obj.dienTich} m² - Thời hạn sử dụng: ${thoiHanSuDung} `;
            break;
        case "TOCHUC":
            var nguoiDaiDien = obj.NguoiDaiDien;
            if (nguoiDaiDien instanceof Array && nguoiDaiDien.length > 0) {
                nguoiDaiDien = nguoiDaiDien[0];
            }
            if (nguoiDaiDien) {
                nguoiDaiDien = `${nguoiDaiDien.gioiTinh === 0 || nguoiDaiDien.gioiTinh === false ? 'Bà' : 'Ông'}: ${nguoiDaiDien.hoTen} `;
            }
            Formated = `<b>Tổ chức</b>: ${obj.tenToChuc} - Mã định danh: ${obj.maSoDinhDanh} - Người đại diện: ${nguoiDaiDien} `;
            break;
        case "HOGIADINH":
            var tenChuHo = obj.chuHoId;
            if (obj.ChuHo != null && obj.ChuHo.hoTen != '') {
                tenChuHo = obj.ChuHo.hoTen;
            }
            Formated = `<b>Hộ gia đình</b>: Chủ hộ: ${tenChuHo} - Số sổ hộ khẩu: ${obj.soSoHoKhau ? obj.soSoHoKhau : '-/-'} - Hồ sơ hộ khẩu số: ${obj.hoSoHoKhauSo ? obj.hoSoHoKhauSo : '-/-'} `;
            break;
        case "THANHVIENHOGIADINH":
            var hoTen = "";
            gioiTinh = "";
            if (obj.CaNhan) {
                hoTen = obj.CaNhan.hoTen;
                gioiTinh = obj.CaNhan.gioiTinh ? "Ông" : "Bà";
            }
            Formated = `${gioiTinh}: ${hoTen} - Quan hệ với chủ hộ: ${obj.quanHeVoiChuHo} `;
            break;
        case "VOCHONG":
            if (obj instanceof Array && obj.length > 0) obj = obj[0];
            Formated = `<b>Vợ chồng</b> - Ông: ${obj.Chong ? obj.Chong.hoTen : ''} và Bà: ${obj.Vo ? obj.Vo.hoTen : ''} - Số GCN kết hôn: ${obj.soGiayChungNhanKetHon} - Số quyển: ${obj.quyenSoGiayChungNhanKetHon} - Thời kiểm hình thành: ${GLOBAL.utils.dateTimeReviver(obj.thoiDiemHinhThanh || "").toString()} `;
            break;
        case "CONGDONG":
            Formated = `<b>Cộng đồng</b>: ${obj.tenCongDong} - Loại giấy tờ: ${obj.loaiGiayTo} - Số giấy tờ: ${obj.soGiayTo} - Địa danh cư trú: ${obj.diaDanhCuTru} `;
            break;
        case "THUADAT":
            var thuaDat = obj;
            if (!thuaDat.diaChi) {
                if (thuaDat && thuaDat.ListDiaChi && thuaDat.ListDiaChi.length > 0) {
                    thuaDat.diaChi = thuaDat.ListDiaChi[0].diaChiChiTiet;
                }
                else if (obj.xaId) {
                    thuaDat.diaChi = DanhMucAjax.GetDiaChiByXaId(obj.xaId);
                }
            }
            else if (thuaDat && thuaDat.ListDiaChi && thuaDat.ListDiaChi.length > 0 && thuaDat.ListDiaChi[0].diaChiChiTiet && thuaDat.ListDiaChi[0].diaChiChiTiet.length > obj.diaChi) {
                thuaDat.diaChi = thuaDat.ListDiaChi[0].diaChiChiTiet;
            }

            var strDienTichTheChap = "";
            if (obj.dienTichTheChap != null) {
                strDienTichTheChap = `- <b>Diện tích thế chấp: ${obj.dienTichTheChap}m²</b>`;
            }

            Formated = `<b>Thửa đất</b>: ${obj.soThuTuThua} (${obj.soHieuToBanDo}) - Diện tích: ${obj.dienTich} m² - Địa chỉ: ${obj.diaChi} ${strDienTichTheChap} `;
            break;
        case "NHARIENGLE":
            var strDienTichTheChap = "";

            //if (!obj.diaChi) {
            //    if (obj && obj.ListDiaChi && obj.ListDiaChi.length > 0) {
            //        obj.diaChi = obj.ListDiaChi[0].diaChiChiTiet;
            //    }
            //    else if (obj.xaId) {
            //        obj.diaChi = DanhMucAjax.GetDiaChiByXaId(obj.xaId);
            //    }
            //}
            //else if (obj && obj.ListDiaChi && obj.ListDiaChi.length > 0 && obj.ListDiaChi[0].diaChiChiTiet.length > obj.diaChi) {
            //    obj.diaChi = obj.ListDiaChi[0].diaChiChiTiet;
            //}

            if (obj.dienTichTheChap != null) {
                strDienTichTheChap = `- <b>Diện tích thế chấp: ${obj.dienTichTheChap}m²</b>`;
            }

            //Formated = `<b>Nhà riêng lẻ</b>: Diện tích xây dựng: ${obj.dienTichXayDung} m² - Diện tích sàn: ${obj.dienTichSan} m² - Địa chỉ: ${obj.diaChi} ${strDienTichTheChap}`;
            Formated = `<b>Nhà riêng lẻ</b>: Diện tích xây dựng: ${obj.dienTichXayDung} m² - Diện tích sàn: ${obj.dienTichSan} m² - Kết cấu: ${obj.ketCau} ${strDienTichTheChap}`;
            break;
        case "HANGMUCNHARIENGLE":
            Formated = `Hạng mục: ${obj.tenHangMucNha} - Diện tích sàn: ${obj.dienTichSan} m² - Ghi chú: ${obj.ghiChu} `;
            break;
        case "HANGMUCSOHUUCHUNG":
            Formated = `Hạng mục: ${obj.tenHangMuc} - Diện tích: ${obj.dienTich} m² - Ghi chú: ${obj.ghiChu} `;
            break;
        case "CANHO":
            var chungCu = '';
            if (obj.nhaChungCu != null) {
                chungCu = `chung cư: ${obj.nhaChungCu.tenChungCu} `;
            }

            var strDienTichTheChap = "";

            if (obj.dienTichTheChap != null) {
                strDienTichTheChap = `- <b>Diện tích thế chấp: ${obj.dienTichTheChap}m²</b>`;
            }

            Formated = `<b>Căn hộ số</b>: ${obj.soHieuCanHo} ${chungCu} - Tầng số: ${obj.tangSo} - Diện tích sàn: ${obj.dienTichSan} m² - Diện tích sử dụng: ${obj.dienTichSuDung} m² ${strDienTichTheChap}`;
            break;
        case "CONGTRINHXAYDUNG":
            var strDienTichTheChap = "";

            if (obj.dienTichTheChap != null) {
                strDienTichTheChap = `- <b>Diện tích thế chấp: ${obj.dienTichTheChap}m²</b>`;
            }

            Formated = `<b>Công trình</b>: ${obj.tenCongTrinh} - Số tầng: ${obj.soTang} - Diện tích xây dựng: ${obj.dienTichXayDung} m² - Diện tích sàn: ${obj.dienTichSan} m² ${strDienTichTheChap}`;
            break;
        case "HANGMUCCONGTRINH":
            Formated = `Hạng mục: ${obj.tenHangMuc} - Công năng: ${obj.congNang} - Kết cấu: ${obj.ketCau} - Diện tích xây dựng: ${obj.dienTichXayDung} m² - Diện tích sàn: ${obj.dienTichSan} m²`;
            break;
        case "CONGTRINHNGAM":
            var strDienTichTheChap = "";

            if (obj.dienTichTheChap != null) {
                strDienTichTheChap = `- <b>Diện tích thế chấp: ${obj.dienTichTheChap}m²</b>`;
            }

            Formated = `<b>Công trình ngầm</b>: ${obj.tenCongTrinh} - Diện tích: ${obj.dienTichCongTrinh} m² - Năm xây dựng: ${obj.namXayDung} - Năm hoàn thành: ${obj.namHoanThanh} ${strDienTichTheChap}`;
            break;
        case "CAYLAUNAM":
            var strDienTichTheChap = "";

            if (obj.dienTichTheChap != null) {
                strDienTichTheChap = `- <b>Diện tích thế chấp: ${obj.dienTichTheChap}m²</b>`;
            }
            Formated = `Loại cây: ${obj.loaiCayTrong} - Diện tích: ${obj.dienTich} m² - Địa chỉ: ${obj.diaChi} ${strDienTichTheChap}`;
            break;
        case "RUNGTRONG":
            var strDienTichTheChap = "";

            if (obj.dienTichTheChap != null) {
                strDienTichTheChap = `- <b>Diện tích thế chấp: ${obj.dienTichTheChap}m²</b>`;
            }

            Formated = `<b>Rừng trồng</b>: ${obj.tenRung} - Diện tích: ${obj.dienTich} m² - Địa chỉ: ${obj.diaChi} ${strDienTichTheChap}`;
            break;
        case "LIENKETTAISANTHUADAT":
            var diaChi = "-/-";
            var lienKetTaiSanThuaDat = obj;
            if (obj.thuaDat) {
                lienKetTaiSanThuaDat = obj.thuaDat;
            }
            if (lienKetTaiSanThuaDat && lienKetTaiSanThuaDat.ListDiaChi && lienKetTaiSanThuaDat.ListDiaChi.length > 0) {
                diaChi = VBDLIS.Global.GetDiaChiChiTiet(lienKetTaiSanThuaDat.ListDiaChi[0]);
            }
            Formated = `Thuộc thửa đất: ${lienKetTaiSanThuaDat.soThuTuThua} (${lienKetTaiSanThuaDat.soHieuToBanDo}) - Diện tích: ${lienKetTaiSanThuaDat.dienTich} m² - Địa chỉ: ${diaChi} `;
            break;
        case "DANGKYTAISAN":
            Formated = `Thông tin đăng ký: ${obj.duDieuKienCapGiay ? 'Đủ điều kiện' : 'Không đủ điều kiện'}</b> - Diện tích: ${obj.dienTichChung} m² - Tỷ lệ: ${obj.tyLe}% - Ngày bắt đầu: ${GLOBAL.utils.dateTimeReviver(obj.ngayBatDauSoHuu || "").toString()} - Ngày kết thúc: ${GLOBAL.utils.dateTimeReviver(obj.thoiHanSoHuu || "").toString()} - Thời gian sở hữu: ${obj.thoiGianSoHuu} `;
            break;
        case "GIAYCHUNGNHAN":
            Formated = `Số phát hành: ${obj.soPhatHanh} - Số hồ sơ gốc: ${obj.soHoSoGoc} - Ngày vào sổ: ${GLOBAL.utils.dateTimeReviver(obj.ngayVaoSo || "").toString()} - Mã vạch: ${obj.maVach} - Người ký: ${obj.tenNguoiKy} `;
            break;
        case "NHACHUNGCU":
            Formated = `Tên chung cư: ${obj.tenChungCu} - Tên khu chung cư: ${(obj.khuChungCu && obj.khuChungCu.tenKhu ? obj.khuChungCu.tenKhu : "-/-")} - Địa chỉ: ${obj.diaChi} - Năm xây dựng: ${obj.namXayDung} `;
            break;
        case "TINHHINHDANGKY":
            Formated = `Mã đơn: ${obj.maDon} - Số thứ tự hồ sơ: ${obj.soThuTu} - Ngày tiếp nhận: ${obj.ngayTiepNhan} - Ngày đăng ký: ${obj.thoiDiemDangKy} `;
            break;
        case "QUYETDINH":
            Formated = `Loại quyết định: ${DanhMucAjax.GetQuyetDinhById(obj.loaiQuyetDinhId)} - Số giấy tờ: ${obj.soGiayTo} - Ngày ký: ${obj.ngayKy} - Người ký: ${obj.nguoiKy} - Cơ quan ban hành: ${obj.coQuanBanHanh} `;
            break;
        case "HOPDONG":
            Formated = `Số hợp đồng: ${obj.soHopDong} -  Ngày hợp đồng: ${obj.ngayHopDong} - Thời hạn: ${obj.thoiHan} - Ngày bắt đầu: ${obj.ngayBatDau} - Ngày kết thúc: ${obj.ngayKetThuc} - Nơi công chứng: ${obj.noiCongChung} `;
            break;
        case "HANCHETHUALIENKE":
            Formated = `Số tờ: ${obj.soTo} - Số thửa: ${obj.soThua} - Diện tích: ${obj.dienTich} m² - Ngày đăng ký: ${obj.ngayDangKy} - Thời hạn: ${obj.thoiHan} - Nội dung: ${obj.noiDung} `;
            break;
        case "VANBANBANHANH":
            Formated = `Số văn bản: ${obj.soVanBan} - Ngày ban hành: ${obj.ngayBanHanh} - Cơ quan ban hành: ${obj.coQuanBanHanh} `;
            break;
        case "TUIHOSOQUET":
            Formated = `Hồ sơ số: ${obj.soThuTuHoSo} Kho: ${obj.kho} - Dãy: ${obj.day} - Kệ: ${obj.ke} - Hộp: ${obj.hop} `;
            break;
        case "FILEHOSOQUET":
            Formated = `${obj.moTa} `;
            break;
        case "GIAODICHBAODAM":
            Formated = `Số đăng ký: ${obj.soDangKy} - Thời điểm đăng ký: ${obj.thoiDiemDangKy ? obj.thoiDiemDangKy.toString() : "-/-"}`;
            break;
        default:
            Formated = layer + " Chưa được định nghĩa";
    }
    var regexFilter = ["null", "01\/01\/0001", "undefined", "Không có thông tin"];
    //Filter exception
    Formated = Formated.replace(new RegExp(regexFilter.join('|'), 'g'), "-/-");
    return Formated;
};

VBDLIS.Global.ObjectTypes = {
    arr: ["CANHAN", "VOCHONG", "HOGIADINH", "TOCHUC", "CONGDONG", "NHOMNGUOI", "THUADAT", "NHARIENGLE", "CANHO", "NHACHUNGCU", "KHUCHUNGCU", "CONGTRINHXAYDUNG", "CONGTRINHNGAM", "RUNGTRONG", "CAYLAUNAM"],
    GetTypeId: function (typeName) {
        var index = this.arr.indexOf(typeName.toUpperCase());

        if (index == -1) return null;

        return index;
    },
    GetTypeName: function (typeId) {
        return this.arr[typeId];
    }
};

VBDLIS.Global.GetDiaChiChiTiet = function (diaChi) {
    if (!diaChi) return "";

    let strDiaChi = diaChi.diaChiChiTiet || "";

    if (strDiaChi == diaChi.soNha) {
        let arrDiaChi = [];

        if (diaChi.duongId > 0) {
            let duong = DanhMucAjax.GetDuongById(diaChi.duongId);

            if (duong && duong.tenDuong) {
                arrDiaChi.push(duong.tenDuong);
            }
        }

        if (diaChi.xaId > 0) {
            let xa = DanhMucAjax.GetWardById(diaChi.xaId);

            if (xa && xa.ten) {
                arrDiaChi.push(xa.ten);
            }
        }

        if (diaChi.huyenId > 0) {
            let huyen = DanhMucAjax.GetDistrictById(diaChi.huyenId);

            if (huyen && huyen.ten) {
                arrDiaChi.push(huyen.ten);
            }
        }

        if (diaChi.tinhId > 0) {
            let tinh = DanhMucAjax.GetProvinceById(diaChi.tinhId);

            if (tinh && tinh.ten) {
                arrDiaChi.push(tinh.ten);
            }
        }

        strDiaChi = diaChi.soNha + " " + arrDiaChi.join(', ');
    }

    return strDiaChi;
}

VBDLIS.VModule.VModuleJsLoader = VModule.VModuleJsLoader;
VBDLIS.VModule.getVModule = VModule.getVModule;
VBDLIS.OnChangeData = VModule.OnChangeData;
VBDLIS.OnSelectedItem = VModule.OnSelectedItem;
VBDLIS.OnAddData = VModule.OnAddData;
VBDLIS.OnUpdateData = VModule.OnUpdateData;

VBDLIS.TraCuu.TimKiem = function (vModule, type) {
    if (!vModule) {
        vModule = $(document);
    }

    var exceptionFields = {
        CANHAN: [],
        VOCHONG: [],
        HOGIADINH: ["loaiGiayToTuyThanIdChuHo", "loaiGiayToTuyThanIdThanhVien", "loaiGiayToTuyThanIdVoChong"],
        TOCHUC: [],
        CONGDONG: [],
        THUADAT: [],
        NHARIENGLE: [],
        NHACHUNGCU: [],
        CANHO: [],
        CONGTRINHXAYDUNG: [],
        CONGTRINHNGAM: [],
        RUNGTRONG: [],
        CAYLAUNAM: [],
        GIAYCHUNGNHAN: [],
        TINHHINHDANGKY: [],
        HOSOTIEPNHAN: ["tinhId", "huyenId", "xaId"]
    }

    var titleType = VBDLIS.ToTitle(type);
    var searchData = GLOBAL.utils.getFormValue(vModule.find('#dvTraCuu' + titleType + 'ChiTiet'));
    var searchDetail = false;

    if (!exceptionFields[type]) {
        exceptionFields[type] = [];
    }

    if (searchData) {
        for (var prop in searchData) {
            var value = searchData[prop];
            if (value && exceptionFields[type].indexOf(prop) == -1) {
                searchDetail = true;
                break;
            }
        }
    }

    if (searchDetail) {
        VBDLIS.TraCuu.TimKiemChiTiet(vModule, type);
    }
    else {
        VBDLIS.SearchDetailData = null;
        var loaiAjax;
        if (["CANHAN", "VOCHONG", "HOGIADINH", "TOCHUC", "CONGDONG"].includes(type)) {
            loaiAjax = 'ChuSoHuu';
        } else if (["THUADAT", "NHARIENGLE", "CANHO", "NHACHUNGCU", "KHUCHUNGCU", "CONGTRINHXAYDUNG", "CONGTRINHNGAM", "RUNGTRONG", "CAYLAUNAM"].includes(type)) {
            loaiAjax = 'TaiSan';
        } else if (["GIAYCHUNGNHAN", "TINHHINHDANGKY", "HOSOTIEPNHAN"].includes(type)) {
            loaiAjax = 'DangKy';
        }
        else if (["VANBANNGANCHAN"].includes(type)) {
            loaiAjax = 'QuanLyDonThuNganChan';
        }
        vModule.find('#tblTraCuu' + VBDLIS.ToTitle(type)).data('tableAPI').ajax.url(GLOBAL.linkRoot + loaiAjax + 'Ajax/Get' + VBDLIS.ToTitle(type)).load();
    }
};

VBDLIS.TraCuu.TimKiemChiTiet = function (vModule, type) {
    if (!vModule) {
        vModule = $(document);
    }
    var titleType = VBDLIS.ToTitle(type);
    var searchData = GLOBAL.utils.getFormValue(vModule.find('#dvTraCuu' + titleType + 'ChiTiet'));

    searchData.xaId = vModule.find('#ddlPhuongXa').val();

    var traCuuData = {
        xaId: searchData.xaId
    };

    if (VBDLIS.Global.SearchType === 'Graph') {
        switch (type) {
            case 'CANHAN':
                traCuuData.hoTen = searchData.hoTen;
                traCuuData.soGiayTo = searchData.soGiayTo;
                traCuuData.namSinh = searchData.namSinh;
                traCuuData.diaChiChiTiet = searchData.diaChiChiTiet;
                break;
            case 'VOCHONG':
                traCuuData.soGiayChungNhanKetHon = searchData.soGiayChungNhanKetHon;
                traCuuData.hoTenChong = searchData.hoTenChong;
                traCuuData.soGiayToChong = searchData.soGiayToChong;
                traCuuData.namSinhChong = searchData.namSinhChong;
                traCuuData.diaChiChong = searchData.diaChiChong;
                traCuuData.hoTenVo = searchData.hoTenVo;
                traCuuData.soGiayToVo = searchData.soGiayToVo;
                traCuuData.namSinhVo = searchData.namSinhVo;
                traCuuData.diaChiVo = searchData.diaChiVo;
                break;
            case 'HOGIADINH':
                traCuuData.soSoHoKhau = searchData.soSoHoKhau;
                traCuuData.hoSoHoKhauSo = searchData.hoSoHoKhauSo;
                traCuuData.diaChi = searchData.diaChi;
                traCuuData.hoTenChuHo = searchData.hoTenChuHo;
                traCuuData.soGiayToChuHo = searchData.soGiayToChuHo;
                traCuuData.namSinhChuHo = searchData.namSinhChuHo;
                traCuuData.hoTenVoChongChuHo = searchData.hoTenVoChongChuHo;
                traCuuData.soGiayToVoChongChuHo = searchData.soGiayToVoChongChuHo;
                traCuuData.namSinhVoChongChuHo = searchData.namSinhVoChongChuHo;
                break;
            case 'TOCHUC':
                traCuuData.tenToChuc = searchData.tenToChuc;
                traCuuData.maSoThue = searchData.maSoThue;
                traCuuData.diaChi = searchData.diaChi;
                traCuuData.soGiayTo = searchData.soGiayTo;
                break;
            case 'CONGDONG':
                traCuuData.tenCongDong = searchData.tenCongDong;
                traCuuData.diaDanhCuTru = searchData.diaDanhCuTru;
                traCuuData.soGiayTo = searchData.soGiayTo;
                break;
            case 'THUADAT':
            case 'NHARIENGLE':
            case 'CANHO':
            case 'CONGTRINHXAYDUNG':
            case 'CONGTRINHNGAM':
            case 'CAYLAUNAM':
            case 'RUNGTRONG':
                traCuuData = searchData;
                break;
            case 'TINHHINHDANGKY':
                traCuuData.maDon = searchData.maDon;
                traCuuData.soThuTu = searchData.soThuTu;
                traCuuData.ngayTiepNhan = searchData.ngayTiepNhan;
                traCuuData.thoiDiemDangKy = searchData.thoiDiemDangKy;
                traCuuData.loaiGiayChungNhanId = searchData.loaiGiayChungNhanId;
                traCuuData.soPhatHanh = searchData.soPhatHanh;
                traCuuData.maVach = searchData.maVach;
                traCuuData.soVaoSo = searchData.soVaoSo;
                traCuuData.ngayVaoSo = searchData.ngayVaoSo;
                traCuuData.soHoSoGoc = searchData.soHoSoGoc;
                traCuuData.hoTen = searchData.hoTen;
                traCuuData.soGiayTo = searchData.soGiayTo;
                traCuuData.namSinh = searchData.namSinh;
                traCuuData.soThuTuThua = searchData.soThuTuThua;
                traCuuData.soHieuToBanDo = searchData.soHieuToBanDo;
                traCuuData.soThuTuThuaCu = searchData.soThuTuThuaCu;
                traCuuData.soHieuToBanDoCu = searchData.soHieuToBanDoCu;
                traCuuData.soNha = searchData.soNha;
                traCuuData.diaChiChiTiet = searchData.diaChiChiTiet;
                traCuuData.xaId = searchData.xaId;
                break;
            case 'GIAYCHUNGNHAN':
                traCuuData.loaiGiayChungNhanId = searchData.loaiGiayChungNhanId;
                traCuuData.soPhatHanh = searchData.soPhatHanh;
                traCuuData.maVach = searchData.maVach;
                traCuuData.soVaoSo = searchData.soVaoSo;
                traCuuData.ngayVaoSo = searchData.ngayVaoSo;
                traCuuData.soHoSoGoc = searchData.soHoSoGoc;
                traCuuData.hoTen = searchData.hoTen;
                traCuuData.soGiayTo = searchData.soGiayTo;
                traCuuData.namSinh = searchData.namSinh;
                traCuuData.soThuTuThua = searchData.soThuTuThua;
                traCuuData.soHieuToBanDo = searchData.soHieuToBanDo;
                traCuuData.soThuTuThuaCu = (searchData.soThuTuThuaCu);
                traCuuData.soHieuToBanDoCu = (searchData.soHieuToBanDoCu);
                traCuuData.soNha = searchData.soNha;
                traCuuData.diaChiChiTiet = searchData.diaChiChiTiet;
                traCuuData.xaId = searchData.xaId;
                break;
            case 'HOSOTIEPNHAN':
                traCuuData.huyen = searchData.huyen;
                traCuuData.xa = searchData.xa;
                traCuuData.quytrinh = searchData.quytrinh;
                traCuuData.soBienNhan = searchData.soBienNhan;
                traCuuData.ngayTiepNhan = searchData.ngayTiepNhan;
                traCuuData.ngayHenTra = searchData.ngayHenTra;
                traCuuData.soThua = (searchData.soThua);
                traCuuData.soTo = (searchData.soTo);
                traCuuData.diaChi = searchData.diaChi;
                traCuuData.hoTen = searchData.hoTen;
                traCuuData.giayChungMinh = searchData.giayChungMinh;
                traCuuData.soDienThoai = searchData.soDienThoai;
                break;
            case 'VANBANNGANCHAN':
                traCuuData.loaiVanBanNganChanId = searchData.loaiVanBanNganChanId;
                traCuuData.loaiNganChanId = searchData.loaiNganChanId;
                traCuuData.soVanBan = searchData.soVanBan;
                traCuuData.ngayBanHanh = searchData.ngayBanHanh;
                traCuuData.ngayHetHieuLuc = searchData.ngayHetHieuLuc;
                traCuuData.coQuanBanHanh = searchData.coQuanBanHanh;
                traCuuData.ngayHetHieuLuc = searchData.ngayHetHieuLuc;
                traCuuData.soPhatHanhGiayChungNhan = searchData.soPhatHanhGiayChungNhan;
                traCuuData.maVach = searchData.maVach;
                traCuuData.soVaoSo = searchData.soVaoSo;
                traCuuData.ngayVaoSo = searchData.ngayVaoSo;
                traCuuData.hoTenChu = searchData.hoTenChu;
                traCuuData.loaiGiayTo = searchData.loaiGiayTo;
                traCuuData.soGiayTo = searchData.soGiayTo;
                traCuuData.ngayCap = searchData.ngayCap;
                traCuuData.noiCap = searchData.noiCap;
                traCuuData.soThuTuThua = searchData.soThuTuThua;
                traCuuData.soHieuToBanDo = searchData.soHieuToBanDo;
                traCuuData.soThuTuThuaCu = searchData.soThuTuThuaCu;
                traCuuData.soHieuToBanDoCu = searchData.soHieuToBanDoCu;
                traCuuData.diaChiThua = searchData.diaChiThua;
                traCuuData.soNha = searchData.soNha;
                traCuuData.diaChiNha = searchData.diaChiNha;
                traCuuData.namSinh = searchData.namSinh;
				traCuuData.ngaySinh = searchData.ngaySinh;
				traCuuData.hieuLuc = searchData.hieuLuc;
                break;
            case 'THONGTINHOSOLICHSU':
            case 'GIAODICHBAODAM':
                traCuuData.maDon = searchData.maDon;
                traCuuData.soThuTu = parseInt(searchData.soThuTu);
                traCuuData.ngayTiepNhan = searchData.ngayTiepNhan;
                traCuuData.thoiDiemDangKy = searchData.thoiDiemDangKy;

                traCuuData.loaiGiayChungNhanId = parseInt(searchData.loaiGiayChungNhanId);
                traCuuData.soPhatHanh = searchData.soPhatHanh;
                traCuuData.maVach = searchData.maVach;
                traCuuData.soVaoSo = searchData.soVaoSo;
                traCuuData.ngayVaoSo = searchData.ngayVaoSo;
                traCuuData.soHoSoGoc = parseInt(searchData.soHoSoGoc);

                traCuuData.hoTen = searchData.hoTen;
                traCuuData.soGiayTo = searchData.soGiayTo;
                traCuuData.namSinh = parseInt(searchData.namSinh);

                traCuuData.soThuTuThua = parseInt(searchData.soThuTuThua);
                traCuuData.soHieuToBanDo = parseInt(searchData.soHieuToBanDo);
                traCuuData.soThuTuThuaCu = searchData.soThuTuThuaCu;
                traCuuData.soHieuToBanDoCu = searchData.soHieuToBanDoCu;
                traCuuData.soNha = searchData.soNha;
                traCuuData.diaChiChiTiet = searchData.diaChiChiTiet;

                traCuuData.timTheoThongTinLichSu = searchData.timTheoThongTinLichSu;
                break;
        }

        var tmpData = JSON.stringify(traCuuData);
        traCuuData = { model: JSON.parse(tmpData) };
    }
    else {
        switch (type) {
            case 'CANHAN':
                traCuuData = { caNhanKhoaNgoaiFilter: {} };
                traCuuData.hoTen = searchData.hoTen;
                traCuuData.caNhanKhoaNgoaiFilter.soGiayTo = searchData.soGiayTo;
                traCuuData.namSinh = parseFloat(searchData.namSinh);
                traCuuData.diaChi = searchData.diaChi;
                break;
            case 'VOCHONG':
                var traCuuData = { voChongKhoaNgoaiFilter: {} };
                traCuuData.soGiayChungNhanKetHon = searchData.soGiayChungNhanKetHon;
                traCuuData.voChongKhoaNgoaiFilter.hoTenChong = searchData.hoTenChong;
                traCuuData.voChongKhoaNgoaiFilter.soGiayToChong = searchData.soGiayToChong;
                traCuuData.voChongKhoaNgoaiFilter.namSinhChong = parseFloat(searchData.namSinhChong);
                traCuuData.voChongKhoaNgoaiFilter.diaChiChong = searchData.diaChiChong;
                traCuuData.voChongKhoaNgoaiFilter.hoTenVo = searchData.hoTenVo;
                traCuuData.voChongKhoaNgoaiFilter.soGiayToVo = searchData.soGiayToVo;
                traCuuData.voChongKhoaNgoaiFilter.namSinhVo = parseFloat(searchData.namSinhVo);
                traCuuData.voChongKhoaNgoaiFilter.diaChiVo = searchData.diaChiVo;
                break;
            case 'HOGIADINH':
                var traCuuData = { hoGiaDinhKhoaNgoaiFilter: {} };
                traCuuData.soSoHoKhau = searchData.soSoHoKhau;
                traCuuData.hoSoHoKhauSo = searchData.hoSoHoKhauSo;
                traCuuData.diaChi = searchData.diaChi;
                traCuuData.hoGiaDinhKhoaNgoaiFilter.hoTenChuHo = searchData.hoTenChuHo;
                traCuuData.hoGiaDinhKhoaNgoaiFilter.soGiayToChuHo = searchData.soGiayToChuHo;
                traCuuData.hoGiaDinhKhoaNgoaiFilter.namSinhChuHo = parseFloat(searchData.namSinhChuHo);
                traCuuData.hoGiaDinhKhoaNgoaiFilter.hoTenVoChongChuHo = searchData.hoTenVoChongChuHo;
                traCuuData.hoGiaDinhKhoaNgoaiFilter.soGiayToVoChongChuHo = searchData.soGiayToVoChongChuHo;
                traCuuData.hoGiaDinhKhoaNgoaiFilter.namSinhVoChongChuHo = parseFloat(searchData.namSinhVoChongChuHo);
                break;
            case 'TOCHUC':
                traCuuData = { toChucKhoaNgoaiFilter: {} };
                traCuuData.tenToChuc = searchData.tenToChuc;
                traCuuData.maSoThue = searchData.maSoThue;
                traCuuData.diaChi = searchData.diaChi;
                traCuuData.toChucKhoaNgoaiFilter.soGiayTo = searchData.soGiayTo;
                break;
            case 'CONGDONG':
                traCuuData = { congDongKhoaNgoaiFilter: {} };
                traCuuData.tenCongDong = searchData.tenCongDong;
                traCuuData.diaChi = searchData.diaChi;
                traCuuData.congDongKhoaNgoaiFilter.soGiayTo = searchData.soGiayTo;
                break;
            case 'THUADAT':
            case 'NHARIENGLE':
            case 'CANHO':
            case 'CONGTRINHXAYDUNG':
            case 'CONGTRINHNGAM':
            case 'CAYLAUNAM':
            case 'RUNGTRONG':
                traCuuData = searchData;
                break;
            case 'TINHHINHDANGKY':
                traCuuData = { thdkKhoaNgoaiFilter: {} };
                traCuuData.ngayTiepNhan = searchData.ngayTiepNhan;
                traCuuData.thoiDiemDangKy = searchData.thoiDiemDangKy;
                traCuuData.soPhatHanh = searchData.soPhatHanh;
                traCuuData.maVach = searchData.maVach;
                traCuuData.soVaoSo = searchData.soVaoSo;
                traCuuData.ngayVaoSo = searchData.ngayVaoSo;
                traCuuData.soHoSoGoc = searchData.soHoSoGoc;
                traCuuData.thdkKhoaNgoaiFilter.hoTen = searchData.hoTen;
                traCuuData.thdkKhoaNgoaiFilter.soGiayTo = searchData.soGiayTo;
                traCuuData.thdkKhoaNgoaiFilter.namSinh = searchData.namSinh;
                traCuuData.thdkKhoaNgoaiFilter.soThuTuThua = parseFloat(searchData.soThuTuThua);
                traCuuData.thdkKhoaNgoaiFilter.soHieuToBanDo = parseFloat(searchData.soHieuToBanDo);
                traCuuData.thdkKhoaNgoaiFilter.soThuTuThuaCu = parseFloat(searchData.soThuTuThuaCu);
                traCuuData.thdkKhoaNgoaiFilter.soHieuToBanDoCu = parseFloat(searchData.soHieuToBanDoCu);
                traCuuData.thdkKhoaNgoaiFilter.diaChiThua = searchData.diaChiThua;
                traCuuData.thdkKhoaNgoaiFilter.soNha = searchData.soNha;
                traCuuData.thdkKhoaNgoaiFilter.diaChiNha = searchData.diaChiNha;
                break;
            case 'GIAYCHUNGNHAN':
                traCuuData = { gcnKhoaNgoaiFilter: {} };
                traCuuData.loaiGiayChungNhanId = searchData.loaiGiayChungNhanId;
                traCuuData.soPhatHanh = searchData.soPhatHanh;
                traCuuData.maVach = searchData.maVach;
                traCuuData.soVaoSo = searchData.soVaoSo;
                traCuuData.ngayVaoSo = searchData.ngayVaoSo;
                traCuuData.soHoSoGoc = searchData.soHoSoGoc;
                traCuuData.gcnKhoaNgoaiFilter.hoTen = searchData.hoTen;
                traCuuData.gcnKhoaNgoaiFilter.soGiayTo = searchData.soGiayTo;
                traCuuData.gcnKhoaNgoaiFilter.namSinh = searchData.namSinh;
                traCuuData.gcnKhoaNgoaiFilter.soThuTuThua = parseFloat(searchData.soThuTuThua);
                traCuuData.gcnKhoaNgoaiFilter.soHieuToBanDo = parseFloat(searchData.soHieuToBanDo);
                traCuuData.gcnKhoaNgoaiFilter.soThuTuThuaCu = parseFloat(searchData.soThuTuThuaCu);
                traCuuData.gcnKhoaNgoaiFilter.soHieuToBanDoCu = parseFloat(searchData.soHieuToBanDoCu);
                traCuuData.gcnKhoaNgoaiFilter.diaChiThua = searchData.diaChiThua;
                traCuuData.gcnKhoaNgoaiFilter.soNha = searchData.soNha;
                traCuuData.gcnKhoaNgoaiFilter.diaChiNha = searchData.diaChiNha;
                break;
            case 'HOSOTIEPNHAN':
                traCuuData = { hsTiepNhanKhoaNgoaiFilter: {} };
                traCuuData.huyenId = searchData.huyenId;
                traCuuData.xaId = searchData.xaId;
                traCuuData.quyTrinh = searchData.quyTrinh;
                traCuuData.soBienNhan = searchData.soBienNhan;
                traCuuData.ngayTiepNhan = searchData.ngayTiepNhan;
                traCuuData.ngayHenTra = searchData.ngayHenTra;
                traCuuData.hsTiepNhanKhoaNgoaiFilter.soThuTuThua = parseFloat(searchData.soThuTuThua);
                traCuuData.hsTiepNhanKhoaNgoaiFilter.soHieuToBanDo = parseFloat(searchData.soHieuToBanDo);
                traCuuData.hsTiepNhanKhoaNgoaiFilter.diaChiThua = searchData.diaChiThua;
                traCuuData.hsTiepNhanKhoaNgoaiFilter.hoTen = searchData.hoTen;
                traCuuData.hsTiepNhanKhoaNgoaiFilter.soGiayTo = searchData.soGiayTo;
                traCuuData.hsTiepNhanKhoaNgoaiFilter.soDienThoai = searchData.soDienThoai;
                break;
            case 'VANBANNGANCHAN':
                traCuuData.loaiVanBanNganChanId = searchData.loaiVanBanNganChanId;
                traCuuData.loaiNganChanId = searchData.loaiNganChanId;
                traCuuData.soVanBan = searchData.soVanBan;
                traCuuData.ngayBanHanh = searchData.ngayBanHanh;
                traCuuData.ngayHetHieuLuc = searchData.ngayHetHieuLuc;
                traCuuData.coQuanBanHanh = searchData.coQuanBanHanh;
                traCuuData.ngayHetHieuLuc = searchData.ngayHetHieuLuc;
                traCuuData.soPhatHanhGiayChungNhan = searchData.soPhatHanhGiayChungNhan;
                traCuuData.maVach = searchData.maVach;
                traCuuData.soVaoSo = searchData.soVaoSo;
                traCuuData.ngayVaoSo = searchData.ngayVaoSo;
                traCuuData.hoTenChu = searchData.hoTenChu;
                traCuuData.loaiGiayTo = searchData.loaiGiayTo;
                traCuuData.soGiayTo = searchData.soGiayTo;
                traCuuData.ngayCap = searchData.ngayCap;
                traCuuData.noiCap = searchData.noiCap;
                traCuuData.soThuTuThua = searchData.soThuTuThua;
                traCuuData.soHieuToBanDo = searchData.soHieuToBanDo;
                traCuuData.soThuTuThuaCu = searchData.soThuTuThuaCu;
                traCuuData.soHieuToBanDoCu = searchData.soHieuToBanDoCu;
                traCuuData.diaChiThua = searchData.diaChiThua;
                traCuuData.soNha = searchData.soNha;
				traCuuData.diaChiNha = searchData.diaChiNha;
				traCuuData.hieuLuc = searchData.hieuLuc;
                break;
            case 'THONGTINHOSOLICHSU':
            case 'GIAODICHBAODAM':
                traCuuData.maDon = searchData.maDon;
                traCuuData.soThuTu = parseInt(searchData.soThuTu);
                traCuuData.ngayTiepNhan = searchData.ngayTiepNhan;
                traCuuData.thoiDiemDangKy = searchData.thoiDiemDangKy;

                traCuuData.loaiGiayChungNhanId = parseInt(searchData.loaiGiayChungNhanId);
                traCuuData.soPhatHanh = searchData.soPhatHanh;
                traCuuData.maVach = searchData.maVach;
                traCuuData.soVaoSo = searchData.soVaoSo;
                traCuuData.ngayVaoSo = searchData.ngayVaoSo;
                traCuuData.soHoSoGoc = parseInt(searchData.soHoSoGoc);

                traCuuData.hoTen = searchData.hoTen;
                traCuuData.soGiayTo = searchData.soGiayTo;
                traCuuData.namSinh = parseInt(searchData.namSinh);

                traCuuData.soThuTuThua = parseInt(searchData.soThuTuThua);
                traCuuData.soHieuToBanDo = parseInt(searchData.soHieuToBanDo);
                traCuuData.soThuTuThuaCu = searchData.soThuTuThuaCu;
                traCuuData.soHieuToBanDoCu = searchData.soHieuToBanDoCu;
                traCuuData.soNha = searchData.soNha;
                traCuuData.diaChiChiTiet = searchData.diaChiChiTiet;

                traCuuData.timTheoThongTinLichSu = searchData.timTheoThongTinLichSu;
                break;
        }
    }
    VBDLIS.SearchDetailData = traCuuData;
    var loaiAjax;
    if (["CANHAN", "VOCHONG", "HOGIADINH", "TOCHUC", "CONGDONG"].includes(type)) {
        loaiAjax = 'ChuSoHuu';
    } else if (["THUADAT", "NHARIENGLE", "CANHO", "NHACHUNGCU", "KHUCHUNGCU", "CONGTRINHXAYDUNG", "CONGTRINHNGAM", "RUNGTRONG", "CAYLAUNAM"].includes(type)) {
        loaiAjax = 'TaiSan';
    } else if (["GIAYCHUNGNHAN", "TINHHINHDANGKY", "HOSOTIEPNHAN"].includes(type)) {
        loaiAjax = 'DangKy';
    } else if (["VANBANNGANCHAN"].includes(type)) {
        loaiAjax = 'QuanLyDonThuNganChan';
    } else if (["THONGTINHOSOLICHSU", "GIAODICHBAODAM"].includes(type)) {
        loaiAjax = 'ActionChanging';
    }
    if (VBDLIS.Global.SearchType === 'Graph') {
        //tblTraCuuThongTinHoSoLichSu
        vModule.find('#tblTraCuu' + titleType).data('tableAPI').ajax.url(GLOBAL.linkRoot + loaiAjax + 'Ajax/AdvancedSearch' + titleType).load();
    } else {
        vModule.find('#tblTraCuu' + titleType).data('tableAPI').ajax.url(GLOBAL.linkRoot + loaiAjax + 'Ajax/Get' + titleType + 'Filter').load();
    }
};

VBDLIS.TraCuu.TimKiemChiTietPhieuChuyen = function (vModule, action, data, tableId) {
    if (!vModule) {
        vModule = $(document);
    }
    var traCuuData = { model: data };
    VBDLIS.SearchDetailData = traCuuData;
    vModule.find('#' + tableId).data('tableAPI').ajax.url(GLOBAL.linkRoot + action).load();
};

VBDLIS.TraCuu.Chon = function (vModule, type) {
    var selectedData = vModule.find('#tblTraCuu' + VBDLIS.ToTitle(type)).data('tableAPI').rows({ selected: true }).data();
    if (!selectedData[0]) {
        alertify.warning('bl', 'Vui lòng chọn ít nhất một ' + VBDLIS.ToVi(type) + '.');
    }
    else {
        var objectType = ["TINHHINHDANGKY"];
        var objectTypeTaiSan = ["THUADAT", "NHARIENGLE", "CANHO", "NHACHUNGCU", "CONGTRINHXAYDUNG", "CONGTRINHNGAM"];
        var objectTypeChuSoHuu = ["CANHAN", "VOCHONG", "HOGIADINH", "TOCHUC", "CONGDONG"];
        if (objectType.includes(type) || objectTypeTaiSan.includes(type) || objectTypeChuSoHuu.includes(type)) {
            var data = {};
            data.Type = type;
            data.Value = selectedData.toArray();
            vModule.trigger("selectedItem", [data, true]); //true: module bắt sự kiện selectedItem tự gọi làm lấy thông tin detail
        }
        else {
            $.each(selectedData, function (indexInArray, valueOfElement) {
                vModule.trigger("selectedItem", valueOfElement);
            });
        }
    }
};

VBDLIS.TraCuu.XemChiTiet = function (vModule, vmThongTinChiTiet, type) {
    var selectedData = vModule.find('#tblTraCuu' + VBDLIS.ToTitle(type)).data('tableAPI').rows({ selected: true }).data();
    if (!selectedData[0]) {
        alertify.warning('bl', 'Vui lòng chọn ít nhất một ' + VBDLIS.ToVi(type) + '.');
    }
    else {
        var objectType = ["TINHHINHDANGKY"];
        var objectTypeTaiSan = ["THUADAT", "NHARIENGLE", "CANHO", "NHACHUNGCU", "CONGTRINHXAYDUNG", "CONGTRINHNGAM"];
        var objectTypeChuSoHuu = ["CANHAN", "VOCHONG", "HOGIADINH", "TOCHUC", "CONGDONG"];
        if (objectType.includes(type) || objectTypeTaiSan.includes(type) || objectTypeChuSoHuu.includes(type)) {
            vmThongTinChiTiet.setValue({ Type: type, Data: selectedData.toArray() });
        }
    }
};

VBDLIS.DangKy.Sua = function (vModule, type) {
    var nodes = vModule.find('#tree' + VBDLIS.ToTitle(type)).jstree().get_selected(true);
    if (nodes !== null && nodes.length > 0 && nodes[0].text !== 'Không có dữ liệu') {
        $('#' + VBDLIS.ToCamel(type) + 'ChiTietPanel' + '-' + vModule.VModuleId).val(nodes[0].data).change();
        $('#mdlChiTiet' + VBDLIS.ToTitle(type) + '-' + vModule.VModuleId).modal('show');
    }
    else {
        alertify.warning('bl', 'Vui lòng chọn ' + VBDLIS.ToVi(type) + ' cần sửa.');
    }
};

VBDLIS.DangKy.BoChon = function (vModule, type, options = { mustHaveOne: false }) {
    var nodes = vModule.find('#tree' + VBDLIS.ToTitle(type)).jstree().get_selected(true);
    if (nodes && nodes.length > 0 && nodes[0].data) {
        if (options.mustHaveOne === true) {
            if (vModule.find('#tree' + VBDLIS.ToTitle(type)).jstree(true).get_json("#").length > 1) {
                var value = vModule.val();
                if (value instanceof Array) {//x => (x.Id == nodes[0].data.Id)
                    var item = value.filter((x) => {
                        if (x.Id && nodes[0].data.Id) {
                            return x.Id == nodes[0].data.Id;
                        }
                        else if (x._id && nodes[0].data._id) {
                            return x._id == nodes[0].data._id;
                        }

                        return false;
                    });

                    if (item.length > 0) {
                        value.splice(value.indexOf(item[0]), 1);
                    }
                }
                else {
                    value = null;
                }
                vModule[0].value = value;
                vModule.change();
            } else {
                alertify.warning('bl', 'Phải có ít nhất một ' + VBDLIS.ToVi(type) + '.');
            }
        } else {
            var value = vModule.val();
            if (value instanceof Array) {
                var item = value.filter(x => x.Id == nodes[0].data.Id);
                if (item.length > 0) {
                    value.splice(value.indexOf(item[0]), 1);
                }
            }
            else {
                value = null;
            }
            vModule[0].value = value;
            vModule.change();
        }
    }
    else {
        alertify.warning('bl', 'Vui lòng chọn ' + VBDLIS.ToVi(type) + ' cần xóa.');
    }
};

VBDLIS.CreateDefaultTreeSettings = function (options = { multiple: true }) {
    return {
        core: {
            check_callback: true,
            themes: {
                name: "proton",
                icons: true,
                dots: true,
                responsive: true,
                stripes: false
            },
            dblclick_toggle: false,
            multiple: options.multiple,
            data: [
                { text: "Không có dữ liệu", parent: "root" }
            ]
        },
        plugins: ["types"],
        types: VBDLIS.Global.treeTypes
    };
};

VBDLIS.ToTitle = function (inputString, options = { prefixes: null, suffixes: null }) {
    var ouputString = '';
    if (inputString) {
        ouputString = GLOBAL.utils.convertToEn(VBDLIS.ToVi(inputString)).replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/\s/g, "");
        if (options.prefixes) {
            ouputString = options.prefixes + ouputString;
        }
        if (options.suffixes) {
            ouputString = ouputString + options.suffixes;
        }
    }
    return ouputString;
};

VBDLIS.ToCamel = function (inputString, options = { prefixes: null, suffixes: null }) {
    var ouputString = '';
    if (inputString) {
        ouputString = VBDLIS.ToTitle(inputString);
        ouputString = ouputString[0].toLowerCase() + ouputString.slice(1);
        if (options.prefixes) {
            ouputString = options.prefixes + ouputString;
        }
        if (options.suffixes) {
            ouputString = ouputString + options.suffixes;
        }
    }
    return ouputString;
};

VBDLIS.ToLower = function (inputString, options = { id: null, s: null }) {
    var outputString = '';
    if (options.id && options.id === true) {
        outputString = inputString.slice(0, -2);
    }
    if (options.s && options.s === true) {
        outputString = inputString.slice(0, -1);
    }
    outputString = outputString.toLowerCase();
    return outputString;
};

VBDLIS.ToUpper = function (inputString, options = { id: null, s: null }) {
    var outputString = '';
    if (options.id && options.id === true) {
        outputString = inputString.slice(0, -2);
    }
    if (options.s && options.s === true) {
        outputString = inputString.slice(0, -1);
    }
    outputString = outputString.toUpperCase();
    return outputString;
};

VBDLIS.ToVi = function (inputString) {
    var ouputString = '';
    if (inputString) {
        inputString = inputString.toLowerCase();
        switch (inputString) {
            case 'canhan':
                ouputString = 'cá nhân';
                break;
            case 'canho':
                ouputString = 'căn hộ';
                break;
            case 'caylaunam':
                ouputString = 'cây lâu năm';
                break;
            case 'chusudung':
                ouputString = 'chủ sử dụng';
                break;
            case 'congdong':
                ouputString = 'cộng đồng';
                break;
            case 'congtrinhngam':
                ouputString = 'công trình ngầm';
                break;
            case 'congtrinhxaydung':
                ouputString = 'công trình xây dựng';
                break;
            case 'hangmuccongtrinh':
                ouputString = 'hạng mục công trình';
                break;
            case 'diachi':
                ouputString = 'địa chỉ';
                break;
            case 'hosotiepnhan':
                ouputString = 'hồ sơ tiếp nhận';
                break;
            case 'dondangky':
                ouputString = 'đơn đăng ký';
                break;
            case 'tinhhinhdangky':
                ouputString = 'tình hình đăng ký';
                break;
            case 'hopdong':
                ouputString = 'hợp đồng';
                break;
            case 'quyetdinh':
                ouputString = 'quyết định';
                break;
            case 'giaychungnhan':
                ouputString = 'giấy chứng nhận';
                break;
            case 'giaytotochuc':
                ouputString = 'giấy tờ tổ chức';
                break;
            case 'giaytotuythan':
                ouputString = 'giấy tờ tùy thân';
                break;
            case 'hanchethualienke':
                ouputString = 'hạn chế thửa liền kề';
                break;
            case 'vanbanbanhanh':
                ouputString = 'văn bản ban hành';
                break;
            case 'hogiadinh':
                ouputString = 'hộ gia đình';
                break;
            case 'khuchungcu':
                ouputString = 'khu chung cư';
                break;
            case 'lienkettaisanthuadat':
                ouputString = 'liên kết tài sản thửa đất';
                break;
            case 'logiaychungnhan':
                ouputString = 'lô giấy chứng nhận';
                break;
            case 'mucdichsudung':
                ouputString = 'mục đích sử dụng';
                break;
            case 'nguongocsudungdat':
                ouputString = 'nguồn gốc sử dụng đất';
                break;
            case 'hangmucsohuuchung':
                ouputString = 'hạng mục sở hữu chung';
                break;
            case 'nhachungcu':
                ouputString = 'nhà chung cư';
                break;
            case 'hangmucnhariengle':
                ouputString = 'hạng mục nhà riêng lẻ';
                break;
            case 'nhariengle':
                ouputString = 'nhà riêng lẻ';
                break;
            case 'rung':
                ouputString = 'rừng';
                break;
            case 'rungtrong':
                ouputString = 'rừng trồng';
                break;
            case 'taisan':
                ouputString = 'tài sản';
                break;
            case 'thanhvienhogiadinh':
                ouputString = 'thành viên hộ gia đình';
                break;
            case 'thuadat':
                ouputString = 'thửa đất';
                break;
            case 'tochuc':
                ouputString = 'tổ chức';
                break;
            case 'vochong':
                ouputString = 'vợ chồng';
                break;
            case 'tailieudodac':
                ouputString = "tài liệu đo đạc";
                break;
            case 'vanbannganchan':
                ouputString = "văn bản ngăn chặn";
                break;
            case 'thongtinhosolichsu':
                ouputString = "thông tin hồ sơ lịch sử";
                break;
            case 'giaodichbaodam':
                ouputString = "giao dịch bảo đảm";
                break;
        }
    }
    return ouputString;
};

VBDLIS.BienDong.XuLyThanhPhanHoSo = function (jsonSettings, vModuleGetGiayChungNhan, vModuleChuSuDungChon, vModuleTaiSanChon, loaiBienDong, vModuleGiaoDichBaoDam, callback) {
    if (jsonSettings && jsonSettings.HoSoTiepNhanId) {
        var enumLoaiBienDong = 0;
        if (loaiBienDong > 0)
            enumLoaiBienDong = loaiBienDong;
        BienDongAjax.GetTraCuuBienDong(jsonSettings.HoSoTiepNhanId, enumLoaiBienDong, function (data) {
            if (data) {
                var traCuuBienDong = data.TraCuuBienDong;
                var thanhPhanHoSo = data.ThanhPhanHoSo;
                if (vModuleGiaoDichBaoDam) {
                    vModuleGiaoDichBaoDam.lstGiaoDichBaoDam = data.lstGiaoDichBaoDam;
                }
                if (traCuuBienDong && traCuuBienDong.ListThucHienBienDong) {
                    if (typeof callback === 'function') {
                        callback(traCuuBienDong.ListThucHienBienDong);
                    }

                } else if (thanhPhanHoSo) {
                    var listGiayChungNhan = [];
                    var chuSuDung = {};
                    var taiSan = {};
                    var listThanhPhan = ["ThanhPhanHoSoTruocBienDong", "ThanhPhanHoSoSauBienDong"];
                    listThanhPhan.forEach(function (prop) {
                        if (thanhPhanHoSo[prop]) {
                            if (thanhPhanHoSo[prop].ListThanhPhanGiayChungNhan && thanhPhanHoSo[prop].ListThanhPhanGiayChungNhan.length > 0) {
                                listGiayChungNhan = thanhPhanHoSo[prop].ListGiayChungNhan;
                                listThongTinDangKy = thanhPhanHoSo[prop].ListThongTinDangKy;
                            }
                            if (thanhPhanHoSo[prop].ListThanhPhanChuSuDung && thanhPhanHoSo[prop].ListThanhPhanChuSuDung.length > 0) {
                                chuSuDung = thanhPhanHoSo[prop].ChuSuDung;
                            }
                            if (thanhPhanHoSo[prop].ListThanhPhanTaiSan && thanhPhanHoSo[prop].ListThanhPhanTaiSan.length > 0) {
                                taiSan = thanhPhanHoSo[prop].TaiSan;
                            }
                        }
                    });
                    if (vModuleGetGiayChungNhan) {
                        if (!listGiayChungNhan || listGiayChungNhan.length !== 0) {
                            var thanhPhanGiayChungNhan = {};
                            thanhPhanGiayChungNhan.ListGiayChungNhan = listGiayChungNhan;
                            thanhPhanGiayChungNhan.ListThongTinDangKy = listThongTinDangKy;
                            VBDLIS.Global.listThongTinDangKy = listThongTinDangKy;
                            vModuleGetGiayChungNhan[0].value = listGiayChungNhan;
                            vModuleGetGiayChungNhan.change();
                        }
                    }

                    //if (vModuleChuSuDungChon) {
                    //    if (!chuSuDung || chuSuDung.length !== 0) {
                    //        vModuleChuSuDungChon[0].value = chuSuDung;
                    //        vModuleChuSuDungChon.change();
                    //    }
                    //}
                    //if (vModuleTaiSanChon) {
                    //    if (!taiSan || taiSan.length !== 0) {
                    //        vModuleTaiSanChon[0].value = taiSan;
                    //        vModuleTaiSanChon.change();
                    //    }
                    //}
                    if (typeof callback === 'function') {
                        callback(null);
                    }
                } else {
                    if (typeof callback === 'function') {
                        callback(null);
                    }
                }
            }
            //else {
            //    GLOBAL.utils.showMessage.show({
            //        msg: 'Lấy thông tin thành phần hồ sơ không thành công',
            //        icon: GLOBAL.utils.showMessage.UNSUCCESS
            //    })
            //}
        });
    }
};

VBDLIS.BienDong.TaoChuSoHuuViewModel = function (treeChuBenNhanData) {
    var lstCSH = {
        CaNhans: [],
        VoChongs: [],
        HoGiaDinhs: [],
        ToChucs: [],
        CongDongs: []
    };
    $.each(treeChuBenNhanData, function (index, value) {
        var title = VBDLIS.ToTitle(value.type, { suffixes: 's' });

        if (lstCSH[title]) {
            lstCSH[title].push(value.data);
        }

    });
    return lstCSH;
};

VBDLIS.BienDong.TaoTaiSanViewModel = function (treeTaiSanData) {
    var lstTS = {
        ThuaDats: [],
        NhaRiengLes: [],
        CanHos: [],
        NhaChungCus: [],
        KhuChungCus: [],
        CongTrinhXayDungs: [],
        CongTrinhNgams: [],
        RungTrongs: [],
        CayLauNams: []
    };
    $.each(treeTaiSanData, function (index, value) {
        var title = VBDLIS.ToTitle(value.type, { suffixes: 's' });
        if (lstTS[title]) {
            lstTS[title].push(value.data);
        }
    });
    return lstTS;
};

VBDLIS.BienDong.TaoGiayChungNhanBienDongViewModel = function (treeGiayChungNhanData, options = { ChonChuSoHuu: false, ChonTaiSan: false }) {
    //ListGiayChungNhan
    var ketQua = {
        ListGiayChungNhanTBD: [],
        CoItNhatMotChuSoHuu: true,
        CoItNhatMotTaiSan: true
    };
    var daChonItNhatMotChuSoHuuTrongDanhSach = true;
    var daChonItNhatMotTaiSanTrongDanhSach = true;
    $.each(treeGiayChungNhanData, function (index, valueGCN) {
        //Chủ sở hữu
        var lstCSH = {
            CaNhans: [],
            VoChongs: [],
            HoGiaDinhs: [],
            ToChucs: [],
            CongDongs: []
        };
        var selectedChuSoHuuCounter = 0;
        $.each(valueGCN.children.filter(chusohuu => chusohuu.type === 'CHUSOHUU')[0].children, function (index, value) {
            if (options.ChonChuSoHuu === true) {
                if (value.state.selected) {
                    selectedChuSoHuuCounter++;
                    lstCSH[VBDLIS.ToTitle(value.type, { suffixes: 's' })].push(value.data);
                }
            } else {
                lstCSH[VBDLIS.ToTitle(value.type, { suffixes: 's' })].push(value.data);
            }
        });
        //nếu giấy đang quét không có chủ sở hữu nào được chọn thì set false
        if (options.ChonChuSoHuu === true && selectedChuSoHuuCounter === 0) {
            ketQua.CoItNhatMotChuSoHuu = false;
        }
        //Tài sản
        var lstTS = {
            ThuaDats: [],
            NhaRiengLes: [],
            CanHos: [],
            NhaChungCus: [],
            KhuChungCus: [],
            CongTrinhXayDungs: [],
            CongTrinhNgams: [],
            RungTrongs: [],
            CayLauNams: []
        };
        var selectedTaiSanCounter = 0;
        $.each(valueGCN.children.filter(taisan => taisan.type === 'TAISAN')[0].children, function (index, value) {
            if (options.ChonTaiSan === true) {
                if (value.state.selected) {
                    selectedTaiSanCounter++;
                    lstTS[VBDLIS.ToTitle(value.type, { suffixes: 's' })].push(value.data);
                }
            } else {
                lstTS[VBDLIS.ToTitle(value.type, { suffixes: 's' })].push(value.data);
            }
        });
        //nếu giấy đang quét không có tài sản nào được chọn thì set false
        if (options.ChonTaiSan === true && selectedTaiSanCounter === 0) {
            ketQua.CoItNhatMotTaiSan = false;
        }
        ketQua.ListGiayChungNhanTBD.push({
            GiayChungNhan: valueGCN.data,
            ChuSoHuu: lstCSH,
            TaiSan: lstTS
        });
    });
    return ketQua;
};

VBDLIS.BienDong.TaoActionChangingViewModel = function (currentData, thongTinBienDong) {
    currentData.soThuTuHoSoThuTucDangKy = parseFloat(thongTinBienDong.soThuTuHoSoThuTucDangKy) || null;
    currentData.maHoSoThuTucDangKy = thongTinBienDong.maHoSoThuTucDangKy;
    currentData.maLoaiBienDong = thongTinBienDong.maLoaiBienDong;
    currentData.soThuTuBienDong = parseFloat(thongTinBienDong.soThuTuBienDong) || null;

    currentData.soQuyetDinh = thongTinBienDong.soQuyetDinh;
    currentData.ngayQuyetDinh = thongTinBienDong.ngayQuyetDinh;
    currentData.noiRaQuyetDinh = thongTinBienDong.noiRaQuyetDinh;

    currentData.soHopDong = parseFloat(thongTinBienDong.soHopDong) || null;
    currentData.ngayHopDong = thongTinBienDong.ngayHopDong;
    currentData.giaTriHopDong = thongTinBienDong.giaTriHopDong;
    currentData.ngayTruocBa = thongTinBienDong.ngayTruocBa;

    currentData.quyenCongChung = thongTinBienDong.quyenCongChung;
    currentData.soCongChung = parseFloat(thongTinBienDong.soCongChung) || null;
    currentData.ngayCongChung = thongTinBienDong.ngayCongChung;
    currentData.noiCongChung = thongTinBienDong.noiCongChung;

    currentData.lyDoBienDong = thongTinBienDong.lyDoBienDong;
    currentData.thongTinBienDong = thongTinBienDong.thongTinBienDong;
    currentData.noiDungHopDong = thongTinBienDong.noiDungHopDong;

    currentData.inXacNhanThuHoi = (thongTinBienDong.inXacNhanThuHoi != null) ? thongTinBienDong.inXacNhanThuHoi : currentData.inXacNhanThuHoi;
    currentData.inXacNhan = (thongTinBienDong.inXacNhan != null) ? thongTinBienDong.inXacNhan : currentData.inXacNhan;

    return currentData;
};

VBDLIS.BienDong.TaoListGiayChungNhanTuThongTinSauBienDong = function (data) {
    var listGCN = [];
    if (data && data.Value && data.Value.ThongTinSauBienDong && data.Value.ThongTinSauBienDong.ListThongTinDangKy && data.Value.ThongTinSauBienDong.ListThongTinDangKy.length !== 0) {
        data.Value.ThongTinSauBienDong.ListThongTinDangKy.forEach(function (item) {
            if (item && item.ListGiayChungNhan && item.ListGiayChungNhan.length !== 0) {
                listGCN = listGCN.concat(item.ListGiayChungNhan);
            }
        });
        if (listGCN.length === 0 && data.Value.ThongTinSauBienDong.ListGiayChungNhanInXacNhan && data.Value.ThongTinSauBienDong.ListGiayChungNhanInXacNhan.length !== 0) {
            listGCN = data.Value.ThongTinSauBienDong.ListGiayChungNhanInXacNhan;
        }
    }
    return listGCN;
};

VBDLIS.BienDong.TaoListNoiDungXacNhanTuThongTinSauBienDong = function (listGCN, data) {
    if (!data.Value.ThongTinSauBienDong.ListNoiDungXacNhan) {
        data.Value.ThongTinSauBienDong.ListNoiDungXacNhan = [];
    }
    data.Value.ThongTinSauBienDong.ListNoiDungXacNhan = data.Value.ThongTinSauBienDong.ListNoiDungXacNhan.map((item) => {
        var res = {
            noiDungXacNhan: item.noiDungXacNhan
        };
        if (listGCN) {
            for (var i = 0; i < listGCN.length; i++) {
                if (listGCN[i].giayChungNhanId === item.giayChungNhanId) {
                    res.GiayChungNhan = listGCN[i];
                    break;
                }
            }
        }
        return res;
    });
    return {
        ListNoiDungXacNhan: data.Value.ThongTinSauBienDong.ListNoiDungXacNhan
    };
};

VBDLIS.BienDong.TaoListMucDichSuDungTuListThuaDat = function (ListThuaDat, tenLoaiMucDichSuDung) {
    var listChuyenMucDich = [];
    $.each(ListThuaDat, function (indexThuaDat, valueThuaDat) {
        $.each(valueThuaDat.data.ListMucDichSuDung, function (indexMucDichSuDung, valueMucDichSuDung) {
            listChuyenMucDich.push({
                thuaDatId: valueThuaDat.data.thuaDatId,
                mucDichSuDungId: valueMucDichSuDung.mucDichSuDungId,
                soThuTu: valueMucDichSuDung.soThuTu,
                loaiMucDichSuDungId: valueMucDichSuDung.loaiMucDichSuDungId,
                tenLoaiMucDichSuDung: tenLoaiMucDichSuDung,
                loaiMucDichSuDungQuyHoachId: valueMucDichSuDung.loaiMucDichSuDungQuyHoachId,
                dienTich: valueMucDichSuDung.dienTich,
                thoiHanSuDung: valueMucDichSuDung.thoiHanSuDung,
                ngaySuDung: valueMucDichSuDung.ngaySuDung
            });
        });
    });
    return listChuyenMucDich;
};

VBDLIS.BienDong.TaoTree = function (text, data) {
    return {
        text: VBDLIS.Global.TextGenertor(text, data),
        data: data,
        type: text
    };
};

VBDLIS.BienDong.TaoTreeThuaDat = function (listThuaDat, options = { expand: false, coMDSD: true }) {
    var new_data = [{
        "text": "Không có dữ liệu"
    }];
    if (listThuaDat) {
        if (!(listThuaDat instanceof Array)) {
            listThuaDat = [listThuaDat];
        }
        var data = listThuaDat.map(function (item, index) {
            var text = VBDLIS.Global.TextGenertor("THUADAT", item);
            var listMucDichSuDung = [];
            if (item.ListMucDichSuDung && item.ListMucDichSuDung.length > 0) {
                listMucDichSuDung = item.ListMucDichSuDung.map(function (mucDich) {
                    return VBDLIS.BienDong.TaoTree('MUCDICHSUDUNG', mucDich);
                }).filter(function (mucDich) {
                    return mucDich && mucDich.data;
                });
            }
            var res = VBDLIS.BienDong.TaoTree('THUADAT', item);
            if (options.expand === true) {
                res.state = { opened: true };
                res.children = listMucDichSuDung;
            }
            if (listMucDichSuDung && listMucDichSuDung.length > 0 && options.coMDSD === true) {
                res.children = listMucDichSuDung;
            }
            return res;
        });
        if (data.length > 0) {
            new_data = data;
        }
    }
    return new_data;
};

VBDLIS.BienDong.LocTreeThuaDatTuListMucDich = function (ListGiayChungNhanTBD, ListMucDich) {
    var danhSachThuaDatChuyenMucDich = [];
    $.each(ListGiayChungNhanTBD, function (indexGCN, valueGCN) {
        $.each(valueGCN.TaiSan.ThuaDats, function (indexThuaDat, valueThuaDat) {
            danhSachThuaDatChuyenMucDich.push(valueThuaDat);
        });
    });
    var listThuaDatId = [];
    $.each(ListMucDich, function (indexChuyenMucDich, valueChuyenMucDich) {
        listThuaDatId.push(valueChuyenMucDich.thuaDatId);
    });
    var treeDataDanhSachChuyenMucDich = [];
    $.each(danhSachThuaDatChuyenMucDich.filter(thuadat => listThuaDatId.includes(thuadat.thuaDatId)), function (indexTree, valueTree) {
        treeDataDanhSachChuyenMucDich.push(VBDLIS.BienDong.TaoTreeThuaDat(valueTree, { expand: true })[0]);
    });
    return treeDataDanhSachChuyenMucDich;
};

VBDLIS.BienDong.TaoTreeThuaDatTuMucDichMoi = function (ListGiayChungNhanTBD, ListChuyenMucDich) {
    var listThuaDatCu = [];
    $.each(ListGiayChungNhanTBD, function (indexGCN, valueGCN) {
        $.each(valueGCN.TaiSan.ThuaDats, function (indexThuaDat, valueThuaDat) {
            listThuaDatCu.push(valueThuaDat);
        });
    });
    var listThuaDatMoi = [];
    $.each(ListChuyenMucDich, function (indexChuyenMucDich, valueChuyenMucDich) {
        $.each(listThuaDatCu, function (indexThuaDatCu, valueThuaDatCu) {
            if (valueChuyenMucDich.thuaDatId === valueThuaDatCu.thuaDatId) {
                var thuaDatMoiData = valueThuaDatCu;
                $.each(thuaDatMoiData.ListMucDichSuDung, function (indexMucDich, valueMucDich) {
                    if (valueMucDich.mucDichSuDungId === valueChuyenMucDich.mucDichSuDungId) {
                        thuaDatMoiData.ListMucDichSuDung[indexMucDich].ngaySuDung = valueChuyenMucDich.ngaySuDung;
                        thuaDatMoiData.ListMucDichSuDung[indexMucDich].thoiHanSuDung = valueChuyenMucDich.thoiHanSuDung;
                    }
                });
                listThuaDatMoi.push(thuaDatMoiData);
            }
        });
    });
    var treeDataThuaDatMoi = [];
    $.each(listThuaDatMoi, function (indexThuaDatMoi, valueThuaDatMoi) {
        treeDataThuaDatMoi.push(VBDLIS.BienDong.TaoTreeThuaDat(valueThuaDatMoi, { expand: true, coMDSD: true })[0]);
    });
    return treeDataThuaDatMoi;
};

VBDLIS.BienDong.TaoTreeGiayChungNhan = function (dataGCN, bdType, options = { CSHDaChon: null, TSDaChon: null }) {
    var gcnObj = null;
    switch (bdType) {
        case "nhapdonthunganchan":
        case "thanhphannganchan":
        case "capnhatthanhphanhoso":
        case "chuyenquyentrongiay":
        case "bosungtaisan":
        case "capdoi":
        case "giaothuenhanuoc":
        case "chuyenmucdichsudung":
        case "dinhchinhgiaychungnhan":
        case "ketthucchothue":
        case "chuyenhinhthucgiaothue":
        case "giahansudungdat":
        case "thuhoigiaychungnhan":
        case "chothuelai":
        case "hanchequyen":
        case "hanchethualienke":
        case "xoathechap":
        case "thechapbosung":
        case "tachthuachuyenquyen":
            gcnObj = {
                text: "<b>Giấy chứng nhận</b> || " + VBDLIS.Global.TextGenertor("GIAYCHUNGNHAN", dataGCN["GiayChungNhan"]),
                data: dataGCN["GiayChungNhan"],
                children: [{
                    text: "<b>Chủ sở hữu</b>",
                    data: dataGCN["ChuSoHuu"],
                    children: VBDLIS.BienDong.TaoListNodeConTreeData(dataGCN["ChuSoHuu"], true),
                    type: 'CHUSOHUU',
                    state: { opened: true }
                }, {
                    text: "<b>Tài sản</b>",
                    data: dataGCN["TaiSan"],
                    children: VBDLIS.BienDong.TaoListNodeConTreeData(dataGCN["TaiSan"], true),
                    type: 'TAISAN',
                    state: { opened: true }
                }],
                type: 'GIAYCHUNGNHAN',
                state: { opened: true }
            };
            break;
        case "thechap":
            gcnObj = {
                text: "Giấy chứng nhận || " + VBDLIS.Global.TextGenertor("GIAYCHUNGNHAN", dataGCN["GiayChungNhan"]),
                data: dataGCN["GiayChungNhan"],
                children: [{
                    text: "Chủ sở hữu",
                    data: dataGCN["ChuSoHuu"],
                    children: VBDLIS.BienDong.TaoListNodeConTreeData(dataGCN["ChuSoHuu"], false, { CSHDaChon: options.CSHDaChon, TSDaChon: options.TSDaChon }),
                    type: 'CHUSOHUU',
                    state: { opened: true, disabled: true }
                }, {
                    text: "Tài sản",
                    data: dataGCN["TaiSan"],
                    children: VBDLIS.BienDong.TaoListNodeConTreeData(dataGCN["TaiSan"], true, { CSHDaChon: options.CSHDaChon, TSDaChon: options.TSDaChon }),
                    type: 'TAISAN',
                    state: { opened: true }
                }],
                type: 'GIAYCHUNGNHAN',
                state: { opened: true }
            };
            break;
        case "ruttaisanthechap":
        case "giaothuecanhan":
            gcnObj = {
                text: "Giấy chứng nhận || " + VBDLIS.Global.TextGenertor("GIAYCHUNGNHAN", dataGCN["GiayChungNhan"]),
                data: dataGCN["GiayChungNhan"],
                children: [{
                    text: "Chủ sở hữu",
                    data: dataGCN["ChuSoHuu"],
                    children: VBDLIS.BienDong.TaoListNodeConTreeData(dataGCN["ChuSoHuu"], false, { CSHDaChon: options.CSHDaChon, TSDaChon: options.TSDaChon }),
                    type: 'CHUSOHUU',
                    state: { opened: true, disabled: true }
                }, {
                    text: "Tài sản",
                    data: dataGCN["TaiSan"],
                    children: VBDLIS.BienDong.TaoListNodeConTreeData(dataGCN["TaiSan"], true, { CSHDaChon: options.CSHDaChon, TSDaChon: options.TSDaChon }),
                    type: 'TAISAN',
                    state: { opened: true }
                }],
                type: 'GIAYCHUNGNHAN',
                state: { opened: true }
            };
            break;
        case "tachthua":
        case "gopthua":
            gcnObj = {
                text: "Giấy chứng nhận || " + VBDLIS.Global.TextGenertor("GIAYCHUNGNHAN", dataGCN["GiayChungNhan"]),
                data: dataGCN["GiayChungNhan"],
                children: [{
                    text: "Chủ sở hữu",
                    data: dataGCN["ChuSoHuu"],
                    children: VBDLIS.BienDong.TaoListNodeConTreeData(dataGCN["ChuSoHuu"]),
                    type: 'CHUSOHUU'
                }, {
                    text: "Tài sản",
                    data: dataGCN["TaiSan"],
                    children: VBDLIS.BienDong.TaoListNodeConTreeData(dataGCN["TaiSan"], true),
                    type: 'TAISAN',
                    state: { opened: true }
                }],
                type: 'GIAYCHUNGNHAN',
                state: { opened: true }
            };
            break;
        default:
            var data = dataGCN;
            if (data && data.length > 0) {
                gcnObj = data.map(function (item) {
                    return {
                        text: "Giấy chứng nhận || " + VBDLIS.Global.TextGenertor("GIAYCHUNGNHAN", item["GiayChungNhan"]),
                        data: item["GiayChungNhan"],
                        children: [{
                            text: "Chủ sở hữu",
                            data: item["ChuSoHuu"],
                            children: VBDLIS.BienDong.TaoListNodeConTreeData(item["ChuSoHuu"]),
                            type: 'CHUSOHUU',
                            state: { opened: true }
                        }, {
                            text: "Tài sản",
                            data: item["TaiSan"],
                            children: VBDLIS.BienDong.TaoListNodeConTreeData(item["TaiSan"]),
                            type: 'TAISAN',
                            state: { opened: true }
                        }],
                        type: 'GIAYCHUNGNHAN',
                        state: { opened: true }
                    };
                });
            }
    }
    return gcnObj;
};

VBDLIS.BienDong.TaoListNodeConTreeData = function (data, enableCheckbox = false, options = { CSHDaChon: null, TSDaChon: null, TSDienTichTheChap: null }) {
    var result = [];
    if (data !== null) {
        $.each(data, function (key, value) {
            $.each(value, function (indexInArray, valueOfElement) {
                var childrenList = {};
                $.each(valueOfElement, function (k, v) {
                    if (typeof v === 'object' && k.includes('List')) {
                        if (v && v.length > 0) {
                            childrenList[k.toUpperCase().slice(4, k.length)] = v;
                        }
                    }
                });
                if (Object.keys(childrenList).length > 0) {
                    result.push(VBDLIS.BienDong.TaoNodeConTreeData(key.toUpperCase().slice(0, -1), enableCheckbox, valueOfElement, childrenList, { CSHDaChon: options.CSHDaChon, TSDaChon: options.TSDaChon, TSDienTichTheChap: options.TSDienTichTheChap }));
                } else {
                    result.push(VBDLIS.BienDong.TaoNodeConTreeData(key.toUpperCase().slice(0, -1), enableCheckbox, valueOfElement, null, { CSHDaChon: options.CSHDaChon, TSDaChon: options.TSDaChon, TSDienTichTheChap: options.TSDienTichTheChap }));
                }
            });
        });
        return result;
    }
};

    VBDLIS.BienDong.TaoNodeConTreeData = function (text, enableCheckbox, nodeData, children, options = { CSHDaChon: null, TSDaChon: null }) {
        var res = {
            text: VBDLIS.Global.TextGenertor(text, nodeData),
            data: nodeData,
            icon: true,
            type: text
        };

        if (options.CSHDaChon) {
            for (key in options.CSHDaChon) {
                if (key === text) {
                    $.each(options.CSHDaChon[key], function (indexCSH, valueCSH) {
                        if (valueCSH === nodeData[VBDLIS.ToCamel(key, { suffixes: 'Id' })]) {
                            res.state = { selected: true };
                        }
                    });
                }
            }
        }
        if (options.TSDaChon) {
            for (key in options.TSDaChon) {
                if (key === text) {
                    $.each(options.TSDaChon[key], function (indexTS, valueTS) {
                        if (valueTS === nodeData[VBDLIS.ToCamel(key, { suffixes: 'Id' })]) {
                            res.state = { selected: true };
                        }
                    });
                }
            }
        }
        if (!enableCheckbox) {
            res.state = { disabled: true };
        }
        if (children) {
            var lstChildren = [];
            for (var key in children) {
                var dataChildren = [];
                $.each(children[key], function (indexInArray, valueOfElement) {
                    dataChildren.push(VBDLIS.BienDong.TaoNodeConTreeData(key, false, valueOfElement));
                });

                var childrenConfig = {
                    data: children[key],
                    children: dataChildren,
                    type: key,
                    state: { disabled: true },
                    text: text
                };
                switch (key) {
                    case "DIACHI":
                        childrenConfig.text = "<b>Địa chỉ</b>";
                        break;
                    case "GIAYTOTUYTHAN":
                        childrenConfig.text = "<b>Giấy tờ tùy thân</b>";
                        break;
                    case "MUCDICHSUDUNG":
                        childrenConfig.text = "<b>Mục đích sử dụng</b>";
                        break;
                    case "THANHVIENHOGIADINH":
                        childrenConfig.text = "<b>Danh sách thành viên</b>";
                        break;
                    case "LIENKETTAISANTHUADAT":
                        childrenConfig.text = "<b>Danh sách liên kết thửa</b>";
                        break;
                    case "NGUOIDAIDIEN":
                        childrenConfig.text = "<b>Người đại diện</b>";
                        break;
                }
                $.merge(lstChildren, [childrenConfig]);
            }
            res.children = lstChildren;
        }
        return res;
    };

    VBDLIS.BienDong.PhucHoiTreeGiayChungNhanTheChap = function (ListGiayChungNhan, ListGiayChungNhanTBD) {
        var danhSachDaChon = {
            CANHO: [],
            CAYLAUNAM: [],
            CONGTRINHNGAM: [],
            CONGTRINHXAYDUNG: [],
            KHUCHUNGCU: [],
            NHACHUNGCU: [],
            NHARIENGLE: [],
            RUNGTRONG: [],
            THUADAT: []
        };
        $.each(ListGiayChungNhan, function (index, value) {
            for (key in value.TaiSan) {
                if (value.TaiSan[key].length > 0) {
                    $.each(value.TaiSan[key], function (indexInArray, valueOfElement) {
                        danhSachDaChon[VBDLIS.ToUpper(key, { s: true })].push(valueOfElement[VBDLIS.ToCamel(VBDLIS.ToLower(key, { s: true }), { suffixes: 'Id' })]);
                    });
                }
            }
        });
        var lstGCN = [];
        $.each(ListGiayChungNhanTBD, function (index, value) {
            lstGCN.push(VBDLIS.BienDong.TaoTreeGiayChungNhan(value, 'thechap', { TSDaChon: danhSachDaChon }));
        });
        return lstGCN;
    };

    VBDLIS.ConvertData.ConvertGiayChungNhan = function (giayChungNhan) {
        if (giayChungNhan == null) return [];
        var listGCN = [];

        giayChungNhan.forEach(function (item) {
            if (item) {
                var gcn = {
                    GiayChungNhan: item.GiayChungNhan,
                    TaiSan: {
                        ThuaDats: [],
                        NhaRiengLes: [],
                        CanHos: [],
                        NhaChungCus: [],
                        KhuChungCus: [],
                        CongTrinhXayDungs: [],
                        CongTrinhNgams: [],
                        RungTrongs: [],
                        CayLauNams: []
                    },
                    ChuSoHuu: {
                        CaNhans: [],
                        VoChongs: [],
                        HoGiaDinhs: [],
                        ToChucs: [],
                        CongDongs: []
                    }
                }

                if (item.GiayChungNhan && item.GiayChungNhan.ListDangKyQuyen != null && item.GiayChungNhan.ListDangKyQuyen.length > 0) {
                    item.GiayChungNhan.ListDangKyQuyen.forEach(function (dkq) {
                        if (dkq.CaNhan) {
                            var exist = gcn.ChuSoHuu.CaNhans.filter(function (x) {
                                return x && x.caNhanId == dkq.CaNhan.caNhanId;
                            }).length > 0;

                            if (!exist) {
                                gcn.ChuSoHuu.CaNhans.push(dkq.CaNhan);
                            }
                        }

                        if (dkq.VoChong) {
                            var exist = gcn.ChuSoHuu.VoChongs.filter(function (x) {
                                return x && x.voChongId == dkq.VoChong.voChongId;
                            }).length > 0;

                            if (!exist) {
                                gcn.ChuSoHuu.VoChongs.push(dkq.VoChong);
                            }

                        }

                        if (dkq.HoGiaDinh) {
                            var exist = gcn.ChuSoHuu.HoGiaDinhs.filter(function (x) {
                                return x && x.hoGiaDinhId == dkq.HoGiaDinh.hoGiaDinhId;
                            }).length > 0;

                            if (!exist) {
                                gcn.ChuSoHuu.HoGiaDinhs.push(dkq.HoGiaDinh);
                            }

                        }

                        if (dkq.ToChuc) {
                            var exist = gcn.ChuSoHuu.ToChucs.filter(function (x) {
                                return x && x.toChucId == dkq.ToChuc.toChucId;
                            }).length > 0;

                            if (!exist) {
                                gcn.ChuSoHuu.ToChucs.push(dkq.ToChuc);
                            }
                        }

                        if (dkq.CongDong) {
                            var exist = gcn.ChuSoHuu.CongDongs.filter(function (x) {
                                return x && x.congDongId == dkq.CongDong.congDongId;
                            }).length > 0;

                            if (!exist) {
                                gcn.ChuSoHuu.CongDongs.push(dkq.CongDong);
                            }
                        }

                        if (dkq.ThuaDat) {
                            var exist = gcn.TaiSan.ThuaDats.filter(function (x) {
                                return x && x.thuaDatId == dkq.ThuaDat.thuaDatId;
                            }).length > 0;

                            if (!exist) {
                                gcn.TaiSan.ThuaDats.push(dkq.ThuaDat);
                            }
                        }

                        if (dkq.NhaRiengLe) {
                            var exist = gcn.TaiSan.NhaRiengLes.filter(function (x) {
                                return x && x.nhaRiengLeId == dkq.NhaRiengLe.nhaRiengLeId;
                            }).length > 0;

                            if (!exist) {
                                gcn.TaiSan.NhaRiengLes.push(dkq.NhaRiengLe);
                            }
                        }

                        if (dkq.CanHo) {
                            var exist = gcn.TaiSan.CanHos.filter(function (x) {
                                return x && x.canHoId == dkq.CanHo.canHoId;
                            }).length > 0;

                            if (!exist) {
                                gcn.TaiSan.CanHos.push(dkq.CanHo);
                            }
                        }

                        if (dkq.NhaChungCu) {
                            var exist = gcn.TaiSan.NhaChungCus.filter(function (x) {
                                return x && x.nhaChungCuId == dkq.NhaChungCu.nhaChungCuId;
                            }).length > 0;

                            if (!exist) {
                                gcn.TaiSan.NhaChungCus.push(dkq.NhaChungCu);
                            }
                        }

                        if (dkq.KhuChungCu) {
                            var exist = gcn.TaiSan.KhuChungCus.filter(function (x) {
                                return x && x.khuChungCuId == dkq.KhuChungCu.khuChungCuId;
                            }).length > 0;

                            if (!exist) {
                                gcn.TaiSan.KhuChungCus.push(dkq.KhuChungCu);
                            }
                        }

                        if (dkq.CongTrinhXayDung) {
                            var exist = gcn.TaiSan.CongTrinhXayDungs.filter(function (x) {
                                return x && x.congTrinhXayDungId == dkq.CongTrinhXayDung.congTrinhXayDungId;
                            }).length > 0;

                            if (!exist) {
                                gcn.TaiSan.CongTrinhXayDungs.push(dkq.CongTrinhXayDung);
                            }
                        }

                        if (dkq.CongTrinhNgam) {
                            var exist = gcn.TaiSan.CongTrinhNgams.filter(function (x) {
                                return x && x.congTrinhNgamId == dkq.CongTrinhNgam.congTrinhNgamId;
                            }).length > 0;

                            if (!exist) {
                                gcn.TaiSan.CongTrinhNgams.push(dkq.congTrinhNgamId);
                            }
                        }

                        if (dkq.RungTrong) {
                            var exist = gcn.TaiSan.RungTrongs.filter(function (x) {
                                return x && x.rungTrongId == dkq.RungTrong.rungTrongId;
                            }).length > 0;

                            if (!exist) {
                                gcn.TaiSan.RungTrongs.push(dkq.rungTrongId);
                            }
                        }

                        if (dkq.CayLauNam) {
                            var exist = gcn.TaiSan.CayLauNams.filter(function (x) {
                                return x && x.cayLauNamId == dkq.CayLauNam.cayLauNamId;
                            }).length > 0;

                            if (!exist) {
                                gcn.TaiSan.CayLauNams.push(dkq.cayLauNamId);
                            }
                        }
                    });
                }

                listGCN.push(gcn);
            }
        });

        return listGCN;
    }

    VBDLIS.ConvertData.BuildDangKyTaiSanFromDangKyQuyen = function (lstDangKyQuyen) {
        var dangKyTaiSans = [];
        if (lstDangKyQuyen && lstDangKyQuyen.length > 0) {
            for (var i = 0; i < lstDangKyQuyen.length; i++) {
                var dkQuyen = lstDangKyQuyen[i];

                if (dkQuyen.dangKyTaiSanId && dkQuyen.dangKyTaiSanId > 0) {
                    var hasExist = dangKyTaiSans.filter(function (x) {
                        if (x.DangKyTaiSan.dangKyTaiSanId !== null && x.DangKyTaiSan.dangKyTaiSanId > 0) {
                            return x.DangKyTaiSan.dangKyTaiSanId === dkQuyen.dangKyTaiSanId;
                        }

                        return false;
                    });

                    if (!hasExist || hasExist.length === 0) {
                        dangKyTaiSans.push({
                            DangKyTaiSan: dkQuyen.DangKyTaiSan,
                            TypeItems: [dkQuyen.typeItem],
                            ItemIds: [dkQuyen.itemId],
                            SubItemIds: [dkQuyen.subItemId],
                            LoaiDoiTuongs: [dkQuyen.loaiDoiTuong],
                            ChuSuDungIds: [dkQuyen.chuSuDungId.toString()]
                        });
                    }
                    else {
                        hasExist[0].TypeItems.push(dkQuyen.typeItem);
                        hasExist[0].ItemIds.push(dkQuyen.itemId);
                        hasExist[0].SubItemIds.push(dkQuyen.subItemId);
                        hasExist[0].LoaiDoiTuongs.push(dkQuyen.loaiDoiTuong);

                        if (hasExist[0].ChuSuDungIds.indexOf(dkQuyen.chuSuDungId.toString()) === -1) {
                            hasExist[0].ChuSuDungIds.push(dkQuyen.chuSuDungId.toString());
                        }
                    }
                }
            }
        }

        return dangKyTaiSans;
    }

    VBDLIS.ConvertData.BuildGiayChungNhanFromDangKyQuyen = function (lstDangKyQuyen) {
        var giayChungNhans = [];
        if (lstDangKyQuyen && lstDangKyQuyen.length > 0) {
            for (var i = 0; i < lstDangKyQuyen.length; i++) {
                var dkQuyen = lstDangKyQuyen[i];

                var hasExist = giayChungNhans.filter(function (x) {
                    if (x.GiayChungNhan && x.GiayChungNhan.giayChungNhanId !== null && x.GiayChungNhan.giayChungNhanId > 0) {
                        return x.GiayChungNhan.giayChungNhanId === (dkQuyen.giayChungNhanId || dkQuyen.GiayChungNhan.giayChungNhanId);
                    }

                    return false;
                })


                if (!hasExist || hasExist.length === 0) {
                    giayChungNhans.push({
                        GiayChungNhan: dkQuyen.GiayChungNhan,
                        TypeItems: [dkQuyen.typeItem],
                        ItemIds: [dkQuyen.itemId],
                        SubItemIds: [dkQuyen.subItemId],
                        LoaiDoiTuongs: [dkQuyen.loaiDoiTuong],
                        ChuSuDungIds: [dkQuyen.chuSuDungId.toString()]
                    });
                }
                else {
                    hasExist[0].TypeItems.push(dkQuyen.typeItem);
                    hasExist[0].ItemIds.push(dkQuyen.itemId);
                    hasExist[0].SubItemIds.push(dkQuyen.subItemId);
                    hasExist[0].LoaiDoiTuongs.push(dkQuyen.loaiDoiTuong);

                    if (hasExist[0].ChuSuDungIds.indexOf(dkQuyen.chuSuDungId.toString()) === -1) {
                        hasExist[0].ChuSuDungIds.push(dkQuyen.chuSuDungId.toString());
                    }
                }
            }


        }

        return giayChungNhans;
    }

    VBDLIS.ConvertData.ConvertGiayChungNhanViewModelToGiayChungNhanBienDongViewModel = function (lstGiayChungNhan) {
        lstGiayChungNhan = lstGiayChungNhan || [];

        var listConvert = [];

        lstGiayChungNhan.forEach(function (item) {
            var result = {
                ChuSoHuu: {
                    CaNhans: [],
                    VoChongs: [],
                    HoGiaDinhs: [],
                    ToChucs: [],
                    CongDongs: []
                },
                TaiSan: {
                    ThuaDats: [],
                    NhaRiengLes: [],
                    NhaChungCus: [],
                    CanHos: [],
                    CongTrinhXayDungs: [],
                    CongTrinhNgams: [],
                    RungTrongs: [],
                    CayLauNams: []
                },
                GiayChungNhan: null
            };

            if (item.ListDangKyQuyen && item.ListDangKyQuyen.length > 0) {
                for (var i = 0; i < item.ListDangKyQuyen.length; i++) {
                    let dangKyQuyen = item.ListDangKyQuyen[i];

                    if (dangKyQuyen) {
                        for (let tenChuHoacTaiSan in dangKyQuyen) {
                            if (dangKyQuyen[tenChuHoacTaiSan] != null && typeof (dangKyQuyen[tenChuHoacTaiSan]) === 'object' && !(dangKyQuyen[tenChuHoacTaiSan] instanceof Array)) {
                                if (result.ChuSoHuu[tenChuHoacTaiSan + "s"]) {
                                    result.ChuSoHuu[tenChuHoacTaiSan + "s"].push(dangKyQuyen[tenChuHoacTaiSan]);
                                }
                                else if (result.TaiSan[tenChuHoacTaiSan + "s"]) {
                                    result.TaiSan[tenChuHoacTaiSan + "s"].push(dangKyQuyen[tenChuHoacTaiSan]);
                                }
                            }
                        }
                    }
                }
            }

            let cloneObject = GLOBAL.utils.cloneObject(item);
            delete cloneObject.ListDangKyQuyen;
            result.GiayChungNhan = cloneObject;

            listConvert.push(result);
        });

        return listConvert;
    }


    VBDLIS.Utils.isGiayChungNhansChange = function (giayChungNhansA, giayChungNhansB) {
        if ((!giayChungNhansA && !giayChungNhansB) || (giayChungNhansA && giayChungNhansB)) {
            if (giayChungNhansA) {
                if (giayChungNhansA.length != giayChungNhansB.length) {
                    return true;
                }
                else {
                    $.each(giayChungNhansA, function (index, giayChungNhan) {
                        var giayChungNhanTemp = giayChungNhansB.filter(t => t.giayChungNhanId == giayChungNhan.giayChungNhanId);
                        if (!giayChungNhanTemp || giayChungNhanTemp.length == 0) {
                            return true;
                        }
                    });
                    return false;
                }
            }
        }
        return true;
    }

    VBDLIS.Utils.isChuSoHuuInfosChange = function (chuSoHuuInfosA, chuSoHuuInfosB, loaiChuSoHuu) {
        if ((!chuSoHuuInfosA && !chuSoHuuInfosB) || (chuSoHuuInfosA && chuSoHuuInfosB)) {
            if (chuSoHuuInfosA) {
                if (chuSoHuuInfosA.length != chuSoHuuInfosB.length) {
                    return true;
                }
                else {
                    if (loaiChuSoHuu === 'CANHAN') {
                        $.each(chuSoHuuInfosA, function (index, caNhan) {
                            var caNhanTemp = chuSoHuuInfosB.filter(t => t.caNhanId == caNhan.caNhanId);
                            if (!caNhanTemp || caNhanTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    else if (loaiChuSoHuu === 'VOCHONG') {
                        $.each(chuSoHuuInfosA, function (index, voChong) {
                            var voChongTemp = chuSoHuuInfosB.filter(t => t.voChongId == voChong.voChongId);
                            if (!voChongTemp || voChongTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    else if (loaiChuSoHuu === 'HOGIADINH') {
                        $.each(chuSoHuuInfosA, function (index, hoGiaDinh) {
                            var hoGiaDinhTemp = chuSoHuuInfosB.filter(t => t.hoGiaDinhId == hoGiaDinh.hoGiaDinhId);
                            if (!hoGiaDinhTemp || hoGiaDinhTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    else if (loaiChuSoHuu === 'TOCHUC') {
                        $.each(chuSoHuuInfosA, function (index, toChuc) {
                            var toChucTemp = chuSoHuuInfosB.filter(t => t.toChucId == toChuc.toChucId);
                            if (!toChucTemp || toChucTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    else if (loaiChuSoHuu === 'cayLauNam') {
                        $.each(chuSoHuuInfosA, function (index, cayLauNam) {
                            var cayLauNamTemp = chuSoHuuInfosB.filter(t => t.cayLauNamId == cayLauNam.cayLauNamId);
                            if (!cayLauNamTemp || cayLauNamTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    return false;
                }
            }
            return false;
        }
        return true;
    }

    VBDLIS.Utils.isChuSoHuuChange = function (chuSoHuuA, chuSoHuuB) {
        if (VBDLIS.Utils.isChuSoHuuInfosChange(chuSoHuuA.CaNhans, chuSoHuuB.CaNhans, "CANHAN")
            || VBDLIS.Utils.isChuSoHuuInfosChange(chuSoHuuA.VoChongs, chuSoHuuB.VoChongs, "VOCHONG")
            || VBDLIS.Utils.isChuSoHuuInfosChange(chuSoHuuA.HoGiaDinhs, chuSoHuuB.HoGiaDinhs, "HOGIADINH")
            || VBDLIS.Utils.isChuSoHuuInfosChange(chuSoHuuA.ToChucs, chuSoHuuB.ToChucs, "TOCHUC")
            || VBDLIS.Utils.isChuSoHuuInfosChange(chuSoHuuA.cayLauNams, chuSoHuuB.cayLauNams, "cayLauNam")) {
            return true;
        }
        else {
            return false;
        }
    }

    VBDLIS.Utils.isTaiSanInfosChange = function (taiSanInfosA, taiSanInfosB, loaiTaiSan) {
        if ((!taiSanInfosA && !taiSanInfosB) || (taiSanInfosA && taiSanInfosB)) {
            if (taiSanInfosA) {
                if (taiSanInfosA.length != taiSanInfosB.length) {
                    return true;
                }
                else {
                    if (loaiTaiSan === 'THUADAT') {
                        $.each(taiSanInfosA, function (index, thuaDat) {
                            var thuaDatTemp = taiSanInfosB.filter(t => t.thuaDatId == thuaDat.thuaDatId);
                            if (!thuaDatTemp || thuaDatTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    else if (loaiTaiSan === 'NHARIENGLE') {
                        $.each(taiSanInfosA, function (index, nhaRiengLe) {
                            var nhaRiengLeTemp = taiSanInfosB.filter(t => t.nhaRiengLeId == nhaRiengLe.nhaRiengLeId);
                            if (!nhaRiengLeTemp || nhaRiengLeTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    else if (loaiTaiSan === 'NHACHUNGCU') {
                        $.each(taiSanInfosA, function (index, nhaChungCu) {
                            var nhaChungCuTemp = taiSanInfosB.filter(t => t.nhaChungCuId == nhaChungCu.nhaChungCuId);
                            if (!nhaChungCuTemp || nhaChungCuTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    else if (loaiTaiSan === 'CANHO') {
                        $.each(taiSanInfosA, function (index, canHo) {
                            var canHoTemp = taiSanInfosB.filter(t => t.canHoId == canHo.canHoId);
                            if (!canHoTemp || canHoTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    else if (loaiTaiSan === 'CONGTRINHXAYDUNG') {
                        $.each(taiSanInfosA, function (index, congTrinhXayDung) {
                            var congTrinhXayDungTemp = taiSanInfosB.filter(t => t.congTrinhXayDungId == congTrinhXayDung.congTrinhXayDungId);
                            if (!congTrinhXayDungTemp || congTrinhXayDungTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    else if (loaiTaiSan === 'CONGTRINHNGAM') {
                        $.each(taiSanInfosA, function (index, congTrinhNgam) {
                            var congTrinhNgamTemp = taiSanInfosB.filter(t => t.congTrinhNgamId == congTrinhNgam.congTrinhNgamId);
                            if (!congTrinhNgamTemp || congTrinhNgamTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    else if (loaiTaiSan === 'CAYLAUNAM') {
                        $.each(taiSanInfosA, function (index, cayLauNam) {
                            var cayLauNamTemp = taiSanInfosB.filter(t => t.cayLauNamId == cayLauNam.cayLauNamId);
                            if (!cayLauNamTemp || cayLauNamTemp.length == 0) {
                                return true;
                            }
                        });
                    }
                    return false;
                }
            }
            return false;
        }
        return true;
    }

    VBDLIS.Utils.isTaiSanChange = function (taiSanA, taiSanB) {
        if (VBDLIS.Utils.isTaiSanInfosChange(taiSanA.ThuaDats, taiSanB.ThuaDats, "THUADAT")
            || VBDLIS.Utils.isTaiSanInfosChange(taiSanA.NhaRiengLes, taiSanB.NhaRiengLes, "NHARIENGLE")
            || VBDLIS.Utils.isTaiSanInfosChange(taiSanA.NhaChungCus, taiSanB.NhaChungCus, "NHACHUNGCU")
            || VBDLIS.Utils.isTaiSanInfosChange(taiSanA.CanHos, taiSanB.CanHos, "CANHO")
            || VBDLIS.Utils.isTaiSanInfosChange(taiSanA.CongTrinhXayDungs, taiSanB.CongTrinhXayDungs, "CONGTRINHXAYDUNG")
            || VBDLIS.Utils.isTaiSanInfosChange(taiSanA.CongTrinhNgams, taiSanB.CongTrinhNgams, "CONGTRINHNGAM")
            || VBDLIS.Utils.isTaiSanInfosChange(taiSanA.CayLauNams, taiSanB.CayLauNams, "CAYLAUNAM")) {
            return true;
        }
        else {
            return false;
        }
    }
