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
							model[key]['last_update'] = Date.now();
							model['version'] = model_version;
						}
					}
				}
			}
		});
	});
	return model;
}

function setRow(model, row) {
  var result = {}; 
	Object.keys(model).forEach((sheet) => {
		Object.keys(model[sheet]).forEach((header) => {
      for ( var i = 0; i < 26; i++ ) { 
        // console.log(row[alphabet(i)])
        result[header] = row[alphabet(i)]
      }
    })
  });
  // console.log(result)
  return result;
}

function populateJson(sheets, model) {
	var populateModel = {};
	Object.keys(sheets).forEach((sheet) => {
		Object.keys(sheets[sheet]).forEach((key) => {
			headerRow(sheets[sheet][key]);
			if (isData) {
        result = setRow(model, sheets[sheet][key])
        populateModel = result
        // console.log(populateModel)
			}
		});
  });
  return populateModel; 
}

function headerRow(row) {
	for (var i = 0; i < 26; i++) {
		if (
			row[alphabet(i)] === 'Opening Balance' ||
			row[alphabet(i)] === 'Saldo Inicial'
		) {
			isData = true;
			return true;
		}
	}
}

function footerRow(row){ 
  for (var i = 0; i < 26; i++) {
		if (
			row[alphabet(i)] === 'Opening Balance' ||
			row[alphabet(i)] === 'Saldo Inicial'
		) {
			isData = true;
			return true;
		}
	}
}

function aprioriModel(sheet) {
	delete sheet['Balance Sheet'];
	const model = createModel(sheet);
  // console.log(model);
  result = populateJson(sheet, model)
  // console.log(result);
  return result; 
	// return populateJson(sheet, model);
}

function alphabet(n) {
	return `${(n + 10).toString(36).toUpperCase()}`;
}

module.exports = {
	aprioriModel,
};
