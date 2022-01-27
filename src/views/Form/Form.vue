<template>
    <div class="list-box-cover">
        <div class="list-box">
            <div class="list-item">
                <div class="item-cover">
                    <div class="title">标题</div>
                    <div class="item-right" @click="changeShowPopup">
                        <input type="text" :value="itemValue" disabled placeholder="请选择标题">
                        <div class="arrow-right"></div>
                    </div>
                </div>
                <div class="popup-cover" v-if="showPopup" @click="showPopup = false">
                    <div class="popup">
                        <div class="option-scroll">
                            <div class="option"
								:class="{blue: itemValue === valueArray[index]}"
								v-for="(value, index) in valueArray"
								@click="changeItemValue(index)"
								:key="index"
							>
								{{value}}
							</div>
                        </div>
                        <div class="option cancel" @click="showPopup = false">取消</div>
                    </div>
                </div>
            </div>
            
            <div class="list-item">
                <div class="item-cover">
                    <div class="title">标题</div>
                    <div class="item-right">
                        <input type="text" v-model="inputMessage" @blur="formatCheck" placeholder="请正确填写标题">
                    </div>
                </div>
                <div class="tip" v-if="showWarn">请输入正确的标题</div>
            </div>
        </div>
		<div :style="{backgroundColor: 'yellow',height: '50px'}" @click="showDialog = true">显示Dialog</div>
		<Dialog v-if="showDialog" @confirm="closeDialog">
			<template #content>
				提示文本
			</template>
		</Dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue';
import Dialog from '@/components/Dialog/Dialog.vue';

export default defineComponent({
    name: 'Form',
	components: {
		Dialog,
	},
    setup() {
        const itemValue = ref("")
        const showPopup = ref(false)
        const valueArray = reactive<string[]>(['1', '2', '3'])

        const inputMessage = ref("")
        const showWarn = ref(true)

		const showDialog = ref(false)

        const changeShowPopup = (): void => {
            showPopup.value = true
        }
        const changeItemValue = (index: number): void => {
            itemValue.value = valueArray[index]
        }
        const formatCheck = (): void => {
            showWarn.value = false
        }
		const closeDialog = ():void => {
			showDialog.value = false
		}

        return {
            itemValue,
            showPopup,
            valueArray,
            inputMessage,
            showWarn,
			showDialog,

            changeShowPopup,
            changeItemValue,
            formatCheck,
			closeDialog,
        }
    }
});
</script>

<style lang='less' scoped>
.list-box-cover {
    width: 100%;
    height: 100vh;
    background-color: #F5F5F5;

    .list-box {
        background-color: #fff;
        margin-bottom: (4/750)*100vw;
        .list-item {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 48px;
            padding: 0 (24/750)*100vw;
            box-sizing: border-box;
            color: #000;

            &::after {
                content: '';
                width: (726/750)*100vw;
                height: 0.5px;
                background-color: #eee;
                position: absolute;
                right: 0;
                bottom: 0;
            }

            .item-cover {
                display: flex;
                align-items: center;
                width: 100%;

                .title {
                    flex: none;
                    font-size: 17px;
                    width: (204/750)*100vw;
                    margin-right: (24/750)*100vw;
                    text-align: left;
                }

                .item-right {
                    flex: auto;
                    display: flex;
                    align-items: center;

                    input {
                        font-size: 17px;
                        background-color: #fff;
                        border: none;
                        text-align: right;
                        outline: none;
                        flex: auto;
                    }

                    input::-webkit-input-placeholder { /* WebKit browsers */
                        color: #ccc;
                    }

                    .arrow-right {
                        width: 20px;
                        height: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        &::after {
                            content: '';
                            width: 11.5px;
                            height: 11.5px;
                            border-right: 2px solid #CCC;
                            border-bottom: 2px solid #CCC;
                            transform: rotateZ(-45deg);
                        }
                    }
                }           
            }

            .tip {
                position: absolute;
                right: (24/750)*100vw;
                bottom: 0;
                color: red;
                font-size: 12px;
            }
            
            .popup-cover {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .7);
                z-index: 9;

                .popup {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    background-color: #F5F5F5;
                    border-top-left-radius: (16/750)*100vw;
                    border-top-right-radius: (16/750)*100vw;
                    overflow: hidden;
                    animation: popup .5s;

                    @keyframes popup {
                        from {
                            transform: translateY(100%);
                        }
                        to {
                            transform: translateY(0);
                        }
                    }

                    .option-scroll {
                        width: 100%;
                        max-height: 285px;
                        overflow-y: scroll;
                    }

                    .option {
                        width: 100%;
                        height: 57px;
                        border-bottom: 0.5px #E5E5E5 solid;
                        box-sizing: border-box;
                        text-align: center;
                        line-height: 57px;
                        background-color: #fff;
                        color: #333;
                        font-size: 18px;
                    }

                    .cancel {
                        margin-top: 8px;
                        background-color: #fff;
                    }
                    .cancel:active {
                        color: #0F43FF;
                        background-color: rgba(0, 0, 0, .1);
                    }

                    .blue {
                        color: #0F43FF;
                    }
                }
            }
        }
        
    }
}
</style>
