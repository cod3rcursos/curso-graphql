
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('email').notNull().unique()
        table.string('senha', 60)
        table.boolean('ativo')
            .notNull().defaultTo(true)
        table.timestamp('data_criacao')
            .defaultTo(knex.fn.now())
    }).then(function () {
        return knex('usuarios').insert([
            { nome: 'João Show', email: 'jshow@empresa.com.br', senha: '12345678' },
            { nome: 'Jaime Lannister', email: 'jlann@empresa.com.br', senha: '12345678' },
            { nome: 'Gabriela T. Nunes', email: 'gtnunes@empresa.com.br', senha: '12345678' },
        ])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarios')
};
