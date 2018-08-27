VModule = {};
VModule.VModuleJsLoader = {};
VModule.VModuleInterface = {};
VModule.define = function (vmoduleName, config) {
    VBDLIS.VModule.VModuleJsLoader[vmoduleName] = function (jObj) {
        var vModule = VModule.getVModule(jObj);

        if (!config) {
            console.error(`VModule ${vmoduleName} not contain onInit function`);
            return false;
        }

        //Kế thừa module nếu có
        if (config.extend) {
            if (VModule.VModuleInterface[config.extend]) {
                var interfaceExtend = VModule.VModuleInterface[config.extend];
                config = $.extend({}, interfaceExtend, config);
            }
            else {
                console.error(`VModule Interface not contain ${config.extend}`)
            }
        }

        if (!config.onInit) {
            console.error(`VModule ${vmoduleName} not contain onInit function`);
            return false;
        }

        //Gán biến dom vào để chứa đối tượng 
        config.element = vModule;

        //Gọi hàm khởi tạo 
        config.onInit(vModule);

        //Hàm đăng ký sự kiện cho  các đối tượng trong module
        config.control = function (listeners) {
            for (var strQuery in listeners) {
                var control = null;

                var re = new RegExp(vmoduleName, "g");
                var query = strQuery.replace(re, `[vmodule-id="${vModule.VModuleId}"]`)
                                   .replace(/{{VModuleId}}/g, vModule.VModuleId);

                control = $(query);

                if (control.toArray().length > 0) {
                    $.each(control, function (index, ctrl) {
                        if (ctrl.eventFunc == null) {
                            ctrl.eventFunc = {};
                        }

                        var qrNotSpace = strQuery.split(' ').join('');

                        if (ctrl.eventFunc[qrNotSpace] == null) {
                            ctrl.eventFunc[qrNotSpace] = {};
                        }

                        for (var eventName in listeners[strQuery]) {
                            ctrl.eventFunc[qrNotSpace][eventName] = listeners[strQuery][eventName];
                        }    
                    });

                    var listEvent = [];
                    for (var eventName in listeners[strQuery]) {
                        listEvent.push(eventName);
                    }    
                   
                    if (listEvent.length > 0) {
                        const qr = strQuery.split(' ').join('');
                        control.on(listEvent.join(" "), function (a, b, c, d, e, f, g, h, i, j, k) {
                            if (a.target.eventFunc && a.target.eventFunc[qr] && typeof (a.target.eventFunc[qr][a.type]) === 'function') {
                                var target = $(this);
                                a.target.eventFunc[qr][a.type].apply(config, [vModule, target, a, b, c, d, e, f, g, h, i, j, k]);
                            }

                            return true;
                        });
                    }
                }
            }
        };

        //Gán các hàm & biến của module vào DOM để tiện truy xuất
        vModule[0].vModuleConfig.Config = config;

        //Gọi hàm khởi tạo đăng ký sự kiện
        if (typeof (config.listeners) === "function") {
            config.listeners();
        };

        //Fire sự kiện sau khi đăng ký xong vmodule
        vModule.trigger('afterrender', vModule);
    };

    $(document.currentScript).on('load', function (e) {
        if (this.parentElement) {
            VBDLIS.VModule.VModuleJsLoader[vmoduleName]($(this.parentElement));
        }
    });
};
VModule.getVModule = function (jObject) {
    var vModule = jObject.closest(".VModule");
    if (vModule[0] != null) {
        if (vModule[0].hasInit) {
            return vModule;
        }

        GLOBAL.utils.bindRequiredSignal(vModule);

        vModule.mode = "add";
        var jsonSettings = vModule.attr('vmodule-settings');
        if (jsonSettings) {
            vModule.Settings = JSON.parse(jsonSettings);
            vModule.removeAttr('vmodule-settings');
        }
        vModule.Id = vModule.attr("id");
        vModule.VModuleId = vModule.attr("vmodule-id");
        vModule.on("initview", function () {
            if (vModule.onChangeData) {
                vModule.onChangeData();
            }
            else {
                vModule.trigger('changeValue'); //Cấu trúc module mới
            }
        });

        vModule.change(function (e) {
            if (e != null && e.target != null && $(e.target).hasClass("VModule")) {

                console.log('Module ' + vModule.attr('vmodule-name') + ' change');

                if (this.value)
                {
                    if (this.value instanceof Array)
                    {
                        vModule.mode = "add";
                        GLOBAL.utils.setTmpId(this.value);
                    }
                    else if (this.value instanceof Object)
                    {
                        if (this.value.Id || this.value._id) {
                            vModule.mode = "update";
                        }
                        else {
                            vModule.mode = "add";
                        }

                        GLOBAL.utils.setTmpId(this.value);
                    }
                }
                else {
                    vModule.mode = "add";
                }

                if (this.value && typeof (this.value) == "object") {
                    GLOBAL.utils.bindFormData(vModule, this.value);
                }
                else
                {
                    var defaultValue = VModule.GetDefaultValue(vModule.attr('vmodule-name'));
                    if (defaultValue) {
                        GLOBAL.utils.bindFormData(vModule, defaultValue);
                    }
                    else {
                        GLOBAL.utils.clearFormData(vModule);
                    }
                }
                if (vModule.onChangeData) {
                    vModule.onChangeData();
                }
            }
            return false;
        });
        vModule.saveData = function (fireEvent, mergeMe, usingMeIsValue) {
            var obj = GLOBAL.utils.getFormValue(this);
            var currentData = this.val();

            if (mergeMe) {
                obj = $.extend({}, obj, mergeMe);
            }
            else if (usingMeIsValue) {
                obj = usingMeIsValue;
            }

            if (vModule.mode == "add") {
                obj._id = new Date().getTime();
            }
            else {
                if (currentData && currentData._id) {
                    obj._id = currentData._id;
                }
            }


            this[0].value = obj;
            if (typeof (fireEvent) == "undefined" || fireEvent)
                $(this).trigger(vModule.mode + "_data", obj);
        };
        vModule.deleteData = function (fireEvent) {
            vModule;
            var obj = null;
            if (this instanceof jQuery) {
                obj = this.val();
                this[0].value = null;
            }
            else {
                obj = this.value;
                this.value = null;
            }
            if (typeof (fireEvent) == "undefined" || fireEvent)
                $(this).trigger("delete_data", obj);
        };
        vModule.clear = function () {
            GLOBAL.utils.clearFormData(vModule);
        };
        vModule[0].hasInit = true; //Chỉ khởi tạo 1 lần
        vModule[0].vModuleConfig = {
            ServerSettings: jsonSettings ? JSON.parse(jsonSettings) : null,
            Config: {}
        };
    }
    else {
        console.log("vModule not exist", jObject);
    }
    return vModule;
};
VModule.OnChangeData = function (vModule, type) {
    var value = vModule.val();
    var new_data = [{
        text: 'Không có dữ liệu'
    }];
    if (value && value.length !== 0) {
        if (!(value instanceof Array)) {
            value = [value];
        }

        //Tự động phát sinh số _id tạm để xử lý cho dễ
        for (var i = 0; i < value.length; i++) {
            value[i]._id = i + 1;
        }

        var data = value.map(function (item, index) {
            return VBDLIS.BienDong.TaoTree(type, item);
        });
        new_data = data;
    }

    vModule.find('#tree' + VBDLIS.ToTitle(type)).jstree(true).settings.core.data = new_data;
    vModule.find('#tree' + VBDLIS.ToTitle(type)).jstree(true).refresh(false, true);
};
VModule.OnSelectedItem = function (vModule, data, multiselect, type, parentType) {
    if (data && data.Value) {
        var ids = data.Value.map(item => item[VBDLIS.ToCamel(type, { suffixes: 'Id' })]);

        DanhMucAjax['Get' + VBDLIS.ToTitle(type) + 'ByIds'](ids, function (data) {
            if (data && data.Value) {
                data = data.Value || [];

                if (!(data instanceof Array)) {
                    data = [data];
                }

                if (multiselect) {
                    if (!vModule[0].value) {
                        vModule[0].value = data;
                    }
                    else
                    {
                        for (var i = 0; i < data.length; i++) {
                            var isExist = false;
                            if (vModule[0].value) {
                                isExist = vModule[0].value.filter(function (x) {
                                    return x.Id === data[i].Id;
                                }).length > 0;
                            }
                            if (!isExist) {
                                vModule[0].value.push(data[i]);
                            }
                        }
                        
                    }
                }
                else {
                    vModule[0].value = data;
                }
                vModule.change();
            }
            else {
                GLOBAL.utils.showMessage.show({ icon: GLOBAL.utils.showMessage.UNSUCCESS, msg: 'Không tải được dữ liệu. ' + data.Error });
            }
        });
        if (parentType) {
            $('#mdlTraCuu' + VBDLIS.ToTitle(parentType) + '-' + vModule.VModuleId).modal('hide');
        } else {
            $('#mdlTraCuu' + VBDLIS.ToTitle(type) + '-' + vModule.VModuleId).modal('hide');
        }
    }
};
VModule.OnAddData = function (vModule, data, multiselect, type) {
    var value = vModule.val();
    if (!value) {
        value = [];
    }
    var currentTreeData = vModule.find('#tree' + VBDLIS.ToTitle(type)).jstree(true).get_json("#", { no_state: true, no_id: true, no_li_attr: true, no_a_attr: true });
    if (currentTreeData.length > 0 && currentTreeData[0].text === "Không có dữ liệu") {
        currentTreeData.splice(0, 1);
    }
    if (multiselect) {
        value.push(data);
    }
    else {
        if (currentTreeData.length > 0) {
            alertify.warning('bl', 'Chỉ được tồn tại một ' + VBDLIS.ToVi(type) + ', vui lòng sửa ' + VBDLIS.ToVi(type) + ' hiện có.');
        } else {
            value[0] = data;
        }
    }
    vModule[0].value = value;
    vModule.change();
    $('#mdlChiTiet' + VBDLIS.ToTitle(type) + '-' + vModule.VModuleId).modal('hide');
};
VModule.OnUpdateData = function (vModule, data, type) {
    var value = vModule.val();
    if (!value) value = [];
    var searchField = '';

    if (data.Id) {
        searchField = 'Id';
    }
    else {
        searchField = '_id';
    }

    if (value instanceof Array) {
        for (var i = 0; i < value.length; i++) {
            if (value[i][searchField] === data[searchField]) {
                value[i] = data;
                break;
            }
        }
    }
    else
    {
        value = data;
    }
    
    vModule[0].value = value;
    vModule.change();
    $('#mdlChiTiet' + VBDLIS.ToTitle(type) + '-' + vModule.VModuleId).modal('hide');
};
VModule.GetDefaultValue = function (moduleName) {
    switch (moduleName) {
        case 'canhanchitiet':
            return {
                gioiTinh: false,
                loaiDoiTuongId: 1,
                quocTichId1: 704,
                quocTichId2: 704,
                danTocId: 1
            }
            break;
        case 'giaytotuythanchitiet':
            return {
                loaiGiayToTuyThanId: 2
            }
        case 'diachichitiet':
            return {

            }
        default:
            return {};
    }
};

 //VModule global function
