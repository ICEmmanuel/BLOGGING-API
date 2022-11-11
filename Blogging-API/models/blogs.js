const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
 
 title: {
  type: String,
  required: true,
  unique: [true, 'Title must be unique']
 },

 description: {
  type: String,
  required: false,
 },

 content: {
  type: String,
  required: true,
  unique: true

 },

 author: {
  type: String,
  required: true
 },

 state: {
   type: String,
   default: 'draft', enum: ['draft', 'published']
 },

 readCount: {
  type: Number,
  default: 0
 },
 
 readingTime: Number,
 tags: [ String ],
 body: String,

 timestamp: {
  type: Date,
  default: Date.now
 }
  
});


const BlogModel = mongoose.model('Blogs', blogSchema);

module.exports = BlogModel;