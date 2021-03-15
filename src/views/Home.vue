<template>
 <v-row >
   <v-bottom-navigation v-model="step" color="primary" style="margin-top: 1%;" id="initial">
      <div class="btn-choose">
        <v-btn large text>
          <span>Model</span>
          <v-icon>mdi-file-document</v-icon>
        </v-btn>
        <v-btn large text >
          <span>ETL</span>
          <v-icon>mdi-file-compare</v-icon>
      </v-btn>
     </div>
   </v-bottom-navigation>
   <span class="text-explain"> *Copie e cole as colunas dos dados da documentação em seus respectivos campos</span>
   <v-col cols="12" sm="12" md="12" v-if="step === 0" >
    <v-form>
    <v-col cols="12" sm="12" md="12" class="app-prion-first" >
      <v-col cols="9" sm="9" md="9" class="card-inputs" >
            <v-textarea 
              outlined 
              label="Descrições" 
              required 
              :error-messages="descriptionErrors" 
              v-model="stringDescription" 
              placeholder="Copie e cole as Descrições..." 
              rows="12"
              @input="$v.stringDescription.$touch()" 
              @blur="$v.stringDescription.$touch()" 
              class="inputFirst"></v-textarea>
            <v-spacer></v-spacer>
            <v-textarea disabled outlined label="Não disponível" v-model="stringComents" placeholder="Copie e cole os Comentários..." rows="12" class="inputFirst"></v-textarea>
            <v-textarea 
              outlined
              label="Obrigatoriedade"
              v-model="stringRequired" 
              placeholder="Obrigatoriedade..." 
              rows="8"
              :error-messages="requiredErrors"
              @input="$v.stringRequired.$touch()" 
              @blur="$v.stringRequired.$touch()"  
              class="inputSecond"></v-textarea>
            <v-spacer></v-spacer>
            <v-textarea 
              outlined
              label="Tamanho"
              v-model="stringSize"
              placeholder="Tamanhos..."
              :error-messages="sizeErrors"
              @input="$v.stringSize.$touch()" 
              @blur="$v.stringSize.$touch()"
              rows="8" 
              class="inputSecond"></v-textarea>
            <v-spacer></v-spacer>
            <v-textarea 
              outlined 
              label="Campos" 
              v-model="stringFields" 
              placeholder="Campos..." 
              rows="8"
              :error-messages="fieldsErrors"
              @input="$v.stringFields.$touch()" 
              @blur="$v.stringFields.$touch()" 
              class="inputSecond"></v-textarea>
            <v-spacer></v-spacer>  
            <v-textarea 
              outlined 
              label="Tipo" 
              v-model="stringType" 
              placeholder="Tipo..." 
              rows="8"
              :error-messages="typeErrors"
              @input="$v.stringType.$touch()" 
              @blur="$v.stringType.$touch()" 
              class="inputSecond"></v-textarea> 
      </v-col>
    </v-col>
    <v-col cols="12" sm="12" md="12" class="app-prion-second">
        <v-col cols="9" sm="9" md="9" class="card-inputs" >
          <v-text-field  
              v-model="stringName" 
              outlined 
              label="Nome da Safx: " 
              placeholder="Índice"
              :error-messages="nameErrors"
              @input="$v.stringName.$touch()" 
              @blur="$v.stringName.$touch()" 
              class="safxName"></v-text-field><br>
          <v-btn @click="GetModel()" color="primary" class="safxName"> Sapeca! </v-btn>
        </v-col>
    </v-col>
    </v-form>
    <v-col cols="12" sm="12" md="12" class="app-prion-second">
        <v-col cols="9" sm="9" md="9" class="card-inputs-results" >
            <small>Resultado: <br><b>/// sumary Nome da Safx | SEQUÊNCIA | DESCRIÇÃO | TAMANHO | TIPO /summary<br>
                                /// remarks Comentários /remarks <br>
                                [Required] ou Vazio <br>
                                public string COD_EXEMPLO { get; set; }</b> </small><br>
            <v-textarea outlined label="Resultado" v-model="stringFinal" placeholder="Resultado" rows="12" ref="resultado"></v-textarea>
            <div class='btn-final'>
              <v-btn @click="Copy()" color="primary" id="result" href="#initial" style="margin-right: 10%;"> Copiar</v-btn>
              <v-btn text @click="Clear()" color="primary" id="result" href="#initial"> Limpar </v-btn>
            </div>
        </v-col>
    </v-col>
   </v-col>
  <v-col cols="12" sm="12" md="12" v-if="step === 1" >
    <v-form>
    <v-col cols="12" sm="12" md="12" class="app-prion-first" >
      <v-col cols="9" sm="9" md="9" class="card-inputs" >
            <v-textarea 
              outlined 
              label="Status" 
              v-model="stringStatus" 
              placeholder="Copie e cole os Status..." 
              rows="8"
              :error-messages="statusErrors"
              @input="$v.stringStatus.$touch()" 
              @blur="$v.stringStatus.$touch()"  
              class="inputFirst-ETL"></v-textarea>
            <v-spacer></v-spacer>
            <v-textarea 
              outlined 
              label="Campos" 
              v-model="stringFields" 
              placeholder="Campos..." 
              rows="8"
              :error-messages="fieldsErrors"
              @input="$v.stringFields.$touch()" 
              @blur="$v.stringFields.$touch()"    
              class="inputSecond-ETL"></v-textarea>
            <v-textarea 
              outlined 
              label="Tamanho" 
              v-model="stringSize" 
              placeholder="Tamanhos..." 
              rows="8"
              :error-messages="sizeErrors"
              @input="$v.stringSize.$touch()" 
              @blur="$v.stringSize.$touch()" 
              class="inputSecond"></v-textarea>
            <v-spacer></v-spacer>  
            <v-textarea 
              outlined 
              label="Tipo" 
              v-model="stringType" 
              placeholder="Tipo..." 
              rows="8"
              :error-messages="typeErrors"
              @input="$v.stringType.$touch()" 
              @blur="$v.stringType.$touch()"  
              class="inputSecond"></v-textarea> 
            <div class="btn-etl">
              <small> <b> *O Desenvolvedor não garante 100% -- <br>Verifique os campos Date e Fixos (ex:0000)</b> </small><br>
              <v-btn @click="GetETL()" color="primary"> Sapeca! </v-btn>
            </div>
        </v-col>
    </v-col>
    </v-form>
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
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import copy from 'copy-to-clipboard';

