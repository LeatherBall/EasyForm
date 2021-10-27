# EasyForm `v1.0.0`
- 基于elementUI Form组件开发的表单组件，它会省去绝大多数的表单操作和冗长的各种烦人配置。

## 使用方法
### 引入组件
````js
  import EasyForm from "@/components/easy/form/EasyForm";
````
### 模板
```html
<easy-form :form="form" @change="formChange" @cancel="handleCancel" @submit="handleConfirm" ref="form"></easy-form>
```

### 参数配置
#### EasyForm 组件参数
| Attribute  | Description  | Type | Accepted Values | Default |
| :------------: |:---------------:| :-----:| :-------------:| :-----:|
| form | form表单列表(详细请看form参数说明) | `array` | - | - |
| disabled | 表单是否禁用 若设置为 true，则表单内组件上的 disabled 属性不再生效 | `boolean` | true / false | false |
| size | 用于控制该表单内组件的尺寸 | `string` | medium / small / mini | medium |
| label-position | 表单域标签的位置， 如果值为 left 或者 right 时，则需要设置 label-width | `string` | left / right / top | right |
| label-width | 表单域标签的宽度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 支持 auto。 | `string` / `number` | - | 80px |
| button | 表单配套按钮，其中confirm项触发表单提交、cancel触发表单取消 | `object` | - | { confirm: '确定', cancel: '取消' } |
| show-button | 是否使用使用表单配套按钮 | `boolean` | true / false | false |


#### form参数说明
> form参数接收一个数组类型值，数组中的每一项代表一个表单项，表单项具体配置如下：

| Attribute  | Description  | Type | Accepted Values | Default |
| :------------: |:---------------:|-----| :-------------:| :-----:|
| prop | 表单项的字段名 | `string` | - | - |
| label | 表单项的标题说明 | `string` | - | - |
| type | 表单项类型 | `string` | input / textarea / radio / checkbox / select / date / datetime / daterange / time / switch  | - |
| validator | 表单项验证器(详情用法请看表单项验证器validator说明) | `boolean`/`object` | - | - |
| value | 表单项的默认值 | `string`/`number` | - | - |

#### 表单项验证器validator说明
>validator参数接收2种类型的参数，布尔值或对象

- 布尔类型：`validator: true`  表示该字段为必填项。
````js
// 简洁的配置方式，表示改字段为必填项
validator: true
````
- 对象类型：`validator: {}`
````js
  validator: { 
  // 必填项
  required: true,
  // 正则校验（组件预置了多个常用的正则，使用时只需要传入固定参数即可）
  pattern: 'noChar',
  // 正则校验 （还可以使用正规的正则表达式）
  pattern: '^[A-Za-z]+$',
  // 校验警告提示（当然，你也可以省略这个参数，组件会根据不同的类型自动生成对应的文案）
  message: '输入不能超过64个字符'，
  // 输入不能少于5个字符
  min: 5,
  // 输入不能多于50个字符
  max: 50,
  // 字段校验触发时机（不传默认为['blur', 'change']）
  trigger: 'blur',
  // 表单项校验规则（写法同ELementUI）
  rules: []
  }
````

组件内置的常用类型校验

`car`:  请输入正确的车牌号

`ch`: 只能输入中文

`email`: 请输入正确的邮箱地址

`en`: 只能输入英文

`enAndNumber`: 只能输入英文和数字

`enCaps`: 只能输入大写英文字母

`enLower`: 只能输入小写英文字母

`idCard`: 请输入正确的身份证号

`integer`: 只能输入整数

`ipv4`: 请输入正确的IP-v4地址

`ipv6`: 请输入正确的IP-v6地址

`negativeInteger`: 只能输入负整数

`noChar`: 只能输入中文、大小写字母或数字

`number`: 只能输入数字

`passwordStrength`: 密码长度最少6位，且必须包括大小写字母、数字和字符

`phone`: 请输入正确的手机号

`positiveInteger`: 只能输入正整数

`url`: 请输入有效的URL地址

`w`: 只能输入数字、英文字母或下划线



### EasyForm 组件方法

#### validate()
 表单验证(elementUI form组件的原生validate方法)


#### resetFields()
 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果


#### clearValidate(string|array)
 清理指定字段的表单验证信息。 参数是一个或多个需要清除验证信息的表单属性名。如果省略了参数，将清除所有字段的验证信息。


#### setValuesWithArray(array) 批量表单项赋值
##### array参数说明
 | 参数名  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | prop  | string  | 是  | 表单项字段名  |
 | value  | string / number  | 是  | 表单项值  |


#### setValuesWithArray(object) 批量表单项赋值
##### object参数说明
 | 参数名  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | prop  | string  | 是  | 表单项字段名  |
 | value  | string / number  | 是  | 表单项值  |


#### value(string, string|number) 单个表单项取值或赋值
##### 参数说明
 | 参数  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | 参数1  | string  | 是  | 表单项字段名  |
 | 参数2  | string / number  | 否  | 传入时为赋值，不传入为取值操作  |


 #### setDisableItem(string, boolean) 设置单个表单项的是否禁用
 ##### 参数说明
 | 参数  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | 参数1  | string  | 是  | 表单项字段名  |
 | 参数2  | boolean  | 是  | true禁用，false启用  |


 #### setDisableItems(object) 同时设置多个表单项的是否禁用
 ##### object参数说明
 | 参数名  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | prop  | string  | 是  | 表单项字段名  |
 | bol  | boolean  | 是  | true禁用，false启用  |


 #### setDisplayItem(string, boolean, boolean) 设置单个表单项的显示隐藏
  tips: 这个方法只会控制表单项在视觉上的显示或隐藏，并不会改变该项的实际值。换句话说，即使该项设置了隐藏，在提交表单时，
       该项的值仍然会被提交。如果你想完全的移除这个表单项请使用deleteItem方法
 ##### 参数说明
 | 参数  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | 参数1  | string  | 是  | 表单项字段名  |
 | 参数2  | boolean  | 是  | true显示，false隐藏  |
 | 参数3  | boolean  | 否  | 该值为true会在隐藏表单项的同时清空该项的值  |


 #### setDisplayItems(object, boolean) 同时设置多个表单项的显示隐藏
 ##### 参数说明
 | 参数  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | 参数1  | object  | 是  | json对象(表单项: 是否隐藏)  |
 | 参数2  | boolean  | 否  | 该值为true会在隐藏表单项的同时清空该项的值  |


 #### pushItem(object) 向表单中添加表单项
 ##### 参数说明
 可以参考 [form参数说明]


 #### pushItems(array) 向表单中添加多个表单项
 ##### 参数说明
 可以参考 [form参数说明]


 #### deleteItem(string) 移除某个表单项
 ##### 参数说明
 | 参数  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | 参数1  | string  | 是  | 表单项字段名  |


 #### deleteItems(array) 批量移除多个表单项
 ##### 参数说明
 | 参数  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | 参数1  | array  | 是  | 表单项字段名  |


 #### setOptionsItem(string, array) 设置单个表单项(checkbox, radio, select)的选项列表
  tips: 如果你想让某个值默认选中，那么请为这个值设置default:true（如果选项列表中设置了多个default:true， 则使用最后一个）
 ##### 参数说明
 | 参数  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | 参数1  | string  | 是  | 表单项字段名  |
 | 参数2  | array  | 是  | 选项列表  |
 ##### 选项列表array说明
 | 参数名  | 类型  | 必填  | 说明  |
 | :-----: | :-----: | :-----: | :-----: |
 | label  | string  | 是  | 显示在页面上的选项值  |
 | value  | string  | 是  | 用于提交的选项值  |
 | default  | boolean  | 否  | 控制选项默认选中  |


 #### getValues() 获取表单结果值
