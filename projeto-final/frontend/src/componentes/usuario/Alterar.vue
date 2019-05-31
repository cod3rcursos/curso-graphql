<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Filtrar Usuário</h1>
                    <v-divider class="mb-3" />
                    <div v-if="erros">
                        <Erros :erros="erros" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filtro.id" />
                    <v-text-field label="E-mail"
                        v-model="filtro.email" />

                    <h1 class="mt-4 headline">Alterar Usuário</h1>
                    <v-divider class="mb-3" />
                    <v-text-field label="Nome"
                        v-model="usuario.nome" />
                    <v-text-field label="E-mail"
                        v-model="usuario.email" />
                    <v-text-field label="Senha"
                        v-model="usuario.senha" type="password" />
                    <v-select label="Perfis"
                        v-model="usuario.perfis"
                        :items="perfis"
                        item-value="id"
                        item-text="rotulo"
                        attach multiple
                        chips deletable-chips />
                    <v-btn class="ml-0 mt-3"
                        @click="obterPerfis">
                        Obter Perfis
                    </v-btn>
                    <v-btn color="primary" class="ml-0 mt-3"
                        @click="alterarUsuario">
                        Alterar Usuário
                    </v-btn>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Resultado</h1>
                    <v-divider />
                    <template v-if="dados">
                        <v-text-field label="ID" readonly
                            v-model="dados.id" />
                        <v-text-field label="Nome" readonly
                            v-model="dados.nome" />
                        <v-text-field label="E-mail" readonly
                            v-model="dados.email" />
                        <v-text-field label="Perfis" readonly
                            :value="perfisRotulos" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Erros from '../comum/Erros'
import gql from 'graphql-tag'

export default {
    components: { Erros },
    data() {
        return {
            filtro: {},
            usuario: {},
            perfis: [],
            dados: null,
            erros: null
        }
    },
    computed: {
        perfisRotulos() {
            return this.dados && this.dados.perfis &&
                this.dados.perfis.map(p => p.rotulo).join(', ')
        },
        perfisSelecionados() {
            if(this.usuario.perfis) {
                return this.usuario.perfis.map(id => ({ id }))
            } else {
                return null
            }
        }
    },
    methods: {
        alterarUsuario() {
            this.$api.mutate({
                mutation: gql`
                    mutation (
                        $idFiltro: Int
                        $emailFiltro: String
                        $nome: String
                        $email: String
                        $senha: String
                        $perfis: [PerfilFiltro]
                    ) {
                        alterarUsuario (
                            filtro: {
                                id: $idFiltro
                                email: $emailFiltro
                            }
                            dados: {
                                nome: $nome
                                email: $email
                                senha: $senha
                                perfis: $perfis
                            }
                        ) {
                            id nome email perfis { rotulo }
                        }
                    }
                `,
                variables: {
                    idFiltro: this.filtro.id,
                    emailFiltro: this.filtro.email,
                    nome: this.usuario.nome,
                    email: this.usuario.email,
                    senha: this.usuario.senha,
                    perfis: this.perfisSelecionados
                }
            }).then(resultado => {
                this.dados = resultado.data.alterarUsuario
                this.filtro = {}
                this.usuario = {}
                this.erros = null
            }).catch(e => {
                this.erros = e
            })
        },
        obterPerfis() {
            this.$api.query({
                query: gql`{ perfis { id rotulo } }`
            }).then(resultado => {
                this.perfis = resultado.data.perfis
                this.erros = null
            }).catch(e => {
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
