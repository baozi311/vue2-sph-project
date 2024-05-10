<template>
  <div>
    <TypeNav></TypeNav>
    <Container></Container>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor :floor="item" v-for="item in floorList" :key="item.id"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import Container from './components/Container'
import Recommend from './components/Recommend'
import Rank from './components/Rank'
import Like from './components/Like'
import Floor from './components/Floor'
import Brand from './components/Brand'
export default {
  name: 'Home',
  components: {
    Container,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  data() {
    return {

    }
  },
  computed: {
    floorList(){
       return this.$store.state.home.floorList 
    }
  },
  methods: {
    getFloorList(){
        this.$store.dispatch('getFloorList')
    }
  },
  mounted(){
    this.getFloorList()
  }
}
</script>

<style lang="scss" scoped>
</style>