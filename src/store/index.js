import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    jobInfo:{},
    logInfo:[]
  },
  actions: {
    updateJobInfo(ctx, jobInfo) {
      ctx.commit('updateJobInfo', jobInfo)
      //state.jobInfo = jobInfo
    },
    updateLogInfo(ctx, logInfo) {
      ctx.commit('updateLogInfo', logInfo)
    }
  },
  mutations: {
    updateJobInfo(state, jobInfo) {
      state.jobInfo = jobInfo
    },
    updateLogInfo(state, logInfo) {
      state.logInfo = logInfo
    }
  }
})

