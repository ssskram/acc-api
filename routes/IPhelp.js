const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const refreshToken = require('../refresh')
const fetch = require('node-fetch')
const dt = require('node-json-transform').DataTransform
const models = require('../models/IPhelp')

global.Headers = fetch.Headers

/*
SECTION
I&P liaisons, access control
*/

// return list of liaisons
router.get('/allLiaisons',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/InPHelp/_api/web/lists/GetByTitle('Equipment')/items?$select=Title", {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json'
                    })
                })
                .then(res => res.json())
                .then(data => {
                    res.status(200).send(dt(data, models.allLiaisons).transform())
                })
                .catch(err => console.log(err))
        } else res.status(403).end()
    }
)

/*
SECTION
Equipment loan module
*/

// return all equipment loans
router.get('/allEquipmentLoans',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/EquipmentLoan/_api/web/lists/GetByTitle('Reservations')/items", {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json'
                    })
                })
                .then(res => res.json())
                .then(data => {
                    res.status(200).send(dt(data, models.allEquipmentLoans).transform())
                })
                .catch(err => console.log(err))
        } else res.status(403).end()
    }
)

// return all equipment
router.get('/allEquipment',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/EquipmentLoan/_api/web/lists/GetByTitle('Equipment')/items", {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json'
                    })
                })
                .then(res => res.json())
                .then(data => {
                    res.status(200).send(dt(data, models.allEquipment).transform())
                })
                .catch(err => console.log(err))
        } else res.status(403).end()
    }
)

// create a new loan record
router.post('/newEquipmentLoan',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            await fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/EquipmentLoan/_api/web/lists/GetByTitle('Reservations')/items", {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify(req.body)
                })
                .then(res => res.json())
                .then(data => {
                    res.status(200).send()
                })
                .catch(error => res.status(500).send(error))
        } else res.status(403).end()
    }
)

/*
SECTION
Course registrations
*/

// get all course registrations
router.get('/allCourseRegistrations',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/CourseRegistration/_api/web/lists/GetByTitle('Registrations')/items", {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json'
                    })
                })
                .then(res => res.json())
                .then(data => {
                    res.status(200).send(dt(data, models.courseRegistrations).transform())
                })
                .catch(err => console.log(err))
        } else res.status(403).end()
    }
)

// get all courses
router.get('/allCourses',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/CourseRegistration/_api/web/lists/GetByTitle('Courses')/items", {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json'
                    })
                })
                .then(res => res.json())
                .then(data => {
                    res.status(200).send(dt(data, models.courses).transform())
                })
                .catch(err => console.log(err))
        } else res.status(403).end()
    }
)

// get specific course
router.get('/course',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/CourseRegistration/_api/web/lists/GetByTitle('Courses')/items?$filter=Course_x0020_Code eq '" + req.query.courseCode + "'", {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json'
                    })
                })
                .then(res => res.json())
                .then(data => {
                    res.status(200).send(dt(data, models.courses).transform())
                })
                .catch(err => console.log(err))
        } else res.status(403).end()
    }
)

// create a course registration record
router.post('/newCourseRegistration',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            await fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/CourseRegistration/_api/web/lists/GetByTitle('Registrations')/items", {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify(req.body)
                })
                .catch(error => res.status(500).send(error))
                .then(() => res.status(200).send())
        } else res.status(403).end()
    }
)

// update a course registration record
router.post('/updateCourseRegistration',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/CourseRegistration/_api/web/lists/GetByTitle('Registrations')/items(" + req.query.id + ")", {
                    method: 'MERGE',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "IF-MATCH": "*"
                    }),
                    body: JSON.stringify(req.body)
                })
                .catch(error => res.status(500).send(error))
                .then(() => res.status(200).send())
        } else res.status(403).end()
    }
)

// get calendar event
router.get('/courseRegistrationCalendarEvent',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/CourseRegistration/_api/web/lists/GetByTitle('Calendar Events')/items?$filter=Registration_x0020_ID eq '" + req.query.registrationID + "'", {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json'
                    })
                })
                .then(res => res.json())
                .then(data => {
                    res.status(200).send(dt(data, models.calendarEvent).transform())
                })
                .catch(err => console.log(err))
        } else res.status(403).end()
    }
)

// create a calendar event record
router.post('/courseRegistrationCalendarEvent',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            console.log(req.body)
            await fetch("https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/CourseRegistration/_api/web/lists/GetByTitle('Calendar Events')/items", {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify(req.body)
                })
                .catch(error => res.status(500).send(error))
                .then(response => {
                    console.log(response)
                    res.status(200).send()
                })
        } else res.status(403).end()
    }
)

module.exports = router