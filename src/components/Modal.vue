<template>
  <div class="modal-backdrop" >
      <div class="modal-fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document" >
        <div class="modal-content">
      <div class="modal-header">
        <slot name="header">
          <h4 class="modal-title">编辑任务</h4>
          <button type="button" class="close" @click="close"><span aria-hidden="true">&times;</span></button>
        </slot>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="edit-name">任务名称</label>
            <input type="text" class="form-control" id="edit-name" v-model="jobName">
          </div>
          <div class="form-group">
            <label for="edit-command">shell命令</label>
            <input type="text" class="form-control" id="edit-command" v-model="jobCommand">
          </div>
          <div class="form-group">
            <label for="edit-cronExpr">cron表达式</label>
            <input type="text" class="form-control" id="edit-cronExpr" v-model="jobCronExpr">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button type="button" class="btn btn-default" @click="close()">关闭</button>
          <button type="button" class="btn btn-primary" @click="saveJobChild()">保存</button>
        </slot>
      </div>
      </div>
      </div>

    </div>
  </div>
</template>
<style scoped>
  .modal-backdrop { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0,0,0,.3); display: flex; justify-content: center; align-items: center; } .modal { background-color: #fff; box-shadow: 2px 2px 20px 1px; overflow-x:auto; display: flex; flex-direction: column; } .modal-header, .modal-footer { padding: 15px; display: flex; } .modal-header { border-bottom: 1px solid #eee; color: #010817; justify-content: space-between; } .modal-footer { border-top: 1px solid #eee; justify-content: flex-end; } .modal-body { position: relative; padding: 20px 10px; } .btn-close { border: none 0; font-size: 20px; padding: 20px; cursor: pointer; font-weight: bold; color: #4aae9b; background-color: transparent; } .btn-green { color: #fff; background-color: #4aae9b; border: 1px solid #4aae9b; border-radius: 2px; }
</style>

<script>
  import {mapState} from 'vuex';
  export default{
      name: 'Modal',
      props:["jobName", "jobCommand", "jobCronExpr"],
      data () {
        return {
          ...mapState(['jobInfo'])
        }
      },
      computed:{

      },
      methods: {
        close () {
          //自组件可以使用$emit触发父组件的自定义事件
          this.$emit('close');
        },
        saveJobChild() {
          console.info("saveJobChild: ")

          var jobInfo = {
            "name":this.jobName,
            "command":this.jobCommand,
            "cronExpr":this.jobCronExpr
          }

          this.$store.dispatch('updateJobInfo', jobInfo)
          this.$emit('save', jobInfo)
          this.$emit('close')

        }
      }
    }
</script>
