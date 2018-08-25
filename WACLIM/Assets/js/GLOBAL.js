if (typeof (GLOBAL) === 'undefined') {
    GLOBAL = {};
}

GLOBAL = $.extend({}, {
    utils: {},
    linkRoot: _WEB_URL,
    CurrentUser: null,
    waitAll: 0,
    isAjaxFailed: false,
    ajaxInvoke: false,
    dynamicSelect2zIndex: 4,
    showLoadingEnable: true, // Ẩn/hiện loadingModal khi gọi Ajax
    callAjax: function (url, data, callback, options) {
        var antiForgeryToken = $('input[name="__RequestVerificationToken"]:eq(0)').val();
        var contentType = null;
        var dataType = null;
        if (!options || (options && options.requestType !== 'form')) {
            contentType = 'application/json; charset=utf-8';
            dataType = 'json';
        }
        var jqxhr = $.ajax({
            url: GLOBAL.linkRoot + url,
            type: 'POST',
            contentType: contentType,
            headers: { '__RequestVerificationToken': antiForgeryToken, 'X-Requested-With': "XMLHttpRequest" },
            dataType: dataType,
            data: data ? JSON.stringify(data) : null
        }).always((dataORjqXHR, textStatus, jqXHRORerrorThrown) => {
            //Unauthorized, Endsession
            if (dataORjqXHR === "ENDSESSION" || dataORjqXHR.responseText === "ENDSESSION")
            { 
                GLOBAL.utils.endSession();
            }   
            else {
                GLOBAL.utils.processAjaxResult(dataORjqXHR, textStatus, jqXHRORerrorThrown, callback, options);
            }
        })
    },
    validateOptions: {
        errorPlacement: function (error, element) {
            GLOBAL.utils.formValidationErrorPlacement(error, element);
        },
        success: function (label, element) {
            $(element).popover("hide");
        }
    }
}, GLOBAL);

GLOBAL.utils.select2ViLanguage = {
    errorLoading: function () {
        return 'Không thể tải kết quả tìm kiếm';
    },
    loadingMore: function () {
        return 'Tải thêm...';
    },
    noResults: function () {
        return 'Không có kết quả';
    },
    searching: function () {
        return 'Đang tìm kiếm...';
    },
    inputTooLong: function (args) {

        var message = 'Chuỗi tìm kiếm không dài quá' + args.maximum + ' ký tự';

        return message;
    },
    inputTooShort: function (args) {
        var remainingChars = args.minimum - args.input.length;

        var message = 'Vui lòng nhập ít nhất' + remainingChars + ' ký tự';

        return message;
    },
};

//showMessage: Hàm hiển thị popup thông báo lên màn hình
GLOBAL.utils.showMessage = {
    OK: "OK",
    YESNO: "YESNO",
    SENDBUGTOSERVER: "SENDBUGTOSERVER",
    BUG: "bug",
    WARNING: "exclamation-circle",
    INFO: "info-circle",
    QUESTION: "question-circle",
    ERROR: "times-circle",
    SUCCESS: "check-circle",
    UNSUCCESS: "meh-o",
    show: function (opts) {
        var defaultOpts = {
            title: "Thông báo",
            msg: "",
            errorMsg: "",
            icon: "info-circle",
            buttons: "OK",
            fn: null,
            ajaxErr: false,
        };
        opts = $.extend({}, defaultOpts, opts);
        var modal = [];
        var iconColor = "#dddddd"; //default
        if (opts.icon == GLOBAL.utils.showMessage.WARNING) {
            iconColor = "orange";
        }
        else if (opts.icon == GLOBAL.utils.showMessage.ERROR || opts.icon == GLOBAL.utils.showMessage.UNSUCCESS) {
            iconColor = "#e26565";
        }
        modal.push("<div class='modal message'>");
        modal.push("<div class='modal-dialog modal-dialog modal-center modal-30' role='document'>");
        modal.push('<div class="modal-content">');
        modal.push("<div class='modal-header'>");
        modal.push("<h4 class='modal-title'>" + opts.title + "</h4>");
        modal.push("</div>");
        modal.push("<div class='modal-body'>");
        modal.push("<div style='width:50px; height:50px; display: table-cell; font-size:50px; color: " + iconColor + "'><i class='fa fa-" + opts.icon + "' style='position: absolute; top:10px; opacity: 0.4'></i></div>");
        modal.push("<div style='display: table-cell; text-align: justify; vertical-align:middle; padding-left:15px'>");
        modal.push("<p style='font-size:15px'>" + opts.msg + "</p>");
        modal.push("<p style='font-size:15px'>" + opts.errorMsg + "</p>");
        modal.push("</div>");
        modal.push("<div></div>");
        modal.push("</div>");
        modal.push("<div class='modal-footer' style='text-align: center'>");
        modal.push("</div>");
        modal.push("</div>");
        modal.push("</div>");
        modal.push("</div>");
        modal = $(modal.join("")).appendTo($("#dvModalContainer"));
        if (opts.buttons == "OK") {
            modal.find(".modal-footer").append($("<button type='button' class='btn btn-success' value='OK'><i class='fa fa-check-circle'></i> Đồng ý</button>"));
        }
        else if (opts.buttons == "YESNO") {
            modal.find(".modal-footer").append($("<button type='button' class='btn btn-success' value='YES'><i class='fa fa-check-circle'></i> Đồng ý</button>"));
            modal.find(".modal-footer").append($("<button type='button' class='btn' value='NO'><i class='fa fa-times-circle'></i> Không</button>"));
        }
        modal.find(".modal-footer button").click(function () {
            modal.modal("hide");
            modal.remove();

            if (typeof (opts.fn) == "function") {
                opts.fn(this.value);
            }
        });
    }
};

//endSession: Hàm tự động khóa màn hình làm việc và mở form đăng nhập lại khi người dùng hết phiên làm việc
GLOBAL.utils.endSession = function ()
{
    $('#loginAgainModal .erormess').html("");
    $('#loginAgainModal input').val("");
    $('body').addClass('endsession');
}

