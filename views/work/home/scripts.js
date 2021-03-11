//Funções do chat

    const socket = io(document.getElementById('socket_url').innerText)
    const user_id = document.getElementById('user_id').innerText

    //Função de abrir e fechar chat
        let openChatBoolean = true

        function openChat(){
            const chatCointaner = document.getElementById('chatCointaner')
            const main = document.getElementById('main')
            
            if(openChatBoolean){
                chatCointaner.classList.remove('chat_close')
                chatCointaner.classList.add('chat_open')
                main.classList.add('main_none')
                const send_data = {user_id: user_id}
                socket.emit('enterChat', send_data)
                //Começa embaixo como padrão
                msgShow.scrollTop = msgShow.scrollHeight
                openChatBoolean = false
            }
            else{
                main.classList.remove('main_none')
                chatCointaner.classList.remove('chat_open')
                chatCointaner.classList.add('chat_close')
                const send_data = {user_id: user_id}
                socket.emit('exitChat', send_data)
                openChatBoolean = true
            }
            console.log(chatCointaner.classList)

        }

    const listMsg = document.getElementById('listMsg')
    // Final do chat
    let autoScroll = true
    const msgShow = document.getElementById('messagesShow')



    //Controla se o scroll vai ser automático ou não
    function autoScrollCoordenate(){
        const buttonControlScroll = document.getElementById('controlScrollBtn')
        if(autoScroll){
            autoScroll = false
            buttonControlScroll.classList.add('btn-danger')
            buttonControlScroll.classList.remove('btn-primary')
            buttonControlScroll.innerText = 'Scroll automático desativado'
        }
        else{
            autoScroll = true
            buttonControlScroll.classList.add('btn-primary')
            buttonControlScroll.classList.remove('btn-danger')
            buttonControlScroll.innerText = 'Scroll automático ativado'
        }
    }

    //Função de renderizar mensagem
        function renderMsg(text, time, name, msg_user_id){
            myMessage = false
            if(msg_user_id == user_id){
                myMessage = true
                name = 'Você'
            }
            //Formata o tempo
                let hour = time.split(':')[0]
                let minute = time.split(':')[1]
                if(hour.length == 1){
                    hour = `0${hour}`
                }
                if(minute.length == 1){
                    minute = `0${minute}`
                }
                time = `${hour}:${minute}`

            html = `<li class = "msg_list_item">`
            
            if(myMessage){
                html += `<div class = "msg_cointaner my_msg_cointaner mt-3">`
            }
            else{
                html += `<div class = "msg_cointaner mt-3">`
            }
                
                    html += `<p class = "msg_user_name">`

                        html += `${name}`

                    html += `</p>`
                
                    html += `<p class = "msg_text">`

                        html += `${text}`

                    html += `</p>`

                    html += `<p class = "msg_time">`

                        html += time

                    html += `</p>`

                html += `</div>`

            html += `</li>`

            listMsg.innerHTML += html

            if(autoScroll){
                msgShow.scrollTop = msgShow.scrollHeight
            }
        }

    //Escuta input sendo enviado pelo enter
        const inpMsg = document.getElementById('inpMsg')
        inpMsg.addEventListener('keypress', ()=>{
            if(event.keyCode == 13){
                sendMsg()
            }
        })

    //Escuta input text sendo enviado
        function sendMsg(){
            const text = inpMsg.value
            if(text == ''){
                return
            }
            inpMsg.value = ''
            const send_data = {
                text: text,
                id: user_id
            }
            socket.emit('sendMsg', send_data)

        }

    // Renderiza uma nova mensagem quando é adicionada
        socket.on('renderNewMsg', received_data=>{
            const message = received_data.message
            const text = message.msg_text
            const time = `${message.msg_hour}:${message.msg_minute}`
            const name = `${message.first_name}`
            const msg_user_id = `${message.msg_user_id}`

            renderMsg(text, time, name, msg_user_id)


        })

    //Escuta quando uma nova pessoa conecta no chat
        socket.on('newUserConnected', received_data=>{
            const new_user_id = received_data.user_id
            const new_user_name = received_data.user_name
            listMsg.innerHTML += `
                <div class = "newUserConnectionCointaner mt-3">
                    <p>${new_user_name} entrou no chat.</p>
                </div>
            `
            if(autoScroll){
                msgShow.scrollTop = msgShow.scrollHeight
            }

        })
    //Escuta quando uma pessoa desconecta do chat
        socket.on('userDisconnected', received_data=>{
            const new_user_id = received_data.user_id
            const new_user_name = received_data.user_name
            listMsg.innerHTML += `
                <div class = "userDisconnectedCointaner mt-3">
                    <p>${new_user_name} saiu do chat.</p>
                </div>
            `
            if(autoScroll){
                msgShow.scrollTop = msgShow.scrollHeight
            }

        })
