import { taskService } from '../services/task.service.js'

export const taskStore = {
    state() {
        return {
            taskToEdit: null,
            selectedTasks: [],
            priorities: [
                { title: 'Critical', color: '#333333', colorName: '$clr-blackish' },
                { title: 'High', color: '#401694', colorName: '$clr-dark-indigo' },
                { title: 'Medium', color: '#5559df', colorNmae: '$clr-indigo' },
                { title: 'Low', color: '#579bfc', colorName: '$clr-bright-blue' },
                { title: 'Default', color: '#c4c4c4', colorName: '$clr-explosive' }
            ],
            statuses: [
                { title: 'Done', color: '#00c875', colorName: '$clr-done-green' },
                { title: 'Working on it', color: '#fdac3d', colorName: '$clr-lgt-orng' },
                { title: 'Stuck', color: '#e2445c', colorName: '$clr-stuck-red' },
                { title: 'Unattained', color: '#0086c0', colorName: '$clr-dark-blue' },
                { title: 'Kaka', color: '#ffcb00', colorName: '$clr-yllw' },
                { title: 'Default', color: '#c4c4c4', colorName: '$clr-explosive' },
            ],
        }
    },
    mutations: {
        setTask(state, { taskToEdit }) {
            state.taskToEdit = taskToEdit
        },
        saveSelectedTasks(state, { taskId }) {
            if (state.selectedTasks.includes(taskId)) {
                const idx = state.selectedTasks.indexOf(taskId)
                state.selectedTasks.splice(idx, 1)
            } else {
                state.selectedTasks.push(taskId)
            }
        },
        unselectTasks(state) {
            state.selectedTasks = []
        }
    },
    getters: {
        taskToEdit({ taskToEdit }) { return taskToEdit },
        priorities({ priorities }) { return priorities },
        statuses({ statuses }) { return statuses },
        selectedTasks({ selectedTasks }) { return selectedTasks },
    },
    actions: {
        async loadTask(context, { taskId }) {
            try {
                return context.getters.board.groups.some(({ tasks }) => tasks.some(task => {
                    if (task._id === taskId) return task
                }))
            } catch (err) {
                console.log('could not load task');
            }
        },
        async saveTask({ commit }, { task }) {
            try {
                const savedTask = await taskService.save(task, false)
                let taskToSave = { task: savedTask, bool: false }
                return taskToSave
            } catch (err) {
                console.log(`Cannot save task: ${err}`)
            }
        },
        async saveEmptyTask({commit, getters}) {
            try {
                const groupId = getters.board.groups[0]._id
                const boardId = getters.board._id
                const task = await taskService.saveEmptyTask(groupId, boardId)
                const taskToSave = { task, bool: true }
                commit({ type: 'saveTask', taskToSave })
                return task
            } catch (err) {
                console.log(`Cannot save task: ${err}`)
            }
        },
        async removeTask({commit}, { task }) {
            try {
                commit({ type: 'removeTask', task })
                await taskService.remove(task)
                return task
            } catch (err) {
                console.log(`Cannot remove task: ${err}`)
            }
        }
    },
}