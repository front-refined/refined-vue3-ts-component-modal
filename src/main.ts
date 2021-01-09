import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import i18n from '@/locale';
import Modal, { IConfig } from '@/plugins/modal';

const app = createApp(App);

app.use(
  Modal as any,
  {
    style: {
      opacity: 0.5
    },
    props: {
      close: false,
      maskClose: false
    }
  } as IConfig
);

app.use(i18n);

app.use(store);
app.use(router);
app.mount('#app');
