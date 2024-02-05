const filenames = ['首頁', '詳情', '購物車']

let filename = location.pathname.match(/\/([^\/]+)\.html$/)
filename = !filename ? '' : decodeURIComponent(filename[1])
const filenameIdx = filenames.findIndex(e => e === filename)
const nextFilenameIdx = filenameIdx === filenames.length - 1 ? 0 : filenameIdx + 1
const layout = document.createElement('div')
layout.innerHTML = `
<div class="wrap">
  <div class="left"></div>
  <div class="right">
    <div class="right-title">
      <div class="text">${filename}</div>
      <a class="next" href="${filenames[nextFilenameIdx]}.html">${filenames[nextFilenameIdx]}<span class="material-symbols-outlined">chevron_right</span></a>
    </div>
    <div class="right-content">
    </div>
    <div class="right-footer">
      <div class="links">
        ${filenames.map((e, i) => `<a${filenameIdx === i ? ' class="current"' : ` href="${e}.html"`}>${e}</a>`).join(', ')}      
      </div>
    </div>
  </div>
</div>
`
document.body.appendChild(layout)

const left = document.querySelector('#left')
left.removeAttribute('id')
layout.querySelector('.wrap > .left').appendChild(left)

const rightContent = document.querySelector('#right-content')
rightContent.removeAttribute('id')
layout.querySelector('.wrap > .right > .right-content').appendChild(rightContent)
