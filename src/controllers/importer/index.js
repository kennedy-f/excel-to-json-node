// const xlstojson = require('xls-to-json-lc');
// const xlsxtojson = require('xlsx-to-json-lc');

const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const models = require('../../helpers/index');

module.exports = {
	async excelReader(req, res) {
		if (!req.file) return res.json({ error: 'no file' });

		const { path } = req.file;

		var result = excelToJson({
			sourceFile: path,
		});
		
		var data = models.jsonToModel(result);

		fs.unlinkSync(path); // apago o arquivo 

		if (data) {
			return res.status(200).json({data: models.jsonToModel(result)});
		}

		return res.status(500).json({error : 'internal server error', msg: 'falha ao transformar a planilha'})
		// delete result['Balanço']; 
	},
};