//getFormValue: Hàm tự động lấy các value trong control build thành object trả về
GLOBAL.utils.getFormValue = function (form) {
    if (typeof (form) === 'string') {
        var elementId = (form[0] !== "#") ? "#" + form : form
        form = $(elementId);
    }
    else if (typeof (form) === 'object' && !(form instanceof jQuery)) {
        form = $(form);
    }
    if (!form) return null;
    var frm = {};
    var listModuleNames = [];

    form.find('[name]').each(function (index, item) {
        var closestVModule = $(item).closest('.VModule');

        if (closestVModule.length == 0 || listModuleNames.indexOf(closestVModule.attr('vmodule-id')) == -1) {
            var name = item.getAttribute('name');

            if (name) {
                if (item.type === 'checkbox') {
                    frm[name] = item.checked;
                }
                else if (item.type == 'radio') {
                    if (item.checked) {
                        frm[name] = item.value;
                    }
                }
                else 
                {
                    if (item.value || item.value=='')
                    {
                        let jinput = $(item);
                        if (jinput.hasClass('number') && item.value!='') {
                            var value = parseInt(item.value);
                            if(isNaN(value)) {
                                frm[name] = 0;
                            }
                            else
                                frm[name] = value;
                        }
                        else if ((jinput.hasClass('area') || jinput.hasClass('money')) && item.value!='') {
                            var value = parseFloat(item.value);
                            if(isNaN(value)) {
                                frm[name] = 0;
                            }
                            else
                                frm[name] = value;
                        }
                        else if (jinput.hasClass('datepicker') || jinput.hasClass('datepicker-from') || jinput.hasClass('datepicker-to') || jinput.hasClass('datetimepicker') || jinput.hasClass('datetimepicker-from') || jinput.hasClass('datetimepicker-from'))
                        {
                            frm[name] = GLOBAL.utils.dateTimeReviver(item.value);
                        }
                        else
                        {
                            frm[name] = item.value;
                        }

                        if (jinput.hasClass('VModule')) {
                            listModuleNames.push(item.getAttribute('vmodule-id'));
                        }
                    }
                }
            }
        }
    });

    let hiddenData = form.data('hiddenData');

    if (hiddenData) {
        frm = $.extend({}, frm, hiddenData);
    }
    return frm;
};

//clearFormData: Tìm các thẻ control trong form (div) xóa hết giá trị và đưa về mặc định
GLOBAL.utils.clearFormData = function (form) {

    if (typeof (form) != 'object') {
        if (form[0] != "#") {
            form = "#" + form;
        }

        form = $(form);
    }
    else if (typeof (form) == 'object' && !(form instanceof jQuery)) {
        form = $(form);
    }

    if (!form) return null;

    var frm = {};

    form.find('[name]').each(function (index, item) {
        var type = item.getAttribute("type");
        if (type == "text" || type == "email" || type == "password" || type == "hidden") {
            if (item.name !== "__RequestVerificationToken") {
                $(item).val('').trigger('change');
            }
        }
        else if (type == "checkbox") {
            item.checked = false;
        }
        else if (type == "file") {
            $(item).wrap('<form>').closest('form').get(0).reset();
            $(item).unwrap();
        }
        else if (item.className.indexOf('VModule') != -1) {
            item.value = null;
            $(item).trigger('initview');
        }
        else if (item.tagName == "SELECT") {
            //$(item).val($(item).find('option:first').val()).change();
            //if (item.selectedIndex == -1)
            {
                var selectItem = $(item).find('option:first').val();
                $(item).val(selectItem).trigger('change');
            }
        }
        else if (item.tagName == "TEXTAREA") {
            item.value = '';
        }
    });

    form.data('hiddenData', null);
}

//bindFormData: Tìm các control có name tương ứng với tên của property trong data để gán dữ liệu vào
GLOBAL.utils.bindFormData = function (form, data) {
    if (typeof (form) != 'object') {
        if (form[0] != "#") {
            form = "#" + form;
        }

        form = $(form);
    }
    else if (typeof (form) == 'object' && !(form instanceof jQuery)) {
        form = $(form);
    }

    if (form) {
        GLOBAL.utils.clearFormData(form);
        if (data) {
            for (var prop in data) {
                var input = form.find('[name="' + prop + '"]');
                var type = input.attr('type');

                if (input && input[0]) {
                    if (input.hasClass('datepicker') || input.hasClass('datepicker-from') || input.hasClass('datepicker-to') || input.hasClass('datetimepicker') || input.hasClass('datetimepicker-from') || input.hasClass('datetimepicker-from')) {
                        if (data[prop]) {
                            var date = GLOBAL.utils.dateTimeReviver(data[prop]);
                            input.val(date).trigger('change');
                        }
                    }
                    else if (type == 'radio') {
                        if (input.length > 1) {
                            for (var i = 0; i < input.length; i++) {
                                input[i].checked = input[i].value == data[prop] + "";
                            }
                        }

                    }
                    else if (type == 'checkbox') {
                        input.prop('checked', (data[prop] == 1 || input.val() == true));
                    }
                    else if (type === "text" || type === "email" || type === "pasword" || type === "hidden" || input[0].tagName == "TEXTAREA") {
                        input.val(data[prop]).trigger('change');
                    }
                    else if (input[0].tagName == "SELECT") {
                        input.val(data[prop]).trigger('change');
                        input.attr('data-default-select', data[prop]);
                    }
                    else if (type === 'file') {
                        //do nothing
                    }
                    else { //VModule
                        input[0].value = data[prop];
                        input.trigger('initview');
                    }
                }
                else {
                    var exceptProps = ["InId", "OutId"];
                    if (typeof (data[prop]) !== 'object' && data[prop] && exceptProps.indexOf(prop) === -1) {
                        //form.append('<input type="hidden" name=' + prop + ' value="' + data[prop] + '"></input>');
                        let hiddenData = form.data('hiddenData') || {};
                        hiddenData[prop] = data[prop];
                        form.data('hiddenData', hiddenData);
                    }
                    var input = form.find('[value="' + prop + '"]');
                    var type = input.attr('type');
                    if (type === 'radio') {
                        if (input.length > 0) {
                            input[0].checked = data[prop];
                        }
                    }
                }
            }
        }

    }
};

//bindRequiredSignal: Hàm tìm các field required và gán nhãn * lên label
GLOBAL.utils.bindRequiredSignal = function (jObject) {
    jObject.find('[data-rule-required="true"], [data-rule-date="true"]').closest('.form-group').find('label:not(:has(span))').each((index, label) => {
        label.innerHTML += '<span class="required-signal">*</span>';
    });
}

