export const focusDirective = {
  mounted: (el) => {
    el.focus()
  },
}
export const condFocusDirective = {
  mounted: (el, boolean) => {
    if (!boolean.value) return
    console.log(`true:`,)
    el.focus()
  },
}

export const svgIconDirective = {
  mounted(el, binding) {
    el.innerHTML = svgsIcons[binding.value]
    el.style.display = 'inline-flex'
    el.style.justifyContent = 'center'
    el.style.alignItems = 'center'

  }
}

export const customOnDirective = {
  mounted(el, binding) {
    const type = binding.arg
    const fn = binding.value
    el.addEventListener(type, fn)
  },
}

export const clickOutsideDirective = {
  mounted(el, { value: cb }) {
    el.clickOutside = ({ clientX, clientY }) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      if (
        !(clientX > left &&
          clientX < left + width &&
          clientY > top &&
          clientY < top + height)
      ) {
        cb()
        console.log('outside')
      } else {
        console.log('inside')
      }
    }
    setTimeout(() => {
      document.addEventListener('click', el.clickOutside)
    }, 0)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutside)
  },
}

export const close = {
  mounted(el, { value }, x) {
    console.log(x)
    el.onkeyup = () => {
      const color = _getRandomColor()
      el.style.backgroundColor = color
      el.style.color = _isDarkColor(color) ? 'white' : 'black'
    }
  },
}



function _isDarkColor(c) {
  c = c.substring(1) // strip #
  const rgb = parseInt(c, 16) // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff // extract red
  const g = (rgb >> 8) & 0xff // extract green
  const b = (rgb >> 0) & 0xff // extract blue
  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

  return luma < 100
}

