<template>
 <v-row >
   <v-bottom-navigation v-model="step" style="margin-top:1%;color: blue;" id="initial">
      <v-btn>
      <span>Model</span>
      <v-icon>mdi-file-document</v-icon>
    </v-btn>

    <v-btn >
      <span>ETL</span>
      <v-icon>mdi-file-compare</v-icon>
    </v-btn>
   </v-bottom-navigation>
   <span class="text-explain"> *Copie e cole as colunas dos dados da documentação em seus respectivos campos</span>
   <v-col cols="12" sm="12" md="12" v-if="step === 0" >
    <v-col cols="12" sm="12" md="12" class="app-prion-first" >
      <v-col cols="9" sm="9" md="9" class="card-inputs" >
            <v-textarea outlined label="Descrições" v-model="stringDescription" placeholder="Copie e cole as Descrições..." rows="12" class="inputFirst"></v-textarea>
            <v-spacer></v-spacer>
            <v-textarea disabled outlined label="Não disponível" v-model="stringComents" placeholder="Copie e cole os Comentários..." rows="12" class="inputFirst"></v-textarea>
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
            <div class='btn-final'>
              <v-btn @click="Copy()" color="primary" id="result" href="#initial" style="margin-right: 10%;"> Copiar</v-btn>
              <v-btn text @click="Clear()" color="primary" id="result" href="#initial"> Limpar </v-btn>
            </div>
        </v-col>
    </v-col>
   </v-col>
  <v-col cols="12" sm="12" md="12" v-if="step === 1" >
    <v-col cols="12" sm="12" md="12" class="app-prion-first" >
      <v-col cols="9" sm="9" md="9" class="card-inputs" >
            <v-textarea outlined label="Status" v-model="stringStatus" placeholder="Copie e cole os Status..." rows="8"  class="inputFirst-ETL"></v-textarea>
            <v-spacer></v-spacer>
            <v-textarea outlined label="Campos" v-model="stringFields" placeholder="Campos..." rows="8"  class="inputSecond-ETL"></v-textarea>
            <v-textarea outlined label="Tamanho" v-model="stringSize" placeholder="Tamanhos..." rows="8" class="inputSecond"></v-textarea>
            <v-spacer></v-spacer>  
            <v-textarea outlined label="Tipo" v-model="stringType" placeholder="Tipo..." rows="8" class="inputSecond"></v-textarea> 
            <div class="btn-etl">
              <small> <b> *O Desenvolvedor não garante 100% -- Verifique os campos Date</b> </small><br>
              <v-btn @click="GetETL()" color="primary" href="#result"> Sapeca! </v-btn>
            </div>
      </v-col>
    </v-col>
    <v-col cols="12" sm="12" md="12" class="app-prion-second">
        <v-col cols="9" sm="9" md="9" class="card-inputs-results" >
            <small>Resultado: <br><b>
                            NOME_CAMPO = NOME_CAMPO ou <br>
                            NOME_CAMPO = NOME_CAMPO.PadRight(X, ' ') ou <br>
                            NOME_CAMPO = NOME_CAMPO.PadLeft(X, '0') ou <br>
                            NOME_CAMPO = "@" ou outros kkkkkk </b><br>
            </small><br>
            <v-textarea outlined label="Resultado" v-model="stringFinal" placeholder="Resultado" rows="12"></v-textarea>
            <div class='btn-final'>
              <v-btn @click="Copy()" color="primary" id="result" href="#initial" style="margin-right: 10%;"> Copiar</v-btn>
              <v-btn text @click="Clear()" color="primary" id="result" href="#initial"> Limpar </v-btn>
            </div>
        </v-col>
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
  private stringStatus: any = '';
  private step: any = 0;

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

  public async GetETL(): Promise<void>{
      const stringOutputSize = await this.stringSize.split('\n');
      const stringOutputType = await this.stringType.split('\n');
      const stringOutputFields = await this.stringFields.split('\n');
      const stringOutputStatus = await this.stringStatus.split('\n');

       for(var i = 0; i < stringOutputFields.length; i++){
         switch(stringOutputStatus[i]){
           case '@':
               this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "@",\n`;
               break;
           case 'PREENCHIDO - @':
               this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "@",\n`;
               break;
           case 'FIXO - 00000000': 
               this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "00000000",\n`;
               break;
           case '17 zeros': 
               this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "00000000000000000",\n`;
               break;
           case '17 ZEROS ': 
               this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "00000000000000000",\n`;
               break;
           case 'FIXO 1106010001': 
               this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "1106010001",\n`;
               break;
           default: 
              switch(stringOutputType[i]){
                case 'A':
                  switch(stringOutputSize[i]){
                    case '001':
                      this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+',\n'; 
                      break;
                    default:
                      const size = parseInt(stringOutputSize[i]);
                      this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+`.PadRight(${size}, ' '),\n` ;
                      break;
                  }
                  break;
                default:
                  switch(stringOutputSize[i]){
                    case '003V004': 
                      this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.Format_003V004(),'+'\n';
                      break;
                    case '008V004': 
                      this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.Format_008V004(),'+'\n';
                      break;
                    case '011V006':
                      this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.Format_011V006(),'+'\n'; 
                      break;
                    case '012V006': 
                      this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.Format_012V006(),'+'\n';
                      break;
                    case '014V004':
                      this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.Format_014V004(),'+'\n'; 
                      break;
                    case '015V002':
                      this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.Format_015V002(),'+'\n'; 
                      break;
                    default:
                      const size = parseInt(stringOutputSize[i]); 
                      this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+`.PadLeft(${size}, '0'),\n` ;
                      break;
                  } 
                  break;
              }
            break;
         }
       }
  }

  public Copy(): void{
    copy(this.stringFinal);
    alert('Resultado Copiado! \n CTRL+V na sua Classe! ');
  }

  public Clear(): void{
    this.stringFields = null;
    this.stringDescription = null;
    this.stringComents = null;
    this.stringSize = null;
    this.stringType = null;
    this.stringName = null
    this.stringFinal = '';
    this.stringStatus = null;
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

.inputFirst-ETL{
  width: 65%;
}

.inputSecond{
  width: 20%;
}

.inputSecond-ETL{
  width: 20%;
}

.safxName{
  width: 50%;
}

.btn-etl{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width: 50%;
}

.text-explain{
  width: 100%;
  text-align: center;
  margin-top: 1%;
  margin-bottom: 0;
  color: black;
  opacity: 0.7;
}

.btn-final{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
