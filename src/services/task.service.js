
import { groupService } from './group.service.js'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { boardService } from './board.service.local.js'

const TASK_STORAGE_KEY = 'task'

export const taskService = {
    query,
    save,
    saveEmptyTask,
    remove,
    duplicate,
    duplicateMultiple

}
window.bs = taskService


function query() {

}


async function saveEmptyTask(groupId, boardId) {
    let task = {
        groupId,
        boardId,
        title: 'Item 1',
        status: '',
        date: Date.now() + 24 * 60 * 60 * 1000,
        comments: []
    }
    task = await save(task, true)
    return task
}
async function saveMultiple(tasks, isFifo, isDuplicate) {
    const savedTasks = tasks.map(task => save(task, isFifo, isDuplicate))
    return Promise.all(savedTasks)
}

async function save(task, isFifo, isDuplicate) {
    const { groupId, boardId } = task
    if (!task || !groupId) return Promise.reject('Cannot save task')
    const group = await groupService.queryBoard(groupId, boardId)
    if (!group) return Promise.reject('group not found')
    if (task.groupId !== group._id) return Promise.reject('Unmatched group')
    let savedTask
    if (task._id) {
        const idx = group.tasks.findIndex(anyTask => anyTask._id === task._id)
        if (idx === -1) return Promise.reject('Task not found and cannot be updated')
        group.tasks[idx] = task
        savedTask = task
    } else {
        savedTask = { ...task, _id: utilService.makeId() }
        if (isDuplicate) _replaceTaskEntitiesIds(savedTask)
        if (!isFifo) group.tasks.push(savedTask)
        else group.tasks.unshift(savedTask)
    }
    if (!groupService.save(group)) return Promise.reject('Task not saved because group cannot be saved')
    return savedTask
}

async function remove(task) {
    const { groupId, boardId } = task
    if (!task._id || !groupId) return Promise.reject('Cannot remove task')
    const group = await groupService.queryBoard(groupId, boardId)
    if (!group) return Promise.reject('group not found')
    const idx = group.tasks.findIndex(anyTask => anyTask._id === task._id)
    if (idx === -1) return Promise.reject('Task not found and cannot be removed')
    const removedTask = group.tasks.splice(idx, 1)
    if (!groupService.save(group)) return Promise.reject('Task not removed because group cannot be saved')
    return removedTask
}

function duplicate(task) {
    const taskToDuplicate = JSON.parse(JSON.stringify(task))
    taskToDuplicate._id = null
    return save(taskToDuplicate, true, true)
}
function duplicateMultiple(tasks) {
    const tasksToDuplicate = tasks.map(task => {
        const clonedTask = JSON.parse(JSON.stringify(task))
        clonedTask._id = null
        return clonedTask
    })
    
    return saveMultiple(tasksToDuplicate, true, true)
}

function _replaceTaskEntitiesIds(taskToDuplicate) {
    const { _id: taskId } = taskToDuplicate
    console.log(`taskToDuplicate:`, taskToDuplicate)
    console.log(`taskId:`, taskId)
    taskToDuplicate.comments?.forEach(comment => {
        comment._id = utilService.makeId()
        console.log(`comment:`, comment)
        return comment.taskId = taskId
    })
    return taskToDuplicate
}

// async function addTaskMsg(taskId, txt) {
//     // Later, this is all done by the backend
//     const task = await queryBoard(taskId)
//     if (!task.msgs) task.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     task.msgs.push(msg)
//     await storageService.put(group_STORAGE_KEY, task)
//     1
//     return msg
// }