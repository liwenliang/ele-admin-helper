<template>
  <div>
    <h1>表单示例</h1>
    <yxform
            ref="demoForm"
            :emit-validate="form.emitValidate"
            :emit-reset="form.emitReset"
            :form="form"
    />
    <pre class="codeList">
        {{ JSON.stringify(form.props, true, '    ') }}
    </pre>
    <h1>表格示例</h1>
    <yxtable ref="demoTable" :table="table" />
  </div>
</template>

<script>
  import { cities, cityMaps } from './utils/cities.js'
  import yxform from './components/Form/index.vue'
  import yxtable from './components/Table/index.vue'
  const defaultTime = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
  export default {
    components: {
      yxform,
      yxtable
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        table: {
          data: [
            {
              id: '000001',
              status: '1',
              name: '张三',
              sex: '0',
              bought: '1',
              photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
              datetime: 1487695862000,
              tags: ['1', '2', '3', '4'],
              areaCode: [130100, 130400],
              progress: 50
            },
            {
              id: '000002',
              status: '2',
              name: '李四',
              sex: '1',
              bought: '0',
              photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
              datetime: 1487692862000,
              tags: ['1', '2', '3', '4'],
              areaCode: [130100, 130400],
              progress: 40
            },
            {
              id: '000003',
              status: '1',
              name: '王五',
              sex: '0',
              bought: '1',
              photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
              datetime: 1487693862000,
              tags: ['1', '2', '3', '4'],
              areaCode: [140100, 140300, 140400],
              progress: 30
            },
            {
              id: '000004',
              status: '1',
              name: '赵六',
              sex: '0',
              bought: '0',
              photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
              datetime: 1487694862000,
              tags: ['1', '2', '3', '4'],
              areaCode: [130100, 130400],
              progress: 90
            }
          ],
          sortChange: function() {},
          select: {
            isSelectable: true,
            selectChange: this.onSelectChange,
            selectable: function(row, index) {
              if (row.sex === '0') {
                return false
              } else {
                return true
              }
            }
          },
          attributes: [
            {
              prop: '',
              type: 'index',
              label: 'index',
              fixed: 'left',
              width: '100'
            },
            {
              prop: 'sex',
              type: 'select',
              label: 'select',
              sortable: true,
              disabled: false,
              onChage: this.onChage,
              width: '100',
              options: [
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
              prop: 'areaCode',
              type: 'tags',
              label: '屏蔽地域',
              options: cityMaps
            },
            {
              prop: 'name',
              type: 'edit',
              label: 'edit',
              sortable: true,
              width: '100',
              onEdit: this.onEdit
            },
            {
              prop: 'id',
              type: 'default',
              label: 'default || ""',
              sortable: true,
              width: '120'
            },
            {
              prop: 'name',
              label: 'tooltip',
              width: '100',
              type: 'tooltip',
              sortable: true,
              style: 'cursor:pointer;color:blue;font-weight:bold;',
              template: '<img src="http://api.app.letv.com/getqr?w=100&txt=ITEM_PROP"/>',
              onClick: this.onClick
            },
            {
              prop: 'status',
              label: 'mapList',
              type: 'mapList',
              width: '100',
              options: [
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
              label: 'buttons',
              type: 'buttons',
              fixed: 'right',
              width: '200',
              options: [
                {
                  title: 'btn1',
                  type: 'primary',
                  onClick: this.onClick
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
              label: 'val2btn',
              type: 'val2btn',
              width: '250',
              options: [
                {
                  prop: 'status',
                  value: ['1'],
                  title: '已买',
                  onClick: this.onClick
                },
                {
                  prop: 'status',
                  value: ['1'],
                  title: '再次购买',
                  type: 'primary',
                  onClick: this.buyAgain
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
              prop: 'photo',
              label: 'photo',
              type: 'photo',
              width: '200',
              photoWidth: 40,
              photoHeight: 40
            },
            {
              prop: 'tags',
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
              prop: 'datetime',
              label: 'datetime',
              type: 'datetime',
              width: '160'
            },
            {
              prop: 'progress',
              label: 'customFilter',
              type: 'customFilter',
              width: '110',
              filter: function(val, row) {
                return `<h3 style="text-align: center;">${val}%</h3>`
              }
            },
            {
              prop: 'progress',
              label: 'progress',
              type: 'progress',
              width: '150'
            }
          ]
        },
        form: {
          emitValidate: false,
          emitReset: false,
          validateSuccess: this.validateSuccess,
          validateFaild: this.validateFaild,
          inline: false,
          // style: 'width: 500px',
          labelWidth: '120px',
          labelPosition: 'right',
          props: {
            name: '一下科技',
            sex: '1',
            age: 7,
            birthday: '',
            hobby: ['2', '3'],
            likeColor: '#000000',
            city: 'Beijing',
            dateRange: [],
            timeRange: ['00:00', '23:59'],
            timePeriod: defaultTime
          },
          attributes: [
            {
              type: 'yxDatePicker',
              prop: 'dateRange',
              label: '日期范围',
              config: {
                type: 'daterange',
                format: 'yyyy 年 MM 月 dd 日',
                valueFormat: 'yyyy-MM-dd',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期'
              }
            },
            {
              type: 'yxTimePicker',
              prop: 'timeRange',
              label: '时间范围',
              config: {
                isRange: true,
                format: 'HH:mm',
                valueFormat: 'HH:mm',
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间'
              }
            },
            {
              type: 'yxInput',
              prop: 'name',
              label: '姓名',
              rules: ['required'],
              config: {
                type: 'text',
                placeholder: '请输入姓名',
                disabled: false
              }
            },
            {
              type: 'yxWeekTimeSelect',
              prop: 'timePeriod',
              label: '屏蔽时间段'
            },
            {
              type: 'yxTree',
              prop: 'areaCode',
              label: '屏蔽地域',
              config: {
                options: cities
              }
            },
            {
              type: 'yxSelect',
              prop: 'sex',
              label: '性别',
              rules: ['required'],
              config: {
                disabled: false,
                options: [
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
              type: 'yxInputNumber',
              prop: 'age',
              label: '年龄',
              rules: ['required', 'int'],
              config: {
                type: 'input',
                min: 0,
                max: 10,
                disabled: false
              }
            },
            {
              type: 'yxDatePicker',
              prop: 'birthday',
              label: '生日',
              rules: ['required'],
              config: {
                type: 'date',
                format: 'yyyy 年 MM 月 dd 日',
                valueFormat: 'timestamp',
                placeholder: '请输入生日',
                disabled: false
              }
            },
            {
              type: 'yxColorPicker',
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
              type: 'yxGroupSelect',
              prop: 'city',
              label: '城市',
              rules: ['required'],
              config: {
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
              type: 'yxCheckboxGroup',
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
      }
    },
    methods: {
      onsubmit() {
        this.form.emitValidate = !this.form.emitValidate
      },
      onreset() {
        this.form.emitReset = !this.form.emitReset
      },
      validateSuccess() {
        console.log('----------------')
        console.log('validateSuccess')
        console.log('----------------')
      },
      validateFaild() {
        console.log('----------------')
        console.log('validateFaild')
        console.log('----------------')
      },
      handleCheckChange() {
        console.log('----------------')
        console.log(this.$refs.tree.getCheckedKeys(true))
        console.log('----------------')
      }
    }
  }
</script>

