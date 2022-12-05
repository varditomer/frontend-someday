import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const ACTIVITY_STORAGE_KEY = 'activity'

export const activityService = {
    query,
    save,
    saveEmptyActivity,
}


async function query() {
    return await storageService.query(ACTIVITY_STORAGE_KEY)
}


async function saveEmptyActivity(groupId, boardId) {
    let activity = {
        groupId,
        boardId,
        title: 'Item 1',
        status: '',
        date: Date.now() + 24 * 60 * 60 * 1000,
        comments: []
    }
    activity = await save(activity, true)
    return activity
}

async function save(activity) {
    const { groupId, boardId } = activity
    if (!activity || !groupId) return Promise.reject('Cannot save activity')
    const group = await groupService.queryBoard(groupId, boardId)
    if (!group) return Promise.reject('group not found')
    if (activity.groupId !== group._id) return Promise.reject('Unmatched group')
    let savedActivity
    if (activity._id) {
        const idx = group.activitys.findIndex(anyActivity => anyActivity._id === activity._id)
        if (idx === -1) return Promise.reject('Activity not found and cannot be updated')
        group.activitys[idx] = activity
        savedActivity = activity
    } else {
        savedActivity = { ...activity, _id: utilService.makeId() }
        if (!bool) group.activitys.push(savedActivity)
        else group.activitys.unshift(savedActivity)
    }
    if (!groupService.save(group)) return Promise.reject('Activity not saved because group cannot be saved')
    return savedActivity
}

const activities = [
    {
        type: 'date',
        icon: 'time',
        createdAt: Date.now(),
        by: {
            _id: 'u103',
            imgUrl: 'src/assets/imgs/tomer-avatar.png',
            fullname: 'Tomer Vardy'
        },
        txt: 'Changed date',
        from: '',
        to: 'Dec 13',
        taskId: 'xwe45'
    },
    {
        type: 'text',
        icon: 'copyText',
        createdAt: Date.now(),
        by: {
            _id: 'u104',
            imgUrl: 'src/assets/imgs/ronen-avatar.png',
            fullname: 'Ronen Boxer'
        },
        txt: 'Changed text',
        from: '',
        to: 'Set github pages',
        taskId: 'wdec4'
    },
    {
        type: 'status',
        icon: 'board',
        createdAt: Date.now(),
        by: {
            _id: 'u104',
            imgUrl: 'src/assets/imgs/ronen-avatar.png',
            fullname: 'Ronen Boxer'
        },
        txt: 'Changed status',
        from: 'Stuck',
        to: 'Working on it',
        taskId: 'bg754'
    },

    {
        type: 'status',
        icon: 'board',
        createdAt: Date.now(),
        by: {
            _id: '0',
            imgUrl: 'src/assets/imgs/default-avatar.svg',
            fullname: 'Guest'
        },
        txt: 'Changed status',
        from: 'Working on it',
        to: 'Stuck',
        taskId: 'xa8sd'
    },
    {
        type: 'text',
        icon: 'copyText',
        createdAt: Date.now(),
        by: {
            _id: 'u102',
            imgUrl: 'src/assets/imgs/refael-avatar.png',
            fullname: 'Refael Abramov'
        },
        txt: 'Added text',
        from: '',
        to: 'D&D, Kanban, Perfect-pixel',
        taskId: 's0dme'
    },
    {
        type: 'priority',
        icon: 'priority',
        createdAt: Date.now(),
        by: {
            _id: 'u103',
            imgUrl: 'src/assets/imgs/tomer-avatar.png',
            fullname: 'Tomer Vardy'
        },
        txt: 'Changed priority',
        from: 'High',
        to: 'Critical',
        taskId: 'adx8w'
    },
]

utilService.saveToStorage(ACTIVITY_STORAGE_KEY, activities)