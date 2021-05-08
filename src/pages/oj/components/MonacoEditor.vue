<template>
  <div class="main">
    <div class="items">
      <Select
        v-model="mode"
        @on-change="onLangChange"
        size="small"
        class="lang-sel"
      >
        <Option v-for="(lang, index) in langs_" :key="index" :value="lang.name"
          >{{ lang.name }}
        </Option>
      </Select>
      <Checkbox style="float: right; margin-right: 0" v-model="darkMode"
        >深色</Checkbox
      >
      <Button
        @click="useCodeMirror"
        style="float: right; margin-right: 10px"
        type="text"
      >
        CodeMirror
      </Button>
    </div>
    <MonacoEditor
      class="editor"
      :style="{ height: height + 'px' }"
      ref="editor"
      v-model="code"
      @change="onChange"
      @editorDidMount="onEditorDidMount"
      :options="options"
      :language="langs[mode]"
      :theme="theme"
    />
  </div>
</template>

<script>
import MonacoEditor from "vue-monaco";
import utils from "@/utils/utils";

export default {
  components: {
    MonacoEditor,
  },
  props: ["value"],
  data() {
    return {
      code: "",
      mode: "C++",
      langs: {
        C: "c",
        "C++": "cpp",
        Golang: "go",
        Java: "java",
        Python2: "python",
        Python3: "python",
      },
      langs_: [],
      darkMode: false,
      height: 400,
      options: {
        fontSize: 16,
        tabSize: 4,
        scrollBeyondLastLine: false,
        folding: true, // 是否折叠
        foldingHighlight: true, // 折叠等高线
        foldingStrategy: "indentation", // 折叠方式  auto | indentation
        lineNumbersMinChars: 4,
        scrollbar: {
          alwaysConsumeMouseWheel: false, // 是否接管滚动事件
        },
        minimap: {
          enabled: false, // 不要小地图
        },
      },
      codeMirror: false,
    };
  },
  mounted() {
    utils.getLanguages().then((languages) => {
      languages.forEach((lang) => {
        let tmp = {};
        tmp["name"] = lang.name;
        tmp["value"] = this.langs[lang.name];
        this.langs_.push(tmp);
      });
    });
  },
  methods: {
    onEditorDidMount() {
      let editor = this.$refs.editor.getEditor();

      editor.focus();

      window.onresize = () => {
        editor.layout();
      };

      editor.addAction({
        id: "tip",
        label: "粘贴请按 Ctrl + V",
        contextMenuGroupId: "9_cutcopypaste",
        run: (editor) => {
          this.$Modal.info({
            title: "注意",
            content: "因涉及底层安全问题，编辑器内粘贴请按 Ctrl + V",
          });
        },
      });

      editor.onDidContentSizeChange(() => {
        this.resieze(editor);
      });
    },
    resieze(editor) {
      this.height = Math.min(800, Math.max(400, editor.getContentHeight()));
    },
    onLangChange(newVal) {
      this.$emit("changeLang", newVal);
    },
    onChange(value, event) {
      this.$emit("input", value);
    },
    useCodeMirror() {
      this.$emit("codeMirror", true);
    },
  },
  watch: {
    darkMode(v) {
      this.theme = v ? "vs-dark" : "vs";
    },
    height() {
      this.$nextTick(() => {
        this.$refs.editor.getEditor().layout();
      });
    },
    value(v) {
      this.$nextTick(() => {
        this.code = v || "";
      });
    },
  },
};
</script>

<style lang='less' scoped>
.main {
  margin: 10px 0 20px;
  .lang-sel {
    width: 100px;
  }
  .items {
    height: 32px;
    line-height: 32px;
    margin-bottom: 10px;
  }
}
.editor {
  border: 2px solid rgba(211, 211, 211, 0.8);
  width: 100%;
}
</style>
  <style>
.action-label.codicon.separator.disabled {
  display: none !important;
}
</style>