//bindScriptsDynamic: Hàm tự động load các script được tìm thấy trong dom lên trình duyệt. Phục vụ cho việc load động form
GLOBAL.utils.bindScriptsDynamic = function (dom, callback, doBeforeLoadScrip) {
    /*
    NOTE:
    - Sau khi append dom vào document; trình duyệt sẽ tự động tải js về theo <script> src, nhưng không thực thi(vì append động). Dẫn đến việc load js bị lặp lại 2 lần do hàm GLOBAL.utils.bindScriptsDynamic cũng thực hiện nhiệm vụ tải js và thực thi chúng.
    - Dòng lệnh trong block if dưới đây có tác dụng chuyển đường dẫn src js vào data-src để ngăn trình duyệt tự tải js về. Và GLOBAL.utils.bindScriptsDynamic sẽ đọc đường dẫn trong data-src
    */
    if (dom) {
        dom.find('script').each(function (idx, script) {
            script.setAttribute('data-src', script.src);
            script.removeAttribute('src');
        });
    }

    if (typeof (doBeforeLoadScrip) === 'function') {
        doBeforeLoadScrip();
    }

    var scripts = dom.find('script');
    GLOBAL.waitAll = 0;
    if (scripts && scripts.length > 0) {
        scripts.each(function (index, script) {
            var urlScr = script.getAttribute('src') || script.getAttribute('data-src');
            if (urlScr != null) {
                var fnLoad = urlScr.split('/');
                fnLoad = fnLoad[fnLoad.length - 1].replace('.js', '');
                $.getScript(urlScr).always(function (dataORjqXHR, textStatus, jqXHRORerrorThrown) {
                    GLOBAL.utils.processAjaxResult(dataORjqXHR, textStatus, jqXHRORerrorThrown, callback, { scripts: scripts, script: script, fnLoad: fnLoad, requestType: 'script' });
                });
            }
        });
    }
}

//dateTimeReviver: Hàm convert chuỗi ngày tháng từ các định dạng datetime, isodate thành object DateTime
GLOBAL.utils.dateTimeReviver = function (value) {
    var date;
    if (typeof value === 'string' && !$.isNumeric(value)) {
        var jsonDate = /\/Date\((-*\d*)\)\//.exec(value);
        var isoDate = /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])(\D?([01]\d|2[0-3])\D?([0-5]\d)\D?([0-5]\d)?\D?(\d{3})?([zZ]|([\+-])([01]\d|2[0-3])\D?([0-5]\d)?)?)?$/.exec(value);

        if (jsonDate) {
            date = new Date(+jsonDate[1]);
        } else if (isoDate) {
            date = new Date(value);
        } 
    }
    else if (value instanceof Date) {
        date = value;
    }

    if (date instanceof Date) {
        date.toString = function (detail) {
            var strDateTime = ('0' + this.getDate()).slice(-2) + '/' + ('0' + (this.getMonth() + 1)).slice(-2) + '/' + ("000" + this.getFullYear()).slice(-4);
            if (detail) {
                strDateTime += (" " + ('0' + this.getHours()).slice(-2) + ":" + ('0' + this.getMinutes()).slice(-2));
            }

            return strDateTime;
        }

        return date;
    }

    return value;
}

//dateTimeReviver: Hàm duyệt qua tất cả các property của object và parse về DateTime nếu có thể
GLOBAL.utils.tryParseDateInObject = function (obj) {
    /*
    Các hàm AJAX trên server trả về object có các prop datetime kiểu Json Date(number).
    Hàm này có nhiệm vụ duyệt qua các prop trong object để parse về kiểu DateTime
    */
    if (typeof obj === "object") {
        for (var prop in obj) {
            obj[prop] = GLOBAL.utils.tryParseDateInObject(obj[prop]);
        }
        return obj;
    } else {
        return GLOBAL.utils.dateTimeReviver(obj);
    }
}

//InitDataSelect2: Khởi tạo control select2
GLOBAL.utils.InitDataSelect2 = function (dom) {
    //select2 select2-autobind Config:
    //data-auto-bind: Name of property in collection DanhMuc
    //data-value-field: Value field
    //data-display-field: Display field
    //data-display-default: --Chọn abc---
    //data-default-select: default select
    //data-current-user: current user
    var me = this;
    var maxInterval = 200; //20s
    var countInterval = 0;
    if (dom && dom.getAttribute('data-auto-bind')) {
        var interval = setInterval(function () { //<= set tạm vì không biết khi nào load xong DanhMuc
            var danhMucs = localDB.getCollection("DanhMuc");
            var domAttribute = dom.getAttribute('data-auto-bind');
            var domType = dom.getAttribute('data-type');
            var options;
            if (danhMucs != null) {
                if (danhMucs.data && danhMucs.data.length > 0 && danhMucs.data[0] && danhMucs.data[0].value) {
                    options = danhMucs.data[0].value[domAttribute];
                }
                else {
                    console.log(dom.getAttribute('data-auto-bind') + " not found in collection DanhMuc")
                }
                clearInterval(interval);
                if (options != null) {
                    if (GLOBAL.CurrentUser && domAttribute === 'huyens') {
                        options = options.filter(function (item) {
                            if (GLOBAL.CurrentUser && GLOBAL.CurrentUser.Tinh) {
                                return item.tinhId == GLOBAL.CurrentUser.Tinh.tinhId;
                            }
                            else {
                                return false;
                            }
                        }).map(function (item) {
                            return {
                                id: item[dom.getAttribute('data-value-field')],
                                text: item[dom.getAttribute('data-display-field')]
                            }
                        });
                    }
                    else if (domAttribute === 'loaiBienDongs' && domType === 'chuyenQuyen') {
                        var optionsChuyenQuyen = options.filter(chuyenquyen => chuyenquyen.laBienDongChuyenQuyen === true);
                        options = optionsChuyenQuyen.map(function (item) {
                            return {
                                id: item[dom.getAttribute('data-value-field')],
                                text: item[dom.getAttribute('data-display-field')]
                            }
                        });
                    }
                    else {
                        options = options.map(function (item) {
                            return {
                                id: item[dom.getAttribute('data-value-field')],
                                text: item[dom.getAttribute('data-display-field')]
                            }
                        });
                    }
                }
                else {
                    options = [];
                }

                var defaultDispay = dom.getAttribute('data-display-default');
                if (defaultDispay != null && defaultDispay != "") {
                    options.unshift({
                        id: 0,
                        text: defaultDispay
                    })
                }
                //$(dom).select2('destroy');
                $(dom).select2({
                    dropdownCssClass: "dynamic-select2", allowClear: false, width: "100%",
                    data: options
                });

                var defaultValue = dom.getAttribute("data-default-select");
                if (GLOBAL.CurrentUser && (domAttribute === 'tinhs' || domAttribute === 'huyens' || domAttribute === 'xas') && dom.getAttribute("data-allow-default-select") === "1") {
                    if (domAttribute === 'tinhs' && GLOBAL.CurrentUser.Tinh && GLOBAL.CurrentUser.Tinh.tinhId > 0) {
                        defaultValue = GLOBAL.CurrentUser.Tinh.tinhId;
                    }
                    else if (domAttribute === 'huyens' && GLOBAL.CurrentUser.Huyen && GLOBAL.CurrentUser.Huyen.huyenId > 0) {
                        defaultValue = GLOBAL.CurrentUser.Huyen.huyenId;
                    }
                }
                if (defaultValue) {
                    $(dom).val(defaultValue).trigger('change');
                }
                else {
                    $(dom).trigger('change');
                }
            }
            else {
                countInterval++;

                if (countInterval === maxInterval) {
                    clearInterval(interval);

                    console.log("DanhMuc colection could't load");
                }
            }
        }, 100);

    }
}

