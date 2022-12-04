
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { randomColor } from '../data/color-picker.js'

const BOARD_STORAGE_KEY = 'board'

export const boardService = {
    getMiniBoards,
    queryBoard,
    getFirstBoard,
    getBoardsTitles,
    add,
    save,
    remove,
    saveToSessionStorage,
    loadFromSessionStorage
}
window.bs = boardService


async function getFirstBoard() {
    let boards = await storageService.query(BOARD_STORAGE_KEY)
    return boards[0]
}

async function getBoardsTitles() {
    let boards = await storageService.query(BOARD_STORAGE_KEY)
    return boards.map(board => board.title)
}

async function getMiniBoards(filter = null) {
    let boards = await storageService.query(BOARD_STORAGE_KEY)
    boards = boards.map(({ _id, title }) => ({ _id, title }))
    if (!filter) return boards
    const regex = new RegExp(filter, 'i')
    return boards.filter(board => regex.test(board.title))
}

async function queryBoard(boardId, filterBy = {}) {
    var board = await storageService.get(BOARD_STORAGE_KEY, boardId)
    var boardToShow = _filterByTxt(board, filterBy.txt)
    boardToShow = _filterByUser(boardToShow, filterBy.userId)
    if (!boardToShow) boardToShow = board
    return boardToShow
}

async function remove(boardId) {
    return await storageService.remove(BOARD_STORAGE_KEY, boardId)
}

async function save(board) {
    if (board?._id) {
        return await storageService.put(BOARD_STORAGE_KEY, board)
    } else {
        return await storageService.post(BOARD_STORAGE_KEY, _connectIds(board))
    }
}

function add() {
    return save(_getNewBoard())
}

function _filterByUser(board, userId) {
    if (!userId?.length) return board
    board.groups = board.groups.filter(group => {
        if (!group.tasks || !group.tasks.length) return false
        group.tasks = group.tasks.filter(task => {
            return task?.person?.some(p => p._id === userId)
        })
        return (group.tasks && group.tasks.length)
    })
    return board
}

function _filterByTxt(board, txt) {
    if (!txt) return board
    const regex = new RegExp(txt, 'ig')
    board.groups = board.groups.reduce((groupArr, group) => {
        const isGroupTitleMatch = regex.test(group.title)
        if (isGroupTitleMatch) {
            group.title = group.title.replaceAll(regex, match => `<span class="highlight">${match}</span>`)
        }

        group.tasks = group.tasks.reduce((taskArr, task) => {
            if (regex.test(task.title)) {
                task.title = task.title.replaceAll(regex, match => `<span class="highlight">${match}</span>`)
                taskArr.push(task)
            }
            return taskArr
        }, [])

        if (group.tasks?.length || isGroupTitleMatch) groupArr.push(group)
        return groupArr

    }, [])
    return board
}

function loadFromSessionStorage(key) {
    return sessionStorage.getItem(key)
}

function saveToSessionStorage(key, state) {
    sessionStorage.setItem(key, state)
}

function _getNewBoard() {
    const color1 = randomColor()
    const color2 = randomColor()
    return {
        title: 'New Board',
        archivedAt: Date.now(),
        createdBy: {
            _id: 0,
            fullname: 'Guest'
        },
        groups: [
            {
                _id: utilService.makeId(),
                title: 'Group Title',
                style: {
                    color: color1,
                    light: color1+'99'
                },
                tasks: [
                    {
                        _id: utilService.makeId(),
                        title: 'Item 1',
                        status: 'Working on it',
                        date: Date.now() + 24 * 60 * 60 * 1000,
                        comments: [
                            {
                                _id: utilService.makeId(),
                                createdAt: Date.now(),
                                byMember: {
                                    _id: 0,
                                    fullname: 'Guest',
                                }
                            },
                        ]
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Item 2',
                        status: 'Done',
                        date: Date.now() - 24 * 60 * 60 * 1000,
                        comments: []
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Item 3',
                        date: Date.now() - 24 * 60 * 60 * 1000,
                        comments: [
                            {
                                _id: utilService.makeId(),
                                createdAt: Date.now(),
                                byMember: {
                                    _id: 0,
                                    fullname: 'Guest',
                                }
                            },
                        ]
                    }
                ]

            },
            {
                _id: utilService.makeId(),
                title: 'Group Title',
                style: {
                    color: color2,
                    light: color2+'99'
                },
                tasks: [
                    {
                        _id: utilService.makeId(),
                        title: 'Item 4',
                        date: Date.now() - 24 * 60 * 60 * 1000,
                        comments: []
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Item 5',
                        date: Date.now() - 3 * 24 * 60 * 60 * 1000,
                        comments: []
                    }
                ]
            }
        ],
        cmpsOrder: ['status', 'date']
    }
}

