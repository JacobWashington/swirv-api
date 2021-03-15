// Database
const { TheGreatAttractor, Episode } = require("../models");
const db = require("../models");
const mongoose = require("mongoose");
const { json } = require("express");

// if user makes offering to TGA,
// and offer == episode, create storyline where authId == TGA
// add episode to storyline.episodes array, set episode.authId == TGA

const consumeStoryline = async (req, res) => {
  console.log(req.body.storylineId);
  if (req.body.episodeId) {
    const update = { authId: "the_great_attractor" };
    const getEpisodeId = req.body.episodeId;

    const theId = mongoose.Types.ObjectId(getEpisodeId);

    // change selected storyline's authId to TGA
    await db.Storyline.updateOne({ episodes: theId }, update);

    res.json({ message: "✔" });
  } else if (req.body.storylineId) {
    console.log("TGA THIS >>>", req.body);
    const update = { authId: "the_great_attractor", title: req.body.title };

    const updateEps = await db.Episode.updateMany(
      { storylineId: req.body.storylineId },
      update,
      { unique: true }
    );
    const updateStoryline = await db.Storyline.updateOne(
      { _id: req.body.storylineId },
      update
    );
    res.json({ message: "✔" });
  }
};

const show = async (req, res) => {
  const all = await db.Storyline.find({ authId: "the_great_attractor" });
  res.json(all);
};

const findEpisodes = async (req, res) => {
  const allEp = await db.Episode.find({ storyLineId: req.params.id });
  res.json(allEp);
};

const destroy = async (req, res) => {
  const allStorylines = await db.Storyline.deleteMany({
    authId: "the_great_attractor",
  });
  const allEpisodes = await db.Episode.deleteMany({
    authId: "the_great_attractor",
  });

  res.json("⚫️TGA's Storylines & Episodes deleted!⚫️");
};

module.exports = {
  consumeStoryline,
  show,
  findEpisodes,
  destroy,
};
