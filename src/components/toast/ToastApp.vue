<script lang="ts" setup>
import { useToastData } from './Toast'
const { loadingData, toastData } = useToastData()
</script>

<template>
  <div v-if="loadingData.show" class="lx-load-mark">
    <div class="lx-load-box">
      <div :class="[loadingData.tip ? 'lx-loading' : 'lx-loading-nocontent']">
        <div v-for="(_, index) in 12" :key="index" class="loading_leaf" :class="[`loading_leaf_${index}`]"></div>
      </div>
      <div class="lx-load-content">
        {{ loadingData.tip }}
      </div>
    </div>
  </div>
  <div v-if="toastData.show">
    <div
      class="lx-toast" :class="[`lx-toast-${toastData.type}`, toastData.wordWrap ? 'lx-word-wrap' : '']"
      :style="toastData.extStyle"
    >
      {{ toastData.tip }}
    </div>
  </div>
</template>

<style lang="less" scoped>
#toast {
    position: fixed;
    z-index: 9999999999;
}
.lx-toast {
    position: fixed;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    line-height: 20px;
    padding: 10px 20px;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    text-align: center;
    font-size: 28px;
    color: #fff;
    background: rgba(255, 255, 255, 0.7);
    animation: show-toast 0.5s;
    -webkit-animation: show-toast 0.5s;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 9999999999;
}

.lx-toast.lx-word-wrap {
    width: 80%;
    white-space: inherit;
    word-break: break-all;
    height: auto;
}

.lx-toast.lx-toast-top {
    top: 50px;
    bottom: inherit;
}

.lx-toast.lx-toast-center {
    top: 50%;
    margin-top: -20px;
    bottom: inherit;
}

@-webkit-keyframes show-toast {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes show-toast {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.lx-load-mark {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999999999;
}

.lx-load-box {
    position: fixed;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);
    text-align: center;
    color: #000000;
}

.lx-load-content {
    position: absolute;
    font-size: 0.3rem;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.lx-loading,
.lx-loading-nocontent {
    position: absolute;
    width: 0px;
    height: 0px;
    left: 50%;
    top: 50%;
}

.lx-loading-nocontent {
    top: 50%;
}

.loading_leaf {
    position: absolute;
    top: -1px;
    opacity: 0.25;
}

.loading_leaf:before {
    content: ' ';
    position: absolute;
    width: 0.2rem;
    height: 0.05rem;
    background: #000000;
    -webkit-box-shadow: rgba(0, 0, 0, 1) 0px 0px 1px;
    box-shadow: rgba(0, 0, 0, 1) 0px 0px 1px;
    border-radius: 1px;
    -webkit-transform-origin: left 50% 0px;
    transform-origin: left 50% 0px;
}

.loading_leaf_0 {
    -webkit-animation: opacity-0 1.25s linear infinite;
    animation: opacity-0 1.25s linear infinite;
}

.loading_leaf_0:before {
    -webkit-transform: rotate(0deg) translate(0.1828rem, 0px);
    transform: rotate(0deg) translate(0.1828rem, 0px);
}

.loading_leaf_1 {
    -webkit-animation: opacity-1 1.25s linear infinite;
    animation: opacity-1 1.25s linear infinite;
}

.loading_leaf_1:before {
    -webkit-transform: rotate(30deg) translate(0.1828rem, 0px);
    transform: rotate(30deg) translate(0.1828rem, 0px);
}

.loading_leaf_2 {
    -webkit-animation: opacity-2 1.25s linear infinite;
    animation: opacity-2 1.25s linear infinite;
}

.loading_leaf_2:before {
    -webkit-transform: rotate(60deg) translate(0.1828rem, 0px);
    transform: rotate(60deg) translate(0.1828rem, 0px);
}

.loading_leaf_3 {
    -webkit-animation: opacity-3 1.25s linear infinite;
    animation: opacity-3 1.25s linear infinite;
}

.loading_leaf_3:before {
    -webkit-transform: rotate(90deg) translate(0.1828rem, 0px);
    transform: rotate(90deg) translate(0.1828rem, 0px);
}

.loading_leaf_4 {
    -webkit-animation: opacity-4 1.25s linear infinite;
    animation: opacity-4 1.25s linear infinite;
}

.loading_leaf_4:before {
    -webkit-transform: rotate(120deg) translate(0.1828rem, 0px);
    transform: rotate(120deg) translate(0.1828rem, 0px);
}

.loading_leaf_5 {
    -webkit-animation: opacity-5 1.25s linear infinite;
    animation: opacity-5 1.25s linear infinite;
}

.loading_leaf_5:before {
    -webkit-transform: rotate(150deg) translate(0.1828rem, 0px);
    transform: rotate(150deg) translate(0.1828rem, 0px);
}

.loading_leaf_6 {
    -webkit-animation: opacity-6 1.25s linear infinite;
    animation: opacity-6 1.25s linear infinite;
}

.loading_leaf_6:before {
    -webkit-transform: rotate(180deg) translate(0.1828rem, 0px);
    transform: rotate(180deg) translate(0.1828rem, 0px);
}

.loading_leaf_7 {
    -webkit-animation: opacity-7 1.25s linear infinite;
    animation: opacity-7 1.25s linear infinite;
}

.loading_leaf_7:before {
    -webkit-transform: rotate(210deg) translate(0.1828rem, 0px);
    transform: rotate(210deg) translate(0.1828rem, 0px);
}

.loading_leaf_8 {
    -webkit-animation: opacity-8 1.25s linear infinite;
    animation: opacity-8 1.25s linear infinite;
}

.loading_leaf_8:before {
    -webkit-transform: rotate(240deg) translate(0.1828rem, 0px);
    transform: rotate(240deg) translate(0.1828rem, 0px);
}

.loading_leaf_9 {
    -webkit-animation: opacity-9 1.25s linear infinite;
    animation: opacity-9 1.25s linear infinite;
}

.loading_leaf_9:before {
    -webkit-transform: rotate(270deg) translate(0.1828rem, 0px);
    transform: rotate(270deg) translate(0.1828rem, 0px);
}

.loading_leaf_10 {
    -webkit-animation: opacity-10 1.25s linear infinite;
    animation: opacity-10 1.25s linear infinite;
}

.loading_leaf_10:before {
    -webkit-transform: rotate(300deg) translate(0.1828rem, 0px);
    transform: rotate(300deg) translate(0.1828rem, 0px);
}

.loading_leaf_11 {
    -webkit-animation: opacity-11 1.25s linear infinite;
    animation: opacity-11 1.25s linear infinite;
}

.loading_leaf_11:before {
    -webkit-transform: rotate(330deg) translate(0.1828rem, 0px);
    transform: rotate(330deg) translate(0.1828rem, 0px);
}

@-webkit-keyframes opacity-0 {
    0% {
        opacity: 0.25;
    }
    0.01% {
        opacity: 0.25;
    }
    0.02% {
        opacity: 1;
    }
    60.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@keyframes opacity-0 {
    0% {
        opacity: 0.25;
    }
    0.01% {
        opacity: 0.25;
    }
    0.02% {
        opacity: 1;
    }
    60.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@-webkit-keyframes opacity-1 {
    0% {
        opacity: 0.25;
    }
    8.34333% {
        opacity: 0.25;
    }
    8.35333% {
        opacity: 1;
    }
    68.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@keyframes opacity-1 {
    0% {
        opacity: 0.25;
    }
    8.34333% {
        opacity: 0.25;
    }
    8.35333% {
        opacity: 1;
    }
    68.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@-webkit-keyframes opacity-2 {
    0% {
        opacity: 0.25;
    }
    16.6767% {
        opacity: 0.25;
    }
    16.6867% {
        opacity: 1;
    }
    76.6767% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@keyframes opacity-2 {
    0% {
        opacity: 0.25;
    }
    16.6767% {
        opacity: 0.25;
    }
    16.6867% {
        opacity: 1;
    }
    76.6767% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@-webkit-keyframes opacity-3 {
    0% {
        opacity: 0.25;
    }
    25.01% {
        opacity: 0.25;
    }
    25.02% {
        opacity: 1;
    }
    85.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@keyframes opacity-3 {
    0% {
        opacity: 0.25;
    }
    25.01% {
        opacity: 0.25;
    }
    25.02% {
        opacity: 1;
    }
    85.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@-webkit-keyframes opacity-4 {
    0% {
        opacity: 0.25;
    }
    33.3433% {
        opacity: 0.25;
    }
    33.3533% {
        opacity: 1;
    }
    93.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@keyframes opacity-4 {
    0% {
        opacity: 0.25;
    }
    33.3433% {
        opacity: 0.25;
    }
    33.3533% {
        opacity: 1;
    }
    93.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.25;
    }
}

@-webkit-keyframes opacity-5 {
    0% {
        opacity: 0.270958333333333;
    }
    41.6767% {
        opacity: 0.25;
    }
    41.6867% {
        opacity: 1;
    }
    1.67667% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.270958333333333;
    }
}

@keyframes opacity-5 {
    0% {
        opacity: 0.270958333333333;
    }
    41.6767% {
        opacity: 0.25;
    }
    41.6867% {
        opacity: 1;
    }
    1.67667% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.270958333333333;
    }
}

@-webkit-keyframes opacity-6 {
    0% {
        opacity: 0.375125;
    }
    50.01% {
        opacity: 0.25;
    }
    50.02% {
        opacity: 1;
    }
    10.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.375125;
    }
}

@keyframes opacity-6 {
    0% {
        opacity: 0.375125;
    }
    50.01% {
        opacity: 0.25;
    }
    50.02% {
        opacity: 1;
    }
    10.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.375125;
    }
}

@-webkit-keyframes opacity-7 {
    0% {
        opacity: 0.479291666666667;
    }
    58.3433% {
        opacity: 0.25;
    }
    58.3533% {
        opacity: 1;
    }
    18.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.479291666666667;
    }
}

@keyframes opacity-7 {
    0% {
        opacity: 0.479291666666667;
    }
    58.3433% {
        opacity: 0.25;
    }
    58.3533% {
        opacity: 1;
    }
    18.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.479291666666667;
    }
}

@-webkit-keyframes opacity-8 {
    0% {
        opacity: 0.583458333333333;
    }
    66.6767% {
        opacity: 0.25;
    }
    66.6867% {
        opacity: 1;
    }
    26.6767% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.583458333333333;
    }
}

@keyframes opacity-8 {
    0% {
        opacity: 0.583458333333333;
    }
    66.6767% {
        opacity: 0.25;
    }
    66.6867% {
        opacity: 1;
    }
    26.6767% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.583458333333333;
    }
}

@-webkit-keyframes opacity-9 {
    0% {
        opacity: 0.687625;
    }
    75.01% {
        opacity: 0.25;
    }
    75.02% {
        opacity: 1;
    }
    35.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.687625;
    }
}

@keyframes opacity-9 {
    0% {
        opacity: 0.687625;
    }
    75.01% {
        opacity: 0.25;
    }
    75.02% {
        opacity: 1;
    }
    35.01% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.687625;
    }
}

@-webkit-keyframes opacity-10 {
    0% {
        opacity: 0.791791666666667;
    }
    83.3433% {
        opacity: 0.25;
    }
    83.3533% {
        opacity: 1;
    }
    43.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.791791666666667;
    }
}

@keyframes opacity-10 {
    0% {
        opacity: 0.791791666666667;
    }
    83.3433% {
        opacity: 0.25;
    }
    83.3533% {
        opacity: 1;
    }
    43.3433% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.791791666666667;
    }
}

@-webkit-keyframes opacity-11 {
    0% {
        opacity: 0.895958333333333;
    }
    91.6767% {
        opacity: 0.25;
    }
    91.6867% {
        opacity: 1;
    }
    51.6767% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.895958333333333;
    }
}

@keyframes opacity-11 {
    0% {
        opacity: 0.895958333333333;
    }
    91.6767% {
        opacity: 0.25;
    }
    91.6867% {
        opacity: 1;
    }
    51.6767% {
        opacity: 0.25;
    }
    100% {
        opacity: 0.895958333333333;
    }
}
</style>
