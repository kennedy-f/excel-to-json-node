const moment = require('moment');
const { alphabet } = require("../alphabet");
//modelo 1 dados em ingles e os em portugues
/**
 * @summary Modelo 1 para apriori, converte o json recebido em um JSON com os dados em chaves corretas
 * @param {object} sheet json da planilha a ser convertida em dados importaveis para a plataforma
 * @type {sheet} object
 * @returns JSON com as chaves corretas de cada dado
 */
function aprioriModel(sheet) {
	// console.log(sheet)
	delete sheet['Balance Sheet'];
	const model = createModel(sheet);
	return populateJson(model, sheet);
}

/**
 * @summary function to generate a model from a sheet
 * @param {planilha} sheet - json
 * @return JSON - model from a sheet
 */
function createModel(sheet) {
	var model = {};
	Object.keys(sheet).forEach((key) => {
		Object.keys(sheet[key]).forEach((index) => {
			for (var i = 0; i < 26; i++) {
				if (
					sheet[key][index][alphabet(i)] === 'Opening Balance' ||
					sheet[key][index][alphabet(i)] === 'Saldo Inicial'
				) {
					model[key] = {};
					console.log(sheet[key][index])
					for (var j = 0; j < 26; j++) {
						if (sheet[key][index][alphabet(i)] === 'Saldo Inicial' && j === 0) {
							model[key]['Tipo'] = 'ASSETS';
							model.version = 'pt';
						} else if (
							sheet[key][index][alphabet(i)] === 'Opening Balance' && j === 0
						) {
							model.version = 'eng';
						}
						if (sheet[key][index][alphabet(j)]) {
							if (!isNaN(sheet[key][index][alphabet(j)])) {
								model[key][
									moment(sheet[key][index][alphabet(j)]).format('MM/YYYY')
								] = sheet[key][index + 1][alphabet(j)];
							} else if (model[key][sheet[key][index][alphabet(j)]] ){
								model[key][sheet[key][index][`${alphabet(j)}_2`]] = sheet[key][index + 1][alphabet(j)];
							} else { 
								model[key][sheet[key][index][alphabet(j)]] = sheet[key][index + 1][alphabet(j)];
							}
						}
					}
				}
			}
		});
	});
	// console.log(model)
	return model;
}
/**
 *
 * @param {object} model modelo gerado para ser as chaves
 * @param {object} sheets planilha com os dados
 * @return JSON com os dados em suas devidas chaves.
 */
function populateJson(model, sheets) {
	var result = {};
	result.despreziveis = {}; //vai agrupar os dados que nao sabemos o que fazer no momento atual
	
	
	Object.keys(sheets).forEach((sheet) => {
		Object.keys(sheets[sheet]).forEach((row) => {
			result[row] = {};

			Object.keys(model['TB Movimento']).forEach((header, index) => {
			
				
				if ( result[row] && Object.keys(model['TB Movimento']).length === Object.keys(sheets[sheet][row]).length ) { // verifica se os tamanhos das tabelas e o tamanhos dos modelos
					result[row][header] = sheets[sheet][row][alphabet(index)];

				} else if (result[row] && Object.keys(sheets[sheet][row]).length > 10) {
					if (!result.despreziveis[row]) result['despreziveis'][row] = {}; //cria o objeto dos despreziveis
					result.despreziveis[row][header] = sheets[sheet][row][alphabet(index)];

				}

				if (result[row] && !isNaN(sheets[sheet][row][alphabet(index)]) && moment(sheets[sheet][row][alphabet(index)]).format('MM/YYYY') === header) // remove os dados que nao sabemos o que fazer 
					delete result[row];
					// console.log(result[row])
			});

			//apaga as linhas sem dados importantes
			if (result[row] && Object.keys(result[row]).length === 0) delete result[row];
		});
	});
	result.last_update = moment().toISOString();
	return result;
}
module.exports = {
	aprioriModel,
};
