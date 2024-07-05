<template>
  <div class="home">
    <div class="home-top">
      <h1>
        Visualization-of-Thought <br />
        Elicits Spatial Reasoning in Large Language Models
      </h1>
      <div class="banner">
        <div class="link">
          <a href="#">Paper</a>
          <i></i>
          <a href="#">Code</a>
          <i></i>
          <a href="#">Dataset</a>
        </div>
        <div class="banner-swiper">
          <swiper></swiper>
        </div>
      </div>
    </div>
    <div class="home-main">
      <div class="vot-tab">
        <li
          :class="{ active: tabIndex == index }"
          @click="tabSwitch(index)"
          v-for="(tab, index) in tabList"
          :key="index"
        >
          <span v-html="tab"></span>
        </li>
      </div>
      <div class="vot-main">
        <div class="vot-list">
          <ul class="vot-ul">
            <li
              v-for="(item, index) in currentDataList"
              :key="index"
              :class="{ active: index == demoIndex }"
              @click="demoSwitch(index)"
            >
              <emoji
                style="width: 100%"
                :data="{ name: item, tabIndex: tabIndex, level: level }"
              ></emoji>
            </li>
          </ul>
          <ul class="level-list">
            <li
              :class="{ active: level == item }"
              v-for="item in levelList[tabIndex]"
              @click="levelSwitch(item)"
              :key="item"
            >
              <span
                ><i>{{ level == item ? "Level " + item : item }}</i></span
              >
            </li>
          </ul>
        </div>
        <div class="vot-content">
          <chat
            :data="{
              name: currentDataList[demoIndex],
              tabIndex: tabIndex,
              level: level,
            }"
            @updateDemoIndex="handleUpdate"
          ></chat>
        </div>
      </div>
      <div class="footer">
        <p class="title">VoT</p>
        <p class="contact">
          <a href="#">About Us</a>
          <i></i>
          <a href="#">Contact us</a>
        </p>
        <p class="email">E-mail：xxx@microsoft.com</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import getAssets from "../utils/getAssets";
import swiper from "../components/swiper.vue";
import emoji from "../components/emojitoImage.vue";
import chat from "../components/chat.vue";
import axios from "axios";

const tabIndex = ref(0);
const level = ref(1);
const demoIndex = ref(0);
const tabList = ref([
  "Visual Navigation",
  "Visual Tiling",
  "Natural Language <br> Navigation",
]);
const levelList = ref([[1, 2, 3, 4, 5, 6], [1, 2], []]);
const dataList = [
  {
    1: [55, 38, 54, 38, 54, 55, 38, 54, 55, 38],
    2: [38, 54, 55, 38, 54, 55, 38, 54, 55, 38],
    3: [54, 55, 38, 38, 54, 55, 38, 54, 55, 38],
    4: [38, 54, 55, 38, 54, 55, 38, 54, 55, 38],
    5: [54, 38, 55, 38, 54, 55, 38, 54, 55, 38],
    6: [55, 38, 54, 38, 54, 55, 38, 54, 55, 38],
  },
  {
    1: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1],
    2: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1],
  },
  {
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
];

const currentDataList = ref([]);
currentDataList.value = dataList[tabIndex.value][level.value];