const boards = [
    {
        _id: 'b101',
        title: 'Flow',
        isStarred: true,
        archivedAt: 1669741716944,
        createdBy: {
            _id: 'u102',
            fullname: 'Refael Abramov',
            imgUrl: `src/assets/imgs/refael-avatar.png`
        },
        members: [
            {
                _id: 'u102',
                fullname: 'Refael Abramov',
                imgUrl: `src/assets/imgs/refael-avatar.png`
            },
            {
                _id: 'u103',
                fullname: 'Tomer Vardi',
                imgUrl: 'src/assets/imgs/tomer-avatar.png'
            },
            {
                _id: 'u104',
                fullname: 'Ronen Boxer',
                imgUrl: 'src/assets/imgs/ronen-avatar.png'
            },
        ],
        groups: [
            {
                _id: 'sc7aw',
                title: 'Backlog',
                boardId: 'b101',
                archivedAt: 1589983468418,
                style: {
                    color: 'rgb(151,99,212)',
                    light: 'rgba(151,99,212,0.6)'
                },
                tasks: [
                    {
                        _id: 'xwe45',
                        boardId: 'b101',
                        groupId: 'sc7aw',
                        title: 'Present Monday',
                        status: 'Unattained',
                        priority: 'High',
                        date: 1590999817436,
                        numbers: 666,
                        text: 'Present Monday today',
                        timeline: {
                            start: {
                                month: 10,
                                day: 20,
                                year: 2022
                            },
                            end: {
                                month: 11,
                                day: 12,
                                year: 2022
                            }
                        },
                        comments: [
                            {
                                _id: 'sbr12',
                                taskId: 'xwe45',
                                txt: 'Good luck and have fun',
                                createdAt: 1590999817436,
                                byMember: {
                                    _id: 'u104',
                                    fullname: 'Ronen Boxer',
                                    imgUrl: 'src/assets/imgs/ronen-avatar.png'
                                }
                            },
                            {
                                _id: 'ZePnm',
                                taskId: 'xwe45',
                                txt: 'Good luck',
                                createdAt: 1590999817436,
                                byMember: {
                                    _id: 'u103',
                                    fullname: 'Tomer Vardi',
                                    imgUrl: 'src/assets/imgs/tomer-avatar.png'
                                }
                            }
                        ],
                        person: [
                            {
                                _id: 'u103',
                                fullname: 'Tomer Vardi',
                                imgUrl: 'src/assets/imgs/tomer-avatar.png'
                            }
                        ],
                        link: {
                            url: 'https://sprint-4-company.monday.com/boards/3590839107/pulses/3590900012',
                            title: 'Monday'
                        }
                    },
                    {
                        _id: 'wdec4',
                        boardId: 'b101',
                        groupId: 'sc7aw',
                        title: 'Upload project to Github',
                        person: [
                            {
                                _id: 'u104',
                                fullname: 'Ronen Boxer',
                                imgUrl: 'src/assets/imgs/ronen-avatar.png'
                            }
                        ],
                        status: 'Unattained',
                        priority: 'High',
                        date: 1590999817436,
                        link: {
                            url: 'https://sprint-4-company.monday.com/boards/3590839107/pulses/3590923229',
                            title: 'Monday'
                        },
                        timeline: {
                            start: {
                                month: 10,
                                day: 30,
                                year: 2022
                            },
                            end: {
                                month: 11,
                                day: 13,
                                year: 2022
                            }
                        }
                    },
                    {
                        _id: 'bg754',
                        boardId: 'b101',
                        groupId: 'sc7aw',
                        title: 'Make the project ours',
                        status: 'Working on it',
                        priority: 'Critical',
                        date: 1590999817436,
                        timeline: {
                            start: {
                                month: 11,
                                day: 3,
                                year: 2022
                            },
                            end: {
                                month: 11,
                                day: 13,
                                year: 2022
                            }
                        },
                        person: [
                            {
                                _id: 'u102',
                                fullname: 'Refael Abramov',
                                imgUrl: `src/assets/imgs/refael-avatar.png`
                            }
                        ],


                    },
                    {
                        _id: 's0dme',
                        boardId: 'b101',
                        groupId: 'sc7aw',
                        title: 'Create Features',
                        person: [
                            {
                                _id: 'u102',
                                fullname: 'Refael Abramov',
                                imgUrl: `src/assets/imgs/refael-avatar.png`
                            },
                            {
                                _id: 'u103',
                                fullname: 'Tomer Vardi',
                                imgUrl: 'src/assets/imgs/tomer-avatar.png'
                            },
                            {
                                _id: 'u104',
                                fullname: 'Ronen Boxer',
                                imgUrl: 'src/assets/imgs/ronen-avatar.png'
                            }
                        ],
                        status: 'Unattained',
                        date: 1590999817436,
                        priority: 'Low',
                        timeline: {
                            start: {
                                month: 10,
                                day: 12,
                                year: 2022
                            },
                            end: {
                                month: 11,
                                day: 30,
                                year: 2022
                            }
                        },
                    }
                ],
            },
            {
                _id: 'sd93d',
                title: 'Working on it',
                boardId: 'b101',
                style: {
                    color: '#fdac3d',
                    light: '#fdac3d99',
                },
                tasks: [
                    {
                        _id: 'xa8sd',
                        boardId: 'b101',
                        groupId: 'sd93d',
                        title: 'Get familiar with features',
                        date: 1589983468418,
                        priority: 'Critical',
                        status: 'Done',
                        person: [
                            {
                                _id: 'u102',
                                fullname: 'Refael Abramov',
                                imgUrl: `src/assets/imgs/refael-avatar.png`
                            }
                        ],
                        timeline: {
                            start: {
                                month: 11,
                                day: 1,
                                year: 2022
                            },
                            end: {
                                month: 1,
                                day: 1,
                                year: 2023
                            }
                        },
                    },
                    {
                        _id: 'adx8w',
                        boardId: 'b101',
                        groupId: 'sd93d',
                        title: 'Build demo data',
                        date: 1589983468418,
                        timeline: {
                            start: {
                                month: 0,
                                day: 1,
                                year: 2023
                            },
                            end: {
                                month: 0,
                                day: 10,
                                year: 2023
                            }
                        },
                        priority: 'Critical',
                        status: 'Stuck',
                        comments: [
                            {
                                _id: 'ZyPnm',
                                taskId: 'adc8w',
                                txt: '@Tomer Vardi where is my coffee?',
                                createdAt: 1590999817436,
                                byMember: {
                                    _id: 'u104',
                                    fullname: 'Ronen Boxer',
                                    imgUrl: 'src/assets/imgs/ronen-avatar.png'
                                }
                            },
                            {
                                _id: 'ZqPnm',
                                taskId: 'adm8w',
                                txt: '@Ronen Boxer in a minute',
                                attachment: 'https://sprint-4-company.monday.com/protected_static/14268178/resources/683016563/big-JPEG_29112022_163653_2246356385772545662.jpg',
                                createdAt: 1590999817436,
                                byMember: {
                                    _id: 'u103',
                                    fullname: 'Tomer Vardi',
                                    imgUrl: 'src/assets/imgs/tomer-avatar.png'
                                }
                            },
                        ],
                        person: [
                            {
                                _id: 'u103',
                                fullname: 'Tomer Vardi',
                                imgUrl: 'src/assets/imgs/tomer-avatar.png'
                            },
                            {
                                _id: 'u104',
                                fullname: 'Ronen Boxer',
                                imgUrl: 'src/assets/imgs/ronen-avatar.png'
                            },
                        ]
                    },
                    {
                        _id: 'xx8sd',
                        boardId: 'b101',
                        groupId: 'sd93d',
                        title: 'Build flow',
                        date: 1589983468418,
                        timeline: {
                            start: {
                                month: 9,
                                day: 30,
                                year: 2022
                            },
                            end: {
                                month: 11,
                                day: 13,
                                year: 2022
                            }
                        },
                        priority: 'Critical',
                        status: 'Done',
                        person: [
                            {
                                _id: 'u104',
                                fullname: 'Ronen Boxer',
                                imgUrl: 'src/assets/imgs/ronen-avatar.png'
                            },
                        ]
                    },
                ],

            },
            {
                _id: 'asj23',
                boardId: 'b101',
                title: 'Done',
                createdAt: 234850123,
                style: {
                    color: '#ba3254',
                    light: '#ba325499',
                },
                'byMember':
                {
                    _id: 'u104',
                    fullname: 'Ronen Boxer',
                    imgUrl: 'src/assets/imgs/ronen-avatar.png'
                },
                tasks: [
                    {
                        _id: 'sdc3r',
                        boardId: 'b101',
                        groupId: 'asj23',
                        title: 'First team meeting',
                        date: 1589983468418,
                        timeline: {
                            start: {
                                month: 11,
                                day: 1,
                                year: 2022
                            },
                            end: {
                                month: 11,
                                day: 20,
                                year: 2022
                            }
                        },
                        priority: 'Medium',
                        status: 'Working on it',
                        person: [
                            {
                                _id: 'u103',
                                fullname: 'Tomer Vardi',
                                imgUrl: 'src/assets/imgs/tomer-avatar.png'
                            }
                        ]
                    }
                ]
            },
            {
                _id: 'ascw2',
                boardId: 'b101',
                title: 'Near future tasks',
                style: {
                    color: '#794bd1',
                    light: '#794bd199',
                },
                tasks: [
                    {
                        _id: 'dcwq34',
                        boardId: 'b101',
                        groupId: 'ascw2',
                        title: 'Meet up with team leader',
                        date: 1589983468418,
                        timeline: {
                            start: {
                                month: 10,
                                day: 1,
                                year: 2022
                            },
                            end: {
                                month: 11,
                                day: 17,
                                year: 2022
                            }
                        },
                        status: 'Stuck',
                        priority: 'High',
                        person: [
                            {
                                _id: 'u102',
                                fullname: 'Refael Abramov',
                                imgUrl: `src/assets/imgs/refael-avatar.png`
                            }
                        ]
                    },
                    {
                        _id: 'sdc73',
                        boardId: 'b101',
                        groupId: 'ascw2',
                        title: 'Come up with design _ideas',
                        date: 1589983468418,
                        timeline: {
                            start: {
                                month: 11,
                                day: 3,
                                year: 2022
                            },
                            end: {
                                month: 0,
                                day: 19,
                                year: 2023
                            }
                        },
                        status: 'Working on it',
                        priority: 'Low',
                        person: [
                            {
                                _id: 'u102',
                                fullname: 'Refael Abramov',
                                imgUrl: `src/assets/imgs/refael-avatar.png`
                            },
                            {
                                _id: 'u103',
                                fullname: 'Tomer Vardi',
                                imgUrl: 'src/assets/imgs/tomer-avatar.png'
                            },
                            {
                                _id: 'u104',
                                fullname: 'Ronen Boxer',
                                imgUrl: 'src/assets/imgs/ronen-avatar.png'
                            },
                        ]
                    },
                    {
                        _id: 'dcwo34',
                        boardId: 'b101',
                        groupId: 'ascw2',
                        title: 'Think about app architecture',
                        date: 1589983468418,
                        timeline: {
                            start: {
                                month: 10,
                                day: 30,
                                year: 2022
                            },
                            end: {
                                month: 11,
                                day: 3,
                                year: 2022
                            }
                        },
                        status: 'Unattained',
                        priority: 'Critical',
                        members: [
                            {
                                _id: 'u102',
                                fullname: 'Refael Abramov',
                                imgUrl: `src/assets/imgs/refael-avatar.png`
                            },
                            {
                                _id: 'u103',
                                fullname: 'Tomer Vardi',
                                imgUrl: 'src/assets/imgs/tomer-avatar.png'
                            }
                        ]
                    },
                ]
            },
            {
                _id: 'a7scq',
                boardId: 'b101',
                title: 'Bugs',
                createdAt: 238392842234,
                style: {
                    color: '#4fccc6',
                    light: '#4fccc699',
                },
                byMember: {
                    _id: 'u103',
                    fullname: 'Tomer Vardi',
                    imgUrl: 'src/assets/imgs/tomer-avatar.png'
                },
                tasks: []
            }
        ],
        activities: [
            {
                _id: 'a101',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u102',
                    fullname: 'Refael Abramov',
                    imgUrl: `src/assets/imgs/refael-avatar.png`
                },
                tasks: [
                    {
                        _id: 'c101',
                        title: 'Replace Logo'
                    }
                ],
            }
        ],
        cmpsOrder: ['person', 'priority', 'status', 'date', 'text', 'numbers', 'timeline', 'link']
    },
    {
        _id: 'b102',
        title: 'Robot dev proj',
        isStarred: false,
        archivedAt: 1589983468418,
        createdBy: {
            _id: 'u102',
            fullname: 'Refael Abramov',
            imgUrl: `src/assets/imgs/refael-avatar.png`
        },
        members: [
            {
                _id: 'u103',
                fullname: 'Tomer Vardi',
                imgUrl: 'src/assets/imgs/tomer-avatar.png'
            },
            {
                _id: 'u102',
                fullname: 'Refael Abramov',
                imgUrl: `src/assets/imgs/refael-avatar.png`
            }
        ],
        groups: [
            {
                _id: 'g101',
                boardId: 'b102',
                title: 'PR conference',
                archivedAt: 1589983468418,
                style: '#ff642e',
                tasks: [
                    {
                        _id: 'x2dvp',
                        boardId: 'b102',
                        groupId: 'g101',
                        title: 'Talk to Oprah',
                        status: 'Stuck',
                        priority: 'Critical',
                        person: [
                            {
                                _id: 'u102',
                                fullname: 'Refael Abramov',
                                imgUrl: `src/assets/imgs/refael-avatar.png`
                            },
                            {
                                _id: 'u103',
                                fullname: 'Tomer Vardi',
                                imgUrl: 'src/assets/imgs/tomer-avatar.png'
                            },
                            {
                                _id: 'u104',
                                fullname: 'Ronen Boxer',
                                imgUrl: 'src/assets/imgs/ronen-avatar.png'
                            },
                        ]
                    },
                    {
                        _id: 'c102',
                        boardId: 'b102',
                        groupId: 'g101',
                        title: 'Get rich',
                        status: 'Working on it',
                        priority: 'High',
                        person: [
                            {
                                _id: 'u103',
                                fullname: 'Tomer Vardi',
                                imgUrl: 'src/assets/imgs/tomer-avatar.png'
                            },
                            {
                                _id: 'u104',
                                fullname: 'Ronen Boxer',
                                imgUrl: 'src/assets/imgs/ronen-avatar.png'
                            },
                        ]
                    }
                ]
            },
            {
                _id: 'g102',
                boardId: 'b102',
                title: 'Digital',
                archivedAt: 1589983468418,
                'createdBy':
                {
                    _id: 'u103',
                    fullname: 'Tomer Vardi',
                    imgUrl: 'src/assets/imgs/tomer-avatar.png'
                },
                style: '#047f4b',
                tasks: [
                    {
                        _id: 'c103',
                        boardId: 'b102',
                        groupId: 'g102',
                        title: 'Do that',
                        status: 'Unattained',
                        priority: 'Medium',
                        date: 1589983468418,
                        person: [
                            {
                                _id: 'u102',
                                fullname: 'Refael Abramov',
                                imgUrl: `src/assets/imgs/refael-avatar.png`
                            },
                            {
                                _id: 'u104',
                                fullname: 'Ronen Boxer',
                                imgUrl: 'src/assets/imgs/ronen-avatar.png'
                            },
                        ]
                    },
                    {
                        _id: 'c104',
                        boardId: 'b102',
                        groupId: 'g102',
                        title: 'Help me',
                        status: 'Working on it', // monday
                        priority: 'Low',
                        description: 'description',
                        comments: [
                            {
                                _id: 'ZoPnm',
                                taskId: 'c104',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436,
                                byMember: {
                                    _id: 'u102',
                                    fullname: 'Refael Abramov',
                                    imgUrl: `src/assets/imgs/refael-avatar.png`
                                }
                            }
                        ],
                        checklists: [
                            {
                                _id: 'YEhmF',
                                title: 'Checklist',
                                todos: [
                                    {
                                        _id: '212jX',
                                        title: 'To Do 1',
                                        isDone: false
                                    }
                                ]
                            }
                        ],
                        memberIds: ['u101', 'u102'],
                        labelIds: ['l101', 'l102'],
                        dueDate: 16156215211,
                        byMember: {
                            _id: 'u102',
                            fullname: 'Refael Abramov',
                            imgUrl: `src/assets/imgs/refael-avatar.png`
                        },
                        person: [
                            {
                                _id: 'u103',
                                fullname: 'Tomer Vardi',
                                imgUrl: 'src/assets/imgs/tomer-avatar.png'
                            }
                        ]
                    }
                ],
            }
        ],
        activities: [
            {
                _id: 'sdc83',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u104',
                    fullname: 'Ronen Boxer',
                    imgUrl: 'src/assets/imgs/ronen-avatar.png'
                },
                tasks: [
                    {
                        _id: 'cla3c',
                        title: 'Replace Logo'
                    }
                ],
            }
        ],
        cmpsOrder: ['person', 'priority', 'status', 'date', 'text', 'numbers', 'timeline', 'link']
    }
]

function _connectIds(board) {
    board._id = utilService.makeId()
    board.groups.forEach(group => {
        group._id = utilService.makeId()
        group.boardId = board._id
        group.tasks.forEach(task => {
            task._id = utilService.makeId()
            task.boardId = board._id
            task.groupId = group._id
        })
    })
    return board
}

// TEST DATA
// utilService.saveToStorage(BOARD_STORAGE_KEY, boards)