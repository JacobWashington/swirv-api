const db = require("../models");

// Controller
const index = async (req, res) => {
  const allStories = await db.Storyline.find().sort({created: -1}).limit(10);
  res.json(allStories);
};

const findAll = async (req, res) => {
  console.log(req.params); // object used for finding storyline by userId
  const userStories = await db.Storyline.find({ authId: req.params.id });
  res.json(userStories)
};

const create = (req, res) => {
  // Purpose: Create one storyline by adding body to DB, and return
  console.log("=====> Inside POST /storyline");
  console.log("=====> req.body");
  console.log(req.body); // object used for creating new storyline
  // const userId = req.body

  db.Storyline.create(req.body, (err, savedStoryline) => {
    if (err) console.log("Error in storyline#create:", err);
    res.json(savedStoryline);
  });
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

const createBranch = (req, res) => {
  console.log("<<< IN createBranch >>>");
  if (req.body.storylineId && req.body.episodeId) {
    console.log(">>>>USER", req.user);
    console.log(">>>>BODY", req.body);

    const { storylineId, episodeId, title } = req.body;

    db.Storyline.create(
      {
        branchedFromStorylineId: storylineId,
        branchedFromEpisodeId: episodeId,
        authId: req.user._id,
        title: title,
      },
      (err, savedBranch) => {
        if (err) console.log("Error in storyline#create:", err);
        res.json(savedBranch);
      }
    );
  } else if (req.body.storylineId) {
    const { storylineId, title, __id } = req.body;
    console.log("CHECKING >>>", req.body);
    db.Storyline.create(
      {
        branchedFromStorylineId: storylineId,
        authId: __id,
        title: title,
      },
      (err, savedBranch) => {
        if (err) console.log("Error in storyline#create:", err);
        res.json(savedBranch);
      }
    );
  } else {
    res.json({ message: "🖐 Cant fork this" });
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
  createBranch,
  findAll,
};
