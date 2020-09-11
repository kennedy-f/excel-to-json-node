const apriori = require('./models/apriori');
module.exports = {

	/**
	 * @param {object} sheet json
	 * @returns JSON model
	 */
	jsonToModel(sheet) {
		var model;
		//Apriori
		if (sheet['TB Movimento']) {
			model = apriori.aprioriModel(sheet);
			return model;
		}
	},

	/**
	 * converte numeros em suas respectivas letras no alfabeto
	 * @param {number} n integer
	 * @returns character
	 */

	alphabet(n) {
		return `${(n + 10).toString(36).toUpperCase()}`;
	},
};
