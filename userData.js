const mongoose = require('mongoose');

const userSchema = new mongoose.Schema
({
    username: String,
    password: String,
});

const taskSchema = new mongoose.Schema 
({
    taskName:          {type: String, required: true},
    taskDescription:   {type: String, required: false},
    taskDurationStart: {type: Date, required: true},
    taskDurationEnd:   {type: Date, required: true},
    taskCompleted:     {type: Boolean, required: true},

    taskID: Number
});

const task = mongoose.model('Task', taskSchema);

// Add new entry
function addTask (name, description, startDur, endDur, completed, tasKID) 
{
    
    var task2 = new task
    ({
        taskName: name, 
        taskDescription: description,
        taskDurationStart: startDur,
        taskDurationEnd: endDur,
        taskCompleted: completed,
        taskID: tasKID 
    })
    task2.save();
    console.log('Task: ' + name + ' created successfully!');
}

// Delete a specific task by ID
function deleteTask (idToDelete) 
{
    try 
    {
        task.deleteOne({taskID: idToDelete})
        console.log('Task deleted sucessfully!');
    }
    catch 
    {
        console.log('Failed to delete the task, maybe you inputted the wrong id?')
    }
}

// Edit a specific task
function editTask (id, name, description, startDur, endDur, completed) 
{
    try 
    {
        task.updateOne 
        (
            {taskID: id},
            {$set: {taskName: name}},
            {$set: {taskDescription: description}},
            {$set: {taskDurationStart: startDur}},
            {$set: {taskDurationEnd: endDur}},
            {$set: {taskCompleted: completed}}
        )
        console.log('Task updated successfully.')
    }
    catch {console.log('Failed to update the specified task.')}
}