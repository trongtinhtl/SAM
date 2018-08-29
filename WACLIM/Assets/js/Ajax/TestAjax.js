var TestAjax = {};

TestAjax.TestThanhVien = (callback) => {
	GLOBAL.callAjax('TestAjax/TestThanhVien',null, callback);
}

TestAjax.TestBanTin = (callback) => {
	GLOBAL.callAjax('TestAjax/TestBanTin', null , callback);
}