export const status = {
    Done: '$clr-lgt-teal',
    'Working on it': '$clr-lgt-orng',
    Stuck: '$clr-red',
    Unattained: '$clr-drk-blue',
    kaka: '$clr-yllw',
    _none: '$clr-lgt-gry'
}

export const priority = {
    High: '$priority-red',
    Medium: '$priority-prpl',
    Low: '$priority-blue',
    Critical: '$priority-blc',
    default: '$priority-gry'
}

export const boardDB = [
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
                        comments: [
                            {
                                _id: 'ZdPnm',
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
                                _id: 'ZdPnm',
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
                        persons: [
                            {
                                _id: 'u103',
                                fullname: 'Tomer Vardi',
                                imgUrl: 'src/assets/imgs/tomer-avatar.png'
                            }
                        ],
                        status: 'Unattained',
                        date: 1590999817436,
                        priority: 'High',
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
                        persons: [

                            {
                                _id: 'u104',
                                fullname: 'Ronen Boxer',
                                imgUrl: 'src/assets/imgs/ronen-avatar.png'
                            }
                        ],
                        status: 'Unattained',
                        date: 1590999817436,
                        priority: 'High',
                        link: {
                            url: 'https://sprint-4-company.monday.com/boards/3590839107/pulses/3590923229',
                            title: 'Monday'
                        },
                    },
                    {
                        _id: 'bg754',
                        boardId: 'b101',
                        groupId: 'sc7aw',
                        title: 'Make the project ours',
                        persons: [
                            {
                                _id: 'u102',
                                fullname: 'Refael Abramov',
                                imgUrl: `src/assets/imgs/refael-avatar.png`
                            }
                        ],
                        status: 'Unattained',
                        date: 1590999817436,
                        priority: 'Medium',
                    },
                    {
                        _id: 's0dme',
                        boardId: 'b101',
                        groupId: 'sc7aw',
                        title: 'Create Features',
                        persons: [
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
                        timeline: 1591086217436
                    }
                ],
                style: {}
            },
            {
                _id: 'sd93d',
                title: 'Working on it',
                boardid: 'g199',
                style: {
                    color: 'rgb(242,174,84)',
                    light: 'rgba(242,174,84,0.6)'
                },
                tasks: [
                    {
                        _id: 'xa8sd',
                        boardId: 'b101',
                        groupId: 'sd93d',
                        title: 'Get familiar with features',
                        date: 1589983468418,
                        priority: 'Critical'
                    },
                    {
                        _id: 'adc8w',
                        boardId: 'b101',
                        groupId: 'sd93d',
                        title: 'Build demo data',
                        date: 1589983468418,
                        priority: 'Critical',
                        comments: [
                            {
                                _id: 'ZdPnm',
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
                                _id: 'ZdPnm',
                                taskId: 'adc8w',
                                txt: '@Ronen Boxer in a minute',
                                attachment: 'https://sprint-4-company.monday.com/protected_static/14268178/resources/683016563/big-JPEG_29112022_163653_2246356385772545662.jpg',
                                createdAt: 1590999817436,
                                byMember: {
                                    _id: 'u103',
                                    fullname: 'Tomer Vardi',
                                    imgUrl: 'src/assets/imgs/tomer-avatar.png'
                                }
                            },
                        ]
                    },
                    {
                        _id: 'xa8sd',
                        boardId: 'b101',
                        groupId: 'sd93d',
                        title: 'Build flow',
                        date: 1589983468418,
                        priority: 'Critical'
                    },
                ],
            },
            {
                _id: 'asj23',
                title: 'Done',
                createdAt: 234850123,
                style: {
                    color: 'rgb(236,105,192)',
                    light: 'rgba(236,105,192,0.6)'
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
                    }
                ]
            },
            {
                _id: 'ascw2',
                title: 'Near future tasks',
                tasks: [
                    {
                        _id: 'dcwq34',
                        boardId: 'b101',
                        groupId: 'ascw2',
                        title: 'Meet up with team leader',
                        date: 1589983468418,
                    },
                    {
                        _id: 'sdc73',
                        boardId: 'b101',
                        groupId: 'ascw2',
                        title: 'Come up with design _ideas',
                        date: 1589983468418,
                    },
                    {
                        _id: 'dcwq34',
                        boardId: 'b101',
                        groupId: 'ascw2',
                        title: 'Think about app architecture',
                        date: 1589983468418,
                    },
                ]
            },
            {
                _id: 'a7scq',
                title: 'Bugs',
                createdAt: 238392842234,
                style: {
                    color: 'rgb(55,124,80)'
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
        cmpsOrder: ['persons', 'status', 'date', 'text', 'numbers', 'timline', 'link']
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
                style: {
                    color: 'rgb(126,203,250)'
                },
                tasks: [
                    {
                        _id: 'c101',
                        boardId: 'b102',
                        groupId: 'g101',
                        title: 'Talk to Oprah'
                    },
                    {
                        _id: 'c102',
                        boardId: 'b102',
                        groupId: 'g101',
                        title: 'Get rich'
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
                style: {
                    color: 'rgb(90,196,125)'
                },
                tasks: [
                    {
                        _id: 'c103',
                        boardId: 'b102',
                        groupId: 'g102',
                        title: 'Do that',
                        date: 1589983468418,
                    },
                    {
                        _id: 'c104',
                        boardId: 'b102',
                        groupId: 'g102',
                        title: 'Help me',
                        status: 'Working on it', // monday
                        priority: 'high',
                        description: 'description',
                        comments: [
                            {
                                _id: 'ZdPnm',
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
                    }
                ],
            }
        ],
        activities: [
            {
                _id: 'a101',
                txt: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u104',
                    fullname: 'Ronen Boxer',
                    imgUrl: 'src/assets/imgs/ronen-avatar.png'
                },
                tasks: [
                    {
                        _id: 'c101',
                        title: 'Replace Logo'
                    }
                ],
            }
        ],
        cmpsOrder: ['status-picker', 'member-picker', 'date-picker']
    }
]