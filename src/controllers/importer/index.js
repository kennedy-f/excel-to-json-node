// const xlstojson = require('xls-to-json-lc'); 
// const xlsxtojson = require('xlsx-to-json-lc'); 

const excelToJson = require('convert-excel-to-json')
const fs = require('fs')
const models = require('../../helpers/index');

module.exports = {
  async reader (req,res) { 

    if(!req.file) 
      return res.json({'error' : 'no file'}); 

    const {originalname, path} = req.file;     

    const extension = originalname.split('.')[originalname.split('.').length -1 ]; 

    var result = excelToJson({
      sourceFile : path,
    });
    var model = models.jsonToModel(result);
    console.log('na index.js', model)

    fs.unlinkSync(path)
    return res.json({model : model.version}); 


    //Outra versao -- testar a atual com XLS se nao for possivel incluir a lib de csv-to-json e implementar a solucao abaixo
     // var excelToJson; 

    // if (extension === 'xlsx') {
    //   excelToJson = xlsxtojson; 
    // } else if(extension === 'xls') { 
    //   excelToJson = xlstojson; 
    // }
    // try {
    //   excelToJson({
    //     input: req.file.path,
    //     output: null, //since we don't need output.json
    //     sheet: 'TB Movimento',
    //     lowerCaseHeaders:true
    //   }, function(err, result){
    //     if(err) 
    //       return res.json({error_code:1, err_desc:err, data: null});

    //     console.log(result);
    //     return res.json(result);
    //   });
    // } catch (error) { 
    //   console.log(error)
    //   console.log('aaaa')
    //   return res.json(error); 
    // }

    // return res.json({'aaa' : 'aaa'}); 
  }
}