<template>
  <div>
    <router-view></router-view>
    <app-user-auth-header></app-user-auth-header>
    <div class="container">
      <form id="form"  @submit.prevent="onSubmit" class="form">
        <h2>Hey bub, ya gotta register!</h2>
        <div class="form-control">
          <label for="username">Username</label>
          <input
           type="text" 
           id="username"
            placeholder="Enter username" 
            v-model="username"
            />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <input 
          type="text"
           id="email"
            placeholder="Enter email"
            v-model="email"
             />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
           type="password" 
           id="password"
            placeholder="Enter password" 
            v-model="password"
            />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="password2">Confirm password</label>
          <input
            type="password"
            id="password2"
            placeholder="Renter your password"
            v-model="confirmPassword"
          />
          <small>Error message</small>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

  </div>
  </template>
  
  <script>
  import UserAuthHeader from '../UserAuthHeader/UserAuthHeader.vue';
  import axios from 'axios';
    export default {
      components:{
        appUserAuthHeader: UserAuthHeader
      },
      data () {
        return {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      },
      methods: {
        formvalidation(){
                            const form = document.getElementById('form');
                  const username = document.getElementById('username');
                  const email = document.getElementById('email');
                  const password = document.getElementById('password');
                  const password2 = document.getElementById('password2');

                  //Show input error message
                  function showError(input, message) {
                    //gets the parent div
                    const formControl = input.parentElement;
                    //applies error class and reapplies form-control class
                    formControl.className = 'form-control error';
                    //finds the small tag within this div
                    const small = formControl.querySelector('small');
                    //inserts the message parameter into the small tag
                    small.innerText = message;
                  }

                  //Show success outline
                  function showSuccess(input) {
                    //gets the parent div
                    const formControl = input.parentElement;
                    //applies success class and reapplies form-control class
                    formControl.className = 'form-control success';
                  }

                  //Check to see if email is valid
                  function checkEmail(input) {
                    const regExEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

                    //if (regular expression representing a valid email, then true else false)
                    if (regExEmail.test(input.value.trim())) {
                      showSuccess(input);
                    } else {
                      showError(input, 'Not a real email bub');
                    }
                  }

                  //check required fields
                  function checkRequired(inputArr) {
                    //iterate through each slot in inputArr
                    inputArr.forEach(function(input) {
                      //if not null, show success
                      if (input.value.trim() === '') {
                        console.log(input.id);
                        showError(input, `${getFieldName(input)} is required bub`);
                      } else {
                        showSuccess(input);
                      }
                    });
                  }

                  //check whether an input is between a min and max length
                  function checkLength(input, min, max) {
                    if (input.value.length < min) {
                      showError(
                        input,
                        `${getFieldName(input)}'s gotta be over ${min} characters bub`
                      );
                    } else if (input.value.length > max) {
                      showError(
                        input,
                        `${getFieldName(input)}'s gotta be under ${max} characters bub`
                      );
                    }
                  }

                  // Check if the passwords match
                  function checkPasswords(input1, input2) {
                    if (input1.value !== input2.value) {
                      showError(input2, 'Those dont match bub');
                    } else {
                      showSuccess();
                    }
                  }

                  //Get the fieldname
                  //finds first letter and uppercases it, then slices off the old first letter and concatenates
                  function getFieldName(input) {
                    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
                  }

                  //Event listeners
                  form.addEventListener('submit', function(e) {
                    // use preventDefault to keep the page from refreshing everytime you hit submit
                    e.preventDefault();

                    checkRequired([username, email, password, password2]);
                    checkLength(username, 3, 15);
                    checkLength(password, 6, 25);
                    checkEmail(email);
                    checkPasswords(password, password2);
                  });

        },
        onSubmit(){
          const formData = {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
          }
          axios.post('https://e-commerce-site-69a9c-default-rtdb.firebaseio.com/users.json', formData)
          .then(res => console.log(res))
          .catch(error => console.log(error))
        }
      },
      mounted(){
        this.formvalidation();
      }
    }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Lora&family=Yeseva+One&display=swap');

* {
  --hibiscus-love: #fc465c;
  --fine-ii: #f9b198;
  --afl: #fac8af;
  --mexican-sky: #cfdddd;
  --brasillia-peach: #facb85;
  --free: #33032d;
  --captured: #2b2120;

  --primary-color: var(--brasillia-peach);
  --secondary-color: var(--hibiscus-love);
  --tertiary-color: var(--fine-ii);
  --quadrary-color: var(--afl);
  --bg-color: var(--mexican-sky);
  --text-color: var(--free);
  --header-color: var(--captured);
  --error-color: var(--hibiscus-love);
  --success-color: #73d12e;

  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: 'Yeseva One', Georgia, cursive;
  color: var(--header-color);
}

body {
  font-family: 'Lora', 'Times New Roman', serif;
  background-color: var(--bg-color);
  color: var(--free);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  min-height: 80vh;
}

.container {
  width: 400px;
  border-radius: 0.6em;
  padding: 20px;
  background-color: var(--primary-color);
  box-shadow: 20px 20px 60px #97a1a1, -20px -20px 60px #ffffff;
  margin: 50px auto;
}

.form {
  padding: 30px 40px;
}

.form h2 {
  text-align: center;
  margin: 0 0 10px;
}

.form-control {
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
}

.form-control label {
  color: var(--text-color);
  display: block;
  margin-bottom: 5px;
}
.form-control input {
  border-radius: 6px;
  background: var(--primary-color);
  box-shadow: inset 3px 3px 7px #e9bd7c, inset -3px -3px 7px #ffd98e;
  min-height: 2em;
  border: var(--quadrary-color) solid 2px;
  display: block;
  width: 100%;
  font-size: 14px;
  padding: 8px;
}

.form-control input:focus {
  outline: 0;
  border-color: var(--tertiary-color);
}

.form-control.success input {
  border-color: var(--success-color);
}

.form-control.error input {
  border-color: var(--error-color);
}

.form-control small {
  color: var(--error-color);
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.form-control.error small {
  visibility: visible;
}

.form button {
  cursor: pointer;
  background: var(--secondary-color);
  box-shadow: 4px 4px 8px #c19c66, -4px -4px 8px #fffaa4;
  border: 1px solid #ec263c66;
  color: #fff;
  font-size: 16px;
  padding: 0.618em 1.2em;
  border-radius: 0.4em;
  font-family: 'Yeseva One', Georgia, cursive;
  display: block;
  margin-top: 1.2em;
  width: 100%;
}

.form button:active,
.form button:focus {
  outline: 0;
  background-color: #fc364c;
}
   
    
  </style>