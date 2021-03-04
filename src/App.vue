<template>
  <v-app >
    <v-app-bar app color="primary" dark>
        <h2>Mastersaf Safx</h2>
    </v-app-bar>
    <v-main class="app">
       <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component
export default class App extends Vue{

}
</script>
<style scoped>
.btn-home{
  cursor: pointer;
}


</style>
