
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { randomColor } from '../data/color-picker.js'

import _boardDB from '../data/_boardDB.json' assert {type: 'json'}

const BOARD_STORAGE_KEY = 'board'

export const cmps = ['person', 'priority', 'status', 'date', 'timeline', 'text', 'link', 'numbers']

export const boardService = {
    // getMiniBoards,
    queryBoard,
    getFirstBoard,
    getBoardsTitles,
    add,
    save,
    remove,
    saveToSessionStorage,
    loadFromSessionStorage,
    multiFilter,
    getDataMap
}
window.bs = boardService

async function getDataMap(boardId) {
    const board = await queryBoard(boardId)
    const personFilter = userService.getUsers().map(user => user._id)
    const groupTitle = []
    const taskFilter = {
        status: [],
        priority: [],
        date: [],
        text: [],
        numbers: []
    }
    board.groups.forEach(group => {
        if (!groupTitle.includes(group.title)) groupTitle.push(group.title)
        group.tasks.forEach(task => {
            for (let prop in taskFilter) {
                if (!taskFilter[prop].includes(task[prop])) taskFilter[prop].push(task[prop])
            }
        })
    })
    return {
        groupTitle,
        tasks: { ...taskFilter, person: personFilter }
    }
}

async function getFirstBoard() {
    let boards = await storageService.query(BOARD_STORAGE_KEY)
    return boards[0]
}

async function getBoardsTitles() {
    let boards = await storageService.query(BOARD_STORAGE_KEY)
    return boards.map(board => board.title)
}

// async function getMiniBoards(filter = null) {
//     let boards = await storageService.query(BOARD_STORAGE_KEY)
//     boards = boards.map(({ _id, title }) => ({ _id, title }))
//     if (!filter) return boards
//     const regex = new RegExp(filter, 'i')
//     return boards.filter(board => regex.test(board.title))
// }

async function queryBoard(boardId, filterBy = {}) {
    var board = await storageService.get(BOARD_STORAGE_KEY, boardId)
    var boardToShow = _filterByTxt(board, filterBy.txt)
    boardToShow = _filterByUser(boardToShow, filterBy.userId)
    if (!boardToShow) boardToShow = board
    return boardToShow
}

async function remove(boardId) {
    return await storageService.remove(BOARD_STORAGE_KEY, boardId)
}

async function save(board) {
    if (board?._id) {
        return await storageService.put(BOARD_STORAGE_KEY, board)
    } else {
        return await storageService.post(BOARD_STORAGE_KEY, _connectIds(board))
    }
}

function add() {
    return save(_getNewBoard())
}

function _filterByUser(board, userId) {
    if (!userId?.length) return board
    board.groups = board.groups.filter(group => {
        if (!group.tasks || !group.tasks.length) return false
        group.tasks = group.tasks.filter(task => {
            return task?.person?.some(p => p._id === userId)
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

async function multiFilter(filterBy, boardId) {
    const board = await queryBoard(boardId)
    board.groups = board.groups.reduce((filteredGroups, group) => {
        if (filterBy?.groupTitle && filterBy.groupTitle !== group.title) return filteredGroups
        if (filterBy.tasks) group.tasks = group.tasks.reduce((filteredTasks, task) => {
            const taskFilter = JSON.parse(JSON.stringify(filterBy.tasks))
            if (taskFilter.person?.length &&
                !taskFilter.person.every(id => {
                    return (task.person && task.person.find(person => person._id === id))
                })) return filteredTasks
            delete taskFilter.person
            for (let prop in taskFilter) {
                if (task[prop] !== taskFilter[prop]) return filteredTasks
            }
            filteredTasks.push(task)
            return filteredTasks
        }, [])
        if (group.tasks.length) filteredGroups.push(group)
        return filteredGroups
    }, [])
    return board
}

function loadFromSessionStorage(key) {
    return sessionStorage.getItem(key)
}

function saveToSessionStorage(key, state) {
    sessionStorage.setItem(key, state)
}

function _getNewBoard() {
    const color1 = randomColor('group')
    const color2 = randomColor('group')
    return {
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
}

function _connectIds(board) {
    board._id = utilService.makeId()
    board.groups.forEach(group => {
        group._id = utilService.makeId()
        group.boardId = board._id
        group.tasks.forEach(task => {
            task._id = utilService.makeId()
            task.boardId = board._id
            task.groupId = group._id
        })
    })
    return board
}

// utilService.saveToStorage(BOARD_STORAGE_KEY, _boardDB)