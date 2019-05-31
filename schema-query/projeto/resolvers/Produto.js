module.exports = {
    precoComDesconto(produto) {
        if(produto.desconto) {
            return produto.preco 
                * (1 - produto.desconto)
        } else {
            return produto.preco
        }
    }
}