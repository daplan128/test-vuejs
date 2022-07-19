<template>
    <div class="register-box create">
        <Header />
        <div class="register-wrapper d-flex">
            <div class="container col-lg-6">
                <div class = "step-container">
                    <div class = "row registration-steps-row">
                        <div class = "col-xs-12">
                            <div class = "registration-steps-container">
                                <Stepper :totalSteps="totalSteps" :currentStep="currentStep"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    <main-block v-if="currentStep === 1"></main-block>
                    <aditional-block v-if="currentStep === 2" :token="token"></aditional-block>
                    <!--<photo-block v-if="currentStep === 3"></photo-block>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Stepper from './RegisterStepper'
import MainBlock from './Main'
import AditionalBlock from './Additional'

export default {
    name: 'Register-box',
    components: {
        Stepper,
        'main-block': MainBlock,
        'aditional-block': AditionalBlock
    },
    data() {
        return {
            totalSteps: 3,
            currentStep: 2,
            token: undefined
        }
    },
    mounted: function () {
        this.$root.$on('nextStep', (block) => {
            this.token = block
            this.currentStep++
        })
    }
}
</script>

<style scoped>
    .container-progress {
        margin: 0 auto;
    }
    .register-box {
        background-color: #456c3f;
        min-height: 100vh;
    }
    .step2-container {
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid rgba(78, 78, 80, 0.3);
    }
    .step-wrapper {
        border-radius: 10px;
    }
    .step-container {
        padding: 64px 0;
    }

    .registration-steps-row {
        text-align: center;
        align-items: center;
        justify-content: center;
    }
    .steps {
        color: #4E4E50;
        font-size: 16px;
        position: relative;
        font-weight: bold;
    }
    .step1r2 {
        right: 76px!important;
    }
    .step2 {
        display: flex;
    }
    .container-fluid {
        padding: 0px 200px;
    }
</style>
