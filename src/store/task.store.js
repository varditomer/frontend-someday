import { taskService } from '../services/task.service.js'

export const taskStore = {
    state() {
        return {
            taskToEdit: null
        }
    },
    mutations: {
        setTask(state, { taskToEdit }) {
            state.taskToEdit = taskToEdit
        },
    },
    getters: {
        taskToEdit({ taskToEdit }) { return taskToEdit },
    },
    actions: {
        async loadTask(context, { taskId }) {
            try {
                setTimeout(() => {
                    return context.getters.board.groups.some(({ tasks }) => tasks.some(task => {
                        if (task._id === taskId) return task
                    }))
                }, 500)
            } catch (err) {
                console.log('could not load task');
            }
        },
        async saveTask({ commit }, { task }) {
            try {
                const savedTask = await taskService.save(task, false)
                const taskToSave = { task, bool: false }
                commit({ type: 'saveTask', taskToSave })
                return savedTask
            } catch (err) {
                console.log(`Cannot save task: ${err}`)
            }
        },
        async saveEmptyTask(context) {
            try {
                const groupId = context.getters.board.groups[0]._id
                const boardId = context.getters.board._id
                const task = await taskService.saveEmptyTask(groupId, boardId)
                const taskToSave = { task, bool: true }
                context.commit({ type: 'saveTask', taskToSave })
                return task
            } catch (err) {
                console.log(`Cannot save task: ${err}`)
            }
        },
        async removeTask(context, {task}) {
            try {
                console.log(`task-store:`, task)
                context.commit({ type: 'removeTask', task })
                const removedTask = await taskService.remove(task)
                console.log(`removed task`, removedTask)
                return task
            } catch (err) {
                console.log(`Cannot remove task: ${err}`)
            }
        }
    },
}