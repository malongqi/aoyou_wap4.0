<template>
  <div class="ay-alert">
    <dialog
    class="ay_dialog_alert"
    :show="show"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
      <div class="ay_dialog_hd"><strong class="ay_dialog_title">{{title}}</strong></div>
      <div class="ay_dialog_bd"><slot></slot></div>
      <div class="ay_dialog_ft">
        <a href="javascript:;" class="ay_btn_dialog primary" @click="onHide">{{buttonText}}</a>
      </div>
    </dialog>
  </div>
</template>

<script>
import Dialog from '../dialog'

export default {
  components: {
    Dialog
  },
  props: {
    show: Boolean,
    title: String,
    buttonText: {
      type: String,
      default: 'OK'
    },
    maskTransition: {
      type: String,
      default: 'ay-fade'
    },
    dialogTransition: {
      type: String,
      default: 'ay-dialog'
    }
  },
  methods: {
    onHide () {
      this.show = false
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/ayui/widget/ayui_tips/ayui_mask';
@import '../../styles/ayui/widget/ayui_tips/ayui_dialog';
</style>
