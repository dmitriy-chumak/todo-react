const Router = require('express')
const router = new Router()
const studentController = require('../controller/student.controller')

router.post('/student', studentController.createStudent)

module.exports = router