const express = require("express");
const courseController= require("../controllers/courseController");
const router = express.Router();


router.get("/course/list",courseController.getCourseList);
router.get("/course/:id",courseController.getCourse);



module.exports = router;