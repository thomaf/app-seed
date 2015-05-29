/**
 * Fonctions utiles autour du navigateur
 */
(function (root) {
	if (!root.__) {
		root.__ = {}
	}
	root.__.browser = {
		getLocationHash: function getLocationHash(key) {
			var exp = new RegExp(key + '=([0-9]+)', 'gi');
			var result = exp.exec(location.hash)
			if (result) {
				return result[1];
			} else {
				return false;
			}
		}
	}
})(window);