
const apriori = require('./models/apriori')
module.exports = {
  jsonToModel(sheet){ 
    if (sheet['Balance Sheet']) { 
      var model = apriori.aprioriModel(sheet); 
      // console.log(model);
      return model
    }
  }
}