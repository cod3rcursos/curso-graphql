<template>
    <div v-if="itens">
        <v-alert v-for="i in itens"
            :key="i.message" :value="true" type="error">
            {{ i.message }}
        </v-alert>
    </div>
</template>

<script>
export default {
    props: ['erros'],
    computed: {
        itens() {
            if(!this.erros) return null
            const e = this.erros

            const itens = []
            
            if(e.graphQLErrors) {
                itens.push(...e.graphQLErrors)
            }
            
            // if(e.networkError) {
            //     itens.push(e.networkError)
            // }

            if(itens.length === 0) {
                itens.push({
                    message: 'Erro! Preencheu o formulário?'
                })
            }

            return itens
        }
    }
}
</script>

<style>

</style>
