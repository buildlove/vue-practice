<template>
    <div id="app">
        <div class="btn-loading" @click="showPage" ref="loading">载入中...</div>
        <div class="component-content" ref="components">
            <suspect :peopelist="peopelist" ref="suspectdom" @clickCurrentDivName="receiveSusComName"></suspect>
            <suspectRelated ref="suspectRelatedDom" @personalname="receiveSusRelComName"></suspectRelated>
        </div>
    </div>
</template>

<script>
    import suspectJSON from "./data/suspect.json"
    import suspect from "./javascripts/suspectComponent.vue"
    import suspectRelated from "./javascripts/suspectRelatedComponent.vue"

    export default {
        components: {
            "suspect": suspect,
            "suspectRelated": suspectRelated
        },
        methods: {
            getPersonalName: function(name) {
                location.href = location.pathname + "#" + name;
            },
            showPage: function() {
                this.$refs.loading.style.display = "none";
                this.$refs.components.style.display = "block";
            },
            // 接收嫌疑人社会关系组件传过来的名称
            receiveSusRelComName: function(name){
                this.getPersonalName(name);
                this.$refs.suspectdom.changeTheBackground(name);
            },
            // 接收嫌疑人关系组件传过来的名称
            receiveSusComName: function(name){
                this.$refs.suspectRelatedDom.findPeopleInfo(name);
            }
        },
        mounted() {
            let self = this;
            setTimeout(() => {
                self.showPage();
            }, 3000);
        },
        data() {
            return {
                peopelist: suspectJSON
            };
        }
    };
</script>

<style>
    @import "./css/index.css";
</style>
