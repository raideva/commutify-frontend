<template>
  <!-- <div>
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
    </div> -->
  <div class="hero">
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <div class="firefly"></div>
    <nav id="navbar">
      <img src="../assets/Commutify-logos_white.png" alt="" class="logo" />
    </nav>
    <div class="lightning-container animated animatedFadeInRight fadeInRight">
      <img
        src="https://media-public.canva.com/s64Q4/MAEYVys64Q4/1/t.png"
        alt=""
        id="lightning"
      />
    </div>
    <!-- <v-dialog v-model="registration_dialog" max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on"> Sign Up </v-btn>
      </template>
      <Register />
    </v-dialog> -->

    <!-- <v-dialog v-model="login_dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on"> Login </v-btn>
      </template>
    </v-dialog> -->
    <div class="text-container animated animatedFadeInLeft fadeInLeft">
      <h1>Commutify</h1>
      <p>A New Way to connect to your Community!</p>
      <p>
        Commutify provides a secure way to connect and share any information to
        anyone around the world.
      </p>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="links animated animatedFadeInUp fadeInUp">
      <v-dialog v-model="login_dialog" max-width="600px" transition="dialog-top-transition">
        <template v-slot:activator="{ on, attrs }">
          <button color="primary" v-bind="attrs" v-on="on"> Login </button>
        </template>
        <Login @close='Close_log'/>
      </v-dialog>
      <v-dialog v-model="registration_dialog" max-width="800px" transition="dialog-top-transition">
        <template v-slot:activator="{ on, attrs }">
          <button color="primary" v-bind="attrs" v-on="on"> Register </button>
        </template>
        <Register @close='Close_reg'/>
      </v-dialog>
      <!-- <v-dialog v-model="registration_dialog" max-width="800px">
        <template v-slot:activator="{ on, attrs }">
           <v-btn color="primary" v-bind="attrs" v-on="on"> Sign Up </v-btn>
          <a href="" v-bind="attrs" v-on="on">Register</a>
        </template>
        <Register />
      </v-dialog> -->
    </div>
  </div>
</template>

<script>
import Register from "./Register.vue";
import Login from "./Login.vue";

export default {
  components: { Register, Login },
  data: () => ({
    registration_dialog: false,
    login_dialog: false,
  }),
  methods: {
    Close_reg() {
      this.registration_dialog = false;
    },
    Close_log() {
      this.login_dialog = false;
    }
  },
};
</script>
<style lang="scss">
body {
  padding: 0;
  height: 100%;
  overflow: hidden;
}
body::-webkit-scrollbar {
  display: none;
}
* {
  margin: 0;
  font-family: sans-serif;
  box-sizing: border-box;
}

.hero {
  background: url("../assets/mainBackground.jpg");
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  color: #fff;
  position: relative;
}
#navbar {
  display: flex;
  align-items: center;
  padding: 20px 8%;
}

