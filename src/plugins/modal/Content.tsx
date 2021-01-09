import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'Context',
  props: {
    render: { type: Function, default: () => {} }
  },
  setup(props) {
    return () => props.render(h);
  }
});
