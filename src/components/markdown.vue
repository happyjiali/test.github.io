<!-- MarkdownRenderer.vue -->
<template>
  <div v-html="renderText"></div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
import "github-markdown-css";
import mermaid from "markdown-it-mermaid";

import { ref, onMounted, defineProps, watch } from "vue";

const props = defineProps({
  text: String,
});

const text = ref(props.text);
const renderText = ref("");
const markdeepContainer = ref(null);
const markdeepContent = ref("");
onMounted(() => {
  init();
});
watch(
  () => props.text,
  (newValue, oldValue) => {
    text.value = newValue;
    init();
  }
);
function init() {
  if (text.value) {
    // console.log(text.value);
    const md = new MarkdownIt().use(mermaid);
    renderText.value = md.render(text.value);

    //     const md1 = `
    // Let's visualize the grid with the items you've described:

    // \`\`\`
    // +---+---+---+
    // | S | B | M |
    // +---+---+---+
    // | P | C | V |
    // +---+---+---+
    // | T | W | C |
    // +---+---+---+
    // \`\`\`
    // `;
    //     markdeepContainer.value.innerHTML = `
    //     <!-- Your Markdeep content goes here -->
    //     <div data-markdeep>${md1}</div>
    //   `;
    // const scriptElement = document.createElement("script");
    // scriptElement.src = "/markdeep.min.js";
    // scriptElement.src = "https://casual-effects.com/markdeep/markdeep.min.js";
    // markdeepContainer.value.appendChild(scriptElement);
  }
}

// 当Vue组件销毁时，销毁mermaid图表
// onUnmounted(() => {
//   mermaid.dispose();
// });
</script>
<style lang="scss">
code,
pre {
  font-family: Menlo, Consolas, monospace;
  font-size: 93%;
  text-align: left;
  line-height: 140%;
  page-break-inside: avoid;
  // display: inline-block;
}
</style>