(function ($) {
    $.fn.reset = function () {
        let jElement = this;
        if (!jElement.hasClass('VModule')) GLOBAL.utils.clearFormData(jElement);
        jElement[0].value = VModule.GetDefaultValue(jElement.attr('vmodule-name'));
        jElement.change();
    };

    $.fn.setValue = function (value, fireEvent) {
        let jElement = this;
        if (jElement.hasClass('VModule')) {
            GLOBAL.utils.setTmpId(value);
            jElement[0].value = value;

            if (fireEvent == null) fireEvent = true;
            if (fireEvent) {
                jElement.trigger('changeValue');
            }
        }
    };

    $.fn.getValue = function () {
        let jElement = this;
        if (jElement.hasClass('VModule')) {

            let value = jElement.val();

            if (value === "") {
                value = null;
            }

            //Kiểm tra có hàm override hay không
            if (jElement.vModule() && typeof (jElement.vModule().getValue) === 'function')
            {
                let config = jElement.vModule();
                let instanceOfModule = config.element;

                return jElement.vModule().getValue.apply(config, [instanceOfModule, value]);
            }

            return value;
        }
    };

    $.fn.vModule = function () {
        let jElement = this;
        let excludeFunction = ["onInit", "listeners"];
        if (jElement.hasClass('VModule')) {

            let dom = jElement[0];

            if (dom && dom.vModuleConfig && dom.vModuleConfig.Config) {
                return dom.vModuleConfig.Config;
            }
            
        }

        return false;
        
    };
})(jQuery);