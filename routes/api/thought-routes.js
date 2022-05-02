const router = require('express').router();
const { 
    getAllThought, 
    getThoughtById, 
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughts-controller');

router.route('/').get(getAllThought);

// Get Put and delete thoughts by Id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought); 

// Post thoughts by user id 
router.route('/:userId').post(createThought);

// Post reactions
router.route('/:thoughtId/reactions').post(addReaction);

// Delete reactions
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;
