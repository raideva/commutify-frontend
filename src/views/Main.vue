<template>
    <div>
      <Navbar />
    <v-dialog
      v-model="registration_dialog"
      max-width="800px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          Sign Up
        </v-btn>
      </template>
      <Register />
    </v-dialog>

    <v-dialog
      v-model="login_dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          Login
        </v-btn>
      </template>
      <Login />
    </v-dialog>    
    </div>
</template>

<script>
import Register from "./Register.vue"
import Login from "./Login.vue"
import Navbar from "../components/Navbar.vue"

export default ({
    components: { Register, Login, Navbar },
    data: () => ({
      registration_dialog: false,
      login_dialog: false,
    }),

})
</script>
<style lang="scss" scoped>

</style>
