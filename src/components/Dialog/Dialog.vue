<template>
	<div class="overlay">
		<transition name='fade' appear>
			<div class="dialog-box">
				<div class="dialog-content">
					<div class="dialog-title">提示</div>
					<div class="dialog-text">
						<slot name="content"></slot>
					</div>
				</div>
				<div class="dialog-button" @click="confirm">知道了</div>
			</div>
		</transition>
	</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'Dialog',
	emits: ['confirm'],
	setup(props, context) {
		const confirm = (): void => {
            context.emit('confirm')
        }

		return {
			confirm,
		}
	}
});
</script>

<style lang='less' scoped>
.overlay {
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);

	.dialog-box {
		position: relative;
		width: 280px;
		border-radius: 8px;
		background-color: #fff;

		.dialog-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			padding: 20px 12px;
			box-sizing: border-box;

			.dialog-title {
				margin-bottom: 8px;
				font-size: 18px;
				line-height: 25px;
				font-weight: 600;
			}

			.dialog-text {
				font-size: 15px;
				line-height: 21px;
				text-align: center;
			}
		}

		.dialog-button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 49.5px;
			border-top: 0.5px solid #E5E5E5;
			color: #0F43FF;
			font-size: 18px;
			line-height: 25px;
		}

	}
	.fade-enter-active, .fade-leave-active {
		transition: all .3s;
	}
	.fade-enter{
		opacity: 0;
		transform: scale(0.7);
	}
	.fade-enter-to{
		opacity: 1;
		transform: scale(1);
	}
}
</style>
