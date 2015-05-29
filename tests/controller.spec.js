
describe('controllers', function() {
	var scope, controller;

	beforeEach(module('motueka'));
	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		controller = $controller('MainController', {
			$scope: scope
		});
	}));

	it('should set "truc"', function() {
		expect(scope.truc).toBe("13");
	});
	
});