@Component({
  mixins: [validationMixin],
  validations: { 
    stringFields: { required },
    stringDescription: { required },
    stringSize: { required },
    stringType: { required },
    stringName: { required },
    stringRequired: { required },
    stringStatus: { required }
  }
})
export default class Home extends Vue {

  private stringFields: string = '';
  private stringFinal: string = '';
  private stringDescription: string = '';
  private stringComents: string = '';
  private stringSize: string = '';
  private stringType: string = '';
  private stringName: string = '';
  private stringRequired: string = '';
  private stringStatus: string = '';
  private step: any = 0;

  get descriptionErrors(): Array<any> {
    let errors: Array<string> = []
    if (!this.$v.stringDescription.$dirty) return errors
    !this.$v.stringDescription.required && errors.push('Descrições são Obrigatórias!')
    return errors
  }

  get requiredErrors(): Array<any> {
    let errors: Array<string> = []
    if (!this.$v.stringRequired.$dirty) return errors
    !this.$v.stringRequired.required && errors.push('A Obrigatoriedade é Obrigatória!')
    return errors
  }

  get sizeErrors(): Array<any> {
    let errors: Array<string> = []
    if (!this.$v.stringSize.$dirty) return errors
    !this.$v.stringSize.required && errors.push('Tamanhos são Obrigatórios!')
    return errors
  }

  get fieldsErrors(): Array<any> {
    let errors: Array<string> = []
    if (!this.$v.stringFields.$dirty) return errors
    !this.$v.stringFields.required && errors.push('Campos são Obrigatórios!')
    return errors
  }

