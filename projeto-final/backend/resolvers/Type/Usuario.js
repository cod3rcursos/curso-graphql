const db = require('../../config/db')

module.exports = {
    perfis(usuario) {
        return db('perfis')
            .join(
                'usuarios_perfis',
                'perfis.id',
                'usuarios_perfis.perfil_id'
            )
            .where({ usuario_id: usuario.id })
    }
}