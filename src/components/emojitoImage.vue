<template>
  <div>
    <emoji
      style="width: 100%"
      v-if="text && tabIndex != 2"
      :text="text"
    ></emoji>
    <p style="padding: 1em" v-if="tabIndex == 2">No.{{ data.name }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import emoji from "./emoji.vue";
import markdown from "../components/markdown.vue";
import axios from "axios";

const props = defineProps({
  data: Object,
});

const data = ref(props.data);
const tabIndex = ref(0);
const text = ref("");
onMounted(() => {
  init();
});
watch(
  () => props.data,
  (newValue, oldValue) => {
    if (
      newValue.tabIndex != data.value.tabIndex ||
      newValue.level != data.value.level
    ) {
      data.value = newValue;
      tabIndex.value = data.value.tabIndex;
      init();
    }
  }
);
function init() {
  text.value = "";
  if (tabIndex.value == 0) {
    const url = `/data/Visual Navigation/${data.value.level}/${data.value.name}-map.txt`;
    axios
      .get(url)
      .then((response) => {
        text.value = response.data;
      })
      .catch((error) => {
        console.error("Error reading the JSON file:", error);
      });
  } else if (tabIndex.value == 1) {
    const url = `/data/Visual Tiling/${data.value.level}/${data.value.name}/0-shot-uni-cov.txt`;
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        const lines = response.data.split(/\r\n|\n|\r/); // 使用正则表达式分割文本
        const startIndex = lines.indexOf("```");
        const newLines = lines.slice(startIndex + 1, lines.length);
        const endIndex = newLines.indexOf("```");
        const emojiLines = newLines.slice(0, endIndex);
        text.value = emojiLines.join("\n");
      })
      .catch((error) => {
        console.error("Error reading the JSON file:", error);
      });
  }
}
</script>
