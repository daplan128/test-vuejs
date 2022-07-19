<template>
    <div class="login-box">
        <div class="login-center">
            <div class="title-login">{{$t('login.title')}}</div>
            <div class="login-input-title">{{$t('login.nick')}}</div>
            <div class="form-group col-lg-12">
            <input
                class="login-input col-lg-12"
                type="text" name="documentNumber"
                v-model="nickname"
                v-on:blur="validNick"
                v-bind:placeholder="$t('login.nickname')"
            />
            </div>
            <div class="login-input-title">{{$t('login.password')}}</div>
            <div class="form-group col-lg-12">
            <input
                class="login-input col-lg-12"
                type="password" name="documentNumber"
                v-model="password"
                v-bind:placeholder="'*******'"
            />
            </div>
            <button @click="login" class="btn login-submit" :disabled="disableButton">{{$t('login.login')}}</button>
        </div>
    </div>
</template>

<script>
import API from '@/api'

export default {
    name: 'Login',
    data() {
        return {
            nickname: null,
            password: null
        }
    },
    methods: {
        login() {
            var info = {
                stagename: this.nickname,
                password: this.password
            }
            API.login(info)
                .then((res) => {

                })
        }
    }
}
</script>

<style scoped>
    .login-box {
        text-align: center;
        background-color: rgba(0, 128, 0, 0.6);
        min-height: 100vh;
    }
    .login-center {
        position: absolute;
        top: 50%; right: 50%;
        transform: translate(50%,-50%);
    }
    .login-input-title {
        padding: 25px;
        color: azure;
    }
    .title-login {
        color: azure;
        font-size: 35px;
    }
    .login-input {
        border: 2px solid rgba(78, 78, 80, 0.5);
        border-radius: 16px;
        padding: 16px;
        box-shadow: none!important;
        outline: none;
        margin-bottom: 32px;
        height: 50px;
        max-height: 50px;
        width: 100%;
    }
    .error-mess {
        position: relative;
        bottom: 50px;
        font-size: 12px;
        align-self: flex-start;
        margin: 8px 0 0 15px;
        color: #FF0000;
    }
    .login-submit {
        background: #EFEFEF;
        border-radius: 24px;
        color: #4E4E50;
        padding: 10px 40px;
        box-shadow: none;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: 32px;
    }
    .login-submit:hover {
        background: #4E4E50;
        color: #EFEFEF;
    }
</style>
