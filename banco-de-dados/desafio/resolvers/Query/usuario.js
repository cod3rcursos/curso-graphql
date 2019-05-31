const db = require('../../config/db')

module.exports = {
    usuarios() {
        return db('usuarios')
    },
    usuario(_, { filtro }) {
        if(!filtro) return null
        const { id, email } = filtro
        if(id) {
            return db('usuarios')
                .where({ id })
                .first()
        } else if(email) {
            return db('usuarios')
                .where({ email })
                .first()
        } else {
            return null
        }
    },
}