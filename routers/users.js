const express = require("express");
const router = express.Router();
//const router = require("express-promise-router")();
const { verifyAccessToken } = require("../helpers/jwt.service");
const UserController = require("../controllers/users");

const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/user.validate");

router
  .route("/GetUserAfterLogin")
  .get(verifyAccessToken, UserController.GetUserAfterLogin);

router
  .route("/checkFriend/:userID")
  .get(verifyAccessToken, UserController.checkFriend);

router
  .route("/GetUserByPhone")
  .post(verifyAccessToken, UserController.GetUserByPhone);

router
  .route("/cancelSendedFriend")
  .post(verifyAccessToken, UserController.cancelSendedFriend);

router
  .route("/requestAddFriend")
  .post(verifyAccessToken, UserController.requestAddFriend);

router
  .route("/acceptFriend")
  .post(verifyAccessToken, UserController.acceptFriend);

router
  .route("/declineFriend")
  .post(verifyAccessToken, UserController.declineFriend);

router
  .route("/blockFriend")
  .post(verifyAccessToken, UserController.blockFriend);

router
  .route("/deleteFriend")
  .post(verifyAccessToken, UserController.deleteFriend);

router
  .route("/:userID")
  .get(validateParam(schemas.idSchema, "userID"), UserController.getUser)
  .put(
    validateParam(schemas.idSchema, "userID"),
    // validateBody(schemas.userSchema),
    UserController.replaceUser
  )
  .patch(
    validateParam(schemas.idSchema, "userID"),
    validateBody(schemas.userOptionalSchema),
    UserController.updateUser
  )
  .delete(validateParam(schemas.idSchema, "userID"), UserController.deleteUser);

router
  .route("/")
  .get(verifyAccessToken, UserController.getAllUser)
  .post(validateBody(schemas.userSchema), UserController.newUser);

router
  .route("/GetFriendByName")
  .post(verifyAccessToken, UserController.GetFriendByName);

router
  .route("/GetFriendByPhone")
  .post(verifyAccessToken, UserController.GetFriendByPhone);
module.exports = router;
