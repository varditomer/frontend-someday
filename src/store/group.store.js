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
                commit({ type: 'removeGroup', group })
                await groupService.remove(group)
                console.log(`success`)
            } catch (err) {
                console.log(`Cannot remove group`, err)
            }
        },
        async addGroup({ commit }) {
            try {
                const { _id } = this.getters.board
                const group = await groupService.add(_id)
                commit({ type: 'addGroup', group })
                return group
            } catch (err) {
                console.log(`Cannot add group at store`, err)
            }
        }
    },
}