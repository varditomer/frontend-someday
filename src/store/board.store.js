import { boardService } from '../services/board.service.local'
import { router } from '../router.js'

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
        firstBoardId: null,
        miniBoards: null,
    },
    getters: {
        board({ board }) { return board },
        firstBoardId({ firstBoardId }) { return firstBoardId },
        boardsTitles({ boardsTitles }) { return boardsTitles },
        miniBoards({ miniBoards }) { return miniBoards },
    },
    mutations: {
        setBoard(state, { board }) {
            state.board = board
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
        addBoardMsg(state, { boardId, msg }) {
            const board = state.boards.find(board => board._id === boardId)
            if (!board.msgs) board.msgs = []
            board.msgs.push(msg)
        },
        saveTask(state, { taskToSave }) {
            const board = state.board
            const group = board.groups.find(anyGroup => anyGroup._id === taskToSave.task.groupId)
            const idx = group.tasks.findIndex(anyTask => anyTask._id === taskToSave.task?._id)
            if (idx === -1) {
                if (!taskToSave.bool) group.tasks.push(taskToSave.task)
                else group.tasks.unshift(taskToSave.task)
            }
            else (group.tasks[idx] = taskToSave.task)
        },
        removeTask(state, {task}) {
            const group = state.board.groups.find(anyGroup => anyGroup._id === task.groupId)
            const idx = group.tasks.findIndex(anyTask => anyTask._id === task._id)
            console.log(`task:`, task)
            console.log(`idx:`, idx)
            if (idx<0) return
            group.tasks.splice(idx,1)
        }
    },
    actions: {
        async saveBoard({ commit }, { board }) {
            try {
                board = await boardService.save(board)
                commit(getActionAddBoard(board))
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
                commit(getActionUpdateBoard(board))
                return board
            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
                throw err
            }
        },
        async loadMiniBoards({ commit }) {
            try {
                const miniBoards = await boardService.getMiniBoards()
                commit({ type: 'setMiniBoards', miniBoards })
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
        async getBoardById({ commit }, { id }) {
            try {
                const board = await boardService.getById(id)
                commit({ type: 'setBoard', board })
            } catch (err) {
                console.log('Could not find board');
            }

        },
        async getFirstBoardId({ commit }) {
            try {
                const boardId = await boardService.getFirstBoardId()
                commit({ type: 'setFirstBoardId', boardId })
            } catch (err) {
                console.log('Could not find board');
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


    }
}