const { Thought, User } = require('../models');

const ThoughtController = {
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.UserId },
              { $push: { Thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this ID!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

      getAllThought(req,res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
            res.status(404).json({message: 'No thoughts with this ID!'});
            return;
        }
        res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    updateThoughts({params, body}, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.id}, 
            body, 
            {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this ID!'});
                return;
            }
                res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },


      addReaction({ params, body}, res) {
          Thought.findOneAndUpdate(
            { _id: params.ThoughtId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
          )
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this Id!' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
      },

      deleteReaction({ params, body}, res) {
        Thought.findOneAndDelete(
          { _id: params.ThoughtId },
          { $pull: { replies: body } },
          { new: true }
        )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

      deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.ThoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No Thought with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.UserId },
              { $pull: { Thoughts: params.ThoughtId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      }
};

module.exports = ThoughtController;