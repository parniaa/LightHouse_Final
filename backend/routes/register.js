var express = require("express");
var router = express.Router();

module.exports = ({ getUsers, getUserByEmail, addUser, addLocation }) => {

  router.post("/", (req, res) => {
    getUserByEmail(req.body.user.email).then((result) => {
      if (result) {

      } else {
        addUser(req.body.user.name, req.body.user.email).then((r) => {
          addLocation(
            req.body.location.address,
            req.body.location.city,
            req.body.location.postal,
            req.body.location.country,
            req.body.location.lat,
            req.body.location.long,
            r.id
          ).then((response) => console.log(response));
          return res.json({
            register: true,
            msg: r,
          });
        });
      }
    });
  });
  return router;
};
