import { groupService } from '../services/group.service.js'

export const groupStore = {
    state() {
        return {
            groups: []
        }
    },
    mutations: {
        setGroups(state, { groups }) {
            state.groups = groups
        },
        saveGroup(state, { group }) {
            if (group._id) var idx = state.groups.findIdx(anyGroup => anyGroup._id === group._id)
            else return this.groups.unshift(group)
            if (idx === -1) return
            state.groups[idx] = group
        }
    },
    getters: {
        groups({ groups }) {
            return groups
        }
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
                await this.groupService.save(group)
                commit({ type: 'saveGroup', group })
                dispatch({ type: 'getBoardById', id: group.boardId })

            } catch (err) {
                console.log(`Cannot save group`, err)
            }
        },
        async addGroup({ commit }) {
            try {
                const { _id } = this.getters.board
                console.log(`_id`, _id)
                const group = await groupService.add(_id)
                commit({ type: 'addGroup', group })
                return group
            } catch (err) {
                console.log(`Cannot add group at store`, err)
            }
        }
    },
}