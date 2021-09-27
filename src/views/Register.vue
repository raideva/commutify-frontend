<template>
  <div>
            <v-card class="elevation-12" fluid fill-width>
              <v-app-bar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
              </v-app-bar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="register"
                    v-model="username"
                    :rules="[rules.required]"
                    label="Username"
                    :error-messages="error_username"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    name="first_name"
                    prepend-icon="contact"
                    v-model="first_name"
                    :rules="[rules.required]"
                    label="First Name"
                    type="text"
                    :error-messages="error_first_name"
                  ></v-text-field>
                  <v-text-field
                    name="last_name"
                    prepend-icon="contact"
                    v-model="last_name"
                    :rules="[rules.required]"
                    label="Last Name"
                    type="text"
                    :error-messages="error_last_name"
                  ></v-text-field>
                  <v-text-field
                    name="email"
                    prepend-icon="email"
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    label="Email"
                    type="email"
                    :error-messages="error_email"
                  ></v-text-field>
                  <v-text-field
                    name="dob"
                    prepend-icon="event"
                    v-model="dob"
                    :rules="[rules.required]"
                    label="Date Of Birth"
                    type="date"
                    :error-messages="error_dob"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    color="cyan darken"
                    label="Password"
                    :rules="[rules.required, rules.min]"
                    loading
                    hint="At least 6 charecter"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    counter
                    :error-messages="error_password"
                  >
                    <template v-slot:progress>
                    <v-progress-linear
                      v-if="true"
                      :value="progress"
                      :color="color"
                      absolute
                      height="7"
                    ></v-progress-linear>
                    </template>
                </v-text-field>

                <v-text-field
                    v-model="password1"
                    id="password1"
                    prepend-icon="lock"
                    name="password1"
                    color="cyan darken"
                    label="Repeat Password"
                    :rules="[rules.required, rules.min]"
                    loading
                    hint="At least 6 charecter"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    counter
                    :error-messages="error_password1"
                  >
                    <template v-slot:progress>
                    <v-progress-linear
                      v-if="true"
                      :value="progress1"
                      :color="color1"
                      absolute
                      height="7"
                    ></v-progress-linear>
                    </template>
                </v-text-field>
                
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register">Register</v-btn>
              </v-card-actions>
            </v-card>
  </div>
</template>

<script>


export default {
  name: "Register",
  components: {
  },
  data() {
    return {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      dob: "",
      password: "",
      password1: "",
      error_username: "",
      error_first_name: "",
      error_last_name: "",
      error_dob: "",
      error_email: "",
      error_password: "",
      error_password1: "",
      show2: false,
      show1: false,
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          min: v => v.length >= 6 || 'Min 6 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
      },
    };
  },


computed: {
      progress () {
        return Math.min(100, this.password.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      },

      progress1 () {
        return Math.min(100, this.password1.length * 10)
      },
      color1 () {
        return ['error', 'warning', 'success'][Math.floor(this.progress1 / 40)]
      },
    },

  methods: {

    clear() {
      setTimeout(() => {
      this.error_username = "";
      this.error_dob = "";
      this.error_first_name = "";
      this.error_email = "";
      this.error_password = "";
      this.error_password1 = "";
      this.error_last_name = "";}, 5000);
    },

    validate() {
      if (this.password !== this.password1) {
      this.error_password1 = "Password and repeat password doesn't match.";
      return false;}
      return true;
    },
    register() {
      this.clear();
      if (!this.validate()) return;
      const data = {
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        dob: this.dob,
        password: this.password,
      };
      this.axios
        .post("auth/register/", data)
        .then(() => {
        this.$fire({
          title: "Registration Successfull",
          text: "You are now registered. Please verify your email.",
          type: "success",
          timer: 10000
        });
        this.$router.push('../login/');}
        )
        .catch((err) => {console.log(err.response.data);
        if(typeof err.response.data["username"] != "undefined")
        this.error_username = err.response.data["username"][0];

        if(typeof err.response.data["first_name"] != "undefined")
        this.error_first_name = err.response.data["first_name"][0];

        if(typeof err.response.data["last_name"] != "undefined")
        this.error_last_name = err.response.data["last_name"][0];

        if(typeof err.response.data["dob"] != "undefined")
        this.error_dob = err.response.data["dob"][0];

        if(typeof err.response.data["email"] != "undefined")
        this.error_email = err.response.data["email"][0];

        if(typeof err.response.data["password"] != "undefined")
        this.error_password = err.response.data["password"][0];
        
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.autofill-fix .v-text-field--outlined .v-input--dense .v-label {
  left: -28px!important;
  transform: translateY(-16px) scale(.75);
}
#try{
  color: rgb(255, 0, 0);
  /* display: none; */

}
</style>