浅谈 vue 与 webpack

作为吹嘘改变世界的群体中的一员本来不想写基础皮毛的东西, 无奈每次和别人吹牛总是吹的别人听不懂, 确实无奈, 为此我潜心研究, 决定出手一篇你们看得懂的技术文章。

看完你可以循序渐进的学到

* vue 基础
* webpack 单页面打包应用程序

## 这个产品的功能和意义

功能: 通过已有数据可查看嫌疑人的社会关系和详情信息。
意义: 
1. 快速直观的通过社会关系找到团伙作战的可能。
2. 通过社会关系了解是否存在疑似犯罪或包庇的情况。
3. 保卫和预防人民财产和生命安全不受侵犯。
4. 如有不足之处请参考每天晚上七点整的新闻联播。

## 关于设计

伟哥曾经说过: "设计占整个产品开发的百分之70的时间, 好的设计不需要深度思考", 设计是什么？ 温博士说过: "设计就是分解需求, 往细了分", 我相信每一个大神, 相信弄个好的设计需要花费很大的精力, 所以为了让需求变得非常具体,专注的写一篇技术文章, 我决定使用曾经的面试题来写, 这个设计简单, 重在完整(偷笑)。

> 特别说明: 以下设计是借鉴, 代码是原创。

## 需求分解(设计图上标注文字)

三个组件
第一页组件, 显示载入数据按钮点击之后显示第二页组件。
第二页列表组件
    1.带滚动条, 可以上下滚动
    2.在详情中选中联系人时, 会自动滚动到对应位置。
    3.列表项组件支持左键单击, 状态为选中
第三页列表详情组件
    1.回退按钮
    2.联系人, 选中后列表组件展示并选中列表项组件, 展示联系人详情。
    3.可以进一步点击联系人。 不论点击多少步都支持单步回退到起点。

## 数据字段设计(设计图上标注文字)

嫌疑人详细信息列表

```
    const Peopelist = [
        {name:'张三',sex:'男',phone:12345678},
        {name:'张三2',sex:'男',phone:12345678},
        {name:'张三3',sex:'男',phone:12345678},
        {name:'张三4',sex:'男',phone:12345678},
    ]
```

嫌疑人社会关系详情

```
    const ContactDetails = {
        '张三': ['张三2', '张三3', '张三4'],
        '张三2': ['张三', '张三3', '张三'],
        '张三3': ['张三4'],
    } 
```

## 想法

> 希望你跟我有一样的想法, 如果你觉得你的想法比较好可以给我发邮件(564845354@qq.com)

### 初始想法

1.由于是面试题, 需要快速实现产品界面和功能。

2.如果有时间再一步一步搭建 vue 脚手架优化目录便于项目的快速迭代和协同开发。

3.第一步应该创建一个 html 快速把产品做出来(只使用一个 html 完成[开发步骤]内的所有步骤)。

### 开发步骤

1.引入 vue.js ( 通过 script 标签直接引入在线 cdn 文件), 实例化 vue 组件。 5分钟

2.创建两个局部组件作为人物关系页/人物详情页(局部/全局组件知道就好)。 5分钟

5.通过组件模板布局组件 html。

6.使用 css 给布局的 html 穿上衣服。

7.实现组件之间的父传子, 子传父通信。

8.使用 vue 基础语法实现数据的展示。

### webpack 的引入和目录/文件的拆分

1.拆分所有代码到对应的文件 js/css/html/vue。

2.拆分组件到对应的目录, 使用 commonjs 引入模块的方式引入各种文件。

3.one by one 的去配置 webpack 的热更新、别名、开发/生产环境等等。

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
                message: 'Hello Vue!'
            }
        })
    </script>
```

## 局部组件添加

script 标签部分

```
    // 嫌疑人详情组件
    let listComponent = {
        template: "<div>{{peopelist}}</div>",
        data(){
            return {
                peopelist: "列表项组件"
            }
        }
    }

    // 嫌疑人社会关系组件
    let listDetailComponent = {
        template: "<div>{{contactDetails}}</div>",
        data(){
            return {
                contactDetails: "列表项组件"
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

## 组件 html 布局

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

引入数据 

## css 盒子模型以及引用数据






## vue 组件通信之父传子


## 相关想法
