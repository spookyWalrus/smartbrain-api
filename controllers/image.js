const handleApiCall = (req,res) =>{
	const raw = JSON.stringify({
      "user_app_id": {
          "user_id": process.env.CLARIFAI_USER_ID,
          "app_id": process.env.CLARIFAI_APP_ID
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
        'Authorization': process.env.CLARIFAI_AUTH_API_KEY
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