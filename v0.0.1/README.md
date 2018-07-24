
## vue 实例化

创建一个 html 文件, 在 head 处引入 script标签

```
    <script src="https://cdn.bootcss.com/vue/2.2.2/vue.min.js"></script>
```

在 body 处写入

```
    <div id="app">{{msg}}</div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                message: 'hello world!'
            }
        })
    </script>
```

效果

![效果](/example/image/1.png)

## 局部组件添加

script 标签部分

```
    // 嫌疑人详情组件
    let listComponent = {
        template: "<div>{{peopelist}}</div>",
        data(){
            return {
                peopelist: "嫌疑人详情组件"
            }
        }
    }

    // 嫌疑人社会关系组件
    let listDetailComponent = {
        template: "<div>{{contactDetails}}</div>",
        data(){
            return {
                contactDetails: "嫌疑人社会关系组件"
            }
        }
    }

    // vue 实例
    new Vue({
        el: '#app',
        components: {
            "list-component": listComponent,
            "lis-detail-component": listDetailComponent
        }
    })
```

html 部分

```
    <div id="app">
        <list-component></list-component>
        <lis-detail-component></lis-detail-component>
    </div>
```

效果

![效果](/example/image/2.png)

## 组件 html 布局以及引用数据

替换 listComponent.template

```
    <div class="listComponent">
        <div class="peopelist" v-for="item of peopelist" :key="item">
            <div>
                <span>{{item.name}}</span>
                <span>{{item.sex}}</span>
            </div>
            <div>
                <span>{{item.phone}}</span>
            </div>
        </div>
    </div>
```

替换 listDetailComponent.template

```
    <div class="listDetailComponent">
        <div class="detailName">{{detailName}}</div>
        <div class="detailList">
            <ul>
                <li v-for="item of detailList" :key="item">
                    联系人: 
                    <span>{{item}}</span>
                </li>
            </ul>
        </div>
    </div>
```

组件通信父传子引入数据

在 vue 实例中添加所有嫌疑人列表数据

```
    // vue 实例
    new Vue({
        el: '#app',
        components: {
            "list-component": listComponent,
            "listdetail-component": listDetailComponent
        },
        data() { // 添加 data 数据
            return {
                peopelist: [
                    {
                        name: "张三",
                        sex: "男",
                        phone: 12345678
                    }, {
                        name: "张三2",
                        sex: "男",
                        phone: 12345678
                    }
                    , {
                        name: "张三3",
                        sex: "男",
                        phone: 12345678
                    }, {
                        name: "张三4",
                        sex: "男",
                        phone: 12345678
                    }
                ]

            }
        }
    })
```

在嫌疑人社会关系组件中添加准备好的数据(方便起见贴上整个组件)

1. mounted 函数在加载该组件时执行该函数

2. methods 函数内储存自定义方法

3. data 内写入准备好的数据

4. getContactDetail 方法用来获取嫌疑人的索引查询嫌疑人的社会关系(默认是"张三", 如有同名同姓的纯属巧合)


```
        let listDetailComponent = {
            template: listDetailHtml,
            methods: {
                getContactDetail: function (idx) {
                    let self = this;
                    idx = idx > 0 ? idx : 0
                    Object.keys(self.contactDetails).forEach(function (item, index) {
                        if (index === idx) {
                            self.detailName = item;
                            self.detailList = self.contactDetails[item];
                        }
                    })
                }
            },
            mounted() {
                this.getContactDetail()
            },
            data() {
                return {
                    detailName: "",
                    detailList: [],
                    contactDetails: {
                        "张三": ["张三2", "张三3", "张三4"],
                        "张三2": ["张三", "张三3", "张三"],
                        "张三3": ["张三4"]
                    }
                }
            }
        }
```

在 html 中添加需要传入的数据

```
    <div id="app">
        <list-component :peopelist="peopelist"></list-component>
        <listdetail-component></listdetail-component>
    </div>
```

在 嫌疑人详细信息组件中接收数据

```
    let listComponent = {
        props: ["peopelist"],
        template: listHtml
    }
```

效果

![效果](/example/image/3.png)

## css 盒子模型

添加 css 样式