//chuyển mảng thành vòng lặp để lấy giá trị lần lượt hoặc ngẫu nhiên next, prev, cur và ran
GLOBAL.utils.loopArr = function (arr, options) {
    var settings = $.extend({
        loop: false
    }, options);
    var cur = 0;
    arr.next = (function () { return (++cur >= this.length) ? (settings.loop ? this[0] : false) : this[cur]; });
    arr.prev = (function () { return (--cur < 0) ? false : this[cur]; });
    arr.cur = (function () { return this[cur]; });
    arr.ran = (function () { return this[Math.floor(Math.random() * this.length)]; });
    return arr;
}

//convertFileUploadToBase64String: Chuyển file upload sang chuỗi base64
GLOBAL.utils.convertFileUploadToBase64String = function (file, callback) {
    var reader = new FileReader();
    reader.onload = function () {
        var strBase64 = this.result.split("base64,")[1];
        if (callback) {
            callback(strBase64);
        }
    }
    if (file) {
        reader.readAsDataURL(file);
    }
    else {
        callback();
    }
}

// #region Thư viện CRUD offline
GLOBAL.utils.checkLocalExist = function (collectionName) {
    if (localDB.getCollection(collectionName) === null) {
        return false;
    } else {
        return true;
    }
}

GLOBAL.utils.saveToLocal = function (collectionName, docData) {
    var collection = localDB.getCollection(collectionName);
    if (collection === null) {
        collection = localDB.addCollection(collectionName);
    }
    collection.clear({ removeIndices: true });
    var doc = collection.insert(docData);
    try {
        collection.update(doc);
    } catch (err) {
        alertify.warning("tl", err);
    }
}

GLOBAL.utils.getFromLocal = function (collectionName) {
    return VBDLISLocalDB.getData();
    //return localDB.getCollection(collectionName).data[0];
}

//setTmpId: Hàm tự động chèn thêm _id là số tăng dần vào từng phần tử của mảng để các module dễ xử lý
GLOBAL.utils.setTmpId = function (obj) {
    if (obj != null) {
        if (obj instanceof Array) {
            for (let i = 0; i < obj.length; i++) {
                if (obj[i]) {
                    obj[i]._id = i + 1;
                    GLOBAL.utils.setTmpId(obj[i]);
                }
            }
        }
        else if (obj instanceof Object) {
            for (let prop in obj) {
                GLOBAL.utils.setTmpId(obj[prop]);
            }
        }
    }
};
// #endregion

//reset input trong form, ví dụ: GLOBAL.utils.clearChildrenByType(document.getElementById("processChuSuDung"));
GLOBAL.utils.clearChildrenByType = function (element) {
    for (var i = 0; i < element.childNodes.length; i++) {
        var e = element.childNodes[i];
        if (e.tagName) switch (e.tagName.toLowerCase()) {
            case "input":
                switch (e.type) {
                    case "radio":
                    case "checkbox": e.checked = false; break;
                    case "button":
                    case "submit":
                    case "image": break;
                    default: e.value = ""; break;
                }
                break;
            case "select": e.selectedIndex = 0; break;
            case "textarea": e.value = ""; break;
            default: GLOBAL.utils.clearChildrenByType(e);
        }
    }
}

//reset select2 trong form, ví dụ GLOBAL.utils.clearChildrenSelect2ById("ddlQuanHuyen")
GLOBAL.utils.clearChildrenSelect2ById = function (id) {
    $("#" + id).val("0").change();
}

//canh giữa modals
GLOBAL.utils.centerModal = function () {
    $(".modal.in").each(function (index, value) {
        var $dialog = $(this).find(".modal-dialog.modal-center"),
            offset = ($(window).height() - $dialog.height()) / 2;
        if (offset >= 0 && offset <= 20) {
            $(this).css("top", "auto");
        } else {
            $(this).css("top", 0);
        }
        if (offset < 0) {
            offset = 0;
        }
        $dialog.css("margin-top", Math.floor(offset));
        $dialog.css("margin-bottom", 0);
    });
    $(".container table").css({ "width": "100%" });
}

//đóng tất cả modal đang mở
GLOBAL.utils.closeAllModal = function () {
    $(".modal.in").each(function (index, value) {
        $(this).modal("hide");
    });
}

//GLOBAL.utils.pulsate
GLOBAL.utils.pulsate = function (id) {
    $(id).pulsate({
        color: "#bf1c56", // set the color of the pulse
        reach: 20,                              // how far the pulse goes in px
        speed: 1000,                            // how long one pulse takes in ms
        pause: 0,                               // how long the pause between pulses is in ms
        glow: true,                             // if the glow should be shown too
        repeat: 3,                           // will repeat forever if true, if given a number will repeat for that many times
        onHover: false                          // if true only GLOBAL.utils.pulsate if user hovers over the element
    });
}

//Loading rotatingPlanem, wave, wanderingCubes, spinner, chasingDots, threeBounce, circle, cubeGrid, fadingCircle, foldingCube
GLOBAL.utils.loading = function (show, messsage) {
    if (show) {
        messsage = messsage || "Đang xử lý...";

        $("body").loadingModal({
            position: "auto",
            text: "<b>" + messsage + "</b>",
            color: "white",
            opacity: "0",
            backgroundColor: "transparent",
            animation: "fadingCircle"
        });
    }
    else {
        $("body").loadingModal("destroy");
    }
}

//Xử lý ajax error
GLOBAL.utils.onError = function (xhr, errorType, exception) {
    GLOBAL.utils.loading(false);
    var responseText;
    var showText = "";
    try {
        if (GLOBAL.utils.isJson(xhr.responseText)) {
            responseText = JSON.parse(xhr.responseText);

            showText += "<div><div><b>" + errorType + " " + exception + "</b></div>";
            showText += "<div><u>Exception</u>:<br /><br />" + responseText.ExceptionType + "</div>";
            showText += "<div><u>StackTrace</u>:<br /><br />" + responseText.StackTrace + "</div>";
            showText += "<div><u>Message</u>:<br /><br />" + responseText.Message + "</div></div>";
        }
        else {
            showText = exception;
        }

      
    } catch (e) {
        responseText = xhr.responseText.replace(".7em", "13px").replace("<pre>", "").replace("</pre>", "");
        showText = responseText;
    }

    GLOBAL.utils.showMessage.show({ msg: showText, icon: GLOBAL.utils.showMessage.UNSUCCESS, title: "Thông báo lỗi", ajaxErr: true });
}

