<template>
    <div class="registration-steps-list">
        <ul style="position: sticky">
            <li v-for="index in totalSteps" :key="index">
                <div class="registration-step">
                    <div v-if="index == currentStep">
                        <div class="registration-step-elem">
                            <i class="fas fa-circle"></i>
                        </div>
                        <div class="step-info">{{$t('register.step'+index)}}</div>
                    </div>
                    <div class="empty-container" v-else>
                        <div class="registration-step-elem empty-elem">
                            <i class="fas fa-circle"></i>
                        </div>
                        <div class="step-info empty-step">{{$t('register.step' + index)}}</div>
                    </div>
                    <div v-if="index < totalSteps" style = "display: inline-block;">
                        <div v-if="index < currentStep" class="registration-step-line">&nbsp;</div>
                        <div v-else class="registration-step-line empty-line">&nbsp;</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'register-stepper',
    data() {
        return {

        }
    },
    props: {
        totalSteps: Number,
        currentStep: Number
    }
}
</script>

<style scoped>

.registration-step {
    display: flex;
    justify-content: center;
}
.registration-step-elem {
    display: inline-block;
    height: 46px;
    width: 46px;
    background: #b8daba;
    color: #232323;
    border-radius: 50%;
    font-size: 6px;
    font-weight: bold;
}
.empty-elem {
    background: #456c3f;
    height: 0px;
    width: 0px;
    margin-right: 10px;
}
.fa-circle {
    position: relative;
    top: 17px;
}
.empty-step {
    margin-top: 32px;
}
.registration-step-line {
    position: relative;
    top: 18px;
    display: inline-block;
    padding: 0px;
    margin: 0px;
    width: 150px;
    height: 2px;
    align-items: center;
    justify-content: center;
    background: #ECF0F1;
    vertical-align: middle;
    margin-left: -6px;
}
.registration-steps-list {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: -999999;
}
.registration-steps-list li {
    display: inline-block;
}
.empty-container {
    z-index: 10000;
}
ul {
    padding-inline-start: 0!important;
}
@media (max-width: 1600px) and (min-width: 768px) {
    .registration-step-elem {
        height: 32px;
        width: 32px;
        margin-bottom: 8px;
    }
    .fa-circle {
        top: 11px;
    }
    .registration-step-line {
        top: 13px;
        margin-left: -10px;
    }
    .empty-step {
        margin-left: -12px;
        margin-top: 25px;
    }
    .empty-elem {
        width: 18px;
        height: 8px;
    }
    .step-info {
        font-size: 14px;
    }
}
</style>
