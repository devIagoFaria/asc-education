const express = require('express')
const router = express.Router()
const controller = require('../controller/class')


router.get("/", (req, res) => controller.control.all(req, res))
router.get("/:id",  (req, res) => controller.control.onlyOne(req, res))
router.get("/test/:id",  (req, res) => controller.control.studentSchoolTest(req, res))



router.post("/add",  (req, res) => controller.control.add(req, res))
router.post("/aluno_turma",  (req, res) => controller.control.newEnrollments(req, res))


router.put("/edit",  (req, res) => controller.control.edit(req, res))


router.delete("/delete=:id",  (req, res) => controller.control.delete(req, res))


module.exports = router