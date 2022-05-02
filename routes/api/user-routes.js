const router = require('express').Router();
// **`/api/users`**
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Get and Post users
router.route('/').get(getAllUsers).post(createUser);

// Get Put and delete users by id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// Post and delete frineds
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;