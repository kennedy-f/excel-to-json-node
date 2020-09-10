
const apriori = require('./models/apriori')
module.exports = {
  /** 
   * @param {object} sheet json
   * @returns JSON model 
   */  
  jsonToModel(sheet){ 
    var model; 
    //Apriori 
    if (sheet['TB Movimento']) {  
      model = apriori.aprioriModel(sheet); 
      return model
    }
  }
}