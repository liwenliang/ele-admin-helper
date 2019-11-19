<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-cascader
    v-model="form.props[prop]"
    :style="config.style || 'width:100%'"
    :options="config.options"
    :show-all-levels="config.showAllLevels"
    :props="config.props"
    :filterable="true"
    :placeholder="config.placeholder"
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'YxCascadeselect',
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    prop: {
      type: String,
      default: ''
    }
  },
  methods: {
    onChange(env) {
      this.config.onChange && this.config.onChange.call(null, env)
    }
  }
}
</script>
