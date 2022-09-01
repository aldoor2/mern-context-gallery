import PostModel from "./Post.js";

const getAll = async () => await PostModel.find()

const getOne = async (id) => await PostModel.findById(id)

const create = async (post) => {
  const newPost = new PostModel(post)
  await newPost.save();
  return newPost;
}

const deleteOne = async (id) => await PostModel.findByIdAndDelete(id)

const update = async (id, fields) => await PostModel.findByIdAndUpdate(id, fields, { new: true });

export default {
  getAll,
  getOne,
  create,
  deleteOne,
  update
}