const express = require('express')
const blogModel = require('../models/blogs')
const blogRouter = express.Router()

blogRouter.get('/', (req, res) => {
    blogModel.find()
        .then(blogs => {
            res.render('blogs', { user: req.user, blogs })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})


blogRouter.get('/:id', (req, res) => {
    const id = req.params.id
    blogModel.findById(id)
        .then(blog => {
            res.status(200).send(blog)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
})

blogRouter.post('/', (req, res) => {
    const blog = req.body
    blog.lastUpdateAt = new Date() // In order to set the lastUpdateAt to the current date
    blogModel.create(blog)
        .then(blog => {
            res.status(201).send(blog)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})


blogRouter.put('/:id', (req, res) => {
    const id = req.params.id
    const blog = req.body
    blog.lastUpdateAt = new Date() // sets the lastUpdateAt to the current date
    blogModel.findByIdAndUpdate(id, blog, { new: true })
        .then(newBlog => {
            res.status(200).send(newBlog)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})


blogRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    blogModel.findByIdAndRemove(id)
        .then(blog => {
            res.status(200).send(blog)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})


module.exports = blogRouter;


