
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
    const removedGroup = board.slice(idx, 1)
    if (!boardService.save(board)) return Promise.reject('Cannot remove group because board cannot be saved')
    return removedGroup
}

async function save(group) {
    const { boardId } = group
    if (!group || !boardId) return Promise.reject('Cannot save group')
    const board = await boardService.queryBoard(boardId)
    if (!board) return Promise.reject('Board not found')
    if (group._id) {
        const idx = board.groups.findIndex(anyGroup => anyGroup._id === group._id)
        if (idx === -1) return Promise.reject('Group not found')
        board.groups[idx] = group
    } else board.groups.unshift(_connectIds(group))
    if (!(await boardService.save(board))) return Promise.reject('Cannot save group because board cannot be saved')
    return group
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
    return {color, light}
}

const colors = {
    'dark_indigo': '#401694',
    'egg_yolk': '#ffcb00',
    'bright-green': '#9cd326',
    'sofia_pink': '#ff158a',
    'berry': '#7e3b8a',
    'royal': '#2B76E5',
    'jade': '#03c875',
    'grass_green': '#037f4c',
    'dark-purple': '#784bd1',
    'bubble': '#faa1f1',
    'aqua': '#00d1d1',
    'teal': '#175A63',
    'navy': '#225091',
    'peach': '#ffadad',
    'dark-orange': '#ff642e',
    'indigo': '#5559df',
    'river': '#68a1bd',
    'sky': '#A1E3F6',
    'lipstick': '#ff5ac4',
    'purple': '#a25ddc',
    'chili-blue': '#66ccff',
    'stuck-red': '#e2445c',
    'orange': '#fdab3d',
    'live_blue': '#009aff',
    'sunset': '#ff7575',
}