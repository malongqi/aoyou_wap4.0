<template>
  <div>
    <div class="center">
      <img src="http://pic1.aoyou.com/index/cytsaoyou.png" style="width:160px;">
      <p class="ay-notice">v{{version}}</p>
    </div>
    <group>
      <cell title="示例" link="/demo.html/demo" value="演示">
        <span class="demo-icon" slot="icon" style="color:#35495e">&#xe633;</span>
      </cell>
    </group>
    <group>
      <cell title="更新日志" link="/demo.htmlproject/donate">
        <span class="demo-icon" slot="icon" style="color:#35495e;">&#xe630;</span>
        <div class="badge-value" slot="value" class="ay-center-v">
          <badge text="鸣谢"></badge>
        </div>
      </cell>
      <cell title="遨游网" link="http://m.aoyou.com" value="aoyou.com">
        <span class="demo-icon" slot="icon" style="color:#35495e;">&#xe62f;</span>
      </cell>
    </group>
  </div>
</template>

<script>
import { Cell, Group, Badge } from '../../components'
const version = require('../../../package.json').version
export default {
  components: {
    Cell,
    Group,
    Badge
  },
  data () {
    return {
      version: version
    }
  }
}
</script>

<style>
@import 'style.css';
.center {
  margin-top: 20px;
  text-align: center;
}
.ay-notice {
  color: #666;
  line-height: 40px;
  font-size: 0.8rem;
}
body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
}
</style>
