// components/tab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabsdata:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTab(e){
      const {index} = e.currentTarget.dataset;
      this.triggerEvent("goodlistEvent",index)
    }
  }
})