//lọc mảng thành các phần tử độc nhất
GLOBAL.utils.removeDupplicateObjectInArray = function (array, prop) {
    var n, y, x, i, result;
    result = [];
    o: for (i = 0, n = array.length; i < n; i++) {

        for (x = 0, y = result.length; x < y; x++) {

            if (GLOBAL.utils.isObjectDontChange(result[x][prop], array[i][prop])) {
                continue o;
            }
        }
        result.push(array[i]);
    }
    return result;
}

//so sánh 2 object bằng nhau hay không - nếu thay đổi thì return true
GLOBAL.utils.isObjectDontChange = function (a, b) {
    if (a == b) {
        return true;
    }
    if (a == null ||
        typeof a != "object" ||
        b == null ||
        typeof b != "object") {
        return false;
    }
    var propsInA = 0;
    var propsInB = 0;
    var lstPropsA=[];
    var lstPropsB=[];
    for (var prop in a) {
        if (a[prop] && prop != "_id" && a[prop] !== '0'){
            propsInA += 1;
            lstPropsA.push(prop);
        }
    }
    for (var prop in b) {
        if (b[prop] && prop != "_id" && b[prop] !== '0') {
            propsInB += 1;
            lstPropsB.push(prop);
            if (!(prop in a) || (!(a[prop] instanceof Function) && !(b[prop] instanceof Function) && !GLOBAL.utils.isObjectDontChange(a[prop], b[prop])))
            {
                return false;
            }
        }
    }
    return propsInA == propsInB;
}

//Chỉ sử dụng cho những object không có thuộc tính con là object
GLOBAL.utils.isObjectDontChangeByAInfo = function (a, b) {
    if (a == b || GLOBAL.utils.dateTimeReviver(a) == GLOBAL.utils.dateTimeReviver(b)) {
        return true;
    }
    if(typeof a != "object" && String(a) == String(b))
    {
        return true;
    }
    if (a == null ||
        typeof a != "object" ||
        b == null ||
        typeof b != "object") {
        return false;
    }
    var lstPropsA=[];
    var lstPropsB=[];
    for (var prop in a) {
        if (!(prop in a) || (!(a[prop] instanceof Function) && !(b[prop] instanceof Function) && !GLOBAL.utils.isObjectDontChangeByAInfo(a[prop], b[prop])))
        {
            return false;
        }
    }
    return true;
}

// Convert array to object
GLOBAL.utils.convertToObj = function (array) {
    var thisEleObj = new Object();
    if (typeof array === "object") {
        for (var i in array) {
            var thisEle;
            thisEle = GLOBAL.utils.convertToObj(array[i]);
            if (!IsEmpty(thisEle)) {
                thisEleObj[i] = thisEle;
            }
            else {
                thisEleObj[i] = null;
            }
        }
    } else {
        thisEleObj = array;
    }
    return thisEleObj;
}

//chuyển tiếng việt có dấu thành không dấu
GLOBAL.utils.convertToEn = function (inputString, options) {
    var settings = $.extend({
        lower: false,
        removespaces: false
    }, options);
    var outputString = '';
    if (inputString) {
        outputString = inputString;
        if (settings.lower) {
            outputString = outputString.toLowerCase();
        }
        // In thường
        outputString = outputString.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        outputString = outputString.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        outputString = outputString.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        outputString = outputString.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        outputString = outputString.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        outputString = outputString.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        outputString = outputString.replace(/đ/g, "d");
        // In hoa
        outputString = outputString.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Á|Ậ|Ẩ|Ẫ|Ă|Ằ|Á|Ặ|Ẳ|Ẵ/g, "A");
        outputString = outputString.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        outputString = outputString.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        outputString = outputString.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        outputString = outputString.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        outputString = outputString.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        outputString = outputString.replace(/Đ/g, "D");
        if (settings.removespaces) {
            outputString = outputString.replace(/\s/g, "");
        }
    }
    return outputString; // Trả về chuỗi đã chuyển
}

//Check string có phải GUID hay không
GLOBAL.utils.isGuid = function (stringToTest) {
    if (stringToTest[0] === "{") {
        stringToTest = stringToTest.substring(1, stringToTest.length - 1);
    }
    var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
    return regexGuid.test(stringToTest);
}

/*
    function getControlMaxTabIndex, getControlMinTabIndex
    chỉ sử dụng khi form được đánh số Tabindex theo thứ tự tăng dần và không bị trùng
*/
GLOBAL.utils.getControlMaxTabIndex = function (jObject) {

    var controls = jObject.find("[tabindex]");

    var max = -1;
    var _index = 0;

    if (controls && controls.length > 0) {
        $.each(controls, function (index, item) {
            var tabIndex = parseInt(item.getAttribute("tabindex")) || 0;

            if (tabIndex > max) {
                max = tabIndex;
                _index = index;
            }
        });

        return $(controls[_index]);
    }

    return null;
}

GLOBAL.utils.getControlMinTabIndex = function (jObject) {

    var controls = jObject.find("[tabindex]");

    var min = -1;
    var _index = 0;

    if (controls && controls.length > 0) {
        $.each(controls, function (index, item) {
            var tabIndex = parseInt(item.getAttribute("tabindex")) || 0;

            if (tabIndex < min) {
                min = tabIndex;
                _index = index;
            }
        });

        return $(controls[_index]);
    }

    return null;
}

GLOBAL.utils.setAttrFocusTovModule = function (vModule) {
    var getControlMaxTabIndex = GLOBAL.utils.getControlMaxTabIndex(vModule);
    var getControlMinTabIndex = GLOBAL.utils.getControlMinTabIndex(vModule);
    if (getControlMinTabIndex && getControlMaxTabIndex) {
        getControlMaxTabIndex.on("focusout", function () {
            getControlMinTabIndex.focus();
        });
    }
}

GLOBAL.utils.log = function (msg, type, args) { //type: log/error
    let writeLog = true;

    if (writeLog) {
        type = type || 'log';

        if (typeof (console[type]) === "function") {
            console[type](msg, args);
        }
    }
}
//toggle ẩn hiện onclick="toggle('.tach-tu-dong', this)"
var toggle = function (className, obj) {
    var $input = $(obj);
    if ($input.prop('checked')) $(className).show();
    else $(className).hide();
}

//làm tròn
var round = function (value, precision, isRound) {
    var multiplier = Math.pow(10, precision || 0)
    if (isRound)
        return Math.round(value * multiplier) / multiplier;
    return Math.floor(value * multiplier) / multiplier;
}

