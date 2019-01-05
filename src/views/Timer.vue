<template>
      <div class="container-fluid">
        <!-- 页头-->
        <timer-header></timer-header>

        <!-- 功能按钮-->
        <timer-function-btn @new="newJob" @worker="workerList"></timer-function-btn>
        <worker-list-modal :workList="workList" v-show="isWorkerListModalVisible" @close="closeWorkerListModal()"></worker-list-modal>

        <!-- 任务列表-->
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default" style="margin-top: 20px">
              <div class="panel-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>任务名称</th>
                      <th>shell命令</th>
                      <th>cron表达式</th>
                      <th>任务操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- 这是一个任务-->
                    <tr v-for="job in this.jobList" :key="job.name">
                      <td class="job-name">{{job.name}}</td>
                      <td class="job-command">{{job.command}}</td>
                      <td class="job-cronExpr">{{job.cronExpr}}</td>
                      <td>
                        <!-- 按钮组-->
                        <div class="btn-toolbar">
                          <button class="btn btn-primary btn-lg" @click="showModal(job.name, job.command, job.cronExpr)">编辑</button>
                          <modal :jobName="jobName" :jobCommand="jobCommand" :jobCronExpr="jobCronExpr"
                                 v-show="isModalVisible" @close="closeModal()" @save="saveJob" />
                          <button class="btn btn-danger" @click="handleDelete(job.name)">删除</button>
                          <button class="btn btn-warning" @click="handleKill(job.name)">强杀</button>
                          <button class="btn btn-success" @click="handleLog(job.name)">日志</button>
                          <log-modal :logList="logList" v-show="isLogModalVisible" @close="closeLogModal()" />
                        </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>




      </div>

</template>

<script>
    import TimerHeader from "../components/TimerHeader";
    import TimerFunctionBtn from "../components/TimerFunctionBtn";
    import Modal from "../components/Modal"
    import axios from 'axios';
    import LogModal from "../components/LogModal";
    import WorkerListModal from "../components/WorkerModal";
    export default {
        name: "Timer",
        components: {WorkerListModal, LogModal, TimerFunctionBtn, TimerHeader, Modal},
        data(){
          return{
            jobList: [

            ],
            isModalVisible: false,
            isLogModalVisible: false,
            isWorkerListModalVisible: false,
            jobName: {},
            jobCommand: {},
            jobCronExpr: {},
            logList: [

            ],
            workList: [

            ]
          }
        },
        created(){
          //当vm实例的data和methods初始化完毕后，vm实例会自动执行created这个生命周期函数
          this.rebuildJobList()
        },
        methods:{
          handleLog(name) {
            this.isLogModalVisible = true
            axios.get("/job/log", {
              params : {
                name: name,
                limit: 20
              }
            })
              .then((response)=>{
              var res = response.data
              if (res.errno != 0) {
                return
              }
              console.log(res)
              //传给vuex
              this.logList = res.data

              var logInfo = this.logList
              //this.$store.dispatch('updateLogInfo', logInfo)

            })
          },
          workerList(){
            console.log("workerlist.....")
            this.isWorkerListModalVisible = true
            axios.get("/worker/list")
              .then((response)=>{
                var res = response.data
                if (res.errno != 0) {
                  return
                }
                console.log(res)
                //传给vuex
                this.workList = res.data



              })
          },
          showModal(name, command, cronExpr) {
            this.isModalVisible = true
            //取当前job的信息，赋值给模态框的input
            this.jobName = name
            this.jobCommand = command
            this.jobCronExpr = cronExpr
          },
          closeModal() {
            this.isModalVisible = false
          },
          closeLogModal() {
            this.isLogModalVisible = false
          },
          closeWorkerListModal(){
            this.isWorkerListModalVisible = false
          },
          handleEdit(){
            console.log("handleEdit")
            //模态框
          },
          handleDelete(name){
            this.delJob(name)
            this.rebuildJobList()

          },
          delJob(name){
            var params = new URLSearchParams()
            params.append('name', name)
            axios.post("/job/delete", params).then((response)=>{
              var res = response.data
              if (res.errno != 0) {
                return
              }
            })
          },
          handleKill(name){
            console.log("handleKill")
            var params = new URLSearchParams()
            params.append('name', name)
            axios.post("/job/kill", params).then((response)=>{
              var res = response.data
              if (res.errno != 0) {
                return
              }
            })
            this.rebuildJobList()

          },
          //定义一个函数，用于刷新任务列表
          rebuildJobList(){
            axios.get("/job/list").then((response)=>{
              var res = response.data
              if (res.errno != 0) {
                return
              }
              //遍历任务数组
              this.jobList = res.data
              console.info("joblist: ", this.jobList)
            })
          },
          saveJob(jobInfo){
            this.saveJobParent(jobInfo)
            this.rebuildJobList()

          },
          saveJobParent(jobInfo) {
            console.info("saveJobParent")
            console.info("jobInfo: " + jobInfo.cronExpr + "," + jobInfo.name + "," + jobInfo.command)
            console.info("jobinfo from store: " + this.$store.state.jobInfo.cronExpr +  "," + this.$store.state.jobInfo.name + "," +
              this.$store.state.jobInfo.command)

            //job save
            var params = new URLSearchParams()
            params.append('job', JSON.stringify(this.$store.state.jobInfo))
            axios.post("/job/save", params).then((response)=>{
              var res = response.data
              if (res.errno != 0) {
                return
              }
              console.info("/job/save resp: " + res.cronExpr + "," + res.name + "," + res.command)
            })

          },
          newJob(){
            console.info("newJob.....")
            this.jobName = ""
            this.jobCommand = ""
            this.jobCronExpr = ""
            this.isModalVisible = true


            this.rebuildJobList()
          }


        }
    }

</script>

<style scoped>

</style>
