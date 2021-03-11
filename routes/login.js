const express = require('express')
const router = express.Router()
const connection = require('../db')

//Criar conta

    router.get('/createAccount', (req, res)=>{
        res.render('./login/form_create_account/index.handlebars')
    })

    router.post('/createAccount', (req, res)=>{
        const form = req.body
        //Verifica se o cliente já está cadastrado

        //Verificação se o cliente já está cadastrado

        connection.query(`SELECT * FROM tb_users WHERE email = '${form.user_email}'`, 
                (err, rows, fields)=>{
                    if(err){
                        res.render('./login/error_create_account/index.handlebars',
                        {msg: 'Ocorreu algum erro.'})
                        exit = true
                        return
                    }

                    if(rows.length > 0){
                        res.render('./login/error_create_account/index.handlebars',
                        {msg: 'Já existe uma conta com esse email.'})
                        exit = true
                        return
                    }

                    //Usuário não cadastrado

                    if(form.user_password != form.user_confirm_password){
                        res.render('./login/error_create_account/index.handlebars',
                        {msg: 'A senha que foi preenchida é diferente da confirmada.'})
                        return
                    }
                    //Verifica se não existe nenhum valor não preenchido
                    if(
                        form.first_name == '' || form.last_name == '' || form.user_tel == '' ||
                        form.user_email == '' || form.user_password == ''
                    ){
                        res.render('./login/error_create_account/index.handlebars',
                            {msg: 'Algum valor não foi inserido no formulário. Por favor, tente novamente.'})
                    }
            
                    connection.query(`INSERT INTO tb_users (
                        first_name, last_name, 
                        user_name, tel,
                        email, user_password
                    ) VALUES (
                        '${form.first_name}', '${form.last_name}',
                        '${form.first_name + ' ' +  form.last_name}', '${form.user_tel}',
                        '${form.user_email}', '${form.user_password}'
                    )`, (err)=>{
                        if(err){
                            console.log('Ocorreu um erro: ' + err)
                            res.render('./login/error_create_account/index.handlebars',
                            {msg: err})
                            return
                        }
                        res.render('./login/success_create_account/index.handlebars',
                        {user_name: form.first_name,
                        email: form.user_email,
                        password: form.user_password})
                    })

                }
        )

    })

//Login

    router.get('/enter', (req, res)=>{
        res.render('./login/form_login/index.handlebars')
    })

    router.post('/enter', (req, res)=>{
            
            connection.query(`SELECT * FROM tb_users WHERE email = '${req.body.email}' 
            and user_password = '${req.body.password}'`, 
                (err, rows, fields)=>{

                    if(err){
                        console.log(err)
                        res.render('./login/error_login/index.handlebars',
                            {msg: 'Houve algum erro no nosso servidor, tente novamente.'})
                        return
                    }

                    if(rows.length == 0){
                        res.render('./login/error_login/index.handlebars',
                            {msg: 'Usuário ou senha inválida, tente novamente.'})
                        return
                    }
                    
                    req.session.user_id = rows[0].id
                    res.redirect('/work/')
                }
            )
            
            

        
    })





module.exports = router