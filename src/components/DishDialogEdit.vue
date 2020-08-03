<template>
  <q-card class="bg-white">
    <q-bar class="bg-primary q-py-lg">
      <div class="app-font-medium text-white">NOVO PRATO</div>
      <q-space />
      <q-btn class="text-white" dense flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-bar>

    <q-card-section>
    <q-form @submit.prevent="submitForm" class="q-gutter-md">
    <div class="row col-12">
      <div>
        <div class="app-font-medium text-red-5 text-h6">Imagem:</div>

        <div>
          <q-img
            :src="dish.imagePreview"
            :ratio="16/9"
            style="width: 30em"
          />
        </div>

        <input class="inputfile" type="file" name="file" id="file" @change="previewImage" accept="image/*" >
        <label for="file" class="text-center" style="width: 24em"> <q-icon name="las la-file-upload" size="md"></q-icon> Selecionar imagem</label>
        </div>
      <div class="col q-ml-md">
        <div class="app-font-medium text-red-5 text-h6">Nome:</div>

          <q-input
            filled
            v-model="dish.name"
            placeholder="EX: Feijoada"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <div class="app-font-medium text-red-5 text-h6">Categoria:</div>

          <q-select filled v-model="dish.type" :options="options" label="Selecione uma categoria" />

          <div class="app-font-medium text-red-5 text-h6">Descrição:</div>

          <q-input
            v-model="dish.description"
            placeholder="Descrição"
            filled
            type="textarea"
            style="height: 90px"
          />
        </div>
    </div>

      <div class="app-font-medium text-red-5 text-h6">Contem:</div>

      <q-input
        filled
        v-model="dish.containAdd"
        ref="containAddInput"
        placeholder="EX: Sal">
        <template v-slot:after>
          <q-btn @click="addItem" icon="las la-plus" size="lg" type="submit" color="primary"/>
        </template>
      </q-input>

      <q-list dense bordered class="bg-grey-3" style="min-height: 30px">
        <q-item class="q-px-sm" v-for="(item, index) in dish.contain" :key="index">
          <q-item-section>{{item}}</q-item-section>
          <q-item-section avatar>
            <q-icon @click="dish.contain.splice(index, 1)" class="cursor-pointer" size="md" color="primary" name="las la-times" />
          </q-item-section>
        </q-item>
      </q-list>
        

      <div class="app-font-medium text-red-5 text-h6">Vegano:</div>

      <q-radio v-model="dish.vegan" val= true label="Sim" color="red-5" />
      <q-radio v-model="dish.vegan" val= false label="Não" color="red-5" />

      <div class="app-font-medium text-red-5 text-h6">Vegetariano:</div>

      <q-radio v-model="dish.vegie" :disable="isVegan" val= true label="Sim" color="red-5" />
      <q-radio v-model="dish.vegie" :disable="isVegan" val= false label="Não" color="red-5" />

      <div class="row reverse">
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    </q-card-section>

  </q-card>
</template>

<style scoped>
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: #ef5350;
    display: inline-block;
    cursor: pointer;
    padding: .5em;
  }

  .inputfile + label * {
	  pointer-events: none;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ef5350;
  }

</style>

<script>
import { mapActions } from "vuex"
export default {
  name: 'PageIndex',

  props: ['dishData'],

  data () {
    return {
      options: [
        'Principal', 'Acompanhamento', 'Bebida', 'Sobremesa'
      ],
      isVegan: false,
      dish:{
        dishID: this.dishData.dishID,
        name: this.dishData.itemName,
        type: this.dishData.itemType,
        description: this.dishData.itemDescription,
        containAdd: '',
        contain: this.dishData.itemHave,
        vegan: this.dishData.vegan,
        vegie: this.dishData.vegie,
        image: null,
        imagePreview: this.dishData.itemImage,
      }
      
    }
  },

  mounted() {
    console.log(this.dishData)
  },

  watch: {
    'dish.vegan': function (val) {
      if(val == 'true') {
        console.log(val)
        this.dish.vegie = 'true'
        this.isVegan = true
      }
      else{
        this.dish.vegie = null
        this.isVegan = false
      }
    }
  },

  methods: {
    ...mapActions("dish", ["editDish"]),

    addItem () {
      this.dish.contain.push(this.dish.containAdd)
      this.dish.containAdd = ''
      this.$refs.containAddInput.focus()
      
    },
    
    previewImage(e) {
      const file = e.target.files[0];
      console.log(file)
      this.dish.image = file
      this.dish.imagePreview = URL.createObjectURL(file);
      console.log(this.dish.imagePreview)
      console.log(this.dish)

    },

    submitForm () {
      this.editDish(this.dish)
    }
  }
}
</script>
