/**
 * Created by thomaf on 29/05/2015.
 */
(function (){
	'use strict';
	angular
		.module('app')
		.controller('MainController', MainController);

	/* @ngInject */
	function MainController($scope) {
		var vm = this;
		vm.activate = activate;
		vm.title = 'MainController';
		activate();

		function activate() {
			vm.barbe = "lunette";
		}
	}
})();
