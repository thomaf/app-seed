/**
 * Fonctions utiles sur les chaînes de caractère
 */
(function (root) {
	if (!root.__) {
		root.__ = {}
	}
	root.__.string = {
		filename: function filename(path) {
			return path.replace('\\', '/').split('/').pop();
		}
	}
})(window);