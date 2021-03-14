const db = require("../models");

// Controller
const index = (req, res) => {
  res.json({ message: "Storyline endpoint OK! ✅" });
};

const findAll = async (req, res) => {
  console.log("*****************************************************************", req.user)
  console.log(req.params._id); // object used for finding storyline by userId
  const userStories = await db.Storyline.find({ authId: req.params._id });
  res.json(userStories);
};

const show = (req, res) => {
  // Purpose: Fetch one storyline from DB and return
  console.log("=====> Inside GET /storyline/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding storyline by id
  db.Storyline.findById(req.params.id, (err, foundStoryline) => {
    if (err) console.log("Error in storyline#show:", err);
    res.json(foundStoryline);
  });
};


const create = (req, res) => {
  // Purpose: Create one storyline by adding body to DB, and return
  console.log("=====> Inside POST /storyline");
  console.log("=====> req.body");
  console.log(req.body); // object used for creating new storyline
  // const userId = req.body
  console.log(">>>>>USER<<<<<<", req.user);
  db.Storyline.create(req.body, (err, savedStoryline) => {
    if (err) console.log("Error in storyline#create:", err);
    res.json(savedStoryline);
  });
};

const createBranch = (req, res) => {
  if (req.body.storylineId && req.body.episodeId) {
    console.log(">>>>USER", req.user)
    console.log(">>>>BODY", req.body)
    
    const { storylineId, episodeId, title } = req.body

    db.Storyline.create({
        branchedFromStorylineId: storylineId,
        branchedFromEpisodeId: episodeId,
        authId: req.user._id, 
        title: title
    }, (err, savedBranch) => {
        if (err) console.log("Error in storyline#create:", err);
        res.json(savedBranch);
      });
  } else if (req.body.storylineId){
    const { storylineId, title } = req.body
      db.Storyline.create({
        branchedFromStorylineId: storylineId,
        authId: req.user._id, 
        title: title
    }, (err, savedBranch) => {
        if (err) console.log("Error in storyline#create:", err);
        res.json(savedBranch);
      });

  } else {
      res.json({message:"🖐 Cant fork this"});
  }
};

const update = (req, res) => {
  // Purpose: Update one storyline in the DB, and return
  console.log("=====> Inside PUT /storyline/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding Storyline by id
  console.log("=====> req.body");
  console.log(req.body); // object used for updating Storyline
  db.Storyline.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedStoryline) => {
      if (err) console.log("Error in Storyline#update:", err);
      res.json(updatedStoryline);
    }
  );
};

const destroy = (req, res) => {
  // Purpose: Update one storyline in the DB, and return
  console.log("=====> Inside DELETE /storyline/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding Storyline by id
  db.Storyline.findByIdAndDelete(req.params.id, (err, deletedStoryline) => {
    if (err) console.log("Error in storyline #destroy:", err);
    res.sendStatus(200);
    console.log(deletedStoryline);
  });
};
module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  findAll,
  createBranch
};
