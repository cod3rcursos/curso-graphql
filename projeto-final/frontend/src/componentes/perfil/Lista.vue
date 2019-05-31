<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4"
                    @click="obterPerfis">
                    Obter Perfis
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="erros" class="mb-4">
                    <Erros :erros="erros" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="perfis" 
                    hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.nome }}</td>
                        <td>{{ props.item.rotulo }}</td>
                    </template>
                </v-data-table>
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
            erros: null,
            perfis: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Nome', value: 'name' },
                { text: 'Rótulo', value: 'rotulo' },
            ],
        }
    },
    methods: {
        obterPerfis() {
            this.$api.query({
                query: gql`
                    query {
                        perfis {
                            id nome rotulo
                        }
                    }
                `,
                fetchPolicy: 'network-only'
            }).then(resultado => {
                this.perfis = resultado.data.perfis
                this.erros = null
            }).catch(e => {
                this.perfis = []
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
