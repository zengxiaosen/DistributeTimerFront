<template>
  <div class="modal-backdrop" >
      <div class="modal-fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document" >
        <div class="modal-content">
      <div class="modal-header">
        <slot name="header">
          <h4 class="modal-title">健康节点</h4>
          <button type="button" class="close" @click="close"><span aria-hidden="true">&times;</span></button>
        </slot>
      </div>
      <div class="modal-body">
        <table id="worker-list" class="table table-striped">
          <thead>
            <tr>
              <th>节点IP</th>
            </tr>
          </thead>
          <tbody v-for="workerIp in this.workList">
            <tr>
              <td>{{workerIp}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button type="button" class="btn btn-default" @click="close()">关闭</button>
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
  export default{
      name: 'WorkerListModal',
      props:["workList"],
      data () {
        return {
        }
      },
      computed:{

      },
      methods: {
        close () {
          //自组件可以使用$emit触发父组件的自定义事件
          this.$emit('close');
        },
        //时间格式化函数
        timeFormat(millsecond){
          //前缀补0:2018-08-10 08:01:03:345
          function paddingNum(num, n){
            var len = num.toString().length
            while(len < n){
              num = '0' + num
              len ++
            }
            return num
          }
          var date = new Date(millsecond)
          var year = date.getFullYear()
          var month = paddingNum(date.getMonth() + 1, 2)
          var day = paddingNum(date.getDate(), 2)
          var hour = paddingNum(date.getHours(), 2)
          var minute = paddingNum(date.getMinutes(), 2)
          var second = paddingNum(date.getSeconds(), 2)
          var millsecond = paddingNum(date.getMilliseconds(), 3)

          return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + millsecond
        }

      }
    }
</script>
