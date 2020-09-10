// const xlstojson = require('xls-to-json-lc');
// const xlsxtojson = require('xlsx-to-json-lc');

const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const models = require('../../helpers/index');

module.exports = {
	async reader(req, res) {
		if (!req.file) return res.json({ error: 'no file' });

		const { originalname, path } = req.file;

		const extension = originalname.split('.')[
			originalname.split('.').length - 1
		];

		var result = excelToJson({
			sourceFile: path,
		});
		var response = {};
		response.status = 'ok';
    response.data = models.jsonToModel(result);
		// delete result['Balanço']; 
		fs.unlinkSync(path);
		return res.json(response);
	},
};
