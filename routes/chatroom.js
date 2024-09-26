const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/auth");
const cacheChatrooms = require("../middlewares/cacheChatrooms");

router.get("/", [auth, cacheChatrooms], catchErrors(chatroomController.getAllChatrooms));
router.post("/", auth, catchErrors(chatroomController.createChatroom));

module.exports = router;