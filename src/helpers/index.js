
const apriori = require('./models/apriori')
module.exports = {
  jsonToModel(sheet){ 
    //if pra ver qual dos modelos ira utilizar - baseando-se na palavra chave. 
    if (sheet['Balance Sheet']) { 
      var model = apriori.aprioriModel(sheet); 
      // console.log(model);
      return model
    }
  }
}