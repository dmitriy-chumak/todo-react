class StudentController {
    async createStudent(req, res) {
    const {name, surname} = req.body
    console.log(name, surname)
    res.json('ya')
    }
}

module.exports = new StudentController()