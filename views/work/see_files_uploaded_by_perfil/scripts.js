//Formatar hora
    function timeFormat(){
        const upload_time = document.getElementsByClassName('upload_time')
        for(c=0; c<upload_time.length; c++){
            const time = upload_time[c].innerText
            let hour = time.split(':')[0]
            let minute = time.split(':')[1]
            if(hour.length == 1){
                hour = `0${hour}`
            }
            if(minute.length == 1){
                minute = `0${minute}`
            }
            upload_time[c].innerText = `${hour}:${minute}`
        }
    }
timeFormat()

const socket = io(document.getElementById('socket_url').innerText)
const user_id = document.getElementById('user_id').innerText

function searchFile(){
    const search = document.getElementById('inpSearchFile').value
    const data_send = {
        user_id: user_id,
        search: search
    }
    socket.emit('searchFileByUser', data_send)
}

socket.on('renderFilesUploaded', uploads=>{
    const filesList = document.getElementById('filesList')
    filesList.innerHTML = ''

    for(c=0;c<uploads.length;c++){
        const upload = uploads[c]
        html = `
        <div class="card card-body regular shadow mt-2 uploadsCointaners">
            <h3 style="text-align: center;">
                Enviado para
                <a href="/work/renderAnotherPerfil${upload.receiver_id}">${upload.receiver_name}</a>:
                <a href="/work/renderFile:${upload.file_id}">${upload.file_formated_name}</a>
            </h3>
            <hr>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${upload.file_description}</p>
            <p style="font-weight: bold; text-align: right;">Enviado em <span class="upload_time">${upload.upload_hour}:${upload.upload_minute}</span></p>
        </div>
        `
        filesList.innerHTML += html

    }
    timeFormat()

})