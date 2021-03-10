const db = require('./models');

const createTGA = () => {
    db.TheGreatAttractor.create({storylines: ['']});
};

createTGA();