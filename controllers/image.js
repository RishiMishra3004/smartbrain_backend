const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'cd9dc2dc716f4584b69c1d85d35220f9',
});

const model = {
    id: 'face-detection',
    name: 'face-detection',
    version: '6dc7e46bc9124c5c8824be4822abe105',
    type: 'visual-detector',
}
const handleApiCall = (req, res) => {
    app.models.predict(model, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0].entries);
      })
      .catch((err) => res.status(400).json("unable to get entries"));
  }

module.exports = {
    handleImage,
    handleApiCall
};