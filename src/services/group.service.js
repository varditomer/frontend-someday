import { boardService } from './board.service.local.js'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const GROUP_STORAGE_KEY = 'group'

export const groupService = {
    queryBoard,
    add,
    remove,
    save,
    duplicate,
    removeManyTasks,
}
window.bs = groupService

async function queryBoard(groupId, boardId) {
    if (!groupId || !boardId) return Promise.reject('Cannot get group')
    const board = await boardService.queryBoard(boardId)
    if (!board) return Promise.reject('Board not found')
    return board.groups.find(anyGroup => anyGroup._id === groupId)
}

async function add(boardId) {
    return await save(_getNewGroup(boardId))
}

async function remove(group) {
    const { boardId } = group
    if (!group._id || !boardId) return Promise.reject('Cannot remove group')
    const board = await boardService.queryBoard(boardId)
    if (!board) return Promise.reject('Board not found')
    const idx = board.groups.findIndex(anyGroup => anyGroup._id === group._id)
    if (idx === -1) return Promise.reject('Group not found')
    const removedGroup = board.groups.splice(idx, 1)
    if (!boardService.save(board)) return Promise.reject('Cannot remove group because board cannot be saved')
    return removedGroup
}

async function removeManyTasks(taskIds, boardId) {
    if (!taskIds?.length || !boardId) return
    const board = await boardService.queryBoard(boardId)
    if (!board) return
    board.groups = board.groups.reduce((groupArr, group) => {
        if (!taskIds.length) {
            groupArr.push(group)
            return groupArr
        }
        group.tasks = group.tasks.reduce((tasksToKeep, task) => {
            if (!taskIds.length) {
                tasksToKeep.push(task)
                return tasksToKeep
            }
            const idx = taskIds.indexOf(task._id)
            if (idx === -1) tasksToKeep.push(task)
            else taskIds.splice(idx, 1)
            return tasksToKeep
        }, [])
        groupArr.push(group)
        return groupArr
    }, [])
    if (!(await boardService.save(board))) return Promise.reject('Cannot save group because board cannot be saved')
    return board
}

async function save(group, isFifo) {
    const { boardId } = group
    if (!group || !boardId) return Promise.reject('Cannot save group')
    const board = await boardService.queryBoard(boardId)
    if (!board) return Promise.reject('Board not found')
    if (group._id) {
        const idx = board.groups.findIndex(anyGroup => anyGroup._id === group._id)
        if (idx === -1) return Promise.reject('Group not found')
        board.groups[idx] = group
    } else {
        console.log(`2:`, )
        isFifo? board.groups.unshift(_connectIds(group)): board.groups.push(_connectIds(group))
    }
    if (!(await boardService.save(board))) return Promise.reject('Cannot save group because board cannot be saved')
    return group
}

function duplicate(group) {
    const duplicatedGroup = JSON.parse(JSON.stringify(group))
    duplicatedGroup._id = null
    duplicatedGroup.tasks.forEach(task=> {
        delete task.groupId
        task._id = utilService.makeId()
    })
    return(save(duplicatedGroup, true))
}

function _getNewGroup(boardId) {
    return {
        title: 'New Group',
        boardId,
        createdAt: Date.now(),
        createdBy: {
            _id: 0,
            fullname: 'Guest'
        },
        style: _getRandomColor(),
        tasks: [
            {
                _id: utilService.makeId(),
                boardId,
                title: 'item 1',
                comments: [],
                status: 'Working on it',
                createdAt: Date.now(),
                createdBy: {
                    _id: 0,
                    fullname: 'Guest'
                }
            },
            {
                _id: utilService.makeId(),
                boardId,
                title: 'item 2',
                comments: [],
                status: 'Stuck',
                createdAt: Date.now(),
                createdBy: {
                    _id: 0,
                    fullname: 'Guest'
                }
            },
            {
                _id: utilService.makeId(),
                boardId,
                title: 'item 3',
                comments: [],
                status: 'Done',
                createdAt: Date.now(),
                createdBy: {
                    _id: 0,
                    fullname: 'Guest'
                }
            }
        ]
    }
}

function _connectIds(group) {
    group._id = utilService.makeId()
    group.tasks.forEach(task => task.groupId = group._id)
    return group
}

function _getRandomColor() {
    const colorNames = Object.keys(colors)
    const idx = utilService.getRandomIntInclusive(0, colorNames.length - 1)
    const color = colors[colorNames[idx]]
    const light = color + '99'
    return { color, light }
}

const colors = {
    'grass green': '#037f4c',
    'green haze': '#00a359',
    'jade': '#03c875',
    'saladish': '#cab641',
    'egg yolk': '#ffcb00',
    'dark purple': '#784bd1',
    'purple': '#a25ddc',
    'dark blue': '#0086c0',
    'chilli blue': '#66ccff',
    'dark red': '#bb3354',
    'red': '#e2445c',
    'sofia pink': '#ff158a',
    'dark orange': '#ff642e',
    'orange': '#fdab3d',
    'brown': '#7f5347',
    'explosive': '#c4c4c4',
    'american gray': '#808080',
}