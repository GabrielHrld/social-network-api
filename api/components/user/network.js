const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");

const router = express.Router();

router.get("/", (req, res) => {
  controller
    .list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((error) => {
      response.error(req, res, error.message, 500);
    });
});

router.get("/:id", (req, res) => {
  controller
    .get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((error) => {
      response.error(req, res, error.message, 500);
    });
});

router.post("/", (req, res) => {
  controller
    .upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch((error) => {
      response.error(req, res, error.message, 500);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .remove(req.params.id)
    .then((user) => {
      response.success(req, res, `${user} deleted succesfull`, 201);
    })
    .catch((error) => {
      response.error(req, res, error.message, 500);
    });
});

module.exports = router;
