import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const TASK_URL = 'task/'

export const taskService = {
    save,
    remove,
    duplicate,
    duplicateMultiple,
    newTask
}

async function save(task, isFifo = true, isDuplicate = false) {
    let savedTask
    if (task._id) {
        // savedTask = await storageService.put(STORAGE_KEY, group)
        savedTask = await httpService.put(TASK_URL + task._id, { task, isFifo, isDuplicate })

    } else {
        // Later, owner is set by the backend
        // group.owner = userService.getLoggedinUser()
        // savedTask = await storageService.post(STORAGE_KEY, group)
        console.log({ task, isFifo, isDuplicate });
        savedTask = await httpService.post(TASK_URL, { task, isFifo, isDuplicate })
    }
    return savedTask
}

async function newTask(groupId, boardId) {
    return {
        title: 'Item 1',
        status: 'dfbyc',
        groupId,
        boardId
    }
}

async function remove(task) {
    return await httpService.delete(TASK_URL, task)
}

function duplicate(task) {
    const taskToDuplicate = JSON.parse(JSON.stringify(task))
    taskToDuplicate._id = null
    return save(taskToDuplicate, true, true)
}

function duplicateMultiple(tasks) {
    const tasksToDuplicate = tasks.map(task => {
        const clonedTask = JSON.parse(JSON.stringify(task))
        clonedTask._id = utilService.makeId()
        return clonedTask
    })
    _saveMultiple(tasks, tasksToDuplicate)
    return tasksToDuplicate
}

async function _saveMultiple(tasks, tasksCopy) {
    const { boardId } = tasks[0]
    await httpService.put(TASK_URL + 'many', tasks, tasksCopy, boardId)
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