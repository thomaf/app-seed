/**
 * Created by thomaf on 29/05/2015.
 */
(function(){
	'use strict';
	angular
		.module('app')
		.factory('mainService', mainService);

	/* @ngInject */
	function mainService($resource, apiConfiguration) {
		return $resource(apiConfiguration.url,
			{
				param:'@param'
			}
		);
	}
})();
