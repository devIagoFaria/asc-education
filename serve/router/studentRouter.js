const express = require('express')
const router = express.Router()
const controller = require('../controller/student')


router.get("/", (req, res) => controller.control.all(req, res)) //ok
router.get("/:id",  (req, res) => controller.control.onlyOne(req, res)) //ok
router.get("/test/:id",  (req, res) => controller.control.studentSchoolTest(req, res)) //ok



router.post("/add",  (req, res) => controller.control.add(req, res)) //ok
router.post("/test",  (req, res) => controller.control.newTest(req, res)) //ok


router.put("/edit",  (req, res) => controller.control.edit(req, res)) //ok
router.put("/edit/status",  (req, res) => controller.control.status(req, res)) //ok
router.put("/edit-enrollment/:id==:status",  (req, res) => controller.control.statusEnrollment(req, res)) //ok
router.put("/aluno_turma",  (req, res) => controller.control.statusWithClass(req, res)) //ok


router.delete("/delete=:id",  (req, res) => controller.control.delete(req, res)) //ok


module.exports = router