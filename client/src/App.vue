<template>
  <div class="app">
    <h1>Welcome to the Image Generator app!</h1>
    <a :href="image" download="image.png">
      <img :src="image" width="440" height="440"/>
    </a>
    <button class="btn" @click="generateImage">generate</button>
  </div>
</template>
<script>
const BASE_URL = "http://localhost:3000";
export default {
  name: 'App',
  data() {
    const image = localStorage.getItem("image") || "";
    return { image, isLoad: false }
  },
  methods: {
    async generateImage() {
     this.isLoad = true;
     const response = await fetch(BASE_URL);
     const { data: image } = await response.json();
     this.image = `${BASE_URL}/public/${image}`;
     localStorage.setItem("image", this.image);
     this.isLoad = false;
    },
  },
};
</script>
<style>
body {
  background: #222;
}
.link {
  color: #fff;
}
.app {
  margin-top: 100px;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: #fff;
  padding: 0 200px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.btn {
  text-decoration: none;
  display: inline-block;
  margin: 80px 20px;
  padding: 15px 30px;
  overflow: hidden;
  border: 2px solid;
  border-bottom-width: 4px;
  text-transform: uppercase;
  font-weight: bold;
  width: 500px;
  letter-spacing: 2px;
  color: rgba(30, 255, 188, 1);
  background: transparent;
  transition: color .3s, background .5s;
}
.btn:hover {
  animation: stripes .75s infinite linear;
  background-size: 10px 10px;
  color: #FF50E5;
}

</style>
