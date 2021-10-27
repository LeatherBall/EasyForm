<template>
  <el-form ref="form" :model="modelForm" :size="size" :label-width="labelWidth" :label-position="labelPosition">
    <template v-for="(item, index) in formPrivate" :key="index">
      <el-form-item
        :prop="item.prop"
        :label="item.label"
        :rules="rulesGenerate(item)"
        v-show="item.display"
      >
        <!--输入框-->
        <el-input
          v-if="item.type === 'input'"
          v-model="item.value"
          :disabled="disabled || item.disabled"
          :placeholder="placeholderGenerate(item)"
          :maxlength="item.maxlength || 64"
          @input="formItemChange(item)"
        ></el-input>

        <!--文本域输入框-->
        <el-input
          v-else-if="item.type === 'textarea'"
          v-model="item.value"
          :disabled="disabled || item.disabled"
          :placeholder="placeholderGenerate(item)"
          :maxlength="item.maxlength || 100"
          :rows="3"
          @input="formItemChange(item)"
        ></el-input>

        <!--下拉选-->
        <el-select
          v-else-if="item.type === 'select'"
          v-model="item.value"
          :disabled="disabled || item.disabled"
          :placeholder="placeholderGenerate(item)"
          :value-key="item.valueKey || 'value'"
          :multiple="!!item.multiple"
          :multiple-limit="item.multipleLimit || 0"
          :clearable="!!item.clearable"
          @change="formItemChange(item)"
          class="select-wrap"
        >
          <el-option
            :label="option.label"
            :value="option.value"
            v-for="(option, index2) in item.options"
            :key="index2"
          ></el-option>
        </el-select>

        <!--日期选择或日期时间选择-->
        <el-date-picker
          v-else-if="item.type === 'date' || item.type === 'datetime'"
          type="date"
          v-model="item.value"
          :disabled="disabled || item.disabled"
          :placeholder="placeholderGenerate(item)"
          @change="formItemChange(item)"
        ></el-date-picker>

        <!--日期区间选择-->
        <el-date-picker
          v-else-if="item.type === 'daterange'"
          type="daterange"
          v-model="item.value"
          :disabled="disabled || item.disabled"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="formItemChange(item)"
        >
        </el-date-picker>

        <!--时间选择-->
        <el-time-picker
          v-else-if="item.type === 'time'"
          v-model="item.value"
          :disabled="disabled || item.disabled"
          :placeholder="placeholderGenerate(item)"
          @change="formItemChange(item)"
        >
        </el-time-picker>

        <!--开关-->
        <el-switch
          v-else-if="item.type === 'switch'"
          v-model="item.value"
          :disabled="disabled || item.disabled"
          @change="formItemChange(item)"
        ></el-switch>

        <!--多选-->
        <el-checkbox-group
          v-else-if="item.type === 'checkbox'"
          v-model="item.value"
          :disabled="disabled || item.disabled"
          @change="formItemChange(item)"
        >
          <el-checkbox
            :label="option.label"
            :name="item.prop"
            v-for="(option, index2) in item.options"
            :key="index2"
          ></el-checkbox>
        </el-checkbox-group>

        <!--单选-->
        <el-radio-group
          v-else-if="item.type === 'radio'"
          v-model="item.value"
          :disabled="disabled || item.disabled"
          @change="formItemChange(item)"
        >
          <el-radio
            :label="option.value"
            :name="item.prop"
            v-for="(option, index2) in item.options"
            :key="index2"
          >{{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </template>

    <!--提交、取消等表单配套按钮-->
    <el-form-item v-if="showButton">
      <el-button @click="onCancel" v-if="button.cancel">{{ button.cancel }}</el-button>
      <el-button type="primary" @click="onSubmit" v-if="button.confirm">{{ button.confirm }}</el-button>
    </el-form-item>

    <slot></slot>
  </el-form>
</template>

<script>
  /**
   * @description 基于element-plus封装的form表单项组件
   * 参考地址：https://element-plus.gitee.io/#/zh-CN/component/form
   */
  import { defineComponent } from 'vue';
  import Reg from './utils/Reg';

  export default defineComponent({
    name: "EasyForm",
    props: {
      // form表单列表，配置参数同 element-plus
      form: {
        type: Array,
        default: () => [],
        required: true
      },
      // 表单是否禁用 若设置为 true，则表单内组件上的 disabled 属性不再生效
      disabled: {
        type: Boolean,
        default: false
      },
      // 用于控制该表单内组件的尺寸 medium / small / mini
      size: {
        type: String,
        default: 'medium'
      },
      // 表单域标签的位置， 如果值为 left 或者 right 时，则需要设置 label-width
      labelPosition: {
        type: String,
        default: 'right'
      },
      // 表单域标签的宽度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 支持auto
      labelWidth: {
        type: [String, Number],
        default: '80px'
      },
      // 表单配套按钮
      button: {
        type: Object,
        default: () => {
          return {
            confirm: '确定',
            cancel: '取消'
          }
        }
      },
      // 使用表单配套按钮
      showButton: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 组件内部维护的表单对象
        formPrivate: [],
        // 表单model
        modelForm: {}
      }
    },
    created() {
      this.init();
    },
    methods: {
      updateFormModel(prop, value) {
        this.modelForm[prop] = value;
      },
      /**
       * EasyForm表单组件初始化
       */
      init() {
        // 构建组件内部私有的form对象
        this.formPrivate = this.form.map(item => {
          return this.buildAuxiliaryParameters(item);
        });
        // 表单的model
        this.formPrivate.forEach(item => {
          this.modelForm[item.prop] = item.value;
        });
      },
      /**
       * 生成placeholder
       * 你可以传入placeholder来指定想要显示的提示文字，也可以不传，组件会根据不同的字段类型生成对应的提示文字
       * @param data
       */
      placeholderGenerate(data) {
        if (this.disabled) {
          return '';
        }
        if (data.placeholder) {
          return data.placeholder;
        }
        if (data.type === 'input' || data.type === 'textarea') {
          return `请输入${data.label}`;
        }

        if (data.type === 'select' || data.type === 'date' || data.type === 'datetime' || data.type === 'time') {
          return `请选择${data.label}`;
        }
        return '';
      },
      /**
       * 生成表单项验证规则
       * 可以直接传入rules数组
       * validator[object|boolean] 规则验证器
       * 1.如果只是简单的必填项，可以配置validator: { required: true }，或者使用更简单的方式validator: true
       * 2.其他可配置的还有min、max、pattern、trigger、message
       *  trigger 规则触发器，非必传（默认['blur', 'change']）
       *  message 错误提示信息，非必传（建议使用pattern时传入massage）
       * @param data
       * @returns {[]}
       */
      rulesGenerate(data) {
        if (data.rules) {
          return data.rules;
        }
        if (!data.validator) {
          return [];
        }
        if (typeof data.validator === 'boolean') {
          return [{required: true, message: `${data.label}不能为空`, trigger: ['blur', 'change']}];
        }
        const rules = [];
        let message;
        const trigger = this.bestFitValue(data.validator.trigger, ['blur', 'change']);
        if (data.validator.required) {
          message = this.bestFitValue(data.validator.message, `${data.label}不能为空`);
          rules.push({required: true, message, trigger});
        }
        if (data.validator.min) {
          message = this.bestFitValue(data.validator.message, `输入不能少于${data.validator.min}个字符`);
          rules.push({min: data.validator.min, message, trigger});
        }
        if (data.validator.max) {
          message = this.bestFitValue(data.validator.message, `输入不能超过${data.validator.max}个字符`);
          rules.push({max: data.validator.max, message, trigger});
        }
        if (data.validator.pattern) {
          const {validator} = this.generateRulesValidator(data.validator);
          rules.push({validator, trigger});
        }
        return rules;
      },
      /**
       * 生产表单验证器
       * @param validator 表单项中的validator
       */
      generateRulesValidator(validator) {
        let {pattern, message} = validator;
        let reg;
        if (Object.prototype.hasOwnProperty.call(Reg, pattern)) {
          reg = new RegExp(Reg[pattern].pattern);
          message = Reg[pattern].message;
        } else {
          message = this.bestFitValue(message, `内容不符合规则`);
          reg = new RegExp(pattern);
        }
        return {
          validator: (rule, value, callback) => {
            if (!reg.test(value)) {
              callback(new Error(message));
            } else {
              callback();
            }
          }
        }
      },
      /**
       * 获取一个项的最优值
       * @param value 值
       * @param def 默认值
       */
      bestFitValue(value, def) {
        return value ? value : def;
      },
      /**
       * Event事件 @change
       * 表单项值变化事件
       * @param data
       */
      formItemChange(data) {
        this.$emit('change', data.prop, data.value);
        this.updateFormModel(data.prop,  data.value);
      },
      /**
       * Event事件 @submit
       * 提交表单事件
       */
      onSubmit() {
        this.$refs.form.validate(bol => {
          if (bol)
            this.$emit('submit');
        });
      },
      /**
       * Event事件 @cancel
       * 取消表单事件
       */
      onCancel() {
        this.$emit('cancel');
      },
      /**
       * 触发表单验证
       * elementUI form组件的原生validate方法
       */
      validate() {
        return this.$refs.form.validate();
      },
      /**
       * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
       * elementUI form组件的原生resetFields方法
       */
      resetFields() {
        return this.$refs.form.resetFields();
      },
      /**
       * 清理指定字段的表单验证信息。 参数是一个或多个需要清除验证信息的表单属性名。
       * 如果省略了参数，将清除所有字段的验证信息。
       * elementUI form组件的原生clearValidate方法
       * @param props{string|array}
       */
      clearValidate(props) {
        return this.$refs.form.clearValidate(props);
      },
      /**
       * 定位指定表单项索引值
       * @param prop{string}
       */
      getTargetIndex(prop) {
        let index = -1;
        for (let i = this.formPrivate.length - 1; i >= 0; i--) {
          if (this.formPrivate[i].prop === prop) {
            index = i;
            break;
          }
        }
        return index;
      },
      /**
       * 批量表单项赋值
       * @param values{array} 参数是一个数组
       * @return {boolean}
       */
      setValuesWithArray(values) {
        if (!Array.isArray(values)) {
          console.warn('[EasyForm]: setValuesWithArray方法参数错误，请传入数组类型参数');
          return false;
        }
        for (let i = 0; i < this.formPrivate.length; i++) {
          for (let j = 0; j < values.length; j++) {
            if (values[j].prop === this.formPrivate[i].prop) {
              this.formPrivate[i].value = values[j].value;
              break;
            }
          }
        }
        return true;
      },
      /**
       * 批量表单项赋值
       * @param object{object} 参数是一个对象
       * @return {boolean}
       */
      setValuesWithObject(object) {
        if (typeof object !== 'object') {
          console.warn('[EasyForm]: setValuesWithObject方法参数错误，请传入对象类型参数');
          return false;
        }
        for (let i = 0; i < this.formPrivate.length; i++) {
          const key = this.formPrivate[i].prop;
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            this.formPrivate[i].value = object[key];
          }
        }
        return true;
      },
      /**
       * 单个表单项取值或赋值
       * @param prop{string} 表单项
       * @param value{string|number} 值（不传入该参数为取值操作）
       * @return {string}
       */
      value(prop, value) {
        const index = this.getTargetIndex(prop);
        if (value === undefined) {
          // 获取值
          return this.formPrivate[index].value;
        }
        // 赋值
        if (index !== -1) {
          this.formPrivate[index].value = value;
        }
        return value;
      },
      /**
       * 设置单个表单项的是否禁用
       * @param prop{string} 表单项
       * @param bol{boolean} true禁用|false启用
       */
      setDisableItem(prop, bol) {
        const index = this.getTargetIndex(prop);
        if (index !== -1) {
          this.formPrivate[index].disabled = bol;
        }
      },
      /**
       * 同时设置多个表单项的是否禁用
       * @param object{object} 表单项（对象的形式）
       */
      setDisableItems(object) {
        for (const prop in object) {
          if (Object.prototype.hasOwnProperty.call(object, prop)) {
            this.setDisableItem(prop, object[prop]);
          }
        }
      },
      /**
       * 设置单个表单项的显示隐藏
       * Tips: 这个方法只会控制表单项在视觉上的显示或隐藏，并不会改变该项的实际值。换句话说，即使该项设置了隐藏，在提交表单时，
       *       该项的值仍然会被提交。如果你想完全的移除这个表单项请使用deleteItem方法
       * @param prop{string} 表单项
       * @param bol{boolean} true显示|false隐藏
       * @param clear 该值为true会在隐藏表单项的同时清空该项的值
       */
      setDisplayItem(prop, bol, clear) {
        const index = this.getTargetIndex(prop);
        if (index !== -1) {
          this.formPrivate[index].display = bol;
          if (!bol && clear) {
            this.formPrivate[index].value = '';
          }
        }
      },
      /**
       * 同时设置多个表单项的显示隐藏
       * @param object{object} 表单项（对象的形式）
       * @param clear 该值为true会在隐藏表单项的同时清空对应项的值
       */
      setDisplayItems(object, clear) {
        for (const prop in object) {
          if (Object.prototype.hasOwnProperty.call(object, prop)) {
            this.setDisplayItem(prop, object[prop], clear);
          }
        }
      },
      /**
       * 设置单个表单项的失效或生效
       * TIps: 这个方法不仅会控制表单项的显示或隐藏，也会清空改表单项的值，并且如果设置了弃用，那么在提交的时候就不会再提交该项的值。
       *       如果你只是项控制表单项的显示隐藏而不想影响该项的实际值，请使用setDisplayItem方法
       * @param prop{string}
       * @param bol{boolean}
       */
      setInvalidItem(prop, bol) {
        const index = this.getTargetIndex(prop);
        if (index !== -1) {
          this.formPrivate[index].invalid = bol;
          this.formPrivate[index].value = '';
        }
      },
      /**
       * 向表单中添加表单项
       * @param item{object} 表单项
       */
      pushItem(item) {
        item = this.buildAuxiliaryParameters(item);
        this.formPrivate.push(item);
      },
      /**
       * 向表单中添加多个表单项
       * @param items{array} 表单项数组
       */
      pushItems(items) {
        for (let i = items.length - 1; i >=0; i--) {
          this.pushItem(items[i]);
        }
      },
      /**
       * 移除某个表单项
       * @param prop{string} 表单项
       */
      deleteItem(prop) {
        const index = this.getTargetIndex(prop);
        if (index !== -1) {
          this.clearValidate(prop);
          this.formPrivate.splice(index, 1);
          delete this.modelForm[prop];
        }
      },
      /**
       * 批量移除多个表单项
       * @param props{array} 表单项数组
       */
      deleteItems(props) {
        for (let i = props.length - 1; i >= 0; i--) {
          this.deleteItem(props[i]);
        }
      },
      /**
       * 设置单个表单项(checkbox, radio, select)的选项列表，如果你想让某个值默认选中，那么请为这个值设置default:true
       * Tips: 如果选项列表中设置了多个default:true， 则使用最后一个
       * @param prop{string} 表单项
       * @param options{array} 选项列表
       */
      setOptionsItem(prop, options) {
        if (!Array.isArray(options)) {
          console.warn('[EasyForm]: setOptionsItem方法参数错误，options请传入数组类型参数');
          return false;
        }
        const index = this.getTargetIndex(prop);
        if (index !== -1) {
          this.formPrivate[index].options = [];
          options.forEach(item => {
            this.formPrivate[index].options.push(item);
            if (item.default) {
              this.formPrivate[index].value = item.value;
            }
          });
        }
        return true;
      },
      /**
       * 构建表单项的辅助参数
       */
      buildAuxiliaryParameters(item) {
        // 控制单个表单项的是否禁用
        if (!Object.prototype.hasOwnProperty.call(item, 'disabled')) {
          item.disabled = false;
        }
        // 控制单个表单项的显示隐藏
        if (!Object.prototype.hasOwnProperty.call(item, 'display')) {
          item.display = true;
        }
        // 控制单个表单项的生效或失效
        if (!Object.prototype.hasOwnProperty.call(item, 'invalid')) {
          item.invalid = true;
        }
        return item;
      },
      /**
       * 获取表单结果值
       * @return {object}
       */
      getValues() {
        const value = {};
        this.formPrivate.forEach(item => {
          if (!item.invalid) {
            value[item.prop] = item.value;
          }
        });
        return value;
      }
    }
  })
</script>

<style scoped>
  .select-wrap {
    display: block;
  }

  .el-date-editor.el-input {
    display: block;
    width: auto;
  }
</style>