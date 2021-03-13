// Database
const { TheGreatAttractor, Episode } = require("../models");
const db = require("../models");
const mongoose = require('mongoose');
const { json } = require("express");


  // if user makes offering to TGA,
  // and offer == episode, create storyline where authId == TGA
  // add episode to storyline.episodes array, set episode.authId == TGA

const consumeStoryline = async (req, res) => {

  console.log(req.body.storylineId)
  if (req.body.episodeId) {
    
    const update = { authId: "the_great_attractor" };
    const getEpisodeId = req.body.episodeId

    const theId = mongoose.Types.ObjectId(getEpisodeId);
    
    // change selected storyline's authId to TGA
    await db.Storyline.updateOne({episodes: theId}, update);
    
    // pushing to TGA's storyline array
    // const TGA = await db.TheGreatAttractor.findOne({});
    // const selectedStoryline = await db.Storyline.find({
    //   episodes: theId
    // });
    // TGA.storylines.push(selectedStoryline[0]._id);
    // await TGA.save();
  } else if (req.body.storylineId) {
    console.log("TGA THIS >>>", req.body)
    const update = { authId: "the_great_attractor", title: req.body.title  };

    const updateEps = await db.Episode.updateMany({storylineId: req.body.storylineId}, update, {unique: true});
    const updateStoryline = await db.Storyline.updateOne({_id: req.body.storylineId}, update);
    
    // pushing to TGA's storyline array
    // const TGA = await db.TheGreatAttractor.findOne({});
    // const selectedStoryline = await db.Storyline.find({
    //   _id: req.body.storylineId
    // });
    // TGA.storylines.push(selectedStoryline[0]._id);
    // await TGA.save();
    // res.json(TGA);
  }
};

const show = async (req, res) => {
  const all = await db.Storyline.find({authId: "the_great_attractor"})
  res.json(all)
};

const findEpisodes = async (req, res) => {
  const allEp = await db.Episode.find({storyLineId: req.params.id})
  res.json(allEp)
};


module.exports = {
  consumeStoryline,
  show,
  findEpisodes
};
