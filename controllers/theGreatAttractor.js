// Database
const db = require("../models");

const consumeStoryline = async (req, res) => {
  // if user makes offering to TGA,
  // and offer == episode, create storyline where authId == TGA
  // add episode to storyline.episodes array, set episode.authId == TGA
  if (req.body.episodeId) {
    const filter = { episodeId: req.body.episodeId };
    const update = { authId: "the_great_attractor" };
    let theConsumed = await db.Storyline.findOneAndUpdate(filter, update, {
      new: true,
    });
    const TGA = await db.TheGreatAttractor.findOne({});
    console.log(">>>>>>TGA", TGA)
    TGA.storylines.push(theConsumed.storylineId);
    TGA.save();
  } else if (req.body.storylineId) {
    const filter = { storylineId: req.body.storylineId };
    const update = { authId: "the_great_attractor" };
    let theConsumed = await db.Storyline.findOneAndUpdate(
      filter,
      update,
      {
        new: true,
      },
      (updatedStoryline) => {
        for (let i = 0; i < updatedStoryline.episodes.length; i++) {
          db.Episode.find({ episodeId: updatedStoryline.episodes[i] })
            .then((foundEpisode) => {
              foundEpisode.authId = "the_great_attractor";
            })
            .catch((error) => console.log(error));
        }
      }
    );
    const TGA = await db.TheGreatAttractor.findOne({});
    console.log(">>>>>>TGA", TGA)
    TGA.storylines.push(req.body.storylineId);
    TGA.save();
  }
};

module.exports = {
  consumeStoryline
};