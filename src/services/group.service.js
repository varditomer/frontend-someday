
import { boardService } from './board.service.local.js'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const GROUP_STORAGE_KEY = 'group'

export const groupService = {
    getById,
    add,
    remove,
    save,
}
window.bs = groupService

async function getById(groupId, boardId) {
    if (!groupId || !boardId) return Promise.reject('Cannot get group')
    const board = await boardService.getById(boardId)
    if (!board) return Promise.reject('Board not found')
    return board.groups.find(anyGroup => anyGroup._id === groupId)
}

async function add(boardId) {
    return save(_getNewGroup(boardId))
}

async function remove(group) {
    const { boardId } = group
    if (!group._id || !boardId) return Promise.reject('Cannot remove group')
    const board = await boardService.getById(boardId)
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
    const board = await boardService.getById(boardId)
    if (!board) return Promise.reject('Board not found')
    if (group._id) {
        const idx = board.groups.findIndex(anyGroup => anyGroup._id === group._id)
        if (idx === -1) return Promise.reject('Group not found')
        board.groups[idx] = group
    } else board.groups.unshift(group)
    if (!(await boardService.save(board))) return Promise.reject('Cannot save group because board cannot be saved')
    return group
}

function _getNewGroup(boardId) {
    return {
        title: 'New Group',
        boardId,
        createdBy: {
            _id: 0,
            fullname: 'Guest'
        },
        tasks: []
    }
}