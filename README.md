# ele-admin-helper 
## 组件目的
方便的使用ElementUI的Form和Table组件，后续可能还会增加别的组件

通过这个二次封装的组件可以比较方便的使用ElementUI的Form和Table，满足一般后台需要

## 安装与使用方法

``` bash
npm install ele-admin-helper --save-dev

import EleAdminHelper from 'ele-admin-helper'
Vue.use(EleAdminHelper)
```

## 参考demo地址
[fitadmin](https://github.com/liwenliang/fitadmin)
看文档不如直接用，参考这个项目可以快速上手，通过json的数据形式创建表单跟表格，
在后台里边，表单与表格是使用频率最高的两个组件，将这两个组件规范化统一，能够
极大的减少重复工作，提高开发效率

## 使用方法
1. yxform组件
```html
<yxform
  ref="demoForm"
  :emit-validate="form.emitValidate"
  :emit-reset="form.emitReset"
  :form="form"
/>
```

```javascript
{
    emitValidate: false,  // 是否触发表单验证，使用的时候只要修改这个字段既可以触发表单验证
    emitReset: false, // 是否触发表单重置，修改该字段的值会触发表单重置
    validateSuccess(){}, // 表单验证成功回调事件，通常成功就发送请求了
    validateFaild(){}, // 表单验证失败回调事件，通常失败会有提示
    inline: false, // 是否内联内联效果，默认是一行一个表单项
    // style: 'width: 500px', // 表单宽度，一般用不着
    labelWidth: '120px',  // 表单项lable的宽度
    labelPosition: 'right', // 表单项lable的位置
    props: { // 表单对应的所有字段，相当于form里的name字段，这里要注意的是字段类型
      name: '一下科技',
      sex: '1',
      age: 7,
      birthday: '',
      hobby: ['2', '3'],
      likeColor: '#000000',
      city: 'Beijing',
      dateRange: [],
      timeRange: ['00:00', '23:59'],
      timePeriod: defaultTime,
      cascader: 150500
    },
    attributes: [
      {
        type: 'yxDatePicker', // 日期选择器组件
        prop: 'dateRange', // 对应form里的prop某个字段，不要重复
        label: '日期范围',
        config: {
          type: 'daterange', // 表示日期范围形式
          format: 'yyyy 年 MM 月 dd 日', // 展现形式
          valueFormat: 'yyyy-MM-dd', // 值的形式，也对应prop最后的值
          startPlaceholder: '开始日期', // 开始日期的placeholder
          endPlaceholder: '结束日期' // 结束日期的placeholder
        }
      },
      {
        type: 'yxTimePicker', // 时间选择器组件
        prop: 'timeRange',
        label: '时间范围',
        config: {
          isRange: true, // 表示是否为范围选择器，如果为false则对应prop为一个时间字符串，如果为true则对应prop为一个数组
          format: 'HH:mm', // 展现形式
          valueFormat: 'HH:mm', // value的形式
          startPlaceholder: '开始时间', // 开始时间的placeholder
          endPlaceholder: '结束时间' // 结束事件的placeholder
        }
      },
      {
        type: 'yxInput',  // 输入框组件
        prop: 'name',
        label: '姓名',
        rules: ['required'], // 表单验证规则，内置验证类型可以直接传字符串，如果不满足可以传验证对象
        config: {
          type: 'text', // 输入框类型
          placeholder: '请输入姓名', // 输入框的placeholder
          disabled: false, // 几乎每个组件都有disabled属性，表示是否可用
          style: 'width: 220px;' // 输入框的宽度
        }
      },
      {
        type: 'yxWeekTimeSelect', // 不连续的日期选择组件，某些场景会用到，比较定制的一个组件
        prop: 'timePeriod',
        label: '屏蔽时间段'
      },
      {
        type: 'yxTree', // 树形组件
        prop: 'areaCode',
        label: '屏蔽地域',
        config: {
          options: cities // label value children形式
        }
      },
      {
        type: 'yxSelect', // 下拉框组件
        prop: 'sex',
        label: '性别',
        rules: ['required'], // 验证规则
        config: {
          disabled: false,
          style: 'width: 220px;',
          options: [  // 下拉选项，label value形式
            {
              label: '男',
              value: '0',
              disabled: false
            },
            {
              label: '女',
              value: '1',
              disabled: false
            }
          ]
        }
      },
      {
        type: 'yxInputNumber', // 数字输入框
        prop: 'age',
        label: '年龄',
        rules: ['required', 'int'], // 验证规则
        config: {
          type: 'input',
          min: 0,
          max: 10,
          disabled: false,
          style: 'width: 220px;'
        }
      },
      {
        type: 'yxDatePicker', // 日期选择框
        prop: 'birthday',
        label: '生日',
        rules: ['required'],
        config: {
          type: 'date',
          format: 'yyyy 年 MM 月 dd 日', // 日期在页面上的展现形式
          valueFormat: 'timestamp', // 对应value的字段的形式
          placeholder: '请输入生日',
          disabled: false
        }
      },
      {
        type: 'yxColorPicker', // 颜色选择器，一般情况用不到这个
        prop: 'likeColor',
        label: '颜色',
        rules: ['required'],
        config: {
          placeholder: '请输入颜色值',
          alpha: false,
          disabled: false
        }
      },
      {
        type: 'yxGroupSelect', // 分组下拉选择器
        prop: 'city',
        label: '城市',
        rules: ['required'],
        config: {
          style: 'width: 220px;',
          options: [
            {
              label: '热门城市',
              options: [
                {
                  value: 'Shanghai',
                  label: '上海'
                }, {
                  value: 'Beijing',
                  label: '北京'
                }]
            }, {
              label: '城市名',
              options: [
                {
                  value: 'Chengdu',
                  label: '成都'
                }, {
                  value: 'Shenzhen',
                  label: '深圳'
                }, {
                  value: 'Guangzhou',
                  label: '广州'
                }, {
                  value: 'Dalian',
                  label: '大连'
                }]
            }]
        }
      },
      {
        type: 'yxCheckboxGroup', // 多选框选择器
        prop: 'hobby',
        label: '爱好',
        rules: ['required'],
        config: {
          disabled: false,
          options: [
            {
              label: '足球',
              value: '0',
              disabled: false
            },
            {
              label: '篮球',
              value: '1',
              disabled: false
            },
            {
              label: '排球',
              value: '2',
              disabled: false
            },
            {
              label: '乒乓球',
              value: '3',
              disabled: false
            }
          ]
        }
      },
      {
        type: 'yxCascader', // 级联选择器
        prop: 'cascader',
        label: '城市',
        config: {
          placeholder: '请选择城市',
          showAllLevels: true,
          props: {
            emitPath: false // 只需要最后一级的字段
          },
          options: cities // label value形式
        }
      },
      {
        type: 'yxButton',
        config: {
          options: [
            {
              label: '提交',
              type: 'primary',
              onClick: this.onsubmit
            },
            {
              label: '重置',
              type: 'danger',
              onClick: this.onreset
            }
          ]
        }
      }
    ]
}
```

2. yxform组件

template
```html
<yxtable ref="demoTable" :table="table" />
```

data
```javascript
{
    data: [], // 表格数据，通常是通过接口请求回来复制给这个字段
    sortChange() {}, // 排序发生变化时触发的事件回调
    select: {
      isSelectable: true, // 表格的每一项是否能够勾选
      selectChange: this.onSelectChange, // 表格被勾选上以后触发的事件回调
      selectable(row, index) { // 表格项是否允许被勾选，通过条件可以让某些条件下的项目不可选中
        if (row.sex === '0') {
          return false
        } else {
          return true
        }
      }
    },
    attributes: [
      {
        prop: '',           // 展示对应的数据某个属性字段，这里是index类型，不需要填写
        type: 'index',      // 索引类型，从1开始
        label: 'index',     // 表头展示的文字
        fixed: 'left',      // 是否固定，可以固定在左侧或者右侧
        width: '100'        // 该项的单元格宽度
      },
      {
        prop: 'sex',        // 展示sex字段的数据
        type: 'select',     // 展现形式是下拉框
        label: 'select',    // 表头展示的文字
        sortable: true,     // 是否允许排序
        disabled: false,    // 是否禁用
        onChage: this.onChage,    // 下拉框选择变化时触发字段，比如需要在表单内部修改属性时可以用
        width: '100',             // 该项的单元格宽度
        options: [                // 下拉选项数据
          {
            value: '0',
            label: '男'
          },
          {
            value: '1',
            label: '女'
          }
        ]
      },
      {
        prop: 'areaCode',     // 展示areaCode字段数据
        type: 'tags',         // tags类型，展示的是一个数组类型的数据，值应该是value组成的数组
        label: '屏蔽地域',     // 表头展示的文字
        options: cityMaps
      },
      {
        prop: 'name',         // 展示name字段的数据
        type: 'edit',         // 可编辑的类型，这个形式可以直接在单元格修改字段
        label: 'edit',        // 表头展示的文字
        sortable: true,       // 是否允许排序
        width: '100',         // 表格列宽度
        onEdit: this.onEdit   // 编辑结束点击确定或回车触发的事件
      },
      {
        prop: 'id',               // 展示id字段的数据
        type: 'default',          // 默认展现形式，不设置type字段就是default形式
        label: 'default || ""',   // 表头展示的文字
        sortable: true,           // 是否允许排序
        width: '120'              // 单元格列宽度
      },
      {
        prop: 'name',         // 展示name字段的数据
        label: 'tooltip',     // 表头展示的文字
        width: '100',         // 单元格宽度
        type: 'tooltip',      // tooltip展示形式
        sortable: true,       // 是否允许排序
        style: 'cursor:pointer;color:blue;font-weight:bold;', // 自定义样式
        template: '<img src="http://api.app.letv.com/getqr?w=100&txt=ITEM_PROP"/>', // tooltip上的html内容，其中ITEM_PROP表示对应的属性值占位符
        onClick: this.onClick  // tooltip点击事件
      },
      {
        prop: 'status',     // 展示status字段的数据
        label: 'mapList',   // 表头展示的文字
        type: 'mapList',    // mapList的展现形式，某个value展示某个lable
        width: '100',       // 单元格宽度
        options: [          // value对应status的值，如果对应上就展示label的文字，style表示自定义样式
          {
            value: '1',
            label: '已购买',
            style: 'color:red;'
          },
          {
            value: '2',
            label: '未购买',
            style: 'color:brown;'
          }
        ]
      },
      {
        prop: '',
        label: 'buttons',     // 表头展示文案
        type: 'buttons',      // 按钮，通常表格都有操作按钮一列，用这个很方便
        fixed: 'right',       // 固定列
        width: '200',         // 列宽度
        options: [            // 按钮项还有style和icon的属性，可以看源码理解其作用
          {
            title: 'btn1',          // 按钮展示文案
            type: 'primary',        // 按钮类型
            onClick: this.onClick   // 按钮点击事件
          },
          {
            title: 'btn2',
            type: 'text',
            onClick: this.onClick
          },
          {
            title: 'btn3',
            type: 'danger',
            onClick: this.onClick
          }
        ]
      },
      {
        prop: '',
        label: 'val2btn',         // 表头展示文案
        type: 'val2btn',          // val2btn形式，不同的val展示不同的button，应用场景挺多
        width: '250', 
        options: [                // 还有个isNot字段，如果为true表示prop的值不在value数组里则展示
          {
            prop: 'status',       // val为statu
            value: ['1'],         // 如果status的值包含在value里边则展示
            title: '已买',         // 展示文案
            onClick: this.onClick // 点击事件
          },
          {
            prop: 'status',
            value: ['1'],
            title: '再次购买',
            type: 'primary',        // 按钮类型
            onClick: this.buyAgain  // 点击事件
          },
          {
            prop: 'status',
            value: ['1'],
            title: '评价',
            type: 'warn',
            onClick: this.discuss
          },
          {
            prop: 'status',
            value: ['2'],
            title: '未购买,点击购买',
            type: 'primary',
            onClick: this.onClick
          }
        ]
      },
      {
        prop: 'photo',        // 展示photo字段对应的值
        label: 'photo',       // 表头展示的文案
        type: 'photo',        // photo类型，也就是展示图片
        width: '200',         // 表格宽度
        photoWidth: 40,       // 图片展示宽度
        photoHeight: 40       // 图片展示高度
      },
      {
        prop: 'tags',         // 上边有描述↑
        label: 'tags',
        type: 'tags',
        width: '280',
        options: [
          {
            value: '1',
            label: 'web'
          },
          {
            value: '2',
            label: 'phone'
          },
          {
            value: '3',
            label: '超级手机'
          },
          {
            value: '4',
            label: 'pad'
          }
        ]
      },
      {
        prop: 'datetime',       // 展示datetime字段
        label: 'datetime',      // 表头展示文字
        type: 'datetime',       // 日期时间展示形式，后端为时间戳，我们格式化成年月日时分秒，这个的应用场景并不多，后续慢慢废弃掉，用customFilter可以满足需求
        width: '160'            // 单元格宽度
      },
      {
        prop: 'progress',             // 展示progress字段
        label: 'customFilter',        // 表头展示文字
        type: 'customFilter',         // 自定义过滤器
        width: '110',                 // 单元格宽度
        filter: function(val, row) {  // 写自己定义的html标签，这个类型能满足非常多的定制化场景
          return `<h3 style="text-align: center;">${val}%</h3>`
        }
      },
      {
        prop: 'progress',       // 展示progress字段
        label: 'progress',      // 表头展示的文字
        type: 'progress',       // 显示成进度条，场景基本没有，后期废弃掉
        width: '150'            // 单元格宽度
      }
    ]
}
```


