VModule.define("thembantin", {
	//Override function
	onInit: function (vModule) {
		let that = this;
	},
	listeners: function () {
		this.control
			({
				'thembantin': {
					afterrender: this.onAfterrender,
				},
			})
	},
	onAfterrender: function () {
		console.log("Thành công")
	}
	
})