//kiểm tra mảng có chứa object không
GLOBAL.utils.isArrayContainObject = function (array, object, options = { position: false }) {
    var isContain = false;
    var objPos;
    $.each(array, function (indexInArray, valueOfElement) {
        if (GLOBAL.utils.isObjectDontChange(valueOfElement, object)) {
            isContain = true;
            objPos = indexInArray;
            return false;
        }
    });
    if (options.position === true) {
        if (isContain) {
            return objPos;
        } else {
            return isContain;
        }
    } else {
        return isContain;
    }
}

//kiểm tra object chứa array rỗng
GLOBAL.utils.isObjectContainEmptyArray = function (obj) {
    var checkEmpty = true;
    for (key in obj) {
        if (obj[key].length > 0) {
            checkEmpty = false;
        }
    }
    return checkEmpty;
}

//cấu hình mặc định hiện popover cho form validation
GLOBAL.utils.formValidationErrorPlacement = function (error, element) {
    var _popover;
    _popover = $(element).popover({
        trigger: "manual",
        placement: "auto",
        container: "body",
        animation: false,
        content: $(error).text(),
        template: "<div class='popover'><div class='arrow'></div><div class='popover-inner'><div class='popover-content'><p></p></div></div></div>"
    });
    $(element).popover("show");
    return setTimeout(function () { $(element).popover("hide"); }, 2000);
}

//xử lý kết quả ajax trả về
GLOBAL.utils.processAjaxResult = function (dataORjqXHR, textStatus, jqXHRORerrorThrown, callback, options) {
    var data;
    switch (textStatus) {
        case 'success':
            GLOBAL.isAjaxFailed = false;
            if (options) {
                switch (options.requestType) {
                    case 'script':
                        GLOBAL.waitAll++;
                        if (typeof VBDLIS.VModule.VModuleJsLoader[options.fnLoad] === 'function') {
                            VBDLIS.VModule.VModuleJsLoader[options.fnLoad]($(options.script));
                        }
                        break;
                    case 'form':
                        var dom = $(dataORjqXHR);
                        dom.each(function (idx, item) {
                            item = $(item);

                            if (item.hasClass('VModule')) {
                                item.data('hoSoTiepNhan', options.hoSoTiepNhan);
                            }

                            item.find('.VModule').data('hoSoTiepNhan', options.hoSoTiepNhan);
                        });


                        if (options.vModule && options.vModule.VModuleId) {
                            GLOBAL.utils.bindScriptsDynamic(dom, function () {
                                $("#mdlRemoteFormBody-" + options.vModule.VModuleId).html('').append(dom);
                            });
                            $("#mdlRemoteFormBody-" + options.vModule.VModuleId).find(".modal").appendTo($("#dvModalContainer"));
                            dom.find(".modal").appendTo($("#dvModalContainer"));
                        } else if (options.GroupData == 'SoDiaChinh') {
                            $("#divShowSoDiaChinh").html('').append(dom);
                        }
                        else {
                            GLOBAL.utils.bindScriptsDynamic(dom, function () {
                                $("#mdlRemoteForm").modal('show');
                            }, function () {
                                $("#mdlRemoteFormBody").html('').append(dom);
                            });
                            $("#mdlRemoteFormBody").find(".modal").appendTo($("#dvModalContainer"));
                            dom.find(".modal").appendTo($("#dvModalContainer"));
                        }
                        break;
                    case 'danhmuc':
                        if (dataORjqXHR && dataORjqXHR.success && dataORjqXHR.success === true) {
                            if (dataORjqXHR.version !== options.localVersion) {
                                GLOBAL.utils.saveToLocal('DanhMuc', dataORjqXHR);
                            }
                        } else {
                            GLOBAL.utils.showMessage.show({ msg: "Không lấy được danh mục. " + dataORjqXHR.value, icon: GLOBAL.utils.showMessage.UNSUCCESS });
                        }
                        break;
                }
            }
            else {
                data = GLOBAL.utils.tryParseDateInObject(dataORjqXHR);
            }
            break;
        case 'error':
        case 'timeout':
        case 'abort':
        case null:
            GLOBAL.isAjaxFailed = true;
            GLOBAL.utils.onError(dataORjqXHR, textStatus, jqXHRORerrorThrown);
            return;
            break;
        case 'parsererror':
        default:
            GLOBAL.isAjaxFailed = true;
            GLOBAL.utils.onError(dataORjqXHR, textStatus, jqXHRORerrorThrown);
            return;
    }
    if (options) {
        switch (options.requestType) {
            case 'script':
                if (GLOBAL.waitAll === options.scripts.length && typeof callback === 'function') {
                    callback();
                }
                break;
            case 'form':
            case 'danhmuc':
                if (typeof callback === 'function') {
                    callback();
                }
                break;
        }
    } else {
        if (dataORjqXHR && dataORjqXHR.success && dataORjqXHR.success === true) {
            if (typeof callback === 'function') {
                callback(data);
            }
        }
        else {
            let mesage = "Lỗi không xác định, vui lòng liên hệ với người quản trị";

            if (typeof (dataORjqXHR.Error) === 'string' && dataORjqXHR.Error != "") {
                mesage = dataORjqXHR.Error;
            }
            else if (typeof (dataORjqXHR.error) === 'string' && dataORjqXHR.error != "") {
                mesage = dataORjqXHR.error;
            }

            GLOBAL.utils.showMessage.show({
                title: "Thông báo lỗi",
                msg: mesage,
                icon: GLOBAL.utils.showMessage.ERROR,
                buttons: GLOBAL.utils.showMessage.OK
            })
        }
    }
}

//chuyển chuỗi ngày định dd/mm/yyyy sang ISO-8601
GLOBAL.utils.convertDateToISO8601 = function (dateString) {
    if (dateString) {
        darr = dateString.split("/");
        var dobj = new Date(parseFloat(darr[2]), parseFloat(darr[1]) - 1, parseFloat(darr[0]));
        return dobj.toISOString();
    } else {
        return null;
    }
}

//gộp nhiều mảng thành một
GLOBAL.utils.mergeArray = function (...args) {
    return [].concat(...args);
}

//gộp nhiều object thành một
GLOBAL.utils.mergeObject = function (...args) {
    return args.reduce(function (currentArg, nextArg) {
        var mergedObj = {};
        for (var key in currentArg) {
            mergedObj[key] = currentArg[key];
        }
        for (var key in nextArg) {
            mergedObj[key] = $.isNumeric(nextArg[key]) ? parseFloat(nextArg[key]) : nextArg[key];
        }
        return mergedObj;
    });
}

GLOBAL.utils.getBool = function (val) {
    return !!JSON.parse(String(val).toLowerCase());
}

//gộp nhiều object thành một, ưu tiên các field có giá trị và object sau
GLOBAL.utils.mergeObjectWithFilter = function (...args) {
    return args.reduce(function (currentArg, nextArg) {
        var mergedObj = {};
        for (var key in currentArg) {
            mergedObj[key] = currentArg[key];
        }
        for (var key in nextArg) {
            if (typeof (mergedObj[key]) == 'undefined' || mergedObj[key] == null) {
                mergedObj[key] = nextArg[key];
            } else if (nextArg[key] || nextArg[key] === 0 || nextArg[key] === false) {
                if (mergedObj[key] instanceof Date)
                    mergedObj[key] = GLOBAL.utils.dateTimeReviver2(nextArg[key]);
                else if (typeof (mergedObj[key]) === 'boolean')
                    mergedObj[key] = GLOBAL.utils.getBool(nextArg[key]);
                else if (typeof (mergedObj[key]) === 'string')
                    mergedObj[key] = nextArg[key];
                else if (typeof (mergedObj[key]) === 'number')
                    mergedObj[key] = $.isNumeric(nextArg[key]) ? parseFloat(nextArg[key]) : nextArg[key];
                else if (typeof (mergedObj[key]) === 'function')
                    mergedObj[key] = nextArg[key];
                else if (typeof (mergedObj[key]) === 'object')
                    mergedObj[key] = GLOBAL.utils.mergeObjectWithFilter(mergedObj[key], nextArg[key]);
                else
                    mergedObj[key] = nextArg[key];
            }
        }
        return mergedObj;
    });
}

GLOBAL.utils.tryParseDateInObject2 = function (obj) {
    if (typeof obj === "object") {
        for (var prop in obj) {
            obj[prop] = GLOBAL.utils.tryParseDateInObject2(obj[prop]);
        }
        return obj;
    } else {
        return GLOBAL.utils.dateTimeReviver2(obj);
    }
}

GLOBAL.utils.dateTimeReviver2 = function (value) {
    var date;
    if (typeof value === 'string' && !$.isNumeric(value)) {
        var jsonDate = /\/Date\((-*\d*)\)\//.exec(value);
        var isoDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/.exec(value);

        var strDate = /(\d{2})\/(\d{2})\/(\d{4})/.exec(value);

        if (jsonDate) {
            date = new Date(+jsonDate[1]);
        } else if (isoDate) {
            date = new Date(value);
        } else if (strDate) {
            date = new Date(value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
        }
    }
    else if (value instanceof Date) {
        date = value;
    }

    if (date instanceof Date) {
        date.toString = function (detail) {
            var strDateTime = ('0' + this.getDate()).slice(-2) + '/' + ('0' + (this.getMonth() + 1)).slice(-2) + '/' + ("000" + this.getFullYear()).slice(-4);
            if (detail) {
                strDateTime += (" " + ('0' + this.getHours()).slice(-2) + ":" + ('0' + this.getMinutes()).slice(-2));
            }

            return strDateTime;
        }

        return date;
    }

    return value;
}

//clone object
GLOBAL.utils.cloneObject = function (obj)
{
    let cloneObject = $.extend(true, $.isArray(obj) ? [] : {}, obj);

    return GLOBAL.utils.tryParseDateInObject(cloneObject);
}

//khóa các element
GLOBAL.utils.blockElements = function (parentElement, listElements) {
    if (listElements) {
        $.each(listElements, function (indexInArray, valueOfElement) {
            parentElement.find(valueOfElement).attr('disabled', true);
        });
    }
    else {
        $(parentElement.find('a, button')).each(function (index, element) {
            if ($(this).attr('data-toggle')) {
                $(this).removeAttr('data-toggle');
            }
            //$(this).off('click');
            $(this).attr('disabled', true);
        });
        parentElement.find('input, select, textarea, .treeControl').attr('disabled', true);
    }
}

//mở khóa các element
GLOBAL.utils.unblockElements = function (parentElement, listElements) {
    $.each(listElements, function (indexInArray, valueOfElement) {
        parentElement.find("[name='" + valueOfElement + "']").attr('disabled', false);
    });
}

//kiểm tra chuỗi JSON hợp lệ
GLOBAL.utils.isJson = function (item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;
    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }
    if (typeof item === "object" && item !== null) {
        return true;
    }
    return false;
}

//thêm số 0 vào chuỗi number
GLOBAL.utils.addZeroToNum = function (str, max) {
    str = str.toString();
    return str.length < max ? GLOBAL.utils.addZeroToNum("0" + str, max) : str;
}

//xử lý collapse
GLOBAL.utils.switchBindButton = function (element, mode) {
    var currentBtnChiTiet = element.find('[id^="btnTraCuu"]');
    var currentPanel = element.closest('.panel');
    if (element.prop('id').startsWith('dvTraCuu')) {
        currentBtnChiTiet[(mode === 'show' ? 'add' : 'remove') + 'Class']('BindButton');
        if (currentPanel.length > 0) {
            $('[id^="btnTraCuu"]').filter(function () {
                return element.closest(currentPanel).length === 1;
            }).not(currentBtnChiTiet)[(mode === 'show' ? 'remove' : 'add') + 'Class']('BindButton');
        } else {
            var currentDv = element;
            $('[id^="btnTraCuu"]').filter(function () {
                return element.closest(currentDv).length === 0;
            })[(mode === 'show' ? 'remove' : 'add') + 'Class']('BindButton');
        }
    }
}

//lấy ngày(giờ) hiện tại
GLOBAL.utils.getCurrentDate = function (options = { time: false }) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        var month = '0' + month;
    }
    if (day.toString().length == 1) {
        var day = '0' + day;
    }
    if (hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        var second = '0' + second;
    }
    var dateTime;
    if (options.time) {
        dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
    } else {
        dateTime = day + '/' + month + '/' + year;
    }
    return dateTime;
}

GLOBAL.utils.getNewGuid = function () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

// #endregion


GLOBAL.utils.redirectPost = function (location, args) {
    location = GLOBAL.linkRoot + location;
    var form = $("<form target='_blank' method='POST' tyle='display:none;'></form>").attr({
        action: location
    });
    $.each(args, function (key, value) {
        form.append('<input type="hidden" name="' + key + '" value="' + value + '">');
    });
    form.appendTo(document.body);
    form.submit();
    form.remove();
    return false;
}

var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

