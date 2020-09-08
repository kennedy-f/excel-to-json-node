// const xlstojson = require('xls-to-json-lc'); 
// const xlsxtojson = require('xlsx-to-json-lc'); 

const excelToJson = require('convert-excel-to-json')

module.exports = {
  async reader (req,res) { 

    if(!req.file) 
      return res.json({'error' : 'no file'}); 

    const {originalname, path} = req.file;     // console.log( -1] === 'xlsx'); 
    console.log(originalname.split('.')[originalname.split('.').length -1 ]);
    const extension = originalname.split('.')[originalname.split('.').length -1 ]; 

   

    console.log(path); 
    const result = excelToJson({
      sourceFile : path,
      sheets: ['TB Movimento']
    });                      
    return res.json(result); 
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