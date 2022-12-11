import { httpService } from './http.service.js'
import { colorService } from './color.service.js'
import { utilService } from './util.service.js'
import { socketService } from './socket.service.js'

const GROUP_URL = 'group/'

export const groupService = {
    query,
    save,
    remove,
    add,
}

async function query(filterBy = {}) {
    return await httpService.get(GROUP_URL, filterBy)
}

async function remove(group) {
    const { _id: groupId, boardId } = group
    const loggedinUser = userService.getLoggedinUser()
    socketService.emit('remove-group', { group, loggedinUser })
    return await httpService.delete(GROUP_URL, { groupId, boardId })
}

async function save(group, isFifo = false) {
    if (group._id) {
        const loggedinUser = userService.getLoggedinUser()
        socketService.emit('update-group', { group, loggedinUser })
        const savedGroup = httpService.put(GROUP_URL + group._id, { group, isFifo })
        return savedGroup
    } else {
        return await httpService.post(GROUP_URL, { group, isFifo: false })
    }
}

async function duplicate(groupId, boardId) {
    return await httpService.post(GROUP_URL, { groupId, boardId })
}

async function add(boardId, isFifo = false) {
    const group = await save(_getNewGroup(boardId), isFifo)
    const loggedinUser = userService.getLoggedinUser()
    socketService.emit('save-group', { data: { group, isFifo }, loggedinUser })
    return group
}

function _getNewGroup(boardId) {
    const color = colorService.randomColor('group')
    return {
        title: 'New Group',
        boardId,
        createdAt: Date.now(),
        createdBy: {
            _id: '0',
            fullname: 'Guest'
        },
        style: { color, light: color + '99' },
        tasks: [
            {
                _id: utilService.makeId(),
                boardId,
                title: 'item 1',
                comments: [],
                status: 'Working on it',
                createdAt: Date.now(),
                createdBy: {
                    _id: '0',
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
                    _id: '0',
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
                    _id: '0',
                    fullname: 'Guest'
                }
            }
        ]
    }
}

