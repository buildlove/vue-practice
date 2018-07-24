<template>
    <div class="listDetailComponent">
        <div class="returnIcon" @click="getBackInfo"></div>
        <div class="detailName">{{detailName}}</div>
        <div class="detailList">
            <ul>
                <li v-for="(name, index) of detailList" :key="index">
                    <span class="ContactName">联系人:</span> 
                    <span class="RelevantPerson" @click="findPeopleInfo(name)">{{name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import suspectRelatedJSON from "../data/suspectRelated.json";
    export default {
        methods: {
            getContactDetail: function (idx, type) {
                let self = this;
                idx = idx > 0 ? idx : 0
                Object.keys(self.contactDetails).forEach(function (item, index) {
                    if (index === idx) {
                        self.detailName = item;
                        self.detailList = self.contactDetails[item];
                        if (type != "noCache") {
                            self.cache.push(index)
                        }
                    }
                })
            },
            findPeopleInfo: function (name) {
                let self = this;
                let isExist = false
                Object.keys(this.contactDetails).forEach(function (key, index) {
                    if (name === key) {
                        self.$emit('personalname', name)
                        self.getContactDetail(index)
                        isExist = true
                    }
                })
                if (!isExist) {
                    self.$emit('personalname', name)
                    alert("查询的联系人没有匹配到社会关系")
                }
            },
            getBackInfo: function () {
                let current = this.cache.length - 1
                if (current > 0) {
                    this.getContactDetail(this.cache[current - 1], "noCache")
                    this.cache.splice(current, 1)
                }
            }
        },
        mounted() {
            this.getContactDetail()
        },
        data() {
            return {
                detailName: "",
                detailList: [],
                cache: [],
                contactDetails: suspectRelatedJSON
            }
        }
    } 
</script>
