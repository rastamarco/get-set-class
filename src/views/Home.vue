<template>
 <v-row id="initial">
   <v-col cols="12" sm="12" md="12" class="app-prion-first" >
     <v-col cols="9" sm="9" md="9" class="card-inputs" >
          <!-- <small>Insira a Descrição <b>Exemplo: Código do Exemplo</b> </small> -->
          <v-textarea outlined label="Descrições" v-model="stringDescription" placeholder="Copie e cole as Descrições..." rows="12" class="inputFirst"></v-textarea>
          <v-spacer></v-spacer>
          <v-textarea outlined label="Comentários" v-model="stringComents" placeholder="Copie e cole os Comentários..." rows="12" class="inputFirst"></v-textarea>
          <v-textarea outlined label="Obrigatoriedade" v-model="stringRequired" placeholder="Obrigatoriedade..." rows="8" class="inputSecond"></v-textarea>
          <v-spacer></v-spacer>
          <v-textarea outlined label="Tamanho" v-model="stringSize" placeholder="Tamanhos..." rows="8" class="inputSecond"></v-textarea>
          <v-spacer></v-spacer>
          <v-textarea outlined label="Campos" v-model="stringFields" placeholder="Campos..." rows="8" class="inputSecond"></v-textarea>
          <v-spacer></v-spacer>  
          <v-textarea outlined label="Tipo" v-model="stringType" placeholder="Tipo..." rows="8" class="inputSecond"></v-textarea> 
          
     </v-col>
   </v-col>
   <v-col cols="12" sm="12" md="12" class="app-prion-second">
      <v-col cols="9" sm="9" md="9" class="card-inputs" >
        <v-text-field hide-details v-model="stringName" outlined label="Nome da Safx: " placeholder="Index" class="safxName"></v-text-field><br>
        <v-btn @click="GetModel()" color="primary" class="safxName" href="#result"> Sapeca! </v-btn>
      </v-col>
   </v-col>
   <v-col cols="12" sm="12" md="12" class="app-prion-second">
      <v-col cols="9" sm="9" md="9" class="card-inputs-results" >
          <small>Resultado: <br><b>/// sumary Nome da Safx | SEQUÊNCIA | DESCRIÇÃO | TAMANHO | TIPO /summary<br>
                               /// remarks Comentários /remarks <br>
                               public string COD_EXEMPLO { get; set; }</b> </small><br>
          <v-textarea outlined label="Resultado" v-model="stringFinal" placeholder="Resultado" rows="12"></v-textarea>
          <v-btn @click="Clear()" color="primary" id="result" href="#initial"> Copiar e Limpar </v-btn>
      </v-col>
   </v-col>
 </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import copy from 'copy-to-clipboard';

@Component
export default class Home extends Vue {

  private stringFields: any = null;
  private stringFinal: any = '';
  private stringDescription: any = '';
  private stringComents: any = '';
  private stringSize: any = '';
  private stringType: any = '';
  private stringName: any = '';
  private stringRequired: any = '';

  public async GetModel(): Promise<void>{
      const stringOutputFields = await this.stringFields.split('\n');
      const stringOutputDescription = await this.stringDescription.split('\n');
      const stringOutputComents = await this.stringComents.split('\n');
      const stringOutputSize = await this.stringSize.split('\n');
      const stringOutputType = await this.stringType.split('\n');
      const stringOutputRequired = await this.stringRequired.split('\n');
      for(var i = 0; i < stringOutputFields.length; i++){
        if (stringOutputRequired[i] === '(*)') {
              this.stringFinal = this.stringFinal + 
              '\n///<summary> '+this.stringName+' | '+ stringOutputDescription[i]+' | '+(i+1)+
              ' | '+stringOutputSize[i]+' | '+ stringOutputType[i] + ' | Required  </summary>'+'\n'+
              '///<remarks> '+ stringOutputComents[i] + ' </remarks>'+'\n'+
              '[Required]'+'\n'+
              'public string '+ stringOutputFields[i] + ' { get; set; }'+'\n'
        } else {
              this.stringFinal = this.stringFinal + 
              '\n///<summary> '+this.stringName+' | '+ stringOutputDescription[i]+' | '+(i+1)+
              ' | '+stringOutputSize[i]+' | '+ stringOutputType[i] + ' </summary>'+'\n'+
              '///<remarks> '+ stringOutputComents[i] + ' </remarks>'+'\n'+
              'public string '+ stringOutputFields[i] + ' { get; set; }'+'\n'
        }
      }
  }

  public Clear(): void{
    copy(this.stringFinal);
    alert('Resultado Copiado!');
    this.stringFields = null;
    this.stringDescription = null;
    this.stringComents = null;
    this.stringSize = null;
    this.stringType = null;
    this.stringName = null
    this.stringFinal = '';
  }
}
</script>
<style scoped>
.app-prion-first{
  display:flex;
  flex-direction:row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 2%;
  margin-left: 3%;
  margin-right: 6%;
}

.app-prion-first .card-inputs{
  display:flex;
  flex-direction:row;
  height: 90%;
  flex-wrap: wrap;
}

.app-prion-second{
  display:flex;
  flex-direction:row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-top: 1%;
  margin-left: 3%;
}

.app-prion-second .card-inputs{
  display:flex;
  flex-direction:column;
  align-items: center;
}

.app-prion-second .card-inputs-results{
  display:flex;
  flex-direction:column;
}
.inputFirst{
  width: 45%;
}

.inputSecond{
  width: 20%;
}

.safxName{
  width: 50%;
}
</style>