function handleUpdate(value) {
  if (demoIndex.value >= currentDataList.value.length - 1) {
    demoIndex.value = 0;
  } else {
    demoIndex.value = demoIndex.value + 1;
  }
}
function tabSwitch(index) {
  tabIndex.value = index;
  level.value = 1;
  demoIndex.value = 0;
  currentDataList.value = dataList[tabIndex.value][level.value];
}
function levelSwitch(item) {
  level.value = item;
  demoIndex.value = 0;
  currentDataList.value = dataList[tabIndex.value][level.value];
}
function demoSwitch(index) {
  demoIndex.value = index;
}
</script>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}
.home {
  .home-top {
    width: 100%;
    background: url(@/assets/images/bg.png) no-repeat;
    background-size: 100% 100%;
    h1 {
      font-size: 2em;
      font-weight: 600;
      line-height: 1.2em;
      text-align: center;
      margin-top: 1.5em;
    }
    .banner {
      padding-top: 2em;
      .link {
        display: flex;
        justify-content: center;

        a {
          font-family: Arial;
          font-size: 1.275em;
          font-weight: 400;
          line-height: 1.14em;
          color: #000;
        }
        i {
          border-left: 3px solid #000;
          margin: 0 1.8em;
        }
      }
      .banner-swiper {
        max-width: 1200px;
        padding: 0 6.25em 6.25em;
        margin: 0 auto;
        margin-top: 3em;
      }
    }
  }
  .home-main {
    padding: 0 6.25em;
    width: 1280px;
    margin: 0 auto;
    .vot-tab {
      display: flex;
      justify-content: space-between;
      li {
        width: 28%;
        border: 2px dashed #000;
        border-radius: 0.85em;
        overflow: hidden;
        cursor: pointer;
        span {
          width: 100%;
          min-height: 3.2em;
          background: #fff;
          font-size: 1.25em;
          font-weight: 700;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &.active {
          border: 2px dashed rgba(109, 109, 109, 1);
          span {
            background: rgba(109, 109, 109, 1);
            color: #fff;
          }
        }
      }
    }
    .vot-main {
      display: flex;
      margin-top: 3.875em;
      .vot-list {
        width: 16em;
        max-height: 62em;
        border: 2px dashed #000;
        border-radius: 1em;
        position: relative;
        padding: 0.5em 0;
        .vot-ul {
          width: 100%;
          height: 100%;
          padding: 1em 2em 0;
          border-radius: 1em;
          box-sizing: border-box;
          overflow-y: auto;
          overflow-x: hidden;
          li {
            border: 2px dashed #000;
            border-radius: 0.5em;
            margin-bottom: 1.5em;
            overflow: hidden;
            cursor: pointer;
            img {
              display: block;
              width: 100%;
            }
            &.active {
              // border: 2px solid #0082ff;
              border-style: solid;
            }
          }
        }
        .level-list {
          position: absolute;
          right: -17%;
          top: 2em;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          li {
            margin-bottom: 1.2em;
            border-radius: 0 0.38em 0.38em 0;
            overflow: hidden;
            cursor: pointer;

            span {
              display: inline-block;
              // padding: 2.2em 0.15em;
              width: 1.8em;
              height: 4.9em;
              font-size: 1em;
              font-weight: bold;
              background: rgba(109, 109, 109, 1);
              color: #fff;
              i {
                display: inline-block;
                width: 3.8em;
                font-style: normal;
                transform: translate(-1em, 2em) rotate(-90deg);
              }
            }
            &.active {
              margin-bottom: 1.2em;
              span {
                // padding: 0.85em 0.7em;
                width: 2.6em;
                height: 4.9em;
                i {
                  transform: translate(-0.7em, 2em) rotate(-90deg);
                }
              }
            }
          }
        }
      }
      .vot-content {
        width: calc(100% - 26em);
        margin-left: 10em;
      }
    }
  }
  .footer {
    padding: 3.5em 0;
    margin-top: 8em;
    border-top: 2px dashed rgba(0, 0, 0, 1);
    p {
      text-align: center;
    }
    .title {
      font-size: 2.125em;
      font-weight: 700;
      line-height: 1.2em;
    }
    .contact {
      display: flex;
      justify-content: center;
      margin: 1em;

      a {
        font-family: Arial;
        font-size: 1.275em;
        font-weight: 400;
        line-height: 1.14em;
        color: #000;
      }
      i {
        border-left: 3px solid #000;
        margin: 0 1em;
      }
    }
    .email {
      font-size: 1.25em;
      font-weight: 400;
      line-height: 1.15em;
    }
  }
}
</style>
