const router = require("express").Router();
const { json } = require("body-parser");
const { stringify } = require("querystring");
const sqlManager = require("./sql");
const config = require("./config");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var util = require("util");

router.get("/getChatHistoryById", function (req, res) {
  console.log(req);
  sqlManager.getChatHistoryById(
    req.query.chatSessionId,
    req.query.loggedInUserId,
    function (err, result) {
      if (err) {
        res.status(500).json({ status: "Failed", message: err.message });
        return;
      }
      if (result.length == 0) {
        res.status(200).json({ status: "Success", chat: [] });
        return;
      }
      res.status(200).json({ status: "Success", chat: result });
    }
  );
});

router.get("/getChatList", function (req, res) {
  console.log(req);
  sqlManager.getChatList(req.query.receiverId, function (err, result) {
    if (err) {
      res.status(500).json({ status: "Failed", message: err.message });
      return;
    }
    if (result.length == 0) {
      res.status(200).json({ status: "Success", chat: [] });
      return;
    }
    res.status(200).json({ status: "Success", chat: result });
  });
});

router.get("/checkAndInsertChatSession", function (req, res) {
  console.log(req.body);

  sqlManager.checkAndInsertChatSession(
    req.query.productId,
    req.query.senderId,
    req.query.receiverId,
    function (err, result) {
      if (err) {
        res.status(500).json({ status: "Failed", message: err.message });
        return;
      }
      if (result.length == 0) {
        res.status(200).json({ status: "Success", chat: {} });
        return;
      }
      res.status(200).json({ status: "Success2", chat: result[0] });
    }
  );
});

router.get("/updateReadBit", function (req, res) {
  console.log(req.body);

  sqlManager.updateReadBit(
    req.query.chatSessionID,
    req.query.receiverId,
    function (err, result) {
      if (err) {
        res.status(500).json({ status: "Failed", message: err.message });
        return;
      }

      res.status(200).json({ status: "Success" });
    }
  );
});

router.get("/getNotification", function (req, res) {
  console.log(req.body);

  sqlManager.getNotification(req.query.receiverId, function (err, result) {
    if (err) {
      res.status(500).json({ status: "Failed", message: err.message });
      return;
    }

    if (result.length == 0) {
      res.status(200).json({ status: "Success", chat: {} });
      return;
    }

    res.status(200).json({ status: "Success", chat: result });
  });
});

router.post("/insertChat", function (req, res) {
  console.log("adnan");
  console.log(req.body);

  sqlManager.insertChat(req.body, function (err, result) {
    if (err) {
      res.status(500).json({ status: "Failed", message: err.message });
      return;
    }
    if (result.length == 0) {
      res.status(404).json({ status: "Success" });
      return;
    }
    res.status(200).json({ status: "Success" });
  });
});

module.exports = router;
