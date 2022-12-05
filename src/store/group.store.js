import { eventBus } from '../services/event-bus.service.js'
import { groupService } from '../services/group.service.js'

export const groupStore = {
    state() {
        return {
        }
    },
    mutations: {
        setGroups(state, { groups }) {
            state.groups = groups
        },
        saveGroup(state, { group }) {
            if (group._id) var idx = state.groups.findIndex(anyGroup => anyGroup._id === group._id)
            else return this.groups.unshift(group)
            if (idx === -1) return
            state.groups[idx] = group
        },
    },
    actions: {
        async loadGroups(context) {
            try {
                const board = context.getters.board
                const { groups } = board
                context.commit({ type: 'setGroups', groups })
            } catch (err) {
                console.log(`Cannot load groups in store`, err)
            }
        },
        async saveGroup({ dispatch, commit }, { group }) {
            try {
                await groupService.save(group)
                commit({ type: 'saveGroup', group })
                dispatch({ type: 'queryBoard', id: group.boardId, filter: '' })
                console.log(`success`)
            } catch (err) {
                console.log(`Cannot save group`, err)
            }
        },
        async removeGroup({ commit }, { group }) {
            console.log(`group removing:`, group)
            try {
                await groupService.remove(group)
                commit({ type: 'removeGroup', group })
                console.log(`success`)
            } catch (err) {
                console.log(`Cannot remove group`, err)
            }
        },
        async addGroup({ commit }, {isFifo}) {
            try {
                const { _id } = this.getters.board
                const group = await groupService.add(_id, isFifo)
                commit({ type: 'addGroup', group, isFifo })
                // eventBus.emit('reload', this.getters.board)
                return group
            } catch (err) {
                console.log(`Cannot add group at store`, err)
            }
        }
    },
}