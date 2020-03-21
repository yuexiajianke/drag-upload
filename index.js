let dropDashedElement = document.querySelector('.drop_dashed') 
let taskPanelElement = document.querySelector('.task_panel') 
let taskPanelH4Element = document.querySelector('.task_header') 
let taskBodyElement = document.querySelector('.task_body') 
 
// 如果显示拖拽内容，则显示dropDashedElement
document.body.ondragover = function (e) {
    e.preventDefault()
    dropDashedElement.style.display = 'block'
}

// 如果显示拖拽内容移除，则显示dropDashedElement
dropDashedElement.ondragleave = function () {
    dropDashedElement.style.display = 'none'
}

// 放置
dropDashedElement.ondrop = function (e) {
    e.preventDefault()

    dropDashedElement.style.display = 'none'
    taskPanelElement.style.display = 'block'

    let files = e.dataTransfer.files
    taskPanelH4Element.innerHTML = `${files.length} 项任务正在进行中...` 

    files = [...files]
    files.forEach(file => {
        let li = document.createElement('li')

        li.innerHTML = `<span></span>
                    上传中.....
                </div>
                <div class="progress"></div>`

    taskBodyElement.appendChild(li)

    let spanElement = li.querySelector('span')
    let taskProgressStatusElement = li.querySelector('.task-progress-status')
    let progressElement = li.querySelector('.progress')

    spanElement.innerHTML = file.name

     //上传
     let fd = new FormData()
     fd.append('file', file)
     let xhr = new XMLHttpRequest()
     xhr.open('post', 'http://localhost:9999/upload', true)

     xhr.upload.onloadstart = function () {
         progressElement.style.display = 'block'
     }

     //上传成功
     xhr.upload.onload = function () {
         taskProgressStatusElement.innerHTML = `<span class="icon task-progress-status-success"></span>`

         progressElement.style.display = 'none'
     }

     //上传进度
     xhr.upload.onprogress = function (e) {
         progressElement.style.width = `${e.loaded / e.total * 100}%`
     }

     xhr.send(fd)

    })

}
