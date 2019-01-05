<template>
  <div class="row">
    <div class="col-md-12">
      <button type="button" class="btn btn-primary" @click="handleNew">新建任务</button>
      <button type="button" class="btn btn-success" @click="handleWorker">健康节点</button>

    </div>
  </div>
</template>

<script>
    export default {
        name: "TimerFunctionBtn",
        data(){

        },
        methods:{
          handleNew() {
            console.info("handleNew")
            this.$emit('new')
          },
          handleWorker(){
            console.log("handleWorker")
            this.$emit('worker')
          }
        }
    }

</script>

<style scoped>

</style>
