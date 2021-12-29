const Clarifai =  require('clarifai');

const app = new Clarifai.App({
    apiKey: 'b2087b4ae5324514bd211bc9d0a12ae4'
   });

const handleApiCall = (req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data=>{ res.json(data)})
    .catch(err=>res.status(400).json("Unable use API"))

}
   
const handleImage = (req,res,db)=>{
    const { id } = req.body;
    db('users').where('id','=',id).increment('entries',1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err=> res.status(400).json('Error'))

};

module.exports = {
    handleImage,
    handleApiCall
}