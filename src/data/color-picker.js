import { getRandomInt } from '../services/util.service.js'

export const colors = {
    '$clr-done-green': '#00c875',
    '$clr-lgt-grn': '#9cd226',
    '$clr-drk-teal': '#165a63',
    '$clr-lgt-teal': '#4fccc6',
    '$clr-mstrd': '#cab741',
    '$clr-yllw': '#ffcb00',
    '$clr-vlt': '#401794',
    '$clr-drk-prpl': '#794bd1',
    '$clr-egplnt': '#7e3b8a',
    '$clr-lgt-prpl': '#a25cdc',
    '$clr-llch': '#bda8f9',
    '$clr-gry-prpl': '#9d99b8',
    '$clr-dark-blue': '#0086c0',
    '$clr-bright-blue': '#579bfc',
    '$clr-nvy': '#2a75e4',
    '$clr-indigo': '#5559df',
    '$clr-dark_indigo': '#401694',
    '$clr-lgt-blue': '#65ccff',
    '$clr-trqs': '#a1e2f7',
    '$clr-sky-blue': '#a9bee8',
    '$clr-gry-blue': '#9bacbd',
    '$clr-stuck-red': '#e2445c',
    '$clr-red': '#fe7575',
    '$clr-slmn': '#feaead',
    '$clr-fcci': '#fe178a',
    '$clr-drk-pink': '#fe5bc4',
    '$clr-pink': '#d973b0',
    '$clr-lgt-pink': '#faa1f0',
    '$clr-dark-orange': '#ff642e',
    '$clr-pch': '#bc816e',
    '$clr-lgt-orng': '#fdac3d',
    '$clr-lgt-brwn': '#ac977a',
    '$clr-drk-brwn': '#7f5347',
    '$clr-mud': '#553e3d',
    '$clr-explosive': '#c4c4c4',
    '$clr-drk-gry': '#808080',
    '$clr-blck': '#333333',

    '$priority-blc': '#333',
    '$priority-red': '#ff9191',
    '$priority-prpl': '#777ae5',
    '$priority-blue': '#79affd',
    '$priority-gry': '#797e93',
    '$brdr-clr': '#d0d5e4'
}

export function randomColor() {
    const colorNames = Object.keys(colors)
    const randomIdx = getRandomInt(0, colorNames.length)
    const colorName = colorNames[randomIdx]
    return colors[colorName]

}