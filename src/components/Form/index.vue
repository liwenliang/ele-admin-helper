<template>
  <el-form
    ref="leform"
    :model="form.props"
    :inline="form.inline"
    :size="form.size"
    :label-position="form.labelPosition"
    :label-width="form.labelWidth"
    :class="getGridClass(form.gridNum)"
    @submit.native.prevent
  >
    <template>
      <!-- 默认情况就是输入框 -->
      <el-form-item
        v-for="item in formList"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :rules="getRules(item.rules)"
        :style="form.style"
      >
        <component :is="item.type" :form="form" :prop="item.prop" :config="item.config" :value="form.props[item.prop]" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import components from './index.js'
const isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export default {
  name: 'Yxform',
  components: components,
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    emitValidate: {
      type: Boolean,
      default: false
    },
    emitReset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      required: { required: true, message: '此处为必填值' },
      email: { type: 'email', message: '请输入正确的邮箱地址' },
      phone: {
        validator: function(rule, value, callback) {
          const regex = /^1\d{10}$/g
          if (regex.test(value) || value === '' || value === null) {
            callback()
          } else {
            callback(new Error('请正确填写手机号'))
          }
        }
      },
      password: {
        validator: function(rule, value, callback) {
          const regex = /^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/
          if (regex.test(value) || value === '' || value === null) {
            callback()
          } else {
            callback(new Error('密码必须包含字母和数字，且为8-20个字符!'))
          }
        }
      },
      number: {
        validator: function(rule, value, callback) {
          if (isNumeric(value) || value === '' || value === null) {
            callback()
          } else {
            callback(new Error('该项须填写数字类型值'))
          }
        }
      },
      int: {
        validator: function(rule, value, callback) {
          if (parseInt(value, 10) === value || value === '' || value === undefined) {
            callback()
          } else {
            callback(new Error('请输入整数类型值'))
          }
        }
      },
      url: { type: 'url', message: '请输入正确网址类型值' }
    }
  },
  computed: {
    formList() {
      return this.form.attributes.filter(item => {
        return !item.isHide
      })
    }
  },
  watch: {
    // 监听到该属性的变化则进行表单验证
    emitValidate() {
      this.$refs['leform'].validate((valid) => {
        if (valid) {
          this.form.validateSuccess()
        } else {
          this.form.validateFaild()
        }
      })
    },
    // 监听到该属性的变化则进行表单重置
    emitReset() {
      this.$refs['leform'].resetFields()
    }
  },
  methods: {
    getRules(ruleArr) {
      if (!ruleArr) {
        return []
      }
      var rules = []
      for (var i = 0; i < ruleArr.length; i++) {
        var item = ruleArr[i]
        if (typeof item === 'string' && this[item]) {
          rules.push(this[item])
        } else if (typeof item === 'object') {
          rules.push(item)
        }
      }
      return rules
    },

    /**
     * 有时候一列的效果太差，需要有多列的表单形式，可以使用gridNum参数进行设置
     * @param gridNum
     * @returns {*|string}
     */
    getGridClass(gridNum) {
      let classMap = {
        2: 'ele-admin-helper-grid ele-admin-helper-grid-two',
        3: 'ele-admin-helper-grid ele-admin-helper-grid-three',
        4: 'ele-admin-helper-grid ele-admin-helper-grid-four'
      }
      return classMap[gridNum] || ''
    }
  }
}
</script>

<style type="text/css" scoped>
  .ele-admin-helper-grid {
    display: grid;
    grid-column-gap: 10px;
  }

  .ele-admin-helper-grid-two {
    grid-template-columns: repeat(2, 1fr);
  }

  .ele-admin-helper-grid-three {
    grid-template-columns: repeat(3, 1fr);
  }

  .ele-admin-helper-grid-four {
    grid-template-columns: repeat(4, 1fr);
  }
</style>
