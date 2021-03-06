const moment = require('moment');

//modelo 1 dados em ingles e os em portugues
 /**
 * @summary Modelo 1 para apriori, converte o json recebido em um JSON com os dados em chaves corretas 
 * @param {object} sheet json da planilha a ser convertida em dados importaveis para a plataforma 
 * @type {sheet} object
 * @returns JSON com as chaves corretas de cada dado 
 */
function aprioriModel(sheet) {
	delete sheet['Balance Sheet'];
	const model = createModel(sheet);
  return populateJson(model, sheet); ; 
}

/**
 * @summary function to generate a model from a sheet
 * @param {planilha} sheet - json 
 * @retunrs JSON - model from a sheet
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
					for (var j = 0; j < 26; j++) {
						if (sheet[key][index][alphabet(i)] === 'Saldo Inicial' && j === 0) { 
							model[key]['Tipo'] = 'ASSETS'; 
							model.version = 'pt';
						} else if (sheet[key][index][alphabet(i)] === 'Opening Balance' && j === 0 ) { 
							model.version = 'eng';
						}
						if (sheet[key][index][alphabet(j)]) {
							if (!isNaN(sheet[key][index][alphabet(j)])) {
								model[key][
									moment(sheet[key][index][alphabet(j)]).format('MM/YYYY')
								] = sheet[key][index + 1][alphabet(j)];
							} else {
								model[key][sheet[key][index][alphabet(j)]] =
									sheet[key][index + 1][alphabet(j)];
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
	var result = {} ;
  Object.keys(sheets).forEach( sheet => { 
    Object.keys(sheets[sheet]).forEach( row => { 
      result[row] = {};  
      Object.keys(model['TB Movimento']).forEach( (header,index) => { 
				result[row][header] = sheets[sheet][row][alphabet(index)]; 
				// console.log(row, header, sheets[sheet][row][alphabet(index)])
      }) 
			//apaga as linhas que nao sao de dados. 
      if (model.version == 'eng' && (!result[row]['TYPE'] || result[row]['TYPE'] === 'TYPE'))
				delete result[row]; 
				
			if (model.version == 'pt' && (!result[row]['CONTA'] || result[row]['CONTA'] === 'CONTA'))
				delete result[row];

				// console.log(model.version)
      
    } )
	});
  result.last_update = moment().toISOString()
  return result; 
}
/**
 * converte numeros em suas respectivas letras no alfabeto
 * @param {number} n integer 
 * @returns character 
 */
function alphabet( n) {
	return `${(n + 10).toString(36).toUpperCase()}`;
}

module.exports = {
	aprioriModel,
};