```
    <style>
        /* 主页尺寸背景 */

        #app {
            width: 300px;
            height: 450px;
            background-color: #92CDDC;
            padding: 15px;
        }

        /* 嫌疑人详情信息 */

        .listComponent {
            background-color: #F1DCDA;
            height: 70%;
            width: 89%;
            padding: 15px;
            overflow-y: auto;
        }

        .peopelist {
            width: 99%;
            background: #EBF0DF;
            padding: 0px 0px 30px 0px;
            margin-bottom: 5px;
            border: 1px solid;
        }

        .peopelist:hover {
            background: #cce09d
        }

        /* 嫌疑人社会关系信息 */

        .listDetailComponent {
            background: #FDE499;
            height: 20%;
            margin-top: 10px;
            padding: 2px;
        }

        .detailName {
            float: left;
            padding: 34px;
        }

        .detailList {
            padding-left: 100px;
        }

        .RelevantPerson {
            text-decoration: underline;
            cursor: pointer;
        }

        .returnIcon {
            background: url(./image/return.png);
            width: 20px;
            height: 20px;
            position: absolute;
            background-size: 20px 22px;
        }

        .action {
            background-color: #00E700;
        }
    </style>
```

## 点击联系人

DOM 操作

1. DOM 操作在 Vue 内有一套接口， 在 html 标签上添加 ref 属性控制(不要用 jquery)。

2. 在方法内使用 this.refs.dom 调用修改相关数据和 dom, 如果在不清楚的情况下可先打印 this.refs.dom，查看内部方法。

3. 使用操作 DOM 的方式来添加修改选中联系人的背景颜色和子组件方法。

在嫌疑人列表 template 中添加 ref="list"

```
    <div class="listComponent">
        <div class="peopelist" v-for="item of peopelist" :key="item" :id="item.name" ref="list">
            <div>
                <span>{{item.name}}</span>
                <span>{{item.sex}}</span>
            </div>
            <div>
                <span>{{item.phone}}</span>
            </div>
        </div>
    </div>
```

在嫌疑人列表中操作 dom 控制

```
    let listComponent = {
        props: ["peopelist"],
        template: listHtml,
        methods: {
            changeTheBackground(name){
                this.$refs.list.forEach(function(ele){
                    if(ele.id === name){
                        ele.style.backgroundColor = "#00E700"
                    }else{
                        ele.style.backgroundColor = "#EBF0DF"
                    }
                })
            }
        }
    }
```

在主页组件 html 上写入 ref="peopelistdom"

```
    <list-component :peopelist="peopelist" ref="peopelistdom"></list-component>
```

在主页的 Vue 实例中添加监听控制

```
    mounted() {
        let self = this;
        Event.$on("personalname", function(name){
            self.getPersonalName(name)
            self.$refs.peopelistdom.changeTheBackground(name)
        })
    },
```

以上功能当点击联系人时，主页监听到联系人名称，使用子组件的方法来操作子组件改变选中联系人的背景颜色

效果

![效果](/example/image/software.gif)

> 以上为 v1.0.0, 产品功能都已实现, 接下来就是分解项目。



## 我的 webpack 文件结构

1. 根目录下 webpack.config.js
2. build 目录里 devServer.js entry.js module.js output.js plugins.js resolve.js
3. 所有重要项目的路径存放在 dir-path.js

## 话说到到这里，社交的时间到了

以上的代码其实很早之前我就写过一遍了, 奈何所有源码都找不见了, 开始写这个博客的时候, 每一个功能点我都要考究是否是最好的方法, 越是细小的功能越是有多种方式实现, 选择每一种都让我非常痛苦, 加上文档的书写格式和文字的修改频繁占据整个博文的百分之八十甚至更多时间, 然而我发现这确实没法避免, 但是时间的消耗让我越来越受不了, 我几乎放弃了使用"最好的方法"(除了坚持没有使用 jquery 以外), 我总是安慰自己先写出来, 之后再开设一个章节去一个小点一个小点的修改, 然而还有其他的项目以及工作中的产品需要维护, 在这里特别说明, 如果您觉得我的方法并不是最好的, 邮件发给我(564845354@qq.com), 我将感激涕零的往您给的方向上砥砺前行。