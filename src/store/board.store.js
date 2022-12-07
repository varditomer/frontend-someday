import { boardService } from '../services/board.service.local'
import { colorService } from '../services/color.service.js'
import { router } from '../router.js'
import { eventBus } from '../services/event-bus.service.js'

export function getActionRemoveBoard(boardId) {
    return {
        type: 'removeBoard',
        boardId
    }
}

export function getActionAddBoard(board) {
    return {
        type: 'addBoard',
        board
    }
}

export function getActionUpdateBoard(board) {
    return {
        type: 'updateBoard',
        board
    }
}

export function getActionAddBoardMsg(boardId) {
    return {
        type: 'addBoardMsg',
        boardId,
        txt: 'Stam txt'
    }
}

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
        kanbanBoard({ kanbanBoard }) { return kanbanBoard },
        boardsTitles({ boardsTitles }) { return boardsTitles },
        miniBoards({ miniBoards }) { return miniBoards },
        isWorkspaceCollapsed({ isWorkspaceCollapsed }) { return isWorkspaceCollapsed },
        filterBy({ filterBy }) { return filterBy },
        filterMap({ board }) { return boardService.getDataMap(board._id) },
        colors({ colors }) { return colors },
        statuses({ statuses }) { return statuses }
    },
    mutations: {
        setBoard(state, { board }) {
            state.board = board
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
        setMiniBoards(state, { miniBoards }) {
            state.miniBoards = miniBoards
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(c => c.id === board._id)
            state.boards.splice(idx, 1, board)
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        setStatuses(state, { statuses }) {
            state.statuses = statuses
        },
        addBoardMsg(state, { boardId, msg }) {
            const board = state.boards.find(board => board._id === boardId)
            if (!board.msgs) board.msgs = []
            board.msgs.push(msg)
        },
        saveTask(state, { taskToSave }) {
            console.log(`taskToSave:`, taskToSave)
            const { task, bool } = taskToSave
            const groupIdx = state.board.groups.findIndex(group => group._id === task.groupId)
            if (groupIdx === -1) return null
            const taskIdx = state.board.groups[groupIdx].tasks.findIndex(anyTask => anyTask._id === task._id)
            if (taskIdx === -1) {
                if (bool) state.board.groups[groupIdx].tasks.unshift(task)
                else state.board.groups[groupIdx].tasks.push(task)
                console.log(`task:`, task)
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
                console.log(board);
                board.groups.forEach(group => group.tasks.forEach(task => task.groupId = group._id))
                commit({ type: 'setBoard', board })
                board = await boardService.save(board)
                return board
            } catch (err) {
                console.log('boardStore: Error in saveBoard', err)
                throw err
            }
        },
        async addBoard(context) {
            try {
                const board = await boardService.add()
                await context.dispatch({ type: 'loadMiniBoards' })
                context.commit({ type: 'setBoard', board })
                router.push('/board/' + board._id)
            } catch (err) {
                console.log('boardStore: Error in addBoard', err)
                throw err
            }
        },
        async updateBoard({ commit }, { board }) {
            try {
                board = await boardService.save(board)
                commit({ type: 'setBoard', board })
                // commit(getActionUpdateBoard(board))
                return board
            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
                throw err
            }
        },
        async loadMiniBoards({ commit }, { filter }) {
            try {
                const miniBoards = await boardService.getMiniBoards(filter)
                commit({ type: 'setMiniBoards', miniBoards })
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
        async queryBoard(context, payload) {
            try {
                const { id } = payload
                const isFilter = payload.hasOwnProperty('filter')
                if (isFilter) var filter = { ...context.state.filterBy, ...payload.filter }
                context.commit({ type: 'setFilter', filter })
                const board = await boardService.queryBoard(id, filter)
                context.commit({ type: 'setBoard', board })
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
                const board = await boardService.getFirstBoard()
                commit({ type: 'setBoard', board })
            } catch (err) {
                console.log('Could not find board');
            }

        },
        async multiFilteredBoard({ commit }, { multiFilter, boardId }) {
            try {
                const board = await boardService.multiFilter(multiFilter, boardId)
                commit({ type: 'setBoard', board })
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
        async addBoardMsg({ commit }, { boardId, txt }) {
            try {
                const msg = await boardService.addBoardMsg(boardId, txt)
                commit({ type: 'addBoardMsg', boardId, msg })
            } catch (err) {
                console.log('boardStore: Error in addBoardMsg', err)
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
        async loadStatuses({ commit }) {
            const data = await colorService.query()
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