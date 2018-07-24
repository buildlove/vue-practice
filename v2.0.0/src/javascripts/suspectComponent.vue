<template>
    <div class="listComponent">
        <div class="peopelist" v-for="(item, index) of peopelist" :key="index" :id="item.name" ref="list"  @click="sendDataToOtherCom(item.name)">
            <div>
                <span>{{item.name}}</span>
                <span>{{item.sex}}</span>
            </div>
            <div>
                <span>{{item.phone}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["peopelist"],
        methods: {
            changeTheBackground(name) {
                this.$refs.list.forEach(function (ele) {
                    if (ele.className.indexOf("action") !== -1){
                        ele.className = "peopelist"
                    }
                    if (ele.id === name) {
                        ele.className = ele.className + " action"
                    }
                })
            },
            sendDataToOtherCom(name) {
                this.$emit("clickCurrentDivName", name)
            }
        }
    } 
</script>