function _getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const svgsIcons = {
  add: `<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" class="icon_component icon-button-padding icon_component--no-focus-style"><path d="M10.75 6C10.75 5.58579 10.4142 5.25 10 5.25C9.58579 5.25 9.25 5.58579 9.25 6V9.25H6C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75H9.25V14C9.25 14.4142 9.58579 14.75 10 14.75C10.4142 14.75 10.75 14.4142 10.75 14V10.75H14C14.4142 10.75 14.75 10.4142 14.75 10C14.75 9.58579 14.4142 9.25 14 9.25H10.75V6Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  addbig: `<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" class="icon_component icon-button-padding icon_component--no-focus-style"><path d="M10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V9.25H3C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75H9.25V17C9.25 17.4142 9.58579 17.75 10 17.75C10.4142 17.75 10.75 17.4142 10.75 17V10.75H17C17.4142 10.75 17.75 10.4142 17.75 10C17.75 9.58579 17.4142 9.25 17 9.25H10.75V3Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  collapse: `<svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18" aria-hidden="true" class="icon_component menu-icon-svg icon_component--no-focus-style"><path d="M6.16376 4.22C5.99557 4.0151 5.68881 3.99367 5.48773 4.17497C5.28705 4.35499 5.26518 4.66771 5.43096 4.8775L5.4353 4.88299L7.63897 7.22958C7.72516 7.33476 7.85958 7.39844 8.00004 7.39844C8.14365 7.39844 8.27703 7.33229 8.36756 7.22211L10.5575 4.89136L10.5617 4.88617C10.6403 4.78767 10.6797 4.67416 10.6797 4.55638C10.6797 4.41287 10.6212 4.27286 10.5119 4.17474C10.3079 3.99078 10.0016 4.01836 9.82898 4.2282L8.00006 6.1483L6.16376 4.22Z" fill="currentColor"></path><path d="M9.83624 11.78C10.0044 11.9849 10.3112 12.0063 10.5123 11.825C10.713 11.645 10.7348 11.3323 10.569 11.1225L10.5647 11.117L8.36103 8.77042C8.27484 8.66524 8.14042 8.60156 7.99997 8.60156C7.85635 8.60156 7.72297 8.6677 7.63244 8.77788L5.44247 11.1086L5.43833 11.1138C5.35974 11.2123 5.32031 11.3258 5.32031 11.4436C5.32031 11.5871 5.37883 11.7271 5.48811 11.8253C5.69211 12.0092 5.99842 11.9816 6.17102 11.7718L7.99994 9.8517L9.83624 11.78Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM14.125 8C14.125 11.3827 11.3827 14.125 8 14.125C4.61726 14.125 1.875 11.3827 1.875 8C1.875 4.61726 4.61726 1.875 8 1.875C11.3827 1.875 14.125 4.61726 14.125 8Z" fill="currentColor"></path></svg>`,
  infoIcon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11.5 16.5h1V11h-1Zm.5-6.925q.25 0 .438-.175.187-.175.187-.45 0-.25-.187-.425Q12.25 8.35 12 8.35t-.438.175q-.187.175-.187.425 0 .275.187.45.188.175.438.175ZM12 21q-1.875 0-3.512-.712-1.638-.713-2.85-1.926-1.213-1.212-1.926-2.85Q3 13.875 3 12t.712-3.513q.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3t3.513.712q1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85-1.213 1.213-2.85 1.926Q13.875 21 12 21Zm0-1q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/></svg>`,
  up: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m3.3 17.5-.7-.7 6.7-6.775 4 4L19.725 7.7H16.4v-1h5v5h-1V8.4l-7.1 7.1-4-4Z"/></svg>`,
  more: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.45 13q-.4 0-.7-.288-.3-.287-.3-.712t.3-.713q.3-.287.7-.287.425 0 .712.287.288.288.288.713t-.288.712Q6.875 13 6.45 13ZM12 13q-.425 0-.712-.288Q11 12.425 11 12t.288-.713Q11.575 11 12 11t.713.287Q13 11.575 13 12t-.287.712Q12.425 13 12 13Zm5.55 0q-.425 0-.713-.288-.287-.287-.287-.712t.287-.713q.288-.287.713-.287.4 0 .7.287.3.288.3.713t-.3.712q-.3.288-.7.288Z"/></svg>`,
  fatMore: `<svg class="more" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.854 11.812q-.75 0-1.281-.531-.531-.531-.531-1.281 0-.771.531-1.292.531-.52 1.281-.52.771 0 1.302.52.532.521.532 1.292 0 .75-.542 1.281-.542.531-1.292.531Zm5.146 0q-.75 0-1.281-.531-.531-.531-.531-1.281 0-.771.531-1.292.531-.52 1.281-.52.771 0 1.292.52.52.521.52 1.292 0 .75-.52 1.281-.521.531-1.292.531Zm5.146 0q-.75 0-1.292-.531T13.312 10q0-.771.542-1.292.542-.52 1.292-.52.771 0 1.292.52.52.521.52 1.292 0 .75-.52 1.281-.521.531-1.292.531Z"/></svg>`,
  home: `<svg width="16" height="16" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.22795 4.46279L5.35212 1.27593C5.35233 1.27578 5.35192 1.27609 5.35212 1.27593C5.3522 1.27587 5.35288 1.27535 5.35295 1.27529C5.68131 1.02149 6.0846 0.883789 6.49962 0.883789C6.91465 0.883789 7.31794 1.02149 7.6463 1.27529C7.64654 1.27548 7.64605 1.2751 7.6463 1.27529C7.64633 1.27532 7.64709 1.2759 7.64713 1.27593L11.7706 4.46227C11.9971 4.63725 12.1812 4.86228 12.3075 5.11913C12.434 5.37624 12.4998 5.6589 12.5 5.9454V12.0088C12.5 12.5061 12.3025 12.983 11.9508 13.3347C11.5992 13.6863 11.1223 13.8838 10.625 13.8838H7.625C7.20885 13.8838 6.80855 13.7301 6.5 13.4541C6.19145 13.7301 5.79115 13.8838 5.375 13.8838H2.375C1.87772 13.8838 1.40081 13.6863 1.04917 13.3347C0.697543 12.983 0.5 12.5061 0.5 12.0088V5.94652C0.5 5.94646 0.5 5.94658 0.5 5.94652C0.499948 5.66079 0.565197 5.37865 0.690772 5.12198C0.816548 4.86491 0.999504 4.64003 1.22563 4.46459L1.22795 4.46279ZM2 5.94634C1.99995 5.8891 2.013 5.83261 2.03815 5.7812C2.06331 5.72978 2.0999 5.68481 2.14513 5.64972L6.27012 2.46222C6.33583 2.41138 6.41655 2.38379 6.49962 2.38379C6.5827 2.38379 6.66342 2.41138 6.72913 2.46222L10.8541 5.64972C10.8995 5.68473 10.9362 5.72967 10.9615 5.78109C10.9868 5.83251 11 5.88904 11 5.94634V12.0088C11 12.1083 10.9605 12.2037 10.8902 12.274C10.8198 12.3443 10.7245 12.3838 10.625 12.3838H7.625C7.57527 12.3838 7.52758 12.3641 7.49242 12.3289C7.45725 12.2938 7.4375 12.2461 7.4375 12.1963V9.50884C7.4375 9.2602 7.33873 9.02175 7.16291 8.84593C6.9871 8.67011 6.74864 8.57134 6.5 8.57134C6.25136 8.57134 6.0129 8.67011 5.83709 8.84593C5.66127 9.02175 5.5625 9.2602 5.5625 9.50884V12.1963C5.5625 12.2461 5.54275 12.2938 5.50758 12.3289C5.47242 12.3641 5.42473 12.3838 5.375 12.3838H2.375C2.27554 12.3838 2.18016 12.3443 2.10984 12.274C2.03951 12.2037 2 12.1083 2 12.0088V5.94634Z" fill="white"></path><path d="M11 5.94634C11 5.88904 10.9868 5.83251 10.9615 5.78109C10.9362 5.72967 10.8995 5.68473 10.8541 5.64972L6.72913 2.46222C6.66342 2.41138 6.5827 2.38379 6.49962 2.38379C6.41655 2.38379 6.33583 2.41138 6.27012 2.46222L2.14513 5.64972C2.0999 5.68481 2.06331 5.72978 2.03815 5.7812C2.013 5.83261 1.99995 5.8891 2 5.94634V12.0088C2 12.1083 2.03951 12.2037 2.10984 12.274C2.18016 12.3443 2.27554 12.3838 2.375 12.3838H5.375C5.42473 12.3838 5.47242 12.3641 5.50758 12.3289C5.54275 12.2938 5.5625 12.2461 5.5625 12.1963V9.50884C5.5625 9.2602 5.66127 9.02175 5.83709 8.84593C6.0129 8.67011 6.25136 8.57134 6.5 8.57134C6.74864 8.57134 6.9871 8.67011 7.16291 8.84593C7.33873 9.02175 7.4375 9.2602 7.4375 9.50884V12.1963C7.4375 12.2461 7.45725 12.2938 7.49242 12.3289C7.52758 12.3641 7.57527 12.3838 7.625 12.3838H10.625C10.7245 12.3838 10.8198 12.3443 10.8902 12.274C10.9605 12.2037 11 12.1083 11 12.0088V5.94634Z" fill="#323338"></path></svg>`,
  outlineHome: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.5 15.5h2.292v-4.958h4.416V15.5H14.5V8.25L10 4.854 5.5 8.25Zm-1.083 1.083V7.708L10 3.5l5.583 4.208v8.875h-4.458v-4.958h-2.25v4.958ZM10 10.188Z"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m19.475 20.15-6.25-6.25q-.75.625-1.725.975-.975.35-1.95.35-2.425 0-4.087-1.663Q3.8 11.9 3.8 9.5q0-2.4 1.663-4.063 1.662-1.662 4.062-1.662 2.4 0 4.075 1.662Q15.275 7.1 15.275 9.5q0 1.05-.375 2.025-.375.975-.975 1.65L20.2 19.45ZM9.55 14.225q1.975 0 3.35-1.362Q14.275 11.5 14.275 9.5T12.9 6.137q-1.375-1.362-3.35-1.362-2 0-3.375 1.362Q4.8 7.5 4.8 9.5t1.375 3.363q1.375 1.362 3.375 1.362Z"/></svg>`,
  account: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.2 17.475q1.275-.9 2.7-1.437 1.425-.538 3.1-.538t3.1.538q1.425.537 2.7 1.437 1-1.025 1.6-2.413.6-1.387.6-3.062 0-3.325-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12q0 1.675.6 3.062.6 1.388 1.6 2.413ZM12 12.5q-1.275 0-2.137-.863Q9 10.775 9 9.5t.863-2.138Q10.725 6.5 12 6.5t2.137.862Q15 8.225 15 9.5t-.863 2.137q-.862.863-2.137.863Zm0 8.5q-1.875 0-3.525-.7t-2.862-1.912Q4.4 17.175 3.7 15.525T3 12q0-1.875.7-3.525t1.913-2.863Q6.825 4.4 8.475 3.7 10.125 3 12 3t3.525.7q1.65.7 2.863 1.912Q19.6 6.825 20.3 8.475T21 12q0 1.875-.7 3.525t-1.912 2.863Q17.175 19.6 15.525 20.3T12 21Zm0-1q1.375 0 2.713-.488 1.337-.487 2.312-1.312-.975-.8-2.25-1.25Q13.5 16.5 12 16.5t-2.787.45q-1.288.45-2.238 1.25.975.825 2.312 1.312Q10.625 20 12 20Zm0-8.5q.85 0 1.425-.575Q14 10.35 14 9.5q0-.85-.575-1.425Q12.85 7.5 12 7.5q-.85 0-1.425.575Q10 8.65 10 9.5q0 .85.575 1.425.575.575 1.425.575Zm0-2Zm0 8.75Z"/></svg>`,
  filter: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11.775 19q-.325 0-.55-.225-.225-.225-.225-.55V12.65L5.6 5.825q-.2-.275-.05-.55Q5.7 5 6.025 5h11.95q.325 0 .475.275.15.275-.05.55L13 12.65v5.575q0 .325-.225.55-.225.225-.55.225ZM12 12.3 16.95 6h-9.9Zm0 0Z"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.4 17.3-.7-.7 4.6-4.6-4.6-4.6.7-.7 5.3 5.3Z"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M14 17.3 8.7 12 14 6.7l.7.7-4.6 4.6 4.6 4.6Z"/></svg>`,
  arrowDown: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 14.7 6.7 9.4l.7-.7 4.6 4.6 4.6-4.6.7.7Z"/></svg>`,
  arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m7.4 14.7-.7-.7L12 8.7l5.3 5.3-.7.7-4.6-4.6Z"/></svg>`,
  open: `<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" aria-label="Open" class="icon_component icon_component--no-focus-style"><path d="M12.5148 2.49976C12.1212 2.49976 11.8022 2.82125 11.8022 3.21784 11.8022 3.61443 12.1212 3.93593 12.5148 3.93593H14.6466L10.7369 8.15315C10.4682 8.44295 10.4836 8.89735 10.7711 9.16809 11.0587 9.43883 11.5096 9.42339 11.7783 9.1336L15.5746 5.03862V7.28699C15.5746 7.68358 15.8936 8.00507 16.2872 8.00507 16.6807 8.00507 16.9997 7.68358 16.9997 7.28699V3.23812C17.0052 3.03946 16.9293 2.83946 16.7739 2.69313 16.6366 2.56389 16.4621 2.49986 16.288 2.49976L12.5148 2.49976zM9.26311 11.8464C9.53177 11.5566 9.51644 11.1022 9.22888 10.8314 8.94131 10.5607 8.4904 10.5761 8.22174 10.8659L4.42513 14.9612V12.7124C4.42513 12.3158 4.1061 11.9943 3.71256 11.9943 3.31903 11.9943 3 12.3158 3 12.7124V16.7815C3 16.8649 3.01412 16.945 3.04007 17.0195 3.07689 17.1255 3.13902 17.2244 3.22611 17.3064 3.36743 17.4394 3.54818 17.5034 3.72738 17.4996H7.48496C7.8785 17.4996 8.19752 17.1781 8.19752 16.7815 8.19752 16.3849 7.8785 16.0634 7.48496 16.0634H5.35358L9.26311 11.8464z" fill="currentColor"></path></svg>`,
  sort: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20.275-3.85-3.85.725-.725L12 18.825l3.125-3.125.725.725ZM8.875 8.325 8.15 7.6 12 3.75l3.85 3.85-.725.725L12 5.2Z"/></svg>`,
  addComment: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m2.45 21.55 1.575-5.325q-.475-1-.75-2.063Q3 13.1 3 12q0-1.875.712-3.513.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3t3.513.712q1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85-1.213 1.213-2.85 1.926Q13.875 21 12 21q-1.1 0-2.162-.275-1.063-.275-2.063-.75Zm1.5-1.5 3.2-.95q.4-.1.713-.1.312 0 .687.2.8.4 1.675.6.875.2 1.775.2 3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 .9.2 1.775.2.875.6 1.675.175.325.2.687.025.363-.1.713Zm7.55-4.55h1v-3h3v-1h-3v-3h-1v3h-3v1h3Zm.475-3.475Z"/></svg>`,
  commentCount: `<svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24" aria-hidden="true" class="icon_component chat-with-update icon_component--no-focus-style"><path d="M10.4339 1.95001C11.5975 1.94802 12.7457 2.2162 13.7881 2.73345C14.8309 3.25087 15.7392 4.0034 16.4416 4.93172C17.1439 5.86004 17.6211 6.93879 17.8354 8.08295C18.0498 9.22712 17.9955 10.4054 17.6769 11.525C17.3582 12.6447 16.7839 13.675 15.9992 14.5348C15.2144 15.3946 14.2408 16.0604 13.1549 16.4798C12.0689 16.8991 10.9005 17.0606 9.74154 16.9514C8.72148 16.8553 7.73334 16.5518 6.83716 16.0612L4.29488 17.2723C3.23215 17.7786 2.12265 16.6693 2.6287 15.6064L3.83941 13.0637C3.26482 12.0144 2.94827 10.8411 2.91892 9.64118C2.88616 8.30174 3.21245 6.97794 3.86393 5.80714C4.51541 4.63635 5.46834 3.66124 6.62383 2.98299C7.77896 2.30495 9.09445 1.9483 10.4339 1.95001ZM10.4339 1.95001C10.4343 1.95001 10.4347 1.95001 10.4351 1.95001L10.434 2.70001L10.4326 1.95001C10.433 1.95001 10.4334 1.95001 10.4339 1.95001ZM13.1214 4.07712C12.2867 3.66294 11.3672 3.44826 10.4354 3.45001L10.4329 3.45001C9.3608 3.44846 8.30778 3.73387 7.38315 4.2766C6.45852 4.81934 5.69598 5.59963 5.17467 6.5365C4.65335 7.47337 4.39226 8.53268 4.41847 9.6045C4.44469 10.6763 4.75726 11.7216 5.32376 12.6319C5.45882 12.8489 5.47405 13.1198 5.36416 13.3506L4.28595 15.6151L6.54996 14.5366C6.78072 14.4266 7.05158 14.4418 7.26863 14.5768C8.05985 15.0689 8.95456 15.3706 9.88225 15.458C10.8099 15.5454 11.7452 15.4162 12.6145 15.0805C13.4837 14.7448 14.2631 14.2119 14.8912 13.5236C15.5194 12.8354 15.9791 12.0106 16.2341 11.1144C16.4892 10.2182 16.5327 9.27504 16.3611 8.35918C16.1895 7.44332 15.8075 6.57983 15.2453 5.83674C14.6831 5.09366 13.9561 4.49129 13.1214 4.07712Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  coloredBoard: `<svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5063 0.983153C0.782691 2.23087 0.3638 4.68688 1.57068 6.46881L11.7573 21.509C12.5031 22.6101 13.6951 23.1962 14.9037 23.1889C16.1107 23.1945 17.3004 22.6086 18.0451 21.509L28.2344 6.46481C29.4413 4.68289 29.0224 2.22688 27.2988 0.979157C25.5752 -0.268562 23.1995 0.164499 21.9927 1.94643L14.9012 12.4168L7.81243 1.95042C6.60555 0.168496 4.22991 -0.264566 2.5063 0.983153Z" fill="#D7D7FF"></path><path d="M2.50923 23.8352C0.785618 22.5875 0.366728 20.1315 1.57361 18.3495L11.7558 3.31581C12.499 2.21855 13.6853 1.63274 14.8897 1.6359C16.1013 1.62581 17.2971 2.21204 18.0447 3.3157L28.2269 18.3495C29.4338 20.1315 29.0149 22.5875 27.2913 23.8352C25.5677 25.0829 23.1921 24.6499 21.9852 22.8679L14.9003 12.4073L7.81536 22.8679C6.60848 24.6499 4.23284 25.0829 2.50923 23.8352Z" fill="url(#paint0_linear_1640_88925)"></path><path d="M10.2475 19.2773L5.59619 12.4098L10.2475 5.54228L14.8988 12.4098L10.2475 19.2773Z" fill="#C1C1FF"></path><defs><linearGradient id="paint0_linear_1640_88925" x1="18.3366" y1="19.6173" x2="15.7336" y2="1.25856" gradientUnits="userSpaceOnUse"><stop stop-color="#8F8FFF"></stop><stop offset="1" stop-color="#C2C2FF"></stop></linearGradient></defs></svg>`,
  board: `<svg viewBox="0 0 20 20" fill="currentColor" width="19" height="19" aria-hidden="true" aria-label="Public board" class="icon_component"><path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  exit: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m6.4 18.3-.7-.7 5.6-5.6-5.6-5.6.7-.7 5.6 5.6 5.6-5.6.7.7-5.6 5.6 5.6 5.6-.7.7-5.6-5.6Z"/></svg>`,
  smallExit: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m6.062 14.25-.312-.312L9.688 10 5.75 6.062l.312-.312L10 9.688l3.938-3.938.312.312L10.312 10l3.938 3.938-.312.312L10 10.312Z"/></svg>`,
  time: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m13.167 13.167.312-.313-3.271-3.271V5h-.416v4.792ZM10 16.917q-1.417 0-2.677-.542-1.261-.542-2.208-1.49-.948-.947-1.49-2.208-.542-1.26-.542-2.677 0-1.438.542-2.698t1.49-2.198q.947-.937 2.208-1.479 1.26-.542 2.677-.542 1.438 0 2.698.542t2.198 1.479q.937.938 1.479 2.198T16.917 10q0 1.417-.542 2.677-.542 1.261-1.479 2.208-.938.948-2.198 1.49T10 16.917ZM10 10Zm0 6.5q2.708 0 4.604-1.906T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.688 0-4.594 1.896Q3.5 7.292 3.5 10q0 2.688 1.906 4.594Q7.312 16.5 10 16.5Z"/></svg>`,
  like: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M17.3 19.7H7.55V9.3l6.05-5.95.2.2q.125.125.213.312.087.188.087.338v.1l-1 5h7.1q.575 0 1.038.462.462.463.462 1.038v1q0 .125-.025.275-.025.15-.075.275l-2.65 6.3q-.2.45-.675.75-.475.3-.975.3ZM8.25 19h9.05q.275 0 .563-.15.287-.15.437-.5L21 12v-1.2q0-.35-.225-.575Q20.55 10 20.2 10h-7.95l1.1-5.45-5.1 5.05Zm0-9.4V19Zm-.7-.3v.7H4v9h3.55v.7H3.3V9.3Z"/></svg>`,
  filledLike: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M15 17H5.5V7l6-6 .667.458q.375.271.552.688.177.416.073.854L12 7h5.5q.625 0 1.062.438Q19 7.875 19 8.5v1.188q0 .166-.031.302-.031.135-.094.281l-2.479 5.812q-.188.417-.563.667-.375.25-.833.25ZM4 7v10H1V7Z"/></svg>`,
  reply: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M19.525 18.35V15q0-1.525-1.062-2.588-1.063-1.062-2.588-1.062H5.125l4.25 4.25-.5.5-5.1-5.1 5.1-5.1.5.5-4.25 4.25h10.75q1.8 0 3.075 1.275Q20.225 13.2 20.225 15v3.35Z"/></svg>`,
  delete: `<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" aria-label="Delete" class="icon_component icon_component--no-focus-style"><path d="M8.30035 1.86462C7.77994 1.86462 7.29477 2.08976 6.94732 2.46719C6.60179 2.84253 6.41724 3.33927 6.41724 3.84552V4.32642H4.901H2.63477C2.22055 4.32642 1.88477 4.6622 1.88477 5.07642C1.88477 5.49063 2.22055 5.82642 2.63477 5.82642H4.151V16.1545C4.151 16.6608 4.33556 17.1575 4.68109 17.5328C5.02853 17.9103 5.51371 18.1354 6.03411 18.1354H13.9659C14.4863 18.1354 14.9715 17.9103 15.3189 17.5328C15.6645 17.1575 15.849 16.6608 15.849 16.1545V5.82642H17.3652C17.7794 5.82642 18.1152 5.49063 18.1152 5.07642C18.1152 4.6622 17.7794 4.32642 17.3652 4.32642H15.099H13.5828V3.84552C13.5828 3.33927 13.3982 2.84253 13.0527 2.46719C12.7053 2.08976 12.2201 1.86462 11.6997 1.86462H8.30035ZM7.16447 5.82642C7.16539 5.82642 7.16631 5.82642 7.16724 5.82642H12.8328C12.8337 5.82642 12.8346 5.82642 12.8356 5.82642H14.349V16.1545C14.349 16.3012 14.2948 16.4306 14.2153 16.5169C14.1378 16.6012 14.0465 16.6354 13.9659 16.6354H6.03411C5.95348 16.6354 5.86223 16.6012 5.78468 16.5169C5.7052 16.4306 5.651 16.3012 5.651 16.1545V5.82642H7.16447ZM12.0828 4.32642V3.84552C12.0828 3.69887 12.0286 3.56943 11.9491 3.4831C11.8716 3.39886 11.7803 3.36462 11.6997 3.36462H8.30035C8.21972 3.36462 8.12847 3.39886 8.05091 3.4831C7.97144 3.56943 7.91724 3.69887 7.91724 3.84552V4.32642L12.0828 4.32642Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  cancel: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>`,
  changeColor: `<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" class="icon_component color-option-box--icon"><path d="M6.34344 4.11612C6.57786 3.8817 6.8958 3.75 7.22732 3.75C7.39148 3.75 7.55402 3.78233 7.70568 3.84515C7.85734 3.90797 7.99514 4.00004 8.11121 4.11612C8.22728 4.23219 8.31936 4.36999 8.38217 4.52165C8.38681 4.53283 8.39127 4.54407 8.39557 4.55537C8.29619 4.61768 8.20333 4.69139 8.11905 4.77566L5.97733 6.918V5C5.97733 4.66848 6.10902 4.35054 6.34344 4.11612ZM4.47733 8.41843V5C4.47733 4.27065 4.76706 3.57118 5.28278 3.05546C5.79851 2.53973 6.49798 2.25 7.22732 2.25C7.58846 2.25 7.94606 2.32113 8.2797 2.45933C8.61335 2.59753 8.91651 2.8001 9.17187 3.05546C9.42723 3.31082 9.62979 3.61398 9.76799 3.94762C9.83894 4.1189 9.89221 4.2965 9.92726 4.47764C10.0798 4.55293 10.2204 4.65314 10.343 4.77566L16.1371 10.5711C16.2915 10.7258 16.3995 10.9214 16.448 11.1345C16.4964 11.3476 16.4837 11.5701 16.4114 11.7764C16.339 11.9826 16.2099 12.1642 16.039 12.3004C15.868 12.4365 15.6621 12.5217 15.4449 12.546L13.9384 12.7137L10.3433 16.3087C10.0447 16.6077 9.68966 16.8452 9.29927 17.007C8.90873 17.169 8.49011 17.2523 8.06734 17.2523C7.64457 17.2523 7.22594 17.169 6.8354 17.007C6.44499 16.8452 6.09029 16.608 5.7916 16.309L3.46525 13.9819C3.16639 13.6833 2.92898 13.3283 2.7672 12.938C2.60536 12.5476 2.52206 12.129 2.52206 11.7064C2.52206 11.2837 2.60536 10.8652 2.7672 10.4747C2.92904 10.0843 3.16624 9.72952 3.46525 9.43079L4.47733 8.41843ZM9.17963 5.8364L4.52574 10.4916C4.36617 10.651 4.23926 10.8407 4.15289 11.0491C4.06652 11.2574 4.02206 11.4808 4.02206 11.7064C4.02206 11.9319 4.06652 12.1553 4.15289 12.3637C4.23926 12.572 4.36585 12.7614 4.52542 12.9208L6.85241 15.2484C7.01185 15.4081 7.20146 15.535 7.40988 15.6214C7.6183 15.7078 7.84171 15.7523 8.06734 15.7523C8.29296 15.7523 8.51637 15.7078 8.72479 15.6214C8.93322 15.535 9.12256 15.4084 9.282 15.2487L13.0637 11.467C13.1841 11.3466 13.3418 11.2708 13.5111 11.252L14.578 11.1332L9.28238 5.8364C9.26877 5.82284 9.25023 5.81512 9.231 5.81512C9.21173 5.81512 9.19325 5.82278 9.17963 5.8364ZM15.4947 13.5053L14.392 15.7106C14.2763 15.942 14.2364 16.204 14.2779 16.4593C14.3194 16.7147 14.4403 16.9505 14.6233 17.1333C14.7377 17.2479 14.8736 17.3389 15.0231 17.4009C15.1727 17.463 15.3331 17.4949 15.495 17.4949C15.6569 17.4949 15.8173 17.463 15.9668 17.4009C16.1164 17.3389 16.2523 17.2479 16.3667 17.1333C16.5496 16.9504 16.6703 16.7146 16.7117 16.4592C16.7531 16.2039 16.7131 15.942 16.5973 15.7106L15.4947 13.5053Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M9.25 14h1.5v-3.25H14v-1.5h-3.25V6h-1.5v3.25H6v1.5h3.25Zm.75 4q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>`,
  bigTrash: `<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M12.458 33.333q-1 0-1.729-.729Q10 31.875 10 30.917V9.625H8.333V8.208h6.5V7.042h10.334v1.166h6.5v1.417H30v21.292q0 1-.708 1.708-.709.708-1.75.708ZM28.583 9.625H11.417v21.292q0 .416.291.708.292.292.75.292h15.084q.416 0 .729-.313.312-.312.312-.687ZM16.417 28.5h1.416V13h-1.416Zm5.75 0h1.416V13h-1.416ZM11.417 9.625v22.292-1Z"/></svg>`,
  defaultPerson: `<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M10.167 29.417q2.291-1.584 4.645-2.5Q17.167 26 20 26q2.833 0 5.188.917 2.354.916 4.645 2.5 1.75-1.875 2.75-4.25t1-5.167q0-5.667-3.958-9.625T20 6.417q-5.667 0-9.625 3.958T6.417 20q0 2.792 1 5.167t2.75 4.25ZM20 20.708q-2.083 0-3.521-1.437-1.437-1.438-1.437-3.521t1.437-3.521q1.438-1.437 3.521-1.437t3.521 1.437q1.437 1.438 1.437 3.521t-1.437 3.521Q22.083 20.708 20 20.708ZM20 35q-3.125 0-5.854-1.167-2.729-1.166-4.771-3.208-2.042-2.042-3.208-4.771Q5 23.125 5 20t1.167-5.854q1.166-2.729 3.208-4.771 2.042-2.042 4.771-3.208Q16.875 5 20 5t5.854 1.167q2.729 1.166 4.771 3.208 2.042 2.042 3.208 4.771Q35 16.875 35 20t-1.167 5.854q-1.166 2.729-3.208 4.771-2.042 2.042-4.771 3.208Q23.125 35 20 35Zm0-1.417q2.333 0 4.625-.812 2.292-.813 4.083-2.354-1.791-1.375-4-2.188-2.208-.812-4.708-.812t-4.729.791q-2.229.792-3.979 2.209 1.791 1.541 4.083 2.354 2.292.812 4.625.812Zm0-14.291q1.5 0 2.521-1.021t1.021-2.521q0-1.542-1.021-2.542-1.021-1-2.521-1t-2.521 1.021q-1.021 1.021-1.021 2.521t1.021 2.521Q18.5 19.292 20 19.292Zm0-3.542Zm0 14.75Z"/></svg>`,
  addPerson: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M9.208 14.042h1.584v-3.25h3.25V9.208h-3.25v-3.25H9.208v3.25h-3.25v1.584h3.25ZM10 18.167q-1.688 0-3.177-.636-1.49-.635-2.604-1.75-1.115-1.114-1.75-2.604-.636-1.489-.636-3.177 0-1.708.636-3.187.635-1.48 1.75-2.594 1.114-1.115 2.604-1.75Q8.312 1.833 10 1.833q1.708 0 3.188.636 1.479.635 2.593 1.75 1.115 1.114 1.75 2.604.636 1.489.636 3.177t-.636 3.177q-.635 1.49-1.75 2.604-1.114 1.115-2.604 1.75-1.489.636-3.177.636Z"/></svg>`,
  filterPerson: `<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" class="icon_component filter-item-icon-component icon_component--no-focus-style"><path d="M7.51318 5.43037C8.17316 4.77038 9.06829 4.39961 10.0017 4.39961C10.935 4.39961 11.8301 4.77038 12.4901 5.43037C13.1501 6.09035 13.5209 6.98548 13.5209 7.91884C13.5209 8.8522 13.1501 9.74733 12.4901 10.4073C11.8301 11.0673 10.935 11.4381 10.0017 11.4381C9.06829 11.4381 8.17316 11.0673 7.51318 10.4073C6.8532 9.74733 6.48242 8.8522 6.48242 7.91884C6.48242 6.98548 6.8532 6.09035 7.51318 5.43037ZM10.0017 5.89961C9.46612 5.89961 8.95252 6.11235 8.57384 6.49103C8.19516 6.86971 7.98242 7.38331 7.98242 7.91884C7.98242 8.45437 8.19516 8.96797 8.57384 9.34665C8.95252 9.72533 9.46612 9.93807 10.0017 9.93807C10.5372 9.93807 11.0508 9.72533 11.4295 9.34665C11.8081 8.96797 12.0209 8.45437 12.0209 7.91884C12.0209 7.38331 11.8081 6.86971 11.4295 6.49103C11.0508 6.11235 10.5372 5.89961 10.0017 5.89961Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path><path d="M10.0008 2.0498C7.89231 2.0498 5.8702 2.88739 4.37928 4.37831C2.88837 5.86922 2.05078 7.89133 2.05078 9.9998C2.05078 12.1083 2.88837 14.1304 4.37928 15.6213C4.50318 15.7452 4.63075 15.8646 4.76173 15.9794C4.77108 15.9879 4.78069 15.9963 4.79055 16.0045C6.23158 17.255 8.08036 17.9498 10.0008 17.9498C12.1093 17.9498 14.1314 17.1122 15.6223 15.6213C17.1132 14.1304 17.9508 12.1083 17.9508 9.9998C17.9508 7.89133 17.1132 5.86922 15.6223 4.37831C14.1314 2.88739 12.1093 2.0498 10.0008 2.0498ZM6.2925 15.2773C7.37119 16.0352 8.66461 16.4498 10.0008 16.4498C11.3369 16.4498 12.6302 16.0353 13.7088 15.2774C13.3315 14.8156 12.8699 14.4267 12.3466 14.1326C11.6302 13.73 10.8223 13.5186 10.0006 13.5186C9.17886 13.5186 8.37096 13.73 7.6546 14.1326C7.13136 14.4267 6.66982 14.8155 6.2925 15.2773ZM14.8283 14.2774C15.8706 13.1011 16.4508 11.5804 16.4508 9.9998C16.4508 8.28916 15.7712 6.64858 14.5616 5.43897C13.352 4.22936 11.7114 3.5498 10.0008 3.5498C8.29013 3.5498 6.64955 4.22936 5.43994 5.43897C4.23033 6.64858 3.55078 8.28916 3.55078 9.9998C3.55078 11.5803 4.13084 13.1009 5.17307 14.2772C5.66065 13.6931 6.25191 13.2003 6.91971 12.825C7.86047 12.2963 8.92145 12.0186 10.0006 12.0186C11.0797 12.0186 12.1407 12.2963 13.0815 12.825C13.7494 13.2003 14.3407 13.6932 14.8283 14.2774Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  seen: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10 13.146q1.312 0 2.229-.917T13.146 10q0-1.312-.917-2.229T10 6.854q-1.312 0-2.229.917T6.854 10q0 1.312.917 2.229t2.229.917ZM10 12q-.833 0-1.417-.583Q8 10.833 8 10q0-.833.583-1.417Q9.167 8 10 8q.833 0 1.417.583Q12 9.167 12 10q0 .833-.583 1.417Q10.833 12 10 12Zm0 3.583q-2.812 0-5.115-1.521Q2.583 12.542 1.458 10q1.125-2.542 3.427-4.062Q7.188 4.417 10 4.417q2.812 0 5.115 1.521 2.302 1.52 3.427 4.062-1.125 2.542-3.427 4.062-2.303 1.521-5.115 1.521ZM10 10Zm0 4.5q2.333 0 4.312-1.208 1.98-1.209 3.042-3.292-1.062-2.083-3.042-3.292Q12.333 5.5 10 5.5T5.688 6.708Q3.708 7.917 2.646 10q1.062 2.083 3.042 3.292Q7.667 14.5 10 14.5Z"/></svg>`,
  copyText: `<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" aria-label="Copy name" class="icon_component icon_component--no-focus-style"><path d="M4.75 5C4.75 4.86193 4.86193 4.75 5 4.75H9.24961V15.2498H7.5C7.08579 15.2498 6.75 15.5856 6.75 15.9998C6.75 16.414 7.08579 16.7498 7.5 16.7498H9.98232L9.99961 16.75L10.0169 16.7498H12.5C12.9142 16.7498 13.25 16.414 13.25 15.9998C13.25 15.5856 12.9142 15.2498 12.5 15.2498H10.7496V4.75H15C15.1381 4.75 15.25 4.86193 15.25 5V6C15.25 6.41421 15.5858 6.75 16 6.75C16.4142 6.75 16.75 6.41421 16.75 6V5C16.75 4.0335 15.9665 3.25 15 3.25H5C4.0335 3.25 3.25 4.0335 3.25 5V6C3.25 6.41421 3.58579 6.75 4 6.75C4.41421 6.75 4.75 6.41421 4.75 6V5Z" fill="currentColor"></path></svg>`,
  link: `<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" aria-label="Copy item link" class="icon_component icon_component--no-focus-style"><path d="M7.3125 5.3125C7.72671 5.3125 8.0625 5.64829 8.0625 6.0625C8.0625 6.47671 7.72671 6.8125 7.3125 6.8125H6.8125C5.00032 6.8125 3.53125 8.28157 3.53125 10.0938C3.53125 11.9059 5.00032 13.375 6.8125 13.375H7.3125C7.72671 13.375 8.0625 13.7108 8.0625 14.125C8.0625 14.5392 7.72671 14.875 7.3125 14.875H6.8125C4.17189 14.875 2.03125 12.7344 2.03125 10.0938C2.03125 7.45314 4.17189 5.3125 6.8125 5.3125H7.3125ZM11.9688 6.0625C11.9688 5.64829 12.3045 5.3125 12.7188 5.3125H13.1875C15.8281 5.3125 17.9688 7.45314 17.9688 10.0938C17.9688 12.7344 15.8281 14.875 13.1875 14.875H12.7188C12.3045 14.875 11.9688 14.5392 11.9688 14.125C11.9688 13.7108 12.3045 13.375 12.7188 13.375H13.1875C14.9997 13.375 16.4688 11.9059 16.4688 10.0938C16.4688 8.28157 14.9997 6.8125 13.1875 6.8125H12.7188C12.3045 6.8125 11.9688 6.47671 11.9688 6.0625ZM5.85834 10.079C5.85834 9.66477 6.19412 9.32898 6.60834 9.32898H13.3604C13.7746 9.32898 14.1104 9.66477 14.1104 10.079C14.1104 10.4932 13.7746 10.829 13.3604 10.829H6.60834C6.19412 10.829 5.85834 10.4932 5.85834 10.079Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  editLabel: `<svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" class="icon_component monday-style-button--left-icon icon_component--no-focus-style"><path d="M13.8542 3.59561C13.8541 3.59568 13.8542 3.59555 13.8542 3.59561L4.80915 12.6503L3.81363 16.189L7.35682 15.1957L16.4018 6.14C16.4746 6.06722 16.5161 5.96795 16.5161 5.86503C16.5161 5.76221 16.4753 5.6636 16.4026 5.59083C16.4025 5.59076 16.4026 5.59091 16.4026 5.59083L14.4038 3.59568C14.3309 3.52292 14.232 3.48197 14.1289 3.48197C14.026 3.48197 13.927 3.52297 13.8542 3.59561ZM12.8051 2.54754C13.1562 2.19695 13.6324 2 14.1289 2C14.6254 2 15.1016 2.19693 15.4527 2.54747C15.4527 2.5475 15.4527 2.54745 15.4527 2.54747L17.4515 4.54263C17.8026 4.89333 18 5.36914 18 5.86503C18 6.36091 17.8028 6.8365 17.4518 7.18719L8.26993 16.3799C8.17984 16.4701 8.06798 16.5356 7.94516 16.57L2.94244 17.9724C2.68418 18.0448 2.4069 17.9723 2.21725 17.7829C2.0276 17.5934 1.95512 17.3165 2.02768 17.0586L3.43296 12.0633C3.46728 11.9413 3.53237 11.8301 3.62199 11.7404L12.8051 2.54754Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
  rename: `<svg xmlns="http://www.w3.org/2000/svg" style="vertical-align: -0.125em;" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m30 7l-5-5L5 22l-2 7l7-2Zm-9-1l5 5ZM5 22l5 5Z"/></svg>`,
}

// repliesIndicator


