
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'task'

export const cmps = ['person', 'priority', 'status', 'date', 'timeline', 'numbers', 'text', 'link',]

export const taskService = {
    query,
    queryBoard,
    save,
    remove,
    getEmptyTask,
    addTaskMsg
}
window.cs = taskService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}
function queryBoard(taskId) {
    // return storageService.get(STORAGE_KEY, taskId)
    return httpService.get(`task/${taskId}`)
}

async function remove(taskId) {
    // await storageService.remove(STORAGE_KEY, taskId)
    return httpService.delete(`task/${taskId}`)
}
async function save(task) {
    var savedTask
    if (task._id) {
        // savedTask = await storageService.put(STORAGE_KEY, task)
        savedTask = await httpService.put(`task/${task._id}`, task)

    } else {
        // Later, owner is set by the backend
        task.owner = userService.getLoggedinUser()
        // savedTask = await storageService.post(STORAGE_KEY, task)
        savedTask = await httpService.post('task', task)
    }
    return savedTask
}

async function addTaskMsg(taskId, txt) {
    const savedMsg = await httpService.post(`task/${taskId}/msg`, { txt })
    return savedMsg
}


function getEmptyTask() {
    return {
        Task: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





