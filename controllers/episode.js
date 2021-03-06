const mongoose = require('mongoose');
const db = require("../models");

const index = (req, res) => {
  // Purpose: Fetch all episodes from DB and return
  console.log("=====> Inside GET /index");

  db.Episode.find({}, (err, foundEpisodes) => {
    if (err) console.log("Error in episode#index:", err);
    res.json(foundEpisodes);
  });
};

const findUser = async (req, res) => {
  const userEps = await db.Episode.find({ authId: req.body.authId });
  console.log("REQ.BODY>>>>>>>",req.body)
  res.json(userEps);
};

const show = (req, res) => {
  // Purpose: Fetch one episode from DB and return
  console.log("=====> Inside GET /episodes/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding episode by id

  db.Episode.findById(req.params.id, (err, foundEpisode) => {
    if (err) console.log("Error in episode#show:", err);
    res.json(foundEpisode);
  });
};

const create = async (req, res) => {
  // Purpose: Create one episode by adding body to DB, and return
  console.log("=====> Inside POST /episode");
  console.log("=====> req.body");
  console.log(req.body); // object used for creating new episode
  // find the storyline that matches the storylineId to append with spread
  db.Episode.create(req.body, async (err, savedEpisode) => {

    const foundStory = await db.Storyline.findOne({
      _id: req.body.storylineId,
    });
    foundStory.episodes.push(savedEpisode._id);
    foundStory.save();
    console.log("FOUNDSTORY", foundStory);
    if (err) console.log("Error in episode#create:", err);
    res.json(savedEpisode);
  });
};

const update = (req, res) => {
  // Purpose: Update one episode in the DB, and return
  console.log("=====> Inside PUT /episode/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding episode by id
  console.log("=====> req.body");
  console.log(req.body); // object used for updating episode

  db.Episode.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedEpisode) => {
      if (err) console.log("Error in episode#update:", err);
      res.json(updatedEpisode);
    }
  );
};


const destroy = async (req, res) => {

  const episodeId = req.body.episodeId
  const theId = mongoose.Types.ObjectId(episodeId);
  const idd = String(theId)

  console.log("=====> Inside DELETE /episode/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding episode by id
  console.log("The ID >>> ", theId)

  const foundaStory = await db.Storyline.findOne({
    episodes: theId
  });
  console.log("FOUND STORY >>>", foundaStory)
  foundaStory.episodes.pull(theId);
  foundaStory.save();

  await db.Episode.findByIdAndDelete(req.params.id, (err, deletedEpisode) => {
    if (err) console.log("Error in episode#destroy:", err);
    res.sendStatus(200);
    console.log(deletedEpisode);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  findUser
};
