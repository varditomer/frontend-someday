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
        type: 'status',
        icon: 'board',
        createdAt: Date.now(),
        by: {
            _id: 'u104',
            imgUrl: 'src/assets/imgs/ronen-avatar.png',
            fullname: 'Ronen Boxer'
        },
        txt: 'Changed status',
        from: 'Working on it',
        to: 'Stuck',
        taskId: 'xwe45'
    },
    {
        type: 'priority',
        icon: 'board',
        createdAt: Date.now(),
        by: {
            _id: 'u103',
            imgUrl: 'src/assets/imgs/tomer-avatar.png',
            fullname: 'Tomer Vardy'
        },
        txt: 'Changed priority',
        from: 'Low',
        to: 'Medium',
        taskId: 'wdec4'
    },
    {
        type: 'date',
        icon: 'date',
        createdAt: Date.now(),
        by: {
            _id: 'u102',
            imgUrl: 'src/assets/imgs/refael-avatar.png',
            fullname: 'Refael Abramov'
        },
        txt: 'Changed date',
        from: 'Nov 25',
        to: 'Nov 28',
        taskId: 'bg754'
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
        taskId: 'xwe45'
    },
    {
        type: 'link',
        icon: 'link',
        createdAt: Date.now(),
        by: {
            _id: 'u102',
            imgUrl: 'src/assets/imgs/refael-avatar.png',
            fullname: 'Refael Abramov'
        },
        txt: 'Added link',
        from: '',
        to: 'Google',
        taskId: 'wdec4'
    },
    {
        type: 'like',
        icon: 'like',
        createdAt: Date.now(),
        by: {
            _id: 'u103',
            imgUrl: 'src/assets/imgs/tomer-avatar.png',
            fullname: 'Tomer Vardy'
        },
        txt: 'Liked a comment',
        from: '',
        to: 'Like',
        taskId: 'bg754'
    },
]

utilService.saveToStorage(ACTIVITY_STORAGE_KEY, activities)