// Database
const { TheGreatAttractor, Episode } = require("../models");
const db = require("../models");
const mongoose = require('mongoose');
const { json } = require("express");


  // if user makes offering to TGA,
  // and offer == episode, create storyline where authId == TGA
  // add episode to storyline.episodes array, set episode.authId == TGA

const consumeStoryline = async (req, res) => {

  if (req.body.episodeId) {
    
    const update = { authId: "the_great_attractor" };
    const getEpisodeId = req.body.episodeId
    // Get the syntax for searching for storylines that contains episodeId in storyline.episodes array
    const theId = mongoose.Types.ObjectId(getEpisodeId);
    
    const selectedStoryline = await db.Storyline.find({
      episodes: theId
    });
    // change selected storyline's authId to TGA
    await db.Storyline.updateOne({episodes: theId}, update);
    
    // pushing to TGA's storyline array
    const TGA = await db.TheGreatAttractor.findOne({});
    TGA.storylines.push(selectedStoryline[0]._id);
    await TGA.save();

  } else if (req.body.storylineId) {

    const update = { authId: "the_great_attractor" };
    const selectedStoryline = await db.Storyline.find({
      _id: req.body.storylineId
    });

    // Changing all the authId in the episodes related to selected storylineId with TGA
    // replacing for loop
    const test = await db.Episode.updateMany({storyLineId: req.body.storylineId}, update, {unique: true});

    // pushing to TGA's storyline array
    const TGA = await db.TheGreatAttractor.findOne({});
    TGA.storylines.push(selectedStoryline[0]._id);
    await TGA.save();
  }
};

const show = async (req, res) => {
  const all = await db.Storyline.find({authId: "the_great_attractor"})
  res.json(all)
};





module.exports = {
  consumeStoryline,
  show
};