GLOBAL.utils.createGuid = function () {
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

/**
 * Notifications
 */
var Notification = function () { };

//simple notificaiton
Notification.prototype.notify = function (style, position, title, text) {
    var icon = 'fa fa-adjust';
    if (style == "error") {
        icon = "fa fa-exclamation";
    } else if (style == "warning") {
        icon = "fa fa-warning";
    } else if (style == "success") {
        icon = "fa fa-check";
    } else if (style == "custom") {
        icon = "md md-album";
    } else if (style == "info") {
        icon = "fa fa-question";
    } else {
        icon = "fa fa-adjust";
    }
    $.notify({
        title: title,
        text: text,
        image: "<i class='" + icon + "'></i>"
    }, {
        style: 'metro',
        className: style,
        globalPosition: position,
        showAnimation: "show",
        showDuration: 0,
        hideDuration: 0,
        autoHide: true,
        clickToHide: true
    });
};

//auto hide notification
Notification.prototype.autoHideNotify = function (style, position, title, text) {
    var icon = "fa fa-adjust";
    if (style == "error") {
        icon = "fa fa-exclamation";
    } else if (style == "warning") {
        icon = "fa fa-warning";
    } else if (style == "success") {
        icon = "fa fa-check";
    } else if (style == "custom") {
        icon = "md md-album";
    } else if (style == "info") {
        icon = "fa fa-question";
    } else {
        icon = "fa fa-adjust";
    }
    $.notify({
        title: title,
        text: text,
        image: "<i class='" + icon + "'></i>"
    }, {
        style: 'metro',
        className: style,
        globalPosition: position,
        showAnimation: "show",
        showDuration: 0,
        hideDuration: 0,
        autoHideDelay: 5000,
        autoHide: true,
        clickToHide: true
    });
};
//confirmation notification
Notification.prototype.confirm = function (style, position, title) {
    var icon = "fa fa-adjust";
    if (style == "error") {
        icon = "fa fa-exclamation";
    } else if (style == "warning") {
        icon = "fa fa-warning";
    } else if (style == "success") {
        icon = "fa fa-check";
    } else if (style == "custom") {
        icon = "md md-album";
    } else if (style == "info") {
        icon = "fa fa-question";
    } else {
        icon = "fa fa-adjust";
    }
    $.notify({
        title: title,
        text: 'Are you sure you want to do nothing?<div class="clearfix"></div><br><a class="btn btn-sm btn-white yes">Yes</a> <a class="btn btn-sm btn-danger no">No</a>',
        image: "<i class='" + icon + "'></i>"
    }, {
        style: 'metro',
        className: style,
        globalPosition: position,
        showAnimation: "show",
        showDuration: 0,
        hideDuration: 0,
        autoHide: false,
        clickToHide: false
    });
    //listen for click events from this style
    $(document).on('click', '.notifyjs-metro-base .no', function () {
        //programmatically trigger propogating hide event
        $(this).trigger('notify-hide');
    });
    $(document).on('click', '.notifyjs-metro-base .yes', function () {
        //show button text
        alert($(this).text() + " clicked!");
        //hide notification
        $(this).trigger('notify-hide');
    });
};
//init - examples
Notification.prototype.init = function () {

};
//init
$.Notification = new Notification, $.Notification.Constructor = Notification;

//cấu hình alertify
//alertify.[default,info,warning,error,success]("[tl,tr,tc,bl,br]", message)
var alertify = function () {
    
    function AlertifyNotify(type, pos, mes) {
        var msgtitle = "";
        switch (pos) {
            case "tc":
                pos = "top center";
                break;
            case "tl":
                pos = "top left";
                break;
            case "tr":
                pos = "top right";
                break;
            case "bl":
                pos = "bottom left";
                break;
            case "br":
                pos = "bottom right";
                break;
        }
        switch (type) {
            case "default":
                msgtitle = "Thông báo";
                break;
            case "info":
                msgtitle = "Thông tin";
                break;
            case "warning":
                msgtitle = "Cảnh báo";
                break;
            case "error":
                msgtitle = "Không thành công";
                break;
            case "success":
                msgtitle = "Thành công";
                break;
        }
        $.Notification.notify(type, pos, msgtitle, mes);
    }
    return {
        default: function (pos, mes) {
            AlertifyNotify("white", pos, mes);
        },
        info: function (pos, mes) {
            AlertifyNotify("info", pos, mes);
        },
        warning: function (pos, mes) {
            AlertifyNotify("warning", pos, mes);
        },
        error: function (pos, mes) {
            AlertifyNotify("error", pos, mes);
        },
        success: function (pos, mes) {
            AlertifyNotify("success", pos, mes);
        }
    };
}();
// #endregion

// #region self invoked anonymous functions with a parameter called "$"
(function ($) {

    //$('<b>').data('x', 1).filterByData('x', 1).length    // output: 1
    //$('<b>').data('x', 1).filterByData('x').length       // output: 1
    $.fn.filterByData = function (prop, val) {
        var $self = this;
        if (typeof val === 'undefined') {
            return $self.filter(
                function () { return typeof $(this).data(prop) !== 'undefined'; }
            );
        }
        return $self.filter(
            function () { return $(this).data(prop) === val; }
        );
    };

    //Vô hiệu hóa modal khi xử lý
    $.fn.mask = function (text) {

        if (!text) {
            text = "Đang tải...";
        }

        var spanMsg = $("<span class='x-mask-msg' style='position: absolute;background-color: #e5e5e5'><i class='fa fa-spin fa-spinner'></i> " + text + "</span>");
        var divStyle = "text-align: center;z-index: 100;position: absolute;width: 100%;height: 100%;zoom: 1;background: white;opacity: .7;left: 0; top: 0";
        var mask = $("<div class='x-mask' style='" + divStyle + "'></div>").append(spanMsg);

        var resizeContent = function () {
            var height = mask.height();
            var msgHeight = spanMsg.height();

            var marginTopMsg = Math.floor(height / 2) - Math.floor(msgHeight / 2);

            spanMsg.css("margin-top", marginTopMsg + "px");
        };

        this.append(mask);

        resizeContent();
    };

    //Bỏ vô hiệu hóa modal khi xử lý
    $.fn.unmask = function () {
        this.find(".x-mask").remove();
    };

})($);
// #endregion

// #region events listener

//bind nút enter
$(document).on("keyup", function (event) {
    if (event.keyCode === 13) {
        $(this).find(".FormSearchButton").click();
    }
});

//bind tabs events
$("a[data-toggle='tab']").on("shown.bs.tab", function (e) {
    $(e.target).closest(".modal").find("#btnAutoFocus").focus();
});

$(document).ajaxStart(function () {
    if (GLOBAL.showLoadingEnable) {
        GLOBAL.utils.loading(true);
    }
});

$(document).ajaxStop(function () {
    GLOBAL.utils.loading(false);
    GLOBAL.showLoadingEnable = true;
});

String.prototype.firstCharToUpper = function () {
    if (this == null) return "";

    return this.split(" ").map(t => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()).join(" ");
}
// #endregion