  get typeErrors(): Array<any> {
    let errors: Array<string> = []
    if (!this.$v.stringType.$dirty) return errors
    !this.$v.stringType.required && errors.push('Tipos são Obrigatórios!')
    return errors
  }

  get nameErrors(): Array<any> {
    let errors: Array<string> = []
    if (!this.$v.stringName.$dirty) return errors
    !this.$v.stringName.required && errors.push('Nome da Safx é Obrigatório!')
    return errors
  }

  get statusErrors(): Array<any> {
    let errors: Array<string> = []
    if (!this.$v.stringStatus.$dirty) return errors
    !this.$v.stringStatus.required && errors.push('Os Status são Obrigatórios!')
    return errors
  }

   @Watch('step')
  public async onPropertyChangedsChamber(value: any, oldValue: any): Promise < void > {
      this.$v.$reset();
      this.stringFinal = '';
  }

  public async GetModel(): Promise<void>{
      this.$v.$touch()
      switch (this.canCopy()){
          case true:
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
          break;
          default:
          break;
      }
     
  }

  public async GetETL(): Promise<void>{
    this.$v.$touch()
    switch (this.canCopy()){
      case true:
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
            case '7 zeros ': 
                this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "00000000000000000",\n`;
                break;
            case '17 zeros': 
                this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "00000000000000000",\n`;
                break;
            case '17 ZEROS ': 
                this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "00000000000000000",\n`;
                break;
            case '17 vezes 0': 
                this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "00000000000000000",\n`;
                break;
            case 'FIXO 1106010001': 
                this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "1106010001",\n`;
                break;
            case '38 FIXO': 
                this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "38",\n`;
                break;
            case 'T': 
                this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "T",\n`;
                break;
            case '8 ZEROS': 
                this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "00000000",\n`;
                break;
            case '8 zeros': 
                this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "00000000",\n`;
                break;
            case 'fixo - 00001': 
                this.stringFinal = this.stringFinal + stringOutputFields[i] +` =  "00001",\n`;
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
                      case '003V002': 
                        this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.GetFormat(3, 2),'+'\n';
                        break;
                      case '003V004': 
                        this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.GetFormat(3, 4),'+'\n';
                        break;
                      case '004V004': 
                        this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.GetFormat(4, 4),'+'\n';
                        break;
                      case '008V004': 
                        this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.GetFormat(8, 4),'+'\n';
                        break;
                      case '011V006':
                        this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.GetFormat(11, 6),'+'\n'; 
                        break;
                      case '012V006': 
                        this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.GetFormat(12, 6),'+'\n';
                        break;
                      case '014V004':
                        this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.GetFormat(14, 4),'+'\n'; 
                        break;
                      case '015V002':
                        this.stringFinal = this.stringFinal + stringOutputFields[i] + ' = ' + stringOutputFields[i]+'.GetFormat(15, 2),'+'\n'; 
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
      break;
      default:
      break;
    }
  }

  public Copy(): void{
      if (this.stringFinal !== ''){
        copy(this.stringFinal);
        this.$swal('Copiado!', 'Cole em sua model, e só insira os comentários', 'success');
      } else {
        this.$swal('Ops!', 'Você não sapecou os dados ainda!', 'warning');
      }
  }

  public canCopy(): boolean{
     switch(this.step){
       case 0: 
          if(this.stringDescription !== '' && this.stringSize !== '' && this.stringType !== '' 
          && this.stringName !== '' && this.stringRequired !== '' && this.stringFields !== ''){
            return true;
          } else {
            return false;
          }
        case 1:
          if(this.stringStatus !== '' && this.stringSize !== '' && this.stringType !== '' && this.stringFields !== '' ){
            return true;
          } else {
            return false;
          }
        default:
          return false;
     }  
  }

  public Clear(): void{
    this.$v.$reset();
    this.stringFields = '';
    this.stringDescription = '';
    this.stringComents = '';
    this.stringSize = '';
    this.stringType = '';
    this.stringName = ''
    this.stringFinal = '';
    this.stringStatus = '';
    this.stringRequired = '';
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

.btn-choose{
  display:flex;
  flex-direction: row;
  align-items: center;
}
</style>
