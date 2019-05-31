const db = require('../config/db')

const novoUsuario = {
    nome: 'Pedro',
    email: 'pedro@empresa.com.br',
    senha: '12345678'
}

// update... db('...').where({...}).update({...})

async function exercicio() {
    // count
    const { qtde } = await db('usuarios')
        .count('* as qtde').first()

    // inserir (se a tabela estiver vazia)
    if(qtde === 0) {
        await db('usuarios').insert(novoUsuario)
    }

    // consultar
    let { id } = await db('usuarios')
        .select('id').limit(1).first()

    // alterar
    await db('usuarios').where({ id })
        .update({
            nome: 'Pedro Garcia',
            email: 'pedro.garcia@empresa.com.br'
        })

    return db('usuarios').where({ id })
}

exercicio()
    .then(usuario => console.log(usuario))
    .finally(() => db.destroy())