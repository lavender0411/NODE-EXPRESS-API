const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  // try {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // res.status(200).json({ tasks, amount:tasks.length });
  // res.status(200).json({ success:true, status:"succcess", data:{tasks,nbHits:tasks.length} });
  // } catch (err) {
  //   res.status(500).json({ msg: err });
  // }
});
const createTask = asyncWrapper(async (req, res) => {
  // try {
  const task = await Task.create(req.body);
  res.status(200).json({ task });
  // } catch (err) {
  //   res.status(500).json({ msg: err });
  // }
});
const getTask = asyncWrapper(async (req, res, next) => {
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // const error = new Error('not found');
    // error.status = 404;
    return next(createCustomError(`no task with the id : ${taskID}`, 404));
    // return res.status(404).json({ msg: `no task with the id : ${taskID}` });
  }
  res.status(200).json({ task });
  // } catch (err) {
  //   res.status(500).json({ msg: err });
  // }
});

const deleteTask = asyncWrapper(async (req, res) => {
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`no task with the id : ${taskID}`, 404));
    // return res.status(404).json({ msg: `no task with the id : ${taskID}` });
  }
  res.status(200).json(task);
  // res.status(200).send()
  // res.status(200).json({task:null, status:'success'})
  // } catch (err) {
  //   res.status(500).json({ msg: err });
  // }
});
const updateTask = asyncWrapper(async (req, res) => {
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`no task with the id : ${taskID}`, 404));
    // return res.status(404).json({ msg: `no task with the id : ${taskID}` });
  }
  // res.status(200).json({ id: taskID, data: req.body });
  res.status(200).json({ task });
  // } catch (err) {
  //   res.status(500).json({ msg: err });
  // }
});

// const editTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//       overWrite: true,
//     });
//     if (!task) {
//       return res.status(404).json({ msg: `no task with the id : ${taskID}` });
//     }
//     // res.status(200).json({ id: taskID, data: req.body });
//     res.status(200).json({ task });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// };

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
