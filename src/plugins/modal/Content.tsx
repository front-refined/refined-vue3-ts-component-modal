import { h } from 'vue';
const Content = (props: { render: (h: any) => void }) => props.render(h);
Content.props = ['render'];
export default Content;
