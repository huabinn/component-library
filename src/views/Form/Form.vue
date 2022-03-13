<template>
    <div class="list-box-cover">
        <div class="list-box">
            <div class="list-item">
                <div class="item-cover">
                    <div class="title">标题</div>
                    <div class="item-right" @click="changeShowPopup">
						<div class="input">
							<input type="text" :value="itemValue" disabled placeholder="请选择标题">
						</div>
                        <div class="arrow-right"></div>
                    </div>
                </div>
                <div class="popup-cover" v-if="showPopup" @click="showPopup = false">
					<transition name='fade' appear>
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
					</transition>
                </div>
            </div>
            
            <div class="list-item">
                <div class="item-cover">
                    <div class="title">标题</div>
                    <div class="item-right">
						<div class="input">
							<input type="text" v-model="inputMessage" @blur="formatCheck" placeholder="请正确填写标题">
						</div>
						<div v-if="inputMessage" class="rewrite" @click="clearInputMessage"></div>
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

		const clearInputMessage = (): void => {
			setTimeout(() => {
				inputMessage.value = ""
			}, 250);
		}
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

			clearInputMessage,
            changeShowPopup,
            changeItemValue,
            formatCheck,
			closeDialog,
        }
    }
});
</script>

<style lang='less' scoped>
// 定义视口宽度
@aw: (100 / 750vw);
.list-box-cover {
    width: 100%;
    height: 100vh;
    background-color: #F5F5F5;

    .list-box {
        background-color: #fff;
        .list-item {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 48px;
            padding: 0 24 * @aw;
            box-sizing: border-box;
            color: #000;

            &::after {
                content: '';
                width: 726 * @aw;
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
                    width: 204 * @aw;
                    text-align: left;
					line-height: 24px;
                }

                .item-right {
                    flex: auto;
                    display: flex;
                    align-items: center;
					height: 24px;

					.input {
						flex: auto;
						width: 100%;
						height: 100%;
						
						input {
							width: 100%;
							height: 100%;
							background-color: #fff;
							border: none;
							outline: none;
							text-align: right;
							font-size: 17px;
							line-height: 24px;
						}

						input::-webkit-input-placeholder { /* WebKit browsers */
							color: #ccc;
						}
					}

                    .arrow-right {
						flex: none;
                        width: 20px;
                        height: 24px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        &::after {
                            content: '';
                            width: 11.5px;
                            height: 11.5px;
                            border-right: 1px solid #CCC;
                            border-bottom: 1px solid #CCC;
                            transform: rotateZ(-45deg);
                        }
						&:active {
							&::after {
								border-color: rgb(127, 127, 127);
							}
						}
                    }
					.rewrite {
						flex: none;
						width: 20px;
                        height: 24px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
						box-sizing: border-box;

						&::before, &::after {
							position: absolute;
                            content: '';
                            width: 1px;
                            height: 14px;
							background-color: #CCC;
                        }

						&::before {
							transform: rotateZ(-45deg);
						}

						&::after {
                            transform: rotateZ(45deg);
                        }
						&:active {
							animation: rotate .25s forwards;

							&::before, &::after {
								background-color: rgb(127, 127, 127);
							}
						}

						@keyframes rotate {
							from {
								transform: rotateZ(0);
							}
							to {
								transform: rotateZ(-180deg);
							}
						}
					}
                }
            }

            .tip {
                position: absolute;
                right: 24 * @aw;
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

				.fade-enter-from {
					transform: translateY(100%);
				}
				.fade-enter-to {
					transform: translateY(0);
				}

                .popup {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    background-color: #F5F5F5;
                    border-top-left-radius: 16 * @aw;
                    border-top-right-radius: 16 * @aw;
                    overflow: hidden;
					transition: all 0.5s;
                    /* animation: popup .5s;

                    @keyframes popup {
                        from {
                            transform: translateY(100%);
                        }
                        to {
                            transform: translateY(0);
                        }
                    } */

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

						&:active {
							background-color: rgba(0, 0, 0, .1);
							color: #0F43FF;
						}
                    }					

                    .cancel {
                        margin-top: 8px;
                        background-color: #fff;
						&:active {
							background-color: rgba(0, 0, 0, .1);
							color: #0F43FF;
						}
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
