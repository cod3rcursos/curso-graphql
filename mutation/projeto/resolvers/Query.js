const { usuarios, perfis } = require('../data/db')

module.exports = {
    usuarios() {
        return usuarios
    },
    usuario(_, { id }) {
        const sels = usuarios
            .filter(u => u.id === id)
        return sels ? sels[0] : null
    },
    perfis() {
        return perfis
    },
    perfil(_, { id }) {
        const sels = perfis
            .filter(p => p.id === id)
        return sels ? sels[0] : null 
    }
}