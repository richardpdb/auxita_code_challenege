<template>
  <div class="form">
    <div class="form-toggle"></div>
    <div class="form-panel one">
      <div class="form-header">
        <h1> {{labels.form_labels.app_title}}</h1>
      </div>
      <div class="form-content">
          <!-- Hypertension Form -->
        <form>
          <div class="form-group">
            <h2 class="disease_title"> {{labels.form_labels.hypertension_title}} </h2>
            <label for="SysBP"> {{labels.form_labels.sysbp_lb}} </label>
            <input id="SysBP" type="number" name="SysBP" v-model="sysBP" required="required" 
                   oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
          </div>
          <div class="form-group">
            <label for="DiaBP"> {{labels.form_labels.diabp_lb}} </label>
            <input name="DiaBP" type="number" v-model="diaBP" required="required" 
                   oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
          </div>
          <div class="form-group">
            <label for="date"> {{labels.form_labels.date}} </label>
            <input id="date" type="date" v-model="dateHypertension" required="required">
          </div>
          <div class="form-group">
            <button type="button" class="hypertension_btn" v-on:click="calculateHypertension">
              {{labels.form_labels.submit_btn}}
            </button>
          </div>
        </form>
      </div>
      <br>
      <div class="form-content">
        <!-- Kidney Disease Form -->
        <form>
          <div class="form-group">
            <h2 class="disease_title"> {{labels.form_labels.kidney_title}} </h2>
            <label for="eGFR">{{labels.form_labels.egfr_lb}}</label>
            <input name="eGFR" type="number" v-model="eGFR" required="required" 
                   oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
          </div>
          <div class="form-group">
            <label for="date">Date</label>
            <input id="date" type="date" v-model="dateKidney" required="required" />
          </div>
          <div class="form-group">
            <button type="button" class="kidney_btn" v-on:click="evaluateKidney">{{labels.form_labels.submit_btn}}</button>
          </div>
        </form>
      </div>
    </div>
</div>
</template>

<script>
import labels from './data/variables.js';
import Swal from 'sweetalert2'

export default {
  name: 'App',
 
 //Vue Model
  data() {
    return {
      labels,
      sysBP: 0,
      diaBP: 0,
      eGFR: 0,
      dateHypertension: '',
      dateKidney: '',
      hypertensionClassification: '',
      kidneyDiseaseClassification: '',
      last_eGFR: 0,
    }
  },

  methods: {
    //Method that calculate the stage of hypertension
    calculateHypertension() {
      /*
        If SysBP is Greater than or Equal to 180 AND DiaBP Greater than or Equal to 120
        Classification: “Stage 3”.  

        If SysBP is between 160 (inclusive) and 180 (exclusive) OR DiaBP is between 100 
        (inclusive) and 110 (exclusive)
        Classification: “Stage 2” 

        If SysBP is between 140 (inclusive) and 160 (exclusive) OR DiaBP is between 90 
        (inclusive) and 100 (exclusive)
        Classification: “Stage 1” 

        All other cases:
        Classification: “No Hypertension”
    */

      if(this.sysBP <= 0 || this.diaBP <= 0 || this.dateHypertension == '') {
        Swal.fire({
            title: 'Something is wrong',
            text: 'Make sure to fill all the fields (numbers only)',
            icon: 'warning',
            confirmButtonText: 'Okay'
          })
      }

      if(this.sysBP > 0 && this.diaBP > 0 && this.dateHypertension != '') {

        if(this.sysBP >= 180 && this.diaBP >= 120) {
          this.hypertensionClassification = "Stage 3"

          Swal.fire({
            title:  this.hypertensionClassification,
            text: 'SysBP: ' + this.sysBP + ', ' + 'DiaBP: ' + this.diaBP + ', ' + 'Date: ' + this.dateHypertension,
            icon: 'info',
            confirmButtonText: 'Cool'
          })
        }
        else if((this.sysBP >= 160 && this.sysBP <= 180) || (this.diaBP >= 100 && this.diaBP <= 110)) {
          this.hypertensionClassification = "Stage 2"

          Swal.fire({
            title:  this.hypertensionClassification,
            text: 'SysBP: ' + this.sysBP + ', ' + 'DiaBP: ' + this.diaBP + ', ' + 'Date: ' + this.dateHypertension,
            icon: 'info',
            confirmButtonText: 'Cool'
          })
        }
        else if((this.sysBP >= 140 && this.sysBP <= 160) || (this.diaBP >= 90 && this.diaBP <= 100)) {
          this.hypertensionClassification = "Stage 1"

          Swal.fire({
            title:  this.hypertensionClassification,
            text: 'SysBP: ' + this.sysBP + ', ' + 'DiaBP: ' + this.diaBP + ', ' + 'Date: ' + this.dateHypertension,
            icon: 'info',
            confirmButtonText: 'Cool'
          })
        }
        else {
          this.hypertensionClassification = "No Hypertension"

          Swal.fire({
            title:  this.hypertensionClassification,
            text: 'SysBP: ' + this.sysBP + ', ' + 'DiaBP: ' + this.diaBP + ', ' + 'Date: ' + this.dateHypertension,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
        }
      }
    },

    //Method that calculates the classification of kidney disease
    evaluateKidney() {

      /*
        If eGFR is Greater than or equal to 90 (inclusive) ->	Normal
        If eGFR is between 60 and 89 (all inclusive) ->	Mildly Decreased
        If eGFR is between 45 and 59 (all inclusive) ->	Mild to moderate
        If eGFR is between 30 and 44 (all inclusive) ->	Moderate to Severe
        If eGFR is between 15 and 29 (all inclusive) ->	Severely Decreased
        Everything else	Kidney Failure :(

        if eGFR value is dropped by 20% or more in the consecutive reading (chronologically) include that drop in the output.
      */ 

      if(this.eGFR <= 0 || this.dateKidney == '') {

        Swal.fire({
            title: 'Something is wrong',
            text: 'Make sure to fill all the fields (numbers only)',
            icon: 'warning',
            confirmButtonText: 'Okay'
          })
      }

      //Calculation of drop % based on the last eGFR reading
      let difference = this.last_eGFR - this.eGFR;
      let dropPercentage = ((difference * 100) / this.eGFR).toFixed();
      let dropPercentageToShow = '';

      if(dropPercentage >= 20) {
        dropPercentageToShow = ', Drop: ' + dropPercentage + '%'
      }
      else {
        dropPercentageToShow = '';
      }

      if(this.eGFR > 0 && this.dateKidney != '') {

        if(this.eGFR >= 90) {
          this.kidneyDiseaseClassification = "Normal"

          Swal.fire({
            title: this.kidneyDiseaseClassification,
            text: 'eGFR: ' + this.eGFR + ', ' + 'Date: ' + this.dateKidney + dropPercentageToShow,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
        } 
        else if(this.eGFR >= 60 && this.eGFR >= 89) {
          this.kidneyDiseaseClassification = "Mildly Decreased"

          Swal.fire({
            title: this.kidneyDiseaseClassification,
            text: 'eGFR: ' + this.eGFR + ', ' + 'Date: ' + this.dateKidney + dropPercentageToShow,
            icon: 'info',
            confirmButtonText: 'Cool'
          })
        }
        else if(this.eGFR >= 45 && this.eGFR >= 59) {
          this.kidneyDiseaseClassification = "Mild to moderate"

          Swal.fire({
            title: this.kidneyDiseaseClassification,
            text: 'eGFR: ' + this.eGFR + ', ' + 'Date: ' + this.dateKidney + dropPercentageToShow,
            icon: 'info',
            confirmButtonText: 'Cool'
          })
        }
        else if(this.eGFR >= 30 && this.eGFR >= 44) {
          this.kidneyDiseaseClassification = "Moderate to Severe"

          Swal.fire({
            title: this.kidneyDiseaseClassification,
            text: 'eGFR: ' + this.eGFR + ', ' + 'Date: ' + this.dateKidney + dropPercentageToShow,
            icon: 'info',
            confirmButtonText: 'Cool'
          })
        }
        else if(this.eGFR >= 15 && this.eGFR >= 29) {
          this.kidneyDiseaseClassification = "Severely Decreased"

          Swal.fire({
            title: this.kidneyDiseaseClassification,
            text: 'eGFR: ' + this.eGFR + ', ' + 'Date: ' + this.dateKidney + dropPercentageToShow,
            icon: 'info',
            confirmButtonText: 'Cool'
          })
        }
        else {
          this.kidneyDiseaseClassification = "Kidney Failure"

          Swal.fire({
            title: this.kidneyDiseaseClassification,
            text: 'eGFR: ' + this.eGFR + ', ' + 'Date: ' + this.dateKidney + dropPercentageToShow,
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      }
      this.last_eGFR = this.eGFR;
    }
  }
}
</script>

<style>

  #app {
    text-align: center;
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    background: linear-gradient(45deg, rgba(66, 183, 245, 0.8) 0%, rgba(66, 245, 189, 0.4) 100%);
    color: rgba(0, 0, 0, 0.6);
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 1.6em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .form {
    z-index: 15;
    position: relative;
    background: #FFFFFF;
    width: 450px;
    border-radius: 4px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 120px auto 10px;
    overflow: hidden;
  }

  .form-group {
    display: block;
    justify-content: space-between;
    margin: 0 0 20px;
  }

  .form-group label {
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    font-weight: 550;
    line-height: 1;
    letter-spacing: 0.2em;
  }

  .form-group input {
    outline: none;
    margin-left: 10px;
    background: rgba(0, 0, 0, 0.1);
    width: 75%;
    border: 0;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 6px 10px;
    color: rgba(0, 0, 0, 0.6);
    font-family: inherit;
    font-size: inherit;
    font-weight: 500;
    line-height: inherit;
    transition: 0.3s ease;
  }

  .form-group button {
    outline: none;
    background: #4285F4;
    width: 100%;
    border: 0;
    border-radius: 10px;
    padding: 10px 15px;
    color: #FFFFFF;
    font-family: inherit;
    font-size: inherit;
    font-weight: 500;
    line-height: inherit;
    text-transform: uppercase;
    cursor: pointer;
  }

  .form-panel {
    padding: 30px calc(5% + 60px) 60px 60px;
    box-sizing: border-box;
  }
  
  .form-header {
    margin: 0 0 40px;
    text-align: center;
  }
  
  .form-header h1 {
    padding: 4px 0;
    color: #4285F4;
    font-size: 28px;
    font-weight: 1000;
    text-transform: uppercase;
  }

  .disease_title {
    padding: 4px 0;
    color: #144492;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
  }
</style>
