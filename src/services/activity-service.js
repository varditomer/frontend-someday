import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

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
    const { key, oldVal, newVal, taskId } = activity
    const byUser = userService.getLoggedinUser()
    const savedActivity = {
        _id: utilService.makeId(),
        type: key,
        from: oldVal,
        to: newVal,
        taskId,
        byUser,
        createdAt: Date.now()
    }
    return await storageService.post(ACTIVITY_STORAGE_KEY, savedActivity, true)
}

// utilService.saveToStorage(ACTIVITY_STORAGE_KEY, activities)