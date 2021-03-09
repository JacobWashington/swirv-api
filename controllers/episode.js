const db = require('../models');

const index = (req, res) => {
    // Purpose: Fetch all episodes from DB and return
    console.log('=====> Inside GET /index');

    db.Episode.find({}, (err, foundEpisodes) => {
        if (err) console.log('Error in episode#index:', err);
        res.json(foundEpisodes);
    });
}

const show = (req, res) => {
    // Purpose: Fetch one episode from DB and return
    console.log('=====> Inside GET /episodes/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding episode by id

    db.Episode.findById(req.params.id, (err, foundEpisode) => {
        if (err) console.log('Error in episode#show:', err);
        res.json(foundEpisode);
    });
};

const create = async (req, res) => {
    // Purpose: Create one episode by adding body to DB, and return
    console.log('=====> Inside POST /episode');
    console.log('=====> req.body');
    console.log(req.body); // object used for creating new episode
    // find the storyline that matches the storylineId to append with spread
    db.Episode.create(req.body, async (err, savedEpisode) => {
        // Find and update method for storyline, 
        // Append new episode's episodeId to episode's array in storyline
        const foundStory = await db.Storyline.findOne({_id:req.body.storyLineId})
        foundStory.episodes.push(savedEpisode._id)
        foundStory.save();
        console.log("FOUNDSTORY", foundStory)
        if (err) console.log('Error in episode#create:', err)
        res.json(savedEpisode);
    })
}


const update = (req, res) => {
    // Purpose: Update one episode in the DB, and return
    console.log('=====> Inside PUT /episode/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding episode by id
    console.log('=====> req.body');
    console.log(req.body); // object used for updating episode

    db.Episode.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEpisode) => {
        if (err) console.log('Error in episode#update:', err);
        res.json(updatedEpisode);
    });
};

const destroy = (req, res) => {
    // Purpose: Update one episode in the DB, and return
    console.log('=====> Inside DELETE /episode/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding episode by id
    
    db.Episode.findByIdAndDelete(req.params.id, (err, deletedEpisode) => {
        if (err) console.log('Error in episode#destroy:', err);
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
};