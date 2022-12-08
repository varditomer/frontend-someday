import { boardService } from '../services/board.service'
import { colorService, colors } from '../services/color.service.js'
import { router } from '../router.js'

export const boardStore = {
    state: {
        board: [],
        kanbanBoard: [],
        firstBoardId: null,
        miniBoards: null,
        isWorkspaceCollapsed: false,
        filterBy: {
            txt: '',
            userId: null
        },
        dataMap: {},
        colors: {},
        statuses: []
    },
    getters: {
        board({ board }) { return board },
        boardsTitles({ boardsTitles }) { return boardsTitles.map(board => board.title) },
        miniBoards({ miniBoards }) { return miniBoards },
        filterBy({ filterBy }) { return filterBy },
        filterMap({ board }) { return board.dataMap },
        kanbanBoard({ kanbanBoard }) { return kanbanBoard },

        isWorkspaceCollapsed({ isWorkspaceCollapsed }) { return isWorkspaceCollapsed },
        colors({ colors }) { return colors },
        statuses({ statuses }) { return statuses }
    },
    mutations: {
        setBoard(state, { boardData }) {
            if (boardData.board) state.board = boardData.board
            if (boardData.dataMap) state.dataMap = boardData.dataMap
            if (boardData.miniBoards) state.miniBoards = boardData.miniBoards
        },
        setKanbanBoard(state, { board }) {
            state.kanbanBoard = board
        },
        setFilter(state, { filter }) {
            state.filterBy = filter
        },
        setFirstBoardId(state, { boardId }) {
            state.firstBoardId = boardId
        },
        updateMiniBoard(state, { board }) {
            const idx = state.miniBoards.findIndex(mini => mini._id === board._id)
            state.miniBoards[idx].title = board.title
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        setStatuses(state, { statuses }) {
            state.statuses = statuses
        },
        saveTask(state, { savedTask }) {
            const { task, isFifo } = savedTask
            const groupIdx = state.board.groups.findIndex(group => group._id === task.groupId)
            if (groupIdx === -1) return null
            const taskIdx = state.board.groups[groupIdx].tasks.findIndex(anyTask => anyTask._id === task._id)
            if (taskIdx === -1) {
                if (isFifo) state.board.groups[groupIdx].tasks.push(task)
                else state.board.groups[groupIdx].tasks.unshift(task)
            } else state.board.groups[groupIdx].tasks[taskIdx] = task
        },
        removeTask(state, { task }) {
            const groupIdx = state.board.groups.findIndex(anyGroup => anyGroup._id === task.groupId)
            if (groupIdx === -1) return
            const taskIdx = state.board.groups[groupIdx].tasks.findIndex(anyTask => anyTask._id === task._id)
            if (taskIdx < 0) return
            state.board.groups[groupIdx].tasks.splice(taskIdx, 1)
        },
        addGroup(state, { group, isFifo }) {
            isFifo ? state.board.groups.unshift(group) : state.board.groups.push(group)
        },
        removeGroup(state, { group }) {
            var idx = state.board.groups.findIndex(anyGroup => anyGroup._id === group._id)
            state.board.groups.splice(idx, 1)
        },
        toggleWorkspace(state) {
            state.isWorkspaceCollapsed = !state.isWorkspaceCollapsed
            boardService.saveToSessionStorage('workspace', state.isWorkspaceCollapsed)
        },
        setWorkspaceState(state) {
            const workspaceState = boardService.loadFromSessionStorage('workspace')
            state.isWorkspaceCollapsed = JSON.parse(workspaceState)
        },
        setColors(state, { colors }) { state.colors = colors },
        updateLabels(state, { type, title, value, id }) {
            const colors = state.colors
            if (!type || !colors[type] || !id || (!title && !value)) return
            const idx = colors[type].findIndex(label => label._id === id)
            if (idx === -1) return
            if (title) colors[type][idx].title = title
            if (value) colors[type][idx].value = value
        }
    },
    actions: {
        async saveBoard({ commit }, { board }) {
            try {
                board.groups.forEach(group => group.tasks.forEach(task => task.groupId = group._id))
                commit({ type: 'setBoard', boardData: { board } })
                commit({ type: 'updateMiniBoard', board })
                board = await boardService.save(board)
                return board
            } catch (err) {
                console.log('boardStore: Error in saveBoard', err)
                throw err
            }
        },
        async addBoard({ commit }) {
            try {
                const data = await boardService.getEmptyBoard()
                const { board } = data
                commit({ type: 'setBoard', boardData: data })

                router.push('/board/' + board._id)
            } catch (err) {
                console.log('boardStore: Error in addBoard', err)
                throw err
            }
        },
        async queryBoard({ commit }, { filter }) {
            try {
                commit({ type: 'setFilter', filter })
                const boardData = await boardService.query(filter)
                commit({ type: 'setBoard', boardData })
            } catch (err) {
                console.log('Could not find board');
                throw new Error()
            }
        },
        async queryKanbanBoard(context, payload) {
            try {
                const { id } = payload
                const isFilter = payload.hasOwnProperty('filter')
                if (isFilter) {
                    var filter = { ...context.state.filterBy, ...payload.filter }
                    context.commit({ type: 'setFilter', filter })
                }
                const board = await boardService.queryKanbanBoard(id, filter)
                context.commit({ type: 'setKanbanBoard', board })
            } catch (err) {
                console.log('Could not find board');
                throw new Error()
            }

        },
        async getFirstBoard({ commit }) {
            try {
                const board = await boardService.query()
                commit({ type: 'setBoard', boardData: { board } })
            } catch (err) {
                console.log('Could not find board');
            }

        },
        async multiFilteredBoard({ commit }, { multiFilter, boardId }) {
            try {
                const board = await boardService.query({ id: boardId, ...multiFilter })
                commit({ type: 'setBoard', boardData: { board } })
            } catch (err) {
                console.log('Cannot load filtered board')
            }
        },
        async removeBoard({ commit }, { boardId }) {
            try {
                await boardService.remove(boardId)
                commit(getActionRemoveBoard(boardId))
            } catch (err) {
                console.log('boardStore: Error in removeBoard', err)
                throw err
            }
        },
        async getDataMap({ commit }, { boardId }) {
            try {
                const data = await boardService.getDataMap(boardId)
                commit({ type })
            } catch (err) {

            }
        },
        loadStatuses({ commit }) {
            const data = colors
            const statuses = data.status
            commit({ type: 'setStatuses', statuses })
        },
        saveLabel({ dispatch }, { type, title, value, id }) {
            if (colorService.save(type, title, value, id)) dispatch({ type: loadColors })

        },
        updateLabel({ dispatch }, { type, title, value, id }) {
            if (colorService.update(type, title, value, id)) dispatch({ type: loadLabels })
        },
        removeLabel({ dispatch }, { type, id }) {
            if (colorService.update(type, id)) dispatch({ type: loadLabels })
        }
    }
}