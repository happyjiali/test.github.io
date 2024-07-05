<template>
  <canvas ref="emojiCanvas"></canvas>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import getAssets from "../utils/getAssets";
import emojiToPath from "../utils/emoji";

const props = defineProps({
  text: String,
});

const emojiSize = 150;
const spacing = emojiSize / 5;

const text = ref(props.text);
const emojiCanvas = ref(null);
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
    renderEmojiGrid(text.value);
  }
}

function escapeHTML(str) {
  return str.replace(/[\u00A0-\u9999<>&]/gim, function (i) {
    return "&#" + i.charCodeAt(0) + ";";
  });
}

function splitEmojis(str) {
  // 正则表达式匹配emoji字符
  const emojiRegex =
    /(\p{Emoji_Presentation}|\p{Emoji_Modifier_Base}|\p{Emoji}\uFE0F)/u;
  const arr = str.split(emojiRegex).filter((item) => {
    return item;
  });
  // 使用正则表达式分割字符串
  return arr;
}

function renderEmojiGrid(str) {
  const input = str;
  const rows = input.split("\n").map((row) => splitEmojis(row.trim()));
  const canvas = emojiCanvas.value;
  const ctx = canvas.getContext("2d");

  const canvasWidth = (emojiSize + spacing) * rows[0].length + spacing;
  const canvasHeight = (emojiSize + spacing) * rows.length + spacing;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.fillStyle = "#fff";
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  rows.forEach((row, rowIndex) => {
    row.forEach((emoji, colIndex) => {
      const imagePath = getAssets(emojiToPath[emoji]);
      if (imagePath) {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
          const x = colIndex * (emojiSize + spacing) + spacing;
          const y = rowIndex * (emojiSize + spacing) + spacing;
          ctx.drawImage(img, x, y, emojiSize, emojiSize);
        };
      } else {
        console.log(`Emoji ${emoji} not found in dictionary.`);
      }
    });
  });
}
</script>
