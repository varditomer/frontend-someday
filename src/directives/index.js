export const focusDirective = {
  mounted: (el) => {
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
  time: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m13.167 13.167.312-.313-3.271-3.271V5h-.416v4.792ZM10 16.917q-1.417 0-2.677-.542-1.261-.542-2.208-1.49-.948-.947-1.49-2.208-.542-1.26-.542-2.677 0-1.438.542-2.698t1.49-2.198q.947-.937 2.208-1.479 1.26-.542 2.677-.542 1.438 0 2.698.542t2.198 1.479q.937.938 1.479 2.198T16.917 10q0 1.417-.542 2.677-.542 1.261-1.479 2.208-.938.948-2.198 1.49T10 16.917ZM10 10Zm0 6.5q2.708 0 4.604-1.906T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.688 0-4.594 1.896Q3.5 7.292 3.5 10q0 2.688 1.906 4.594Q7.312 16.5 10 16.5Z"/></svg>`,
  like: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M17.3 19.7H7.55V9.3l6.05-5.95.2.2q.125.125.213.312.087.188.087.338v.1l-1 5h7.1q.575 0 1.038.462.462.463.462 1.038v1q0 .125-.025.275-.025.15-.075.275l-2.65 6.3q-.2.45-.675.75-.475.3-.975.3ZM8.25 19h9.05q.275 0 .563-.15.287-.15.437-.5L21 12v-1.2q0-.35-.225-.575Q20.55 10 20.2 10h-7.95l1.1-5.45-5.1 5.05Zm0-9.4V19Zm-.7-.3v.7H4v9h3.55v.7H3.3V9.3Z"/></svg>`,
  reply: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M19.525 18.35V15q0-1.525-1.062-2.588-1.063-1.062-2.588-1.062H5.125l4.25 4.25-.5.5-5.1-5.1 5.1-5.1.5.5-4.25 4.25h10.75q1.8 0 3.075 1.275Q20.225 13.2 20.225 15v3.35Z"/></svg>`,
  delete: `<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" aria-label="Delete" class="icon_component icon_component--no-focus-style"><path d="M8.30035 1.86462C7.77994 1.86462 7.29477 2.08976 6.94732 2.46719C6.60179 2.84253 6.41724 3.33927 6.41724 3.84552V4.32642H4.901H2.63477C2.22055 4.32642 1.88477 4.6622 1.88477 5.07642C1.88477 5.49063 2.22055 5.82642 2.63477 5.82642H4.151V16.1545C4.151 16.6608 4.33556 17.1575 4.68109 17.5328C5.02853 17.9103 5.51371 18.1354 6.03411 18.1354H13.9659C14.4863 18.1354 14.9715 17.9103 15.3189 17.5328C15.6645 17.1575 15.849 16.6608 15.849 16.1545V5.82642H17.3652C17.7794 5.82642 18.1152 5.49063 18.1152 5.07642C18.1152 4.6622 17.7794 4.32642 17.3652 4.32642H15.099H13.5828V3.84552C13.5828 3.33927 13.3982 2.84253 13.0527 2.46719C12.7053 2.08976 12.2201 1.86462 11.6997 1.86462H8.30035ZM7.16447 5.82642C7.16539 5.82642 7.16631 5.82642 7.16724 5.82642H12.8328C12.8337 5.82642 12.8346 5.82642 12.8356 5.82642H14.349V16.1545C14.349 16.3012 14.2948 16.4306 14.2153 16.5169C14.1378 16.6012 14.0465 16.6354 13.9659 16.6354H6.03411C5.95348 16.6354 5.86223 16.6012 5.78468 16.5169C5.7052 16.4306 5.651 16.3012 5.651 16.1545V5.82642H7.16447ZM12.0828 4.32642V3.84552C12.0828 3.69887 12.0286 3.56943 11.9491 3.4831C11.8716 3.39886 11.7803 3.36462 11.6997 3.36462H8.30035C8.21972 3.36462 8.12847 3.39886 8.05091 3.4831C7.97144 3.56943 7.91724 3.69887 7.91724 3.84552V4.32642L12.0828 4.32642Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`
}

// repliesIndicator


