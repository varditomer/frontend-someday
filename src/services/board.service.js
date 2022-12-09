
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { colorService , colors} from './color.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

export const cmps = ['status', 'priority', 'person', 'date', 'timeline', 'numbers', 'text', 'link',]

const BOARD_URL = 'board/'

export const boardService = {
    query,
    filterBoard,
    save,
    remove,
    getEmptyBoard,
    removeManyTasks,
    loadFromSessionStorage,
    queryKanban,
    saveToSessionStorage
}

window.cs = boardService

function loadFromSessionStorage(key) {
    return sessionStorage.getItem(key)
}

function saveToSessionStorage(key, state) {
    sessionStorage.setItem(key, state)
}

async function query(id = '') {
    return await httpService.get(BOARD_URL + id)
}

async function remove(boardId) {
    return await httpService.delete(BOARD_URL + boardId)
}

async function removeManyTasks(taskIds, boardId) {
    const data = { boardId, taskIds }
    return await httpService.delete(BOARD_URL, data)

}

async function save(board) {
    debugger
    var savedBoard
    if (board._id) {

        // savedBoard = await storageService.put(STORAGE_KEY, board)
        savedBoard = await httpService.put(BOARD_URL + board._id, board)

    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        // savedBoard = await storageService.post(STORAGE_KEY, board)
        savedBoard = await httpService.post(BOARD_URL, board)
    }
    return savedBoard
}

// async function addBoardMsg(boardId, txt) {
//     const savedMsg = await httpService.post(`board/${boardId}/msg`, { txt })
//     return savedMsg
// }

function queryKanban(board, type = 'status', dataMap) {
    board.kanbanType = type
    if (type === 'groupTitle') return board
    if (!board.kanbanOrder) board.kanbanOrder = JSON.parse(JSON.stringify(dataMap.tasks))
    board.groups = board.kanbanOrder[type].reduce((groups, val) => {
        const tasks = _getTasksByValue(board, type, val)
        if (!tasks.length) return groups
        const group = {tasks}
        group.title = type === 'status' || type === 'priority'
            ? colorService.getLabelById(type, val).title
            : val
        group.color = type === 'status' || type === 'priority'
            ? colorService.getLabelById(type, val).value
            : ''
        groups.push(group)
        return groups
    }, [])
    return board
}

function filterBoard(board, filter) {
    debugger
    if (filter.groupTitle || filter.tasks) return _multiFilter(filter, board)
    if (filter.userId) board = _filterByPerson(board, filter.userId)
    if (filter.txt) board = _filterByTxt(board, filter.txt)
    return board
}

async function getEmptyBoard() {
    const color1 = await colorService.randomColor('group')
    const color2 = await colorService.randomColor('group')
    const board = {
        title: 'New Board',
        archivedAt: Date.now(),
        createdBy: {
            _id: 0,
            fullname: 'Guest'
        },
        groups: [
            {
                _id: utilService.makeId(),
                title: 'Group Title',
                style: {
                    color: color1,
                    light: color1 + '99'
                },
                tasks: [
                    {
                        _id: utilService.makeId(),
                        title: 'Item 1',
                        status: 'Working on it',
                        date: Date.now() + 24 * 60 * 60 * 1000,
                        comments: []
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Item 2',
                        status: 'Done',
                        date: Date.now() - 24 * 60 * 60 * 1000,
                        comments: []
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Item 3',
                        date: Date.now() - 24 * 60 * 60 * 1000,
                        comments: []
                    }
                ]

            },
            {
                _id: utilService.makeId(),
                title: 'Group Title',
                style: {
                    color: color2,
                    light: color2 + '99'
                },
                tasks: [
                    {
                        _id: utilService.makeId(),
                        title: 'Item 4',
                        date: Date.now() - 24 * 60 * 60 * 1000,
                        comments: []
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Item 5',
                        date: Date.now() - 3 * 24 * 60 * 60 * 1000,
                        comments: []
                    }
                ]
            }
        ],
        cmpsOrder: ['status', 'date']
    }
    return await httpService.post(BOARD_URL, board)
}


function _filterByPerson(board, id) {
    if (!id) return board
    board.groups = board.groups.filter(group => {
        if (!group.tasks || !group.tasks.length) return false
        group.tasks = group.tasks.filter(task => {
            return task?.person?.some(person => person._id === id)
        })
        return (group.tasks && group.tasks.length)
    })
    return board
}

function _filterByTxt(board, txt) {
    if (!txt) return board
    const regex = new RegExp(txt, 'ig')
    board.groups = board.groups.reduce((groupArr, group) => {
        const isGroupTitleMatch = regex.test(group.title)
        if (isGroupTitleMatch) {
            group.title = group.title.replaceAll(regex, match => `<span class="highlight">${match}</span>`)
        }

        group.tasks = group.tasks.reduce((taskArr, task) => {
            if (regex.test(task.title)) {
                task.title = task.title.replaceAll(regex, match => `<span class="highlight">${match}</span>`)
                taskArr.push(task)
            }
            return taskArr
        }, [])

        if (group.tasks?.length || isGroupTitleMatch) groupArr.push(group)
        return groupArr

    }, [])
    return board
}

function _multiFilter(filterBy, board) {
    board.groups = board.groups.reduce((filteredGroups, group) => {
        if (filterBy?.groupTitle && filterBy.groupTitle !== group.title) return filteredGroups
        if (filterBy.tasks) group.tasks = group.tasks.reduce((filteredTasks, task) => {
            const taskFilter = JSON.parse(JSON.stringify(filterBy.tasks))
            if (taskFilter.person?.length &&
                !taskFilter.person.some(id => {
                    return (task.person && task.person.find(person => person._id === id))
                })) return filteredTasks
            delete taskFilter.person
            for (let prop in taskFilter) {
                if (task[prop] === taskFilter[prop]) {
                    filteredTasks.push(task)
                    return filteredTasks
                }
            }
            return filteredTasks
        }, [])
        if (group.tasks.length) filteredGroups.push(group)
        return filteredGroups
    }, [])
    return board
}

function _getTasksByValue(board, key, value) {
    if (!board || !key || !value) return null
    return board.groups.reduce((tasks, group) => {
        const filteredGroupTasks = group.tasks.filter(task => key === 'person'
            ? task.person.find(person => person._id === value)
            : task[key] === value
        )
        if (filteredGroupTasks.length) tasks.push(...filteredGroupTasks)
        return tasks
    }, [])
}