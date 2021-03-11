const socket = io(document.getElementById('socket_url').innerText)
const user_id = document.getElementById('get_user_id').innerText

const inpFindUser = document.getElementById('inpFindUser')
const result_find_user_cointaner = document.getElementById('result_find_user_cointaner')

//Verificar se o input mudou
    let saveInpFindUserValue = ''
    setInterval(()=>{
        const search_user = inpFindUser.value
        if(search_user == ''){
            result_find_user_cointaner.style.display = 'none'
            return
        }
        if(search_user != saveInpFindUserValue){
            saveInpFindUserValue = search_user
            const send_data = {
                search_user : search_user,
                user_id : user_id
            }

            socket.emit('searchUser', send_data)

        }
    }, 10)


//Renderiza os usuários encontrados
    socket.on('usersFind', users_list=>{
        const show_number_of_users_find = document.getElementById('number_users_find')
        const users_list_cointaner = document.getElementById('users_list')
        show_number_of_users_find.innerText = users_list.length
        users_list_cointaner.innerHTML = ''
        result_find_user_cointaner.style.display = 'block'
        for(c=0; c<users_list.length; c++){
            const userFind = users_list[c]
            let html = ''
            html += `<a href="/work/renderAnotherPerfil${userFind.id}">`
                html += `<div class = "userFindCointaner">`
                    html += `<h4>${userFind.first_name}</h4>`
                    html += `<p>Email: ${userFind.email}</p>`
                    html += `<p>Número: ${userFind.tel}</p>`
                html += `</div>`
            html += `</a>`
            users_list_cointaner.innerHTML += html


        }
    })

