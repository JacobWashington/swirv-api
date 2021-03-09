const db = require('../models');

const index = (req, res) => {
    // Purpose: Fetch all comments from DB and return
    console.log('=====> Inside GET /index');

    db.Comment.find({}, (err, foundComments) => {
        if (err) console.log('Error in comment#index:', err);
        res.json(foundComments);
    });
}

const show = (req, res) => {
    // Purpose: Fetch one comment from DB and return
    console.log('=====> Inside GET /comments/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding comment by id

    db.Comment.findById(req.params.id, (err, foundComment) => {
        if (err) console.log('Error in comment#show:', err);
        res.json(foundComment);
    });
};

const create = async (req, res) => {
    // Purpose: Create one comment by adding body to DB, and return
    console.log('=====> Inside POST /comment');
    console.log('=====> req.body');
    console.log(req.body); // object used for creating new comment
    db.Comment.create(req.body, async (err, savedComment) => {
        if(req.body.episodeId) {
            const foundEpisode = await db.Episode.findOne({_id: req.body.episodeId})
            foundEpisode.comments.push(savedComment._id)
            foundEpisode.save()
            res.json(foundEpisode)
        } else if (req.body.storyLineId) {
            const foundStoryline = await db.Storyline.findOne({_id: req.body.storyLineId})
            foundStoryline.comments.push(savedComment._id)
            foundStoryline.save()
            res.json(foundStoryline)
        }
    });
};

const update = (req, res) => {
    // Purpose: Update one comment in the DB, and return
    console.log('=====> Inside PUT /comment/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding comment by id
    console.log('=====> req.body');
    console.log(req.body); // object used for updating comment

    db.Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedComment) => {
        if (err) console.log('Error in comment#update:', err);
        res.json(updatedComment);
    });
};

const destroy = (req, res) => {
    // Purpose: Update one comment in the DB, and return
    console.log('=====> Inside DELETE /comment/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding comment by id
    
    db.Comment.findByIdAndDelete(req.params.id, (err, deletedComment) => {
        if (err) console.log('Error in comment#destroy:', err);
          res.sendStatus(200);
          console.log(deletedComment);
    });
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};