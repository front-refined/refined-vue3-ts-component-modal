<template>
  <Teleport to="body"
            :disabled="!isTeleport">
    <div v-if="modelValue"
         class="modal">
      <div class="mask"
           :style="style"
           @click="maskClose&&!loading&&handleCancel()"></div>
      <div class="modal__main">
        <div class="modal__title line line--b">
          <span>{{title||t('r.title')}}</span>
          <span v-if="close"
                :title="t('r.close')"
                class="close"
                @click="!loading&&handleCancel()">✕</span>
        </div>
        <div class="modal__content">
          <Content v-if="typeof content==='function'"
                   :render="content" />
          <slot v-else>
            {{content}}
          </slot>
        </div>
        <div class="modal__btns line line--t">
          <button :disabled="loading"
                  @click="handleConfirm">
            <span class="loading"
                  v-if="loading"> ❍ </span>{{t('r.confirm')}}
          </button>
          <button @click="!loading&&handleCancel()">{{t('r.cancel')}}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
  
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  PropType,
  ref,
  toRefs
} from 'vue';
import Content from './Content';
import config from './config';
import { IContent, IInstance } from './modal.type';
import { t } from './locale';

export default defineComponent({
  name: 'RModal',
  components: {
    Content
  },
  props: {
    isTeleport: { type: Boolean, default: true },
    modelValue: { type: Boolean, default: false, require: true },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: [String, Function] as PropType<string | IContent>,
      default: '',
      require: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: () => config.props!.close
    },
    maskClose: {
      type: Boolean,
      default: () => config.props!.maskClose
    },
    opacity: {
      type: Number,
      default: () => config.style!.opacity
    }
  },
  emits: ['on-confirm', 'on-cancel', 'update:modelValue'],

  setup(props, ctx) {
    const style = computed(() => ({ opacity: props.opacity }));
    let instance = getCurrentInstance() as IInstance;
    onBeforeMount(() => {
      instance._hub = {
        t: instance.appContext.config.globalProperties.$t,
        'on-cancel': () => {},
        'on-confirm': () => {}
      };
    });

    const handleConfirm = () => {
      ctx.emit('on-confirm');
      instance._hub['on-confirm']();
    };
    const handleCancel = () => {
      ctx.emit('on-cancel');
      ctx.emit('update:modelValue', false);
      instance._hub['on-cancel']();
    };

    return {
      style,
      handleConfirm,
      handleCancel,
      t
    };
  }
});
</script>
<style lang="less" scoped>
.modal {
  &,
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .mask {
    background-color: #000;
    opacity: 0.7;
  }
  .line {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      height: 1px;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.05);
    }
    &--t::after {
      top: 0;
    }
    &--b::after {
      bottom: 0;
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .loading {
    display: inline-block;
    margin-right: 5px;
    animation: rotate 1s infinite linear;
  }
  .close {
    cursor: pointer;
    padding: 0 10px;
    margin-right: -10px;
  }
  &__title {
    text-align: left;
    font-size: 14px;
    padding: 5px 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  &__main {
    background-color: #fff;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    overflow: hidden;
    min-width: 200px;
  }
  &__content {
    padding: 15px 15px;
  }
  &__btns {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 5px 5px 5px;
    text-align: right;
    button {
      cursor: pointer;
      outline: none;
      border: none;
      text-align: center;
      border: 1px solid gray;
      border-radius: 4px;
      & + button {
        margin-left: 6px;
      }
    }
  }
}
</style>


