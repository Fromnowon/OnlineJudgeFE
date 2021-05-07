import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import i18n from '@/i18n'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import filters from '@/utils/filters'
import router from './router'
import { GOOGLE_ANALYTICS_ID } from '@/utils/constants'
import VueAnalytics from 'vue-analytics'
import katex from '@/plugins/katex'

import Panel from './components/Panel.vue'
import IconBtn from './components/btn/IconBtn.vue'
import Save from './components/btn/Save.vue'
import Cancel from './components/btn/Cancel.vue'
import './style.less'

// 编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';
import '@kangc/v-md-editor/lib/plugins/tip/tip.css';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

// 按需引入 highlightjs 的语言包，此处以 json 为例
import json from 'highlight.js/lib/languages/json';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';

VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createEmojiPlugin());
VueMarkdownEditor.use(createTipPlugin());
VueMarkdownEditor.use(createKatexPlugin());

VueMarkdownEditor.use(githubTheme, {
  extend(md, hljs) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
    // 注册语言包
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('cpp', cpp);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('python', python);
  },
});
Vue.use(VueMarkdownEditor)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(VueAnalytics, {
  id: GOOGLE_ANALYTICS_ID,
  router
})
Vue.use(katex)
Vue.component(IconBtn.name, IconBtn)
Vue.component(Panel.name, Panel)
Vue.component(Save.name, Save)
Vue.component(Cancel.name, Cancel)

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$error = (msg) => {
  Vue.prototype.$message({'message': msg, 'type': 'error'})
}

Vue.prototype.$warning = (msg) => {
  Vue.prototype.$message({'message': msg, 'type': 'warning'})
}

Vue.prototype.$success = (msg) => {
  if (!msg) {
    Vue.prototype.$message({'message': 'Succeeded', 'type': 'success'})
  } else {
    Vue.prototype.$message({'message': msg, 'type': 'success'})
  }
}

new Vue(Vue.util.extend({router, store, i18n}, App)).$mount('#app')
