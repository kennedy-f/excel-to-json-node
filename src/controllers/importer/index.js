
module.exports = {
    async reader (req,res) { 
        const {file} = req.body; 
        console.log(file)
    }
}