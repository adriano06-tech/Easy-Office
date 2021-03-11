module.exports = {

    get_user_by_id: (user_id, callback)=>{
        const connection = require('./db')

        connection.query(`SELECT * FROM tb_users WHERE id = ${user_id}`,
            (err, rows, fields)=>{
                callback(err, rows[0])
            }
        )
    },

    get_list_of_users_by_name: (received_data, callback)=>{
        const connection = require('./db')
        const search_user = received_data.search_user
        const user_id = received_data.user_id

        connection.query(`SELECT * FROM tb_users WHERE 
            user_name LIKE '%${search_user}%' AND id <> ${user_id}
            ORDER BY user_name`,
            (err, rows, fields)=>{
                callback(err, rows)
            }
        )
    }
}