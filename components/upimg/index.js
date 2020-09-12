// components/upimg/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgArr:{
            type:Array,
            value:[]
        }
    },
    data: {

    },
    methods: {
        handleImg(e){
            let index = e.currentTarget.dataset.index;
            this.triggerEvent("feedBack",index);
        }
    }
})
