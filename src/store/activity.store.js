import { activityService } from '../services/activity-service.js'

export const activityStore = {
    state() {
        return {
            activities: []
        }
    },
    getters: {
        activities({ activities }) { return activities }
    },
    mutations: {
        setActivities(state, { activities }) {
            state.activities = activities
        },
        saveActivity(state, { activity }) {
            if (activity._id) var idx = state.activities.findIndex(anyActivity => anyActivity._id === activity._id)
            else return this.activities.unshift(activity)
            if (idx === -1) return
            state.activities[idx] = activity
        },
    },
    actions: {
        async loadActivities(context) {
            try {
                const activities = await activityService.query()
                context.commit({ type: 'setActivities', activities })
            } catch (err) {
                console.log(`Cannot load activities in store`, err)
            }
        },
        async saveActivity({ dispatch, commit }, { activity }) {
            try {
                await activityService.save(activity)
                commit({ type: 'saveActivity', activity })
                dispatch({ type: 'queryBoard', id: activity.boardId, filter: '' })
                console.log(`success`)
            } catch (err) {
                console.log(`Cannot save activity`, err)
            }
        }
    }
}