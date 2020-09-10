const moment = require('moment');
const e = require('express');
var isData = false;
function createModel(sheet) {
	var model = {};

	Object.keys(sheet).forEach((key) => {
		Object.keys(sheet[key]).forEach((index) => {
			for (var i = 0; i < 26; i++) {
				if (
					sheet[key][index][alphabet(i)] === 'Opening Balance' ||
					sheet[key][index][alphabet(i)] === 'Saldo Inicial'
				) {
					const model_version =
						sheet[key][index][alphabet(i)] === 'Opening Balance'
							? 'eng-US'
							: 'pt-BR';
					model[key] = {};
					for (var j = 0; j < 26; j++) {
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


	return model;
}

function populateJson(model, sheets) { 
  var result = {} ;
  Object.keys(sheets).forEach( sheet => { 
    Object.keys(sheets[sheet]).forEach( row => { 
      result[row] = {};  
      Object.keys(model['TB Movimento']).forEach( (header,index) => { 
        result[row][header] = sheets[sheet][row][alphabet(index)]
      }) 

      if (!result[row]['TYPE'] || result[row]['TYPE'] === 'TYPE')
        delete result[row]; 
      
    } )
  });
  result.last_update = moment().toISOString()
  return result; 
}

function aprioriModel(sheet) {
	delete sheet['Balance Sheet'];
	const model = createModel(sheet);
  // console.log(model);
  populateJson(model, sheet); 
  return populateJson(model, sheet); ; 
	// return populateJson(sheet, model);
}

function alphabet(n) {
	return `${(n + 10).toString(36).toUpperCase()}`;
}

module.exports = {
	aprioriModel,
};
