/**
 * converte números em suas respectivas letras do alfabeto
 * @param {number} n integer
 * @returns character
 */
function alphabet(n) {
	return `${(n + 10).toString(36).toUpperCase()}`;
}
exports.alphabet = alphabet;
