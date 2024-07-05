<template>
  <div class="chat-box">
    <div class="content-tool">
      <span class="copy" @click="copy"></span>
      <span class="right" @click="nextDemo"></span>
    </div>
    <div class="question">
      <img class="avatar" src="@/assets/images/avatar.svg" alt="Vot" />
      <span class="copy" @click="copy('input')"></span>
      <div class="question-main">
        {{ promptTxt }}
      </div>
    </div>
    <div class="question">
      <img class="avatar" src="@/assets/images/logo.svg" alt="Vot" />
      <div class="answer" v-if="currentIsVisual">
        <div class="answer-content">
          <emoji
            v-if="data.tabIndex != 2"
            :text="answerMapList[currentIndex]"
            style="max-height: 16em; max-width: 50%"
          ></emoji>
          <markdeep-renderer
            v-if="data.tabIndex == 2"
            :text="answerMapList[currentIndex]"
          />
        </div>
      </div>
      <div class="answer" v-if="!currentIsVisual">
        <div class="answer-text">{{ answerTxtList[currentIndex] }}</div>
      </div>
      <span class="step">Step{{ currentIndex + 1 }}</span>
      <span class="switch" @click="switchVisual">Switch to Visual</span>
      <span class="copy" @click="copy('output')"></span>
      <span class="left-btn" @click="prev"></span>
      <span class="right-btn" @click="next"></span>
    </div>
  </div>
  <div class="tooltip" v-show="showTip">Success: Copied!</div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineEmits } from "vue";
import emoji from "./emoji.vue";
import MarkdeepRenderer from "./markdown.vue";
import axios from "axios";

const props = defineProps({
  data: Object,
});

const data = ref(props.data);
const answerTxtList = ref([]);
const answerMapList = ref([]);
const answerTxt = ref("");
const promptTxt = ref("");
const currentIndex = ref(0);
const showTip = ref(false);
const currentIsVisual = ref(true); //true:visual,false:thought
const emit = defineEmits(["updateDemoIndex"]);
let timerId = null;
onMounted(() => {
  init();
});
watch(
  () => props.data,
  (newValue, oldValue) => {
    data.value = newValue;
    init();
  }
);

function animate() {
  timerId = setInterval(() => {
    let index = answerMapList.value.length - 1;
    if (currentIndex.value >= index) {
      clearInterval(timerId);
      timerId = null;
    } else {
      currentIndex.value = currentIndex.value + 1;
    }
  }, 1000);
}

function init() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  // { name: item, tabIndex: tabIndex, level: level }
  if (data.value.tabIndex == 0) {
    const url = `/data/Visual Navigation/${data.value.level}/${data.value.name}`;
    axios
      .get(url + `-map.txt`)
      .then((response) => {
        promptTxt.value = `Navigation Task: for a provided map, 🏠 is the home as starting point, 🏢 is the office as the destination. ⬜ means the road, 🚧 means the obstacle. There exists one and only one viable route for each map. Each step you choose a direction and move to the end of the continuous road or the destination.

map:
\`\`\`
${response.data}
\`\`\`
Starting from 🏠, provide the steps to navigate to 🏢.

Visualize the state after each reasoning step.`;
      })
      .catch((error) => {
        console.error("Error reading the JSON file:", error);
      });
    axios
      .get(url + `-output.txt`)
      .then((response) => {
        answerTxt.value = response.data;
        const lines = response.data.split(/\r\n|\n|\r/); // 使用正则表达式分割文本
        const txtList = [];
        const mapList = [];

        var result = lines.reduce(
          function (arr, currentValue) {
            if (currentValue !== "```") {
              arr[arr.length - 1].push(currentValue);
            } else {
              arr.push([]);
            }
            return arr;
          },
          [[]]
        );
        result.forEach((ele, index) => {
          if (ele[0] == "") {
            ele.shift();
          }
          if (index % 2 == 0) {
            txtList.push(ele.join("\n"));
          } else {
            mapList.push(ele.join("\n"));
          }
        });
        answerTxtList.value = txtList;
        answerMapList.value = mapList;
        currentIndex.value = 0;
        currentIsVisual.value = true;
        animate();
      })
      .catch((error) => {
        console.error("Error reading the JSON file:", error);
      });
  } else if (data.value.tabIndex == 1) {
    const url = `/data/Visual Tiling/${data.value.level}/${data.value.name}/`;
    axios
      .get(url + `0-shot-uni-cov.txt`)
      .then((response) => {
        promptTxt.value = response.data;
      })
      .catch((error) => {
        console.error("Error reading the JSON file:", error);
      });
    axios
      .get(url + `output.txt`)
      .then((response) => {
        answerTxt.value = response.data;
        const lines = response.data.split(/\r\n|\n|\r/); // 使用正则表达式分割文本
        var result = lines.reduce(
          function (arr, currentValue) {
            if (currentValue !== "```") {
              arr[arr.length - 1].push(currentValue);
            } else {
              arr.push([]);
            }
            return arr;
          },
          [[]]
        );
        const txtList = [];
        const mapList = [];
        result.forEach((ele, index) => {
          if (ele[0] == "") {
            ele.shift();
          }
          if (index % 2 == 0) {
            txtList.push(ele.join("\n"));
          } else {
            mapList.push(ele.join("\n"));
          }
        });

        answerTxtList.value = txtList;
        answerMapList.value = mapList;
        currentIndex.value = 0;
        currentIsVisual.value = true;
        animate();
      })
      .catch((error) => {
        console.error("Error reading the JSON file:", error);
      });
  } else {
    const url = `/data/Natural Language Navigation/${data.value.name}/`;
    axios
      .get(url + `0-shot-uni-cov.txt`)
      .then((response) => {
        promptTxt.value = response.data;
      })
      .catch((error) => {
        console.error("Error reading the JSON file:", error);
      });
    axios
      .get(url + `output.txt`)
      .then((response) => {
        answerTxt.value = response.data;
        const lines = response.data.split(/\r\n|\n|\r/); // 使用正则表达式分割文本
        var result = lines.reduce(
          function (arr, currentValue) {
            if (currentValue !== "```") {
              arr[arr.length - 1].push(currentValue);
            } else {
              arr.push([]);
            }
            return arr;
          },
          [[]]
        );
        const txtList = [];
        const mapList = [];
        result.forEach((ele, index) => {
          if (ele[0] == "") {
            ele.shift();
          }
          if (index % 2 == 0) {
            txtList.push(ele.join("\n"));
          } else {
            ele.unshift("```");
            ele.push("```");
            mapList.push(ele.join("\n"));
          }
        });
        answerTxtList.value = txtList;
        answerMapList.value = mapList;
        currentIndex.value = 0;
        currentIsVisual.value = true;
        animate();
      })
      .catch((error) => {
        console.error("Error reading the JSON file:", error);
      });
  }
}
function copy(type) {
  let str = ``;
  if (type == "input") {
    str = promptTxt.value;
  } else if (type == "output") {
    str = currentIsVisual.value
      ? answerMapList.value[currentIndex.value]
      : answerTxtList.value[currentIndex.value];
  } else {
    str = promptTxt.value + "\n" + answerTxt.value;
  }
  navigator.clipboard.writeText(str);
  showTip.value = true;
  setTimeout(() => {
    showTip.value = false;
  }, 2000);
}
function prev() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  if (currentIndex.value > 0) {
    currentIndex.value = currentIndex.value - 1;
  } else {
    currentIndex.value = 0;
  }
}
function next() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  let index = currentIsVisual.value
    ? answerMapList.value.length
    : answerTxtList.value.length;
  if (currentIndex.value >= index - 1) {
    currentIndex.value = index - 1;
  } else {
    currentIndex.value = currentIndex.value + 1;
  }
}
function switchVisual() {
  currentIsVisual.value = !currentIsVisual.value;
  if (
    currentIsVisual.value &&
    currentIndex.value > answerMapList.value.length - 1
  ) {
    currentIndex.value = answerMapList.value.length - 1;
  }
}
function nextDemo() {
  emit("updateDemoIndex", 1);
}
</script>
<style scoped lang="scss">
.chat-box {
  .content-tool {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1em;
    .copy {
      width: 1.8em;
      height: 1.8em;
      background: url(@/assets/images/copy.svg) no-repeat;
      background-size: contain;
      cursor: pointer;
    }
    .right {
      width: 1.6em;
      height: 1.6em;
      background: url(@/assets/images/jiantou.svg) no-repeat;
      background-size: contain;
      margin-left: 1.6em;
      cursor: pointer;
    }
  }
  .question {
    width: 100%;
    background: url(@/assets/images/border-bg.png) no-repeat;
    background-size: 100% 100%;
    // padding: 2.25em 0.6em 3.25em 6.5em;
    padding: 3.75em 0.5em 3.25em 3em;
    position: relative;
    margin-bottom: 3em;
    box-sizing: border-box;
    .avatar {
      display: block;
      width: 5em;
      position: absolute;
      left: -2%;
      top: -5%;
    }
    .question-main {
      font-size: 1.1em;
      font-weight: 400;
      line-height: 1.3em;
      text-align: left;
      // padding-right: 2.45em;
      padding: 0 3em;
      color: #000;
      white-space: break-spaces;
      min-height: 15em;
      max-height: 20em;
      overflow: auto;
    }
    .copy {
      width: 1.4em;
      height: 1.4em;
      background: url(@/assets/images/copy.svg) no-repeat;
      background-size: contain;
      cursor: pointer;
      position: absolute;
      right: 3.2em;
      top: 1.35em;
    }
  }
  .answer {
    font-size: 1.1em;
    font-weight: 400;
    line-height: 1.3em;
    text-align: left;
    color: #000;
    white-space: break-spaces;
    padding: 0 3em;
    min-height: 15em;
    max-height: 20em;
    // position: relative;
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    overflow: auto;
    .answer-content {
      width: 100%;
      height: 100%;
      padding: 0 3em;
      box-sizing: border-box;
      min-height: 15em;
      max-height: 20em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .answer-text {
      width: 100%;
      height: 100%;
      padding: 0 3em;
      box-sizing: border-box;
      min-height: 15em;
      max-height: 20em;
      display: grid;
      align-items: center;
      justify-content: center;
    }
  }
  .step {
    position: absolute;
    left: 5em;
    top: 1.25em;
    font-size: 1.2em;
    font-weight: 700;
    color: #000;
  }
  .switch {
    position: absolute;
    right: 7.3em;
    top: 2.2em;
    color: #000;
    font-size: 0.8em;
    text-decoration: underline;
    cursor: pointer;
  }
  .left-btn {
    position: absolute;
    left: 5em;
    top: 55%;
    transform: translateY(-50%);
    display: block;
    width: 2em;
    height: 2em;
    background: url(@/assets/images/left-icon.svg) no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .right-btn {
    position: absolute;
    right: 2em;
    top: 55%;
    transform: translateY(-50%);
    display: block;
    width: 2em;
    height: 2em;
    background: url(@/assets/images/right-icon.svg) no-repeat;
    background-size: contain;
    cursor: pointer;
  }
}
.tooltip {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 0.7em 1.7em 0.9em;
  font-size: 1.4em;
  border-radius: 0.5em;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
</style>
