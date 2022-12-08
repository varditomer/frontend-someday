
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { colorService } from './color.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

export const cmps = ['status', 'priority', 'person', 'date', 'timeline', 'numbers', 'text', 'link',]

const BOARD_URL = 'board/'

export const boardService = {
    query,
    save,
    remove,
    getEmptyBoard,
    removeManyTasks,
    loadFromSessionStorage,
    queryKanbanBoard,
    saveToSessionStorage
}

window.cs = boardService

function loadFromSessionStorage(key) {
    return sessionStorage.getItem(key)
}

function saveToSessionStorage(key, state) {
    sessionStorage.setItem(key, state)
}

async function query(filterBy = {}) {
    return await httpService.get(BOARD_URL, filterBy)
}

async function remove(boardId) {
    return await httpService.delete(BOARD_URL + boardId)
}

async function removeManyTasks(taskIds, boardId) {
    return await httpService.delete(BOARD_URL + boardId, { taskIds })

}

async function save(board) {
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

async function queryKanbanBoard(filterBy = {}) {
    let board = (await query(filterBy)).board
    return board.groups.reduce((status, group) => {
        const map = group.tasks.reduce((innerStatus, task) => {
            if (task.status) {
                if (innerStatus[task.status]) innerStatus[task.status].push(task)
                else innerStatus[task.status] = [task]
            }
            return innerStatus
        }, {})
        for (let prop in map) {
            if (status[prop]) status[prop].push(...map[prop])
            else status[prop] = map[prop]
        }
        return status
    }, {})
    if (!board.statusOrder) return board
    const statusesIds = Object.keys(board.groups)
    const formattedGroups = statusesIds.map((status,idx) => {
        const oldIdx = statusesIds.indexOf(board.statusOrders[idx]._id)
        console.log(`oldIdx`, oldIdx)
        return board.groups[oldIdx]
    })
    console.log(`board`, board)
    return board



    board.groups = board.groups.reduce((groups, group, idx, original) => {
        if (!board.statusOrder) groups.push(group)
        else {
            groups.push(original.find(anyGroup => group.tasks[0].status === board.statusOrder[idx]._id))
        }
        return groups
    }, [])
    console.log(`jsdhcbjshdb`)
    console.log(`board`, board)
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