#navbar .logo {
  width: 150px;
  cursor: pointer;
}
#navbar ul {
  flex: 1;
  text-align: right;
}
#navbar ul li {
  display: inline-block;
  list-style: none;
}
#navbar ul li a {
  text-decoration: none;
  color: #fff;
}
.lightning-container {
  position: absolute;
  margin-top: 5%;
  margin-left: 75%;
}
.lamp {
  width: 75%;
}
#lightning {
  width: 175%;
}
.text-container {
  // z-index: 2;
  width: 50%;
  margin: auto;
  margin-top: 10%;
}
.text-container p {
  // z-index: 2;
  max-width: 400px;
}
.text-container h1 {
  // z-index: 2;
  font-size: 50px;
  font-weight: 400;
}
@media (max-width: 600px) {
  .text-container {
    margin-left: 25px;
    width: 70%;
  }
  .text-container h1 {
    // z-index: 2;
    font-size: 40px;
    font-weight: 300;
  }
}
.links {
  display: flex;
  justify-content: center;
}
.links button {
  // z-index: 2;
  text-decoration: none;
  background-color: #00986f;
  padding: 10px 20px;
  color: #fff;
  font-size: 18px;
  margin: 2px;
  border-radius: 17px;
}
@keyframes fadeInRight {
  from {
    transform: translate3d(-80px, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes fadeInLeft {
  from {
    transform: translate3d(80px, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: both;
}
.animatedFadeInRight .animatedFadeInLeft {
  opacity: 0;
}
.fadeInRight {
  opacity: 0;
  animation-name: fadeInRight;
  -webkit-animation-name: fadeInRight;
}
.fadeInLeft {
  opacity: 0;
  animation-name: fadeInLeft;
  -webkit-animation-name: fadeInLeft;
}
.fadeInUp {
  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
}

.firefly {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 0.4vw;
  height: 0.4vw;
  margin: -0.2vw 0 0 9.8vw;
  animation: ease 200s alternate infinite;
  pointer-events: none;
}
.firefly::before,
.firefly::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-origin: -10vw;
}
.firefly::before {
  background: black;
  opacity: 0.4;
  animation: drift ease alternate infinite;
}
.firefly::after {
  background: white;
  opacity: 0;
  box-shadow: 0 0 0vw 0vw yellow;
  animation: drift ease alternate infinite, flash ease infinite;
}

.firefly:nth-child(1) {
  animation-name: move1;
}
.firefly:nth-child(1)::before {
  animation-duration: 11s;
}
.firefly:nth-child(1)::after {
  animation-duration: 11s, 10014ms;
  animation-delay: 0ms, 2967ms;
}

@keyframes move1 {
  0% {
    transform: translateX(-23vw) translateY(-15vh) scale(0.26);
  }
  5.2631578947% {
    transform: translateX(-37vw) translateY(-9vh) scale(0.88);
  }
  10.5263157895% {
    transform: translateX(-20vw) translateY(8vh) scale(0.99);
  }
  15.7894736842% {
    transform: translateX(-26vw) translateY(-13vh) scale(0.35);
  }
  21.0526315789% {
    transform: translateX(49vw) translateY(-41vh) scale(0.76);
  }
  26.3157894737% {
    transform: translateX(-5vw) translateY(-49vh) scale(0.88);
  }
  31.5789473684% {
    transform: translateX(33vw) translateY(-21vh) scale(0.67);
  }
  36.8421052632% {
    transform: translateX(-25vw) translateY(2vh) scale(0.47);
  }
  42.1052631579% {
    transform: translateX(-24vw) translateY(-49vh) scale(0.74);
  }
  47.3684210526% {
    transform: translateX(21vw) translateY(-2vh) scale(0.65);
  }
  52.6315789474% {
    transform: translateX(48vw) translateY(10vh) scale(0.8);
  }
  57.8947368421% {
    transform: translateX(38vw) translateY(24vh) scale(0.87);
  }
  63.1578947368% {
    transform: translateX(-35vw) translateY(-17vh) scale(0.78);
  }
  68.4210526316% {
    transform: translateX(-49vw) translateY(34vh) scale(0.52);
  }
  73.6842105263% {
    transform: translateX(-9vw) translateY(-45vh) scale(0.64);
  }
  78.9473684211% {
    transform: translateX(31vw) translateY(41vh) scale(0.66);
  }
  84.2105263158% {
    transform: translateX(0vw) translateY(0vh) scale(0.42);
  }
  89.4736842105% {
    transform: translateX(3vw) translateY(32vh) scale(0.39);
  }
  94.7368421053% {
    transform: translateX(-28vw) translateY(-44vh) scale(0.54);
  }
  100% {
    transform: translateX(49vw) translateY(45vh) scale(0.27);
  }
}
.firefly:nth-child(2) {
  animation-name: move2;
}
.firefly:nth-child(2)::before {
  animation-duration: 12s;
}
.firefly:nth-child(2)::after {
  animation-duration: 12s, 8480ms;
  animation-delay: 0ms, 2029ms;
}

@keyframes move2 {
  0% {
    transform: translateX(-35vw) translateY(-32vh) scale(0.45);
  }
  4.7619047619% {
    transform: translateX(45vw) translateY(33vh) scale(0.78);
  }
  9.5238095238% {
    transform: translateX(24vw) translateY(-14vh) scale(0.46);
  }
  14.2857142857% {
    transform: translateX(-22vw) translateY(-17vh) scale(0.36);
  }
  19.0476190476% {
    transform: translateX(5vw) translateY(-47vh) scale(0.62);
  }
  23.8095238095% {
    transform: translateX(19vw) translateY(0vh) scale(0.46);
  }
  28.5714285714% {
    transform: translateX(-48vw) translateY(-35vh) scale(0.79);
  }
  33.3333333333% {
    transform: translateX(11vw) translateY(24vh) scale(0.77);
  }
  38.0952380952% {
    transform: translateX(0vw) translateY(-37vh) scale(0.68);
  }
  42.8571428571% {
    transform: translateX(21vw) translateY(-25vh) scale(0.43);
  }
  47.619047619% {
    transform: translateX(11vw) translateY(-46vh) scale(0.52);
  }
  52.380952381% {
    transform: translateX(33vw) translateY(1vh) scale(0.75);
  }
  57.1428571429% {
    transform: translateX(-30vw) translateY(16vh) scale(0.44);
  }
  61.9047619048% {
    transform: translateX(44vw) translateY(-40vh) scale(0.65);
  }
  66.6666666667% {
    transform: translateX(35vw) translateY(3vh) scale(0.52);
  }
  71.4285714286% {
    transform: translateX(-14vw) translateY(-39vh) scale(0.88);
  }
  76.1904761905% {
    transform: translateX(-37vw) translateY(-39vh) scale(0.86);
  }
  80.9523809524% {
    transform: translateX(-5vw) translateY(-30vh) scale(0.52);
  }
  85.7142857143% {
    transform: translateX(-49vw) translateY(42vh) scale(0.96);
  }
  90.4761904762% {
    transform: translateX(23vw) translateY(40vh) scale(0.79);
  }
  95.2380952381% {
    transform: translateX(-6vw) translateY(-48vh) scale(0.63);
  }
  100% {
    transform: translateX(39vw) translateY(-30vh) scale(0.93);
  }
}
.firefly:nth-child(3) {
  animation-name: move3;
}
.firefly:nth-child(3)::before {
  animation-duration: 9s;
}
.firefly:nth-child(3)::after {
  animation-duration: 9s, 10040ms;
  animation-delay: 0ms, 876ms;
}

@keyframes move3 {
  0% {
    transform: translateX(-45vw) translateY(-22vh) scale(0.29);
  }
  4% {
    transform: translateX(46vw) translateY(39vh) scale(0.39);
  }
  8% {
    transform: translateX(-38vw) translateY(50vh) scale(0.39);
  }
  12% {
    transform: translateX(34vw) translateY(35vh) scale(0.71);
  }
  16% {
    transform: translateX(22vw) translateY(26vh) scale(0.3);
  }
  20% {
    transform: translateX(40vw) translateY(36vh) scale(1);
  }
  24% {
    transform: translateX(-43vw) translateY(-30vh) scale(0.57);
  }
  28% {
    transform: translateX(33vw) translateY(36vh) scale(0.69);
  }
  32% {
    transform: translateX(0vw) translateY(45vh) scale(0.35);
  }
  36% {
    transform: translateX(45vw) translateY(-19vh) scale(0.79);
  }
  40% {
    transform: translateX(-10vw) translateY(-45vh) scale(0.36);
  }
  44% {
    transform: translateX(-42vw) translateY(-48vh) scale(0.91);
  }
  48% {
    transform: translateX(21vw) translateY(0vh) scale(0.59);
  }
  52% {
    transform: translateX(-45vw) translateY(40vh) scale(0.99);
  }
  56% {
    transform: translateX(6vw) translateY(-28vh) scale(0.75);
  }
  60% {
    transform: translateX(7vw) translateY(18vh) scale(0.32);
  }
  64% {
    transform: translateX(-20vw) translateY(-46vh) scale(0.99);
  }
  68% {
    transform: translateX(-48vw) translateY(44vh) scale(0.75);
  }
  72% {
    transform: translateX(-35vw) translateY(-31vh) scale(0.34);
  }
  76% {
    transform: translateX(-46vw) translateY(40vh) scale(0.98);
  }
  80% {
    transform: translateX(-4vw) translateY(-5vh) scale(0.64);
  }
  84% {
    transform: translateX(-33vw) translateY(23vh) scale(0.3);
  }
  88% {
    transform: translateX(-2vw) translateY(-10vh) scale(0.38);
  }
  92% {
    transform: translateX(-15vw) translateY(39vh) scale(0.57);
  }
  96% {
    transform: translateX(41vw) translateY(7vh) scale(0.73);
  }
  100% {
    transform: translateX(40vw) translateY(-31vh) scale(0.49);
  }
}
.firefly:nth-child(4) {
  animation-name: move4;
}
.firefly:nth-child(4)::before {
  animation-duration: 9s;
}
.firefly:nth-child(4)::after {
  animation-duration: 9s, 5262ms;
  animation-delay: 0ms, 3853ms;
}

@keyframes move4 {
  0% {
    transform: translateX(5vw) translateY(-1vh) scale(0.35);
  }
  5.8823529412% {
    transform: translateX(-15vw) translateY(-27vh) scale(0.66);
  }
  11.7647058824% {
    transform: translateX(-4vw) translateY(-2vh) scale(0.41);
  }
  17.6470588235% {
    transform: translateX(-37vw) translateY(17vh) scale(0.92);
  }
  23.5294117647% {
    transform: translateX(27vw) translateY(48vh) scale(0.39);
  }
  29.4117647059% {
    transform: translateX(35vw) translateY(-13vh) scale(0.37);
  }
  35.2941176471% {
    transform: translateX(2vw) translateY(-3vh) scale(0.94);
  }
  41.1764705882% {
    transform: translateX(-22vw) translateY(-39vh) scale(0.52);
  }
  47.0588235294% {
    transform: translateX(18vw) translateY(-31vh) scale(0.54);
  }
  52.9411764706% {
    transform: translateX(21vw) translateY(29vh) scale(0.27);
  }
  58.8235294118% {
    transform: translateX(41vw) translateY(0vh) scale(0.4);
  }
  64.7058823529% {
    transform: translateX(48vw) translateY(8vh) scale(0.66);
  }
  70.5882352941% {
    transform: translateX(-45vw) translateY(-42vh) scale(0.48);
  }
  76.4705882353% {
    transform: translateX(12vw) translateY(-35vh) scale(0.46);
  }
  82.3529411765% {
    transform: translateX(-28vw) translateY(-22vh) scale(0.36);
  }
  88.2352941176% {
    transform: translateX(47vw) translateY(38vh) scale(0.85);
  }
  94.1176470588% {
    transform: translateX(1vw) translateY(13vh) scale(0.88);
  }
  100% {
    transform: translateX(-45vw) translateY(-25vh) scale(0.79);
  }
}
.firefly:nth-child(5) {
  animation-name: move5;
}
.firefly:nth-child(5)::before {
  animation-duration: 12s;
}
.firefly:nth-child(5)::after {
  animation-duration: 12s, 5471ms;
  animation-delay: 0ms, 5681ms;
}

@keyframes move5 {
  0% {
    transform: translateX(-25vw) translateY(-46vh) scale(0.72);
  }
  4.7619047619% {
    transform: translateX(-1vw) translateY(8vh) scale(0.58);
  }
  9.5238095238% {
    transform: translateX(-30vw) translateY(45vh) scale(0.52);
  }
  14.2857142857% {
    transform: translateX(13vw) translateY(33vh) scale(0.56);
  }
  19.0476190476% {
    transform: translateX(-23vw) translateY(37vh) scale(0.34);
  }
  23.8095238095% {
    transform: translateX(4vw) translateY(-33vh) scale(0.33);
  }
  28.5714285714% {
    transform: translateX(-37vw) translateY(-4vh) scale(0.64);
  }
  33.3333333333% {
    transform: translateX(-40vw) translateY(23vh) scale(0.38);
  }
  38.0952380952% {
    transform: translateX(23vw) translateY(-39vh) scale(0.43);
  }
  42.8571428571% {
    transform: translateX(46vw) translateY(0vh) scale(0.94);
  }
  47.619047619% {
    transform: translateX(41vw) translateY(-5vh) scale(0.76);
  }
  52.380952381% {
    transform: translateX(-14vw) translateY(-43vh) scale(0.84);
  }
  57.1428571429% {
    transform: translateX(-23vw) translateY(-31vh) scale(0.65);
  }
  61.9047619048% {
    transform: translateX(46vw) translateY(7vh) scale(0.9);
  }
  66.6666666667% {
    transform: translateX(-3vw) translateY(-20vh) scale(0.68);
  }
  71.4285714286% {
    transform: translateX(45vw) translateY(41vh) scale(0.7);
  }
  76.1904761905% {
    transform: translateX(-42vw) translateY(15vh) scale(0.81);
  }
  80.9523809524% {
    transform: translateX(36vw) translateY(-4vh) scale(0.28);
  }
  85.7142857143% {
    transform: translateX(30vw) translateY(17vh) scale(0.74);
  }
  90.4761904762% {
    transform: translateX(39vw) translateY(-29vh) scale(0.31);
  }
  95.2380952381% {
    transform: translateX(-24vw) translateY(19vh) scale(0.51);
  }
  100% {
    transform: translateX(-40vw) translateY(49vh) scale(0.27);
  }
}
.firefly:nth-child(6) {
  animation-name: move6;
}
.firefly:nth-child(6)::before {
  animation-duration: 12s;
}
.firefly:nth-child(6)::after {
  animation-duration: 12s, 9161ms;
  animation-delay: 0ms, 7339ms;
}

@keyframes move6 {
  0% {
    transform: translateX(-46vw) translateY(19vh) scale(0.94);
  }
  4.7619047619% {
    transform: translateX(15vw) translateY(16vh) scale(0.54);
  }
  9.5238095238% {
    transform: translateX(-14vw) translateY(2vh) scale(0.68);
  }
  14.2857142857% {
    transform: translateX(-4vw) translateY(-38vh) scale(0.56);
  }
  19.0476190476% {
    transform: translateX(-46vw) translateY(-44vh) scale(0.45);
  }
  23.8095238095% {
    transform: translateX(11vw) translateY(-7vh) scale(0.49);
  }
  28.5714285714% {
    transform: translateX(20vw) translateY(-38vh) scale(0.37);
  }
  33.3333333333% {
    transform: translateX(18vw) translateY(-7vh) scale(0.68);
  }
  38.0952380952% {
    transform: translateX(15vw) translateY(-11vh) scale(0.68);
  }
  42.8571428571% {
    transform: translateX(-4vw) translateY(-48vh) scale(0.96);
  }
  47.619047619% {
    transform: translateX(2vw) translateY(-49vh) scale(0.71);
  }
  52.380952381% {
    transform: translateX(36vw) translateY(26vh) scale(0.54);
  }
  57.1428571429% {
    transform: translateX(27vw) translateY(-19vh) scale(0.58);
  }
  61.9047619048% {
    transform: translateX(-35vw) translateY(18vh) scale(0.32);
  }
  66.6666666667% {
    transform: translateX(2vw) translateY(-34vh) scale(0.72);
  }
  71.4285714286% {
    transform: translateX(31vw) translateY(24vh) scale(0.43);
  }
  76.1904761905% {
    transform: translateX(-24vw) translateY(-44vh) scale(0.35);
  }
  80.9523809524% {
    transform: translateX(-41vw) translateY(-28vh) scale(0.58);
  }
  85.7142857143% {
    transform: translateX(-43vw) translateY(38vh) scale(0.59);
  }
  90.4761904762% {
    transform: translateX(-11vw) translateY(-42vh) scale(0.39);
  }
  95.2380952381% {
    transform: translateX(-19vw) translateY(-34vh) scale(0.69);
  }
  100% {
    transform: translateX(12vw) translateY(19vh) scale(0.41);
  }
}
.firefly:nth-child(7) {
  animation-name: move7;
}
.firefly:nth-child(7)::before {
  animation-duration: 17s;
}
.firefly:nth-child(7)::after {
  animation-duration: 17s, 5495ms;
  animation-delay: 0ms, 3472ms;
}

@keyframes move7 {
  0% {
    transform: translateX(-48vw) translateY(45vh) scale(0.96);
  }
  3.8461538462% {
    transform: translateX(35vw) translateY(-45vh) scale(0.26);
  }
  7.6923076923% {
    transform: translateX(-18vw) translateY(-21vh) scale(0.75);
  }
  11.5384615385% {
    transform: translateX(41vw) translateY(15vh) scale(0.51);
  }
  15.3846153846% {
    transform: translateX(-47vw) translateY(-36vh) scale(0.3);
  }
  19.2307692308% {
    transform: translateX(-19vw) translateY(7vh) scale(0.34);
  }
  23.0769230769% {
    transform: translateX(-4vw) translateY(-18vh) scale(0.52);
  }
  26.9230769231% {
    transform: translateX(-49vw) translateY(44vh) scale(0.93);
  }
  30.7692307692% {
    transform: translateX(-27vw) translateY(13vh) scale(0.7);
  }
  34.6153846154% {
    transform: translateX(-2vw) translateY(-29vh) scale(0.58);
  }
  38.4615384615% {
    transform: translateX(-34vw) translateY(13vh) scale(0.76);
  }
  42.3076923077% {
    transform: translateX(12vw) translateY(4vh) scale(0.99);
  }
  46.1538461538% {
    transform: translateX(-7vw) translateY(-18vh) scale(0.66);
  }
  50% {
    transform: translateX(17vw) translateY(-6vh) scale(0.53);
  }
  53.8461538462% {
    transform: translateX(-49vw) translateY(-47vh) scale(0.93);
  }
  57.6923076923% {
    transform: translateX(-7vw) translateY(34vh) scale(0.52);
  }
  61.5384615385% {
    transform: translateX(-4vw) translateY(-12vh) scale(0.49);
  }
  65.3846153846% {
    transform: translateX(-28vw) translateY(21vh) scale(0.67);
  }
  69.2307692308% {
    transform: translateX(-39vw) translateY(-36vh) scale(0.76);
  }
  73.0769230769% {
    transform: translateX(-34vw) translateY(11vh) scale(0.73);
  }
  76.9230769231% {
    transform: translateX(28vw) translateY(21vh) scale(0.83);
  }
  80.7692307692% {
    transform: translateX(-37vw) translateY(-25vh) scale(0.88);
  }
  84.6153846154% {
    transform: translateX(-22vw) translateY(50vh) scale(0.76);
  }
  88.4615384615% {
    transform: translateX(-31vw) translateY(-26vh) scale(0.31);
  }
  92.3076923077% {
    transform: translateX(-40vw) translateY(-13vh) scale(0.45);
  }
  96.1538461538% {
    transform: translateX(-47vw) translateY(-22vh) scale(0.28);
  }
  100% {
    transform: translateX(-38vw) translateY(-44vh) scale(0.98);
  }
}
.firefly:nth-child(8) {
  animation-name: move8;
}
.firefly:nth-child(8)::before {
  animation-duration: 16s;
}
.firefly:nth-child(8)::after {
  animation-duration: 16s, 8545ms;
  animation-delay: 0ms, 7461ms;
}

@keyframes move8 {
  0% {
    transform: translateX(-37vw) translateY(46vh) scale(0.32);
  }
  3.8461538462% {
    transform: translateX(-5vw) translateY(-29vh) scale(0.28);
  }
  7.6923076923% {
    transform: translateX(-2vw) translateY(-48vh) scale(0.77);
  }
  11.5384615385% {
    transform: translateX(-42vw) translateY(30vh) scale(0.48);
  }
  15.3846153846% {
    transform: translateX(36vw) translateY(-3vh) scale(0.68);
  }
  19.2307692308% {
    transform: translateX(50vw) translateY(-38vh) scale(0.89);
  }
  23.0769230769% {
    transform: translateX(-48vw) translateY(-38vh) scale(0.52);
  }
  26.9230769231% {
    transform: translateX(-37vw) translateY(-43vh) scale(0.36);
  }
  30.7692307692% {
    transform: translateX(-44vw) translateY(-21vh) scale(0.83);
  }
  34.6153846154% {
    transform: translateX(8vw) translateY(14vh) scale(0.82);
  }
  38.4615384615% {
    transform: translateX(-17vw) translateY(-47vh) scale(0.33);
  }
  42.3076923077% {
    transform: translateX(-22vw) translateY(-22vh) scale(0.53);
  }
  46.1538461538% {
    transform: translateX(-23vw) translateY(-21vh) scale(0.59);
  }
  50% {
    transform: translateX(-3vw) translateY(28vh) scale(0.84);
  }
  53.8461538462% {
    transform: translateX(3vw) translateY(-3vh) scale(0.99);
  }
  57.6923076923% {
    transform: translateX(-5vw) translateY(39vh) scale(0.82);
  }
  61.5384615385% {
    transform: translateX(41vw) translateY(-2vh) scale(0.32);
  }
  65.3846153846% {
    transform: translateX(-30vw) translateY(-35vh) scale(0.42);
  }
  69.2307692308% {
    transform: translateX(44vw) translateY(50vh) scale(0.29);
  }
  73.0769230769% {
    transform: translateX(-2vw) translateY(12vh) scale(1);
  }
  76.9230769231% {
    transform: translateX(-40vw) translateY(42vh) scale(0.77);
  }
  80.7692307692% {
    transform: translateX(-45vw) translateY(36vh) scale(0.58);
  }
  84.6153846154% {
    transform: translateX(-45vw) translateY(32vh) scale(0.78);
  }
  88.4615384615% {
    transform: translateX(-30vw) translateY(32vh) scale(0.93);
  }
  92.3076923077% {
    transform: translateX(-48vw) translateY(10vh) scale(0.29);
  }
  96.1538461538% {
    transform: translateX(38vw) translateY(38vh) scale(0.3);
  }
  100% {
    transform: translateX(35vw) translateY(-11vh) scale(0.61);
  }
}
.firefly:nth-child(9) {
  animation-name: move9;
}
.firefly:nth-child(9)::before {
  animation-duration: 15s;
}
.firefly:nth-child(9)::after {
  animation-duration: 15s, 5971ms;
  animation-delay: 0ms, 5581ms;
}

@keyframes move9 {
  0% {
    transform: translateX(46vw) translateY(-34vh) scale(0.95);
  }
  5.8823529412% {
    transform: translateX(8vw) translateY(20vh) scale(0.47);
  }
  11.7647058824% {
    transform: translateX(8vw) translateY(-10vh) scale(0.41);
  }
  17.6470588235% {
    transform: translateX(24vw) translateY(30vh) scale(0.86);
  }
  23.5294117647% {
    transform: translateX(43vw) translateY(-17vh) scale(0.59);
  }
  29.4117647059% {
    transform: translateX(-25vw) translateY(-13vh) scale(0.48);
  }
  35.2941176471% {
    transform: translateX(34vw) translateY(2vh) scale(0.85);
  }
  41.1764705882% {
    transform: translateX(-19vw) translateY(-19vh) scale(0.46);
  }
  47.0588235294% {
    transform: translateX(-30vw) translateY(-4vh) scale(0.87);
  }
  52.9411764706% {
    transform: translateX(-20vw) translateY(-33vh) scale(0.88);
  }
  58.8235294118% {
    transform: translateX(-26vw) translateY(33vh) scale(0.33);
  }
  64.7058823529% {
    transform: translateX(21vw) translateY(15vh) scale(0.5);
  }
  70.5882352941% {
    transform: translateX(-10vw) translateY(-3vh) scale(0.97);
  }
  76.4705882353% {
    transform: translateX(38vw) translateY(32vh) scale(0.47);
  }
  82.3529411765% {
    transform: translateX(31vw) translateY(29vh) scale(0.57);
  }
  88.2352941176% {
    transform: translateX(48vw) translateY(-4vh) scale(0.98);
  }
  94.1176470588% {
    transform: translateX(-29vw) translateY(38vh) scale(0.78);
  }
  100% {
    transform: translateX(27vw) translateY(-3vh) scale(0.79);
  }
}
.firefly:nth-child(10) {
  animation-name: move10;
}
.firefly:nth-child(10)::before {
  animation-duration: 12s;
}
.firefly:nth-child(10)::after {
  animation-duration: 12s, 6435ms;
  animation-delay: 0ms, 2614ms;
}

@keyframes move10 {
  0% {
    transform: translateX(3vw) translateY(-17vh) scale(0.89);
  }
  3.5714285714% {
    transform: translateX(-15vw) translateY(14vh) scale(0.54);
  }
  7.1428571429% {
    transform: translateX(8vw) translateY(24vh) scale(0.98);
  }
  10.7142857143% {
    transform: translateX(23vw) translateY(36vh) scale(0.66);
  }
  14.2857142857% {
    transform: translateX(42vw) translateY(-17vh) scale(0.39);
  }
  17.8571428571% {
    transform: translateX(-40vw) translateY(38vh) scale(0.54);
  }
  21.4285714286% {
    transform: translateX(39vw) translateY(-45vh) scale(0.51);
  }
  25% {
    transform: translateX(-33vw) translateY(5vh) scale(0.84);
  }
  28.5714285714% {
    transform: translateX(23vw) translateY(-4vh) scale(0.7);
  }
  32.1428571429% {
    transform: translateX(-6vw) translateY(14vh) scale(0.96);
  }
  35.7142857143% {
    transform: translateX(34vw) translateY(42vh) scale(0.79);
  }
  39.2857142857% {
    transform: translateX(11vw) translateY(12vh) scale(0.88);
  }
  42.8571428571% {
    transform: translateX(39vw) translateY(48vh) scale(0.38);
  }
  46.4285714286% {
    transform: translateX(-36vw) translateY(22vh) scale(0.89);
  }
  50% {
    transform: translateX(-38vw) translateY(-23vh) scale(0.68);
  }
  53.5714285714% {
    transform: translateX(3vw) translateY(30vh) scale(0.65);
  }
  57.1428571429% {
    transform: translateX(35vw) translateY(-11vh) scale(0.96);
  }
  60.7142857143% {
    transform: translateX(-41vw) translateY(24vh) scale(0.99);
  }
  64.2857142857% {
    transform: translateX(-40vw) translateY(2vh) scale(0.46);
  }
  67.8571428571% {
    transform: translateX(-48vw) translateY(32vh) scale(0.82);
  }
  71.4285714286% {
    transform: translateX(38vw) translateY(-39vh) scale(0.44);
  }
  75% {
    transform: translateX(17vw) translateY(45vh) scale(0.54);
  }
  78.5714285714% {
    transform: translateX(-34vw) translateY(28vh) scale(0.35);
  }
  82.1428571429% {
    transform: translateX(25vw) translateY(-4vh) scale(0.32);
  }
  85.7142857143% {
    transform: translateX(16vw) translateY(49vh) scale(0.71);
  }
  89.2857142857% {
    transform: translateX(-12vw) translateY(-3vh) scale(0.71);
  }
  92.8571428571% {
    transform: translateX(-21vw) translateY(15vh) scale(0.7);
  }
  96.4285714286% {
    transform: translateX(-29vw) translateY(-19vh) scale(0.67);
  }
  100% {
    transform: translateX(26vw) translateY(16vh) scale(0.4);
  }
}
.firefly:nth-child(11) {
  animation-name: move11;
}
.firefly:nth-child(11)::before {
  animation-duration: 11s;
}
.firefly:nth-child(11)::after {
  animation-duration: 11s, 10198ms;
  animation-delay: 0ms, 5706ms;
}

@keyframes move11 {
  0% {
    transform: translateX(46vw) translateY(-16vh) scale(0.78);
  }
  4.7619047619% {
    transform: translateX(22vw) translateY(-34vh) scale(0.34);
  }
  9.5238095238% {
    transform: translateX(29vw) translateY(11vh) scale(0.67);
  }
  14.2857142857% {
    transform: translateX(-19vw) translateY(22vh) scale(0.96);
  }
  19.0476190476% {
    transform: translateX(44vw) translateY(19vh) scale(0.27);
  }
  23.8095238095% {
    transform: translateX(-45vw) translateY(-16vh) scale(0.83);
  }
  28.5714285714% {
    transform: translateX(-39vw) translateY(-49vh) scale(0.61);
  }
  33.3333333333% {
    transform: translateX(49vw) translateY(-42vh) scale(0.62);
  }
  38.0952380952% {
    transform: translateX(-4vw) translateY(3vh) scale(0.36);
  }
  42.8571428571% {
    transform: translateX(4vw) translateY(48vh) scale(0.47);
  }
  47.619047619% {
    transform: translateX(4vw) translateY(20vh) scale(0.44);
  }
  52.380952381% {
    transform: translateX(-17vw) translateY(-11vh) scale(0.91);
  }
  57.1428571429% {
    transform: translateX(10vw) translateY(23vh) scale(0.49);
  }
  61.9047619048% {
    transform: translateX(-10vw) translateY(-6vh) scale(0.35);
  }
  66.6666666667% {
    transform: translateX(7vw) translateY(-17vh) scale(0.73);
  }
  71.4285714286% {
    transform: translateX(-25vw) translateY(46vh) scale(0.59);
  }
  76.1904761905% {
    transform: translateX(-39vw) translateY(-23vh) scale(0.41);
  }
  80.9523809524% {
    transform: translateX(-4vw) translateY(-32vh) scale(0.96);
  }
  85.7142857143% {
    transform: translateX(-31vw) translateY(-14vh) scale(0.73);
  }
  90.4761904762% {
    transform: translateX(35vw) translateY(-43vh) scale(0.78);
  }
  95.2380952381% {
    transform: translateX(-32vw) translateY(-43vh) scale(0.31);
  }
  100% {
    transform: translateX(-11vw) translateY(4vh) scale(0.99);
  }
}
.firefly:nth-child(12) {
  animation-name: move12;
}
.firefly:nth-child(12)::before {
  animation-duration: 13s;
}
.firefly:nth-child(12)::after {
  animation-duration: 13s, 5952ms;
  animation-delay: 0ms, 4556ms;
}

@keyframes move12 {
  0% {
    transform: translateX(41vw) translateY(-8vh) scale(0.38);
  }
  4.7619047619% {
    transform: translateX(24vw) translateY(-11vh) scale(0.46);
  }
  9.5238095238% {
    transform: translateX(-24vw) translateY(-43vh) scale(0.42);
  }
  14.2857142857% {
    transform: translateX(-9vw) translateY(-14vh) scale(0.74);
  }
  19.0476190476% {
    transform: translateX(-6vw) translateY(-19vh) scale(0.99);
  }
  23.8095238095% {
    transform: translateX(-43vw) translateY(-10vh) scale(0.41);
  }
  28.5714285714% {
    transform: translateX(45vw) translateY(-44vh) scale(0.8);
  }
  33.3333333333% {
    transform: translateX(13vw) translateY(20vh) scale(0.32);
  }
  38.0952380952% {
    transform: translateX(-40vw) translateY(-37vh) scale(0.4);
  }
  42.8571428571% {
    transform: translateX(-17vw) translateY(-20vh) scale(0.63);
  }
  47.619047619% {
    transform: translateX(50vw) translateY(-32vh) scale(0.77);
  }
  52.380952381% {
    transform: translateX(50vw) translateY(-17vh) scale(0.48);
  }
  57.1428571429% {
    transform: translateX(9vw) translateY(36vh) scale(0.48);
  }
  61.9047619048% {
    transform: translateX(-41vw) translateY(9vh) scale(0.92);
  }
  66.6666666667% {
    transform: translateX(-46vw) translateY(6vh) scale(0.85);
  }
  71.4285714286% {
    transform: translateX(42vw) translateY(21vh) scale(0.81);
  }
  76.1904761905% {
    transform: translateX(-8vw) translateY(-33vh) scale(0.73);
  }
  80.9523809524% {
    transform: translateX(4vw) translateY(-30vh) scale(0.79);
  }
  85.7142857143% {
    transform: translateX(-41vw) translateY(8vh) scale(0.99);
  }
  90.4761904762% {
    transform: translateX(31vw) translateY(9vh) scale(0.55);
  }
  95.2380952381% {
    transform: translateX(18vw) translateY(22vh) scale(0.56);
  }
  100% {
    transform: translateX(-32vw) translateY(-41vh) scale(0.45);
  }
}
.firefly:nth-child(13) {
  animation-name: move13;
}
.firefly:nth-child(13)::before {
  animation-duration: 18s;
}
.firefly:nth-child(13)::after {
  animation-duration: 18s, 7839ms;
  animation-delay: 0ms, 849ms;
}

@keyframes move13 {
  0% {
    transform: translateX(-27vw) translateY(9vh) scale(0.57);
  }
  4.1666666667% {
    transform: translateX(5vw) translateY(44vh) scale(0.56);
  }
  8.3333333333% {
    transform: translateX(-16vw) translateY(-28vh) scale(0.71);
  }
  12.5% {
    transform: translateX(38vw) translateY(-45vh) scale(0.88);
  }
  16.6666666667% {
    transform: translateX(50vw) translateY(-3vh) scale(0.88);
  }
  20.8333333333% {
    transform: translateX(-45vw) translateY(39vh) scale(0.57);
  }
  25% {
    transform: translateX(-43vw) translateY(0vh) scale(0.6);
  }
  29.1666666667% {
    transform: translateX(-33vw) translateY(1vh) scale(0.37);
  }
  33.3333333333% {
    transform: translateX(-18vw) translateY(-6vh) scale(0.81);
  }
  37.5% {
    transform: translateX(-48vw) translateY(49vh) scale(0.79);
  }
  41.6666666667% {
    transform: translateX(-13vw) translateY(-21vh) scale(0.7);
  }
  45.8333333333% {
    transform: translateX(4vw) translateY(12vh) scale(0.9);
  }
  50% {
    transform: translateX(-34vw) translateY(14vh) scale(0.87);
  }
  54.1666666667% {
    transform: translateX(-12vw) translateY(10vh) scale(0.32);
  }
  58.3333333333% {
    transform: translateX(-28vw) translateY(-31vh) scale(0.71);
  }
  62.5% {
    transform: translateX(11vw) translateY(50vh) scale(0.34);
  }
  66.6666666667% {
    transform: translateX(23vw) translateY(-5vh) scale(0.27);
  }
  70.8333333333% {
    transform: translateX(-45vw) translateY(3vh) scale(0.79);
  }
  75% {
    transform: translateX(11vw) translateY(22vh) scale(0.93);
  }
  79.1666666667% {
    transform: translateX(1vw) translateY(14vh) scale(0.86);
  }
  83.3333333333% {
    transform: translateX(43vw) translateY(-6vh) scale(0.8);
  }
  87.5% {
    transform: translateX(9vw) translateY(-9vh) scale(0.46);
  }
  91.6666666667% {
    transform: translateX(-4vw) translateY(12vh) scale(0.74);
  }
  95.8333333333% {
    transform: translateX(-1vw) translateY(-26vh) scale(0.66);
  }
  100% {
    transform: translateX(17vw) translateY(6vh) scale(0.79);
  }
}
.firefly:nth-child(14) {
  animation-name: move14;
}
.firefly:nth-child(14)::before {
  animation-duration: 11s;
}
.firefly:nth-child(14)::after {
  animation-duration: 11s, 5604ms;
  animation-delay: 0ms, 5296ms;
}

@keyframes move14 {
  0% {
    transform: translateX(15vw) translateY(-14vh) scale(0.58);
  }
  5% {
    transform: translateX(36vw) translateY(-31vh) scale(0.97);
  }
  10% {
    transform: translateX(-48vw) translateY(1vh) scale(0.96);
  }
  15% {
    transform: translateX(-39vw) translateY(-2vh) scale(0.67);
  }
  20% {
    transform: translateX(32vw) translateY(-17vh) scale(0.84);
  }
  25% {
    transform: translateX(-35vw) translateY(3vh) scale(0.71);
  }
  30% {
    transform: translateX(15vw) translateY(24vh) scale(0.9);
  }
  35% {
    transform: translateX(-25vw) translateY(-1vh) scale(0.7);
  }
  40% {
    transform: translateX(-8vw) translateY(-30vh) scale(0.3);
  }
  45% {
    transform: translateX(50vw) translateY(39vh) scale(0.45);
  }
  50% {
    transform: translateX(40vw) translateY(-49vh) scale(0.41);
  }
  55% {
    transform: translateX(-17vw) translateY(-3vh) scale(0.63);
  }
  60% {
    transform: translateX(-4vw) translateY(-2vh) scale(0.9);
  }
  65% {
    transform: translateX(33vw) translateY(40vh) scale(0.5);
  }
  70% {
    transform: translateX(-40vw) translateY(-29vh) scale(0.77);
  }
  75% {
    transform: translateX(34vw) translateY(-7vh) scale(0.58);
  }
  80% {
    transform: translateX(-44vw) translateY(-40vh) scale(0.56);
  }
  85% {
    transform: translateX(24vw) translateY(-4vh) scale(0.28);
  }
  90% {
    transform: translateX(12vw) translateY(7vh) scale(0.64);
  }
  95% {
    transform: translateX(-2vw) translateY(-37vh) scale(0.82);
  }
  100% {
    transform: translateX(-13vw) translateY(-43vh) scale(0.88);
  }
}
.firefly:nth-child(15) {
  animation-name: move15;
}
.firefly:nth-child(15)::before {
  animation-duration: 16s;
}
.firefly:nth-child(15)::after {
  animation-duration: 16s, 10111ms;
  animation-delay: 0ms, 4516ms;
}

@keyframes move15 {
  0% {
    transform: translateX(8vw) translateY(1vh) scale(0.45);
  }
  4% {
    transform: translateX(-48vw) translateY(-9vh) scale(0.88);
  }
  8% {
    transform: translateX(9vw) translateY(-19vh) scale(0.71);
  }
  12% {
    transform: translateX(-12vw) translateY(-15vh) scale(0.32);
  }
  16% {
    transform: translateX(8vw) translateY(10vh) scale(0.68);
  }
  20% {
    transform: translateX(47vw) translateY(13vh) scale(0.66);
  }
  24% {
    transform: translateX(-40vw) translateY(-48vh) scale(0.32);
  }
  28% {
    transform: translateX(-32vw) translateY(-26vh) scale(0.63);
  }
  32% {
    transform: translateX(-7vw) translateY(26vh) scale(0.9);
  }
  36% {
    transform: translateX(-37vw) translateY(49vh) scale(0.67);
  }
  40% {
    transform: translateX(-25vw) translateY(-32vh) scale(0.37);
  }
  44% {
    transform: translateX(-10vw) translateY(24vh) scale(0.82);
  }
  48% {
    transform: translateX(-22vw) translateY(39vh) scale(0.74);
  }
  52% {
    transform: translateX(-21vw) translateY(18vh) scale(0.91);
  }
  56% {
    transform: translateX(24vw) translateY(-27vh) scale(0.75);
  }
  60% {
    transform: translateX(-27vw) translateY(-11vh) scale(0.95);
  }
  64% {
    transform: translateX(-42vw) translateY(-6vh) scale(0.5);
  }
  68% {
    transform: translateX(-40vw) translateY(-31vh) scale(0.96);
  }
  72% {
    transform: translateX(20vw) translateY(-49vh) scale(0.41);
  }
  76% {
    transform: translateX(12vw) translateY(-49vh) scale(0.53);
  }
  80% {
    transform: translateX(-6vw) translateY(6vh) scale(0.66);
  }
  84% {
    transform: translateX(17vw) translateY(-44vh) scale(0.65);
  }
  88% {
    transform: translateX(-28vw) translateY(28vh) scale(0.56);
  }
  92% {
    transform: translateX(-11vw) translateY(-23vh) scale(0.92);
  }
  96% {
    transform: translateX(-13vw) translateY(-7vh) scale(0.36);
  }
  100% {
    transform: translateX(27vw) translateY(30vh) scale(0.99);
  }
}
@keyframes drift {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes flash {
  0%,
  30%,
  100% {
    opacity: 0;
    box-shadow: 0 0 0vw 0vw yellow;
  }
  5% {
    opacity: 1;
    box-shadow: 0 0 2vw 0.4vw yellow;
  }
}
</style>
