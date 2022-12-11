import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { store } from '../store/store'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    loginGoogle,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    query,
    remove,
    update,
    changeScore
}

window.userService = userService


// function getUsers() {
//     return [
//         {
//             "_id": "u102",
//             "fullname": "Refael Abramov",
//             "imgUrl": "src/assets/imgs/refael-avatar.png",
//             "color": "rgb(236, 105, 192)",
//             "isAdmin": true,
//             "contact": {
//                 "mail": "refaelavramov@gmail.com"
//             }
//         },
//         {
//             "_id": "u103",
//             "fullname": "Tomer Vardi",
//             "imgUrl": "http://res.cloudinary.com/someday/image/upload/v1670708469/tomer-avatar_e1olwt.png",
//             "color": "rgb(55, 124, 80)",
//             "isAdmin": true,
//             "contact": {
//                 "mail": "tomervardi@gmail.com"
//             }
//         },
//         {
//             "_id": "u104",
//             "fullname": "Ronen Boxer",
//             "imgUrl": "http://res.cloudinary.com/someday/image/upload/v1670765366/ronen-avatar_b077bs.png",
//             "color": "rgb(238, 109, 64)",
//             "isAdmin": true,
//             "contact": {
//                 "mail": "ronenboxer@gmail.com"
//             }
//         }
//     ]
//     // return httpService.get(`user`)
// }

function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'setWatchedUser', user })
}

async function query() {
    const user = await httpService.get(`user/`)

    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return getUsers()
}

function remove(userId) {
    return storageService.remove('user/', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    await storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function loginGoogle(userCred) {

    const user = await httpService.post('auth/loginGoogle', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    let loggedinUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    if (!loggedinUser) loggedinUser = {
        _id: '0', fullname: 'Guest', imgUrl: `https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png
    ` }
    saveLocalUser(loggedinUser)
    return loggedinUser
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



