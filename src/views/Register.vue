<template>
  <div>
    <label for="username">
      <input
        id="username"
        v-model="username"
        type="text"
        name="username"
        placeholder="Username"
        required
      />
    </label>
    <label for="first_name">
      <input
        id="first_name"
        v-model="first_name"
        type="text"
        name="first_name"
        placeholder="First Name"
        required
      />
    </label>
    <label for="last_name">
      <input
        id="last_name"
        v-model="last_name"
        type="text"
        name="last_name"
        placeholder="Last Name"
        required
      />
    </label>
    <label for="email">
      <input
        id="email"
        v-model="email"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
    </label>
    <label for="dob">
      <input
        id="dob"
        v-model="dob"
        type="date"
        name="dob"
        placeholder="dd-mm-yyyy"
        required
      />
    </label>
    <label for="password">
      <input
        id="password"
        v-model="password"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
    </label>
    <label for="password1">
      <input
        id="password1"
        v-model="password1"
        type="password"
        name="password1"
        placeholder="Repeat Password"
        required
      />
    </label>
    <button type="submit" @click="register">Register</button>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      dob: "",
      password: "",
      password1: "",
    };
  },
  methods: {
    validate() {
      if (this.password !== this.password1) return false;
      return true;
    },
    register() {
      if (!this.validate()) return;
      const data = {
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        dob: this.dob,
        password: this.password,
      };
      this.axios.post('auth/register/',data)
        .then(()=>console.log('Verify Email Now'))
        .catch(err=>console.log(err.response.data))
    },
  },
};
</script>

<style>
</style>