const express = require('express')
const router = express.Router()
const controller = require('../controller/teacher')


router.get("/", (req, res) => controller.control.all(req, res)) //ok
router.get("/:id",  (req, res) => controller.control.onlyOne(req, res)) //ok


router.post("/add",  (req, res) => controller.control.add(req, res)) //ok

router.put("/edit",  (req, res) => controller.control.edit(req, res)) //ok
router.put("/edit/:id==:status",  (req, res) => controller.control.status(req, res)) //ok

router.delete("/delete=:id",  (req, res) => controller.control.delete(req, res)) //ok


module.exports = router