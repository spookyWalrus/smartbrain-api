const handleApiCall = (req,res) =>{
	const raw = JSON.stringify({
      "user_app_id": {
          "user_id": "7a01kgjbtwgm",
          "app_id": "e83cd2c610de44539de72c1f70ccacbb"
       },
      "inputs": [
        {
          "data": {
            "image": {
              // "url": this.state.imageUrl
              "url": req.body.input
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // 'Authorization': '9bd15bd8ec014246bd53cff4f1',
        // ^^ This is PAT, not API key
        'Authorization': 'Key f9a52f8f40844fa8baa9c2c383e58d1a'
         // ^^ This is API key
      },
      body: raw
    };
    res.json(requestOptions);
}


const handleImage = (req,res,db)=>{
	const { id } = req.body;
	db('users').where('id','=',id)
		.increment('entries',1)
		.returning('entries')
		.then(entries =>{
			// console.log(entries);
			res.json(entries[0].entries)
		})
		.catch(error =>res.status(400).json('cannot get entry'))
};

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}