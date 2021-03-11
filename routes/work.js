const express = require('express')
const router = express.Router()
const connection = require('../db')
const queries = require('../db_funcs')
const socket_url = require('../socket_url')


//Rota principal
    router.get('/', (req, res)=>{
        if(!req.session.user_id){
            res.redirect('/login/enter')
            return
        }

        connection.query(`SELECT * FROM tb_users WHERE id = ${req.session.user_id}`,
            (err, rows, fields)=>{

                if(err){
                    console.log('Ocorreu um erro: ' + err)
                    res.render('./work/db_connection_error/index.handlebars')
                    return
                }

                const user = rows[0]

                res.render('./work/home/index.handlebars',
                {
                    name: user.first_name,
                    id: user.id,
                    socket_url: socket_url
                })

        })

    })


//Mudar cadastros do perfil
    router.get('/changePerfil', (req, res)=>{
        if(!req.session.user_id){
            res.redirect('/')
            return
        }
        const user_id = req.session.user_id

        connection.query(`SELECT * FROM tb_users WHERE id = ${user_id}`,
        (err, rows, fields)=>{
            if(err){
                console.log('Ocorreu um erro: ' + err)
                res.send('./work/db_connection_error/index.handlebars')
                return
            }
            const data_send = rows[0]

            res.render('./work/change_perfil/index.handlebars',
            data_send)

        })

    })

    router.post('/changePerfil', (req, res)=>{
        if(!req.session.user_id){
            res.redirect('/')
            return
        }

        const user_id = req.session.user_id

        connection.query(`SELECT user_password FROM tb_users WHERE id = ${user_id}`,
        (err, rows, fields)=>{
            if(err){
                console.log('Ocorreu um erro: ' + err)
                res.render('./work/db_connection_error/index.handlebars')
                return
            }

            if(req.body.password != rows[0].user_password){
                res.render('./work/change_perfil/invalid_password.handlebars')
                return
            }

            const form = req.body

            connection.query(`UPDATE tb_users 
                SET first_name = '${form.first_name}',
                last_name = '${form.last_name}',
                tel = '${form.user_tel}',
                email = '${form.user_email}'
                WHERE id = ${user_id}`,
                    (err)=>{
                        if(err){
                            res.render('./work/db_connection_error/index.handlebars')
                            return
                        }
                        res.redirect('/work/')

                    })

        })


    })

//Procurar por um perfil
    router.get('/searchPerfil', (req, res)=>{
        if(!req.session.user_id){
            res.redirect('/')
            return
        }

        queries.get_user_by_id(req.session.user_id, (err, user)=>{
            if(err){
                console.log('Ocorreu um erro: ' + err)
                res.render('./work/db_connection_error/index.handlebars')
                return
            }

            const data_send = {
                user: user,
                socket_url: socket_url
            }

            res.render('./work/search_user/index.handlebars',
            data_send)

        })

    })

//Acessar o perfil de outra pessoa
    router.get('/renderAnotherPerfil:id', (req, res)=>{
        if(!req.session.user_id){
            res.redirect('/')
            return
        }
        profile_id = req.params.id
        
        queries.get_user_by_id(profile_id, (err, profile_search)=>{
            if(err){
                res.render('./work/db_connection_error/index.handlebars')
                console.log('Houve um erro: ' + err)
                return
            }
            
            queries.get_user_by_id(req.session.user_id, (err, user_search)=>{
                if(err){
                    res.render('./work/db_connection_error/index.handlebars')
                    console.log('Houve um erro: ' + err)
                    return
                }

                const user = user_search
                const profile = profile_search

                res.render('./work/see_another_perfil/index.handlebars',
                {
                    user: user,
                    profile: profile
                })


                


            })

        })

    })








module.exports = router