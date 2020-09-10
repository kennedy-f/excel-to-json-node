
const apriori = require('./models/apriori')
module.exports = {
  jsonToModel(sheet){ 
    //if pra ver qual dos modelos ira utilizar - baseando-se na palavra chave. 
    
    var model; 
    if (sheet['Balance Sheet']) { 
      model = apriori.aprioriModel(sheet); 
      return model

    }
    if (sheet['Balanço']){ 
      model = apriori.aprioriModel(sheet);
      return model; 
    }
      // console.log(sheet);
    
  }
}