<template>
  <div class="main">
    <v-md-editor
      class="editor"
      v-model="currentValue"
      height="600px"
      :disabled-menus="[]"
      left-toolbar="undo redo clear | h color bold italic strikethrough | format code2 sup sub | indent ol ul table hr | link image code emoji tips | reset "
      :toolbar="toolbar"
      @upload-image="handleUploadImage"
    ></v-md-editor>
  </div>
</template>
<script>
// Local Registration
import axios from "axios";
import utils from "@/utils/utils";

export default {
  name: "VMEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    const vm = this;
    this.toolbar = {
      code2: {
        title: "行内代码",
        icon: "iconfont zzh-icon-code",
        action(editor) {
          editor.insert(function (selected) {
            const prefix = " `";
            const suffix = "` ";
            const placeholder = "请输入文本";
            const content = selected || placeholder;

            return {
              text: `${prefix}${content}${suffix}`,
              selected: content,
            };
          });
        },
      },
      indent: {
        title: "缩进",
        icon: "iconfont zzh-icon-suojin1",
        action(editor) {
          editor.insert(function (selected) {
            const prefix = "&emsp;";
            const suffix = "";
            const placeholder = "请输入文本";
            const content = selected || placeholder;

            return {
              text: `${prefix}${content}${suffix}`,
              selected: content,
            };
          });
        },
      },
      sup: {
        title: "上标",
        icon: "iconfont zzh-icon-superscript",
        action(editor) {
          editor.insert(function (selected) {
            const prefix = " ^";
            const suffix = "";
            const placeholder = "请输入文本";
            const content = selected || placeholder;

            return {
              text: `${prefix}${content}${suffix}`,
              selected: content,
            };
          });
        },
      },
      sub: {
        title: "下标",
        icon: "iconfont zzh-icon-subscript",
        action(editor) {
          editor.insert(function (selected) {
            const prefix = " _";
            const suffix = "";
            const placeholder = "请输入文本";
            const content = selected || placeholder;

            return {
              text: `${prefix}${content}${suffix}`,
              selected: content,
            };
          });
        },
      },
      format: {
        title: "公式化",
        icon: "iconfont zzh-icon-functions",
        menus: [
          {
            name: "menu1",
            text: "手动",
            action(editor) {
              editor.insert(function (selected) {
                const prefix = " $";
                const suffix = "$ ";
                const placeholder = "请输入文本";
                const content = selected || placeholder;

                return {
                  text: `${prefix}${content}${suffix}`,
                  selected: content,
                };
              });
            },
          },
          {
            name: "menu2",
            text: "自动",
            action(editor) {
              editor.insert(function (selected) {
                const currentValue = vm.currentValue;
                let content = selected || currentValue;

                content = content.replace(/(\w+)\s*/g, " \$$$1\$ ");
                if (selected == null) 
                {
                  vm.currentValue = content
                  return {
                    text: ``,
                    selected: '',
                  };
                }
                return {
                  text: `${content}`,
                  selected: content,
                };
              });
            },
          },
        ],
      },
      color: {
        title: "颜色",
        icon: "iconfont zzh-icon-font-color",
        action(editor) {
          editor.insert(function (selected) {
            const prefix = " ${\\color{Red}";
            const suffix = "}$ ";
            const placeholder = "请输入文本";
            const content = selected || placeholder;

            return {
              text: `${prefix}${content}${suffix}`,
              selected: content,
            };
          });
        },
      },
      reset: {
        title: "重制",
        icon: "iconfont zzh-icon-text-wrap",
        action(editor) {
          var converter = document.createElement("DIV");
          converter.innerHTML = editor.value;
          vm.currentValue = converter.innerText;
        },
      },
      tips: {
        title: "Tips",
        icon: "v-md-icon-tip",
        menus: [
          {
            name: "menu1",
            text: "提示",
            action(editor) {
              editor.insert(function (selected) {
                const prefix = "\n::: tip\n";
                const suffix = "\n:::\n";
                const placeholder = "请输入文本";
                const content = selected || placeholder;

                return {
                  text: `${prefix}${content}${suffix}`,
                  selected: content,
                };
              });
            },
          },
          {
            name: "menu2",
            text: "注意",
            action(editor) {
              editor.insert(function (selected) {
                const prefix = "\n::: warning\n";
                const suffix = "\n:::\n";
                const placeholder = "请输入文本";
                const content = selected || placeholder;

                return {
                  text: `${prefix}${content}${suffix}`,
                  selected: content,
                };
              });
            },
          },
          {
            name: "menu3",
            text: "警告",
            action(editor) {
              editor.insert(function (selected) {
                const prefix = "\n::: danger\n";
                const suffix = "\n:::\n";
                const placeholder = "请输入文本";
                const content = selected || placeholder;

                return {
                  text: `${prefix}${content}${suffix}`,
                  selected: content,
                };
              });
            },
          },
          {
            name: "menu4",
            text: "详情",
            action(editor) {
              editor.insert(function (selected) {
                const prefix = "\n::: details\n";
                const suffix = "\n:::\n";
                const placeholder = "请输入文本";
                const content = selected || placeholder;

                return {
                  text: `${prefix}${content}${suffix}`,
                  selected: content,
                };
              });
            },
          },
        ],
      },
    };
    return {
      currentValue: "",
    };
  },
  methods: {
    // 绑定@imgAdd event
    handleUploadImage(event, insertImage, files) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", files[0]);
      axios({
        url: "/admin/upload_image/",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        if (res.data.msg == "Success")
          // this.$refs.md.$img2Url(pos, res.data.file_path);
          insertImage({
            url: res.data.file_path,
            desc: files[0].name,
            // width: 'auto',
            // height: 'auto',
          });
        else this.$error("上传失败");
      });
    },
  },
  watch: {
    value(val) {
      if (this.currentValue !== val) {
        this.currentValue = utils.html_decode(val);
      }
    },
    currentValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit("change", newVal);
        this.$emit("input", newVal);
      }
    },
  },
};
</script>
<style scoped>
.editor {
  height: 100%;
  border: 1px solid rgba(211, 211, 211, 0.5) !important;
  border-radius: 0 !important;
}
</style>
<style>
.v-md-editor__preview-wrapper {
  background: rgba(211, 211, 211, 0.2);
}
.v-md-editor__toolbar-item {
  line-height: 28px !important;
}
</style>