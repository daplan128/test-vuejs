<template>
    <div class="register-box">
        <div class="title-register">{{$t('register.title')}}</div>
        <div class="register-input-title">{{$t('register.typedocument')}}</div>
        <div class="form-group col-lg-12">
        <div class="d-flex flex-column" style="width: 100%;">
        <b-form-select id="text" class="register-input col-lg-12" v-model="documentType" style="max-height: 60px; width: 100%; padding: 10px;">
            <option :value="1">{{$t('register.pasaport')}}</option>
            <option :value="2">{{$t('register.id')}}</option>
        </b-form-select>
        </div>
        </div>
        <div v-if="documentTypeRegister" class="error-mess general-error" style="margin-top: 10px;">{{ errorMessage }}</div>
        <div class="register-input-title">{{$t('register.ducumentNumber')}}</div>
        <div class="form-group col-lg-12">
        <input
            class="register-input col-lg-12"
            type="text" name="documentNumber"
            v-model="document_number"
            v-on:blur="validDocument"
            v-on:focus="resetError"
            @keyup="documentChange()"
            :class="status($v.document_number, document_numberFlag)"
            v-bind:placeholder="$t('register.ducumentNumber')"
        />
        </div>
        <div class="error-mess" v-if="!$v.document_number.required && document_numberError && !document_numberFlag">{{$t('register.error0')}}</div>
        <div class="error-mess" v-else-if="!$v.document_number.minLength && !document_numberFlag">{{$t('register.error01')}}</div>
        <div class="error-mess" v-else-if="!$v.document_number.documentvalidator && !document_numberFlag">{{$t('register.error02')}}</div>
        <div class="info-message error" v-if="documentError">{{errorMessage}}</div>
        <label class="register-input-title">{{$t('register.stagename')}}</label>
        <div class="form-group col-lg-12">
        <input
            type="text"
            name="nickname"
            class="register-input col-lg-12"
            v-model="$v.nicknameValue.$model"
            v-on:focus="resetError"
            v-on:blur="validUser"
            @keyup="nicknameChange()"
            :class="status($v.nicknameValue, nickFlag)"
            v-bind:placeholder="$t('register.stagename')"
        />
        </div>
        <div class="error-mess" v-if="!$v.nicknameValue.required && nicknameError && !nickFlag">{{$t('register.error1')}}</div>
        <div class="error-mess" v-else-if="(!$v.nicknameValue.minLength || !$v.nicknameValue.maxLength) && !nickFlag">{{$t('register.error2')}}</div>
        <div class="error-mess" v-else-if="!$v.nicknameValue.nicknameValidator && !nickFlag">{{$t('register.error3')}}</div>
        <div class="error-mess" v-else-if="stagenameError">{{errorMessage}}</div>
        <label class="register-input-title">{{$t('register.email')}}</label>
    <div class="form-group col-lg-12">
        <input
            type="email"
            name="email"
            class="register-input col-lg-12"
            v-model.lazy="$v.emailValue.$model"
            :class="status($v.emailValue, emailFlag)"
            @keyup="emailChange()"
            @focus="emailFlag = true"
            @blur="emailFlag = false"
            placeholder="name@email.com"
        />
    </div>
    <div v-if="!$v.emailValue.email && !emailFlag" class="error-mess">{{$t('register.emailnovalid')}}</div>
    <div v-if="emailError" class="error-mess general-error" style="margin-top: 25px;">{{ errorMessage }}</div>
    <label class="register-input-title">{{$t('register.password')}}</label>
    <div class="form-group col-lg-12">
        <input
            type="password"
            name="password"
            class="register-input col-lg-12"
            v-model.trim="$v.passValue.$model"
            :class="status($v.passValue, passFlag)"
            @focus="passFlag = true"
            @blur="passFlag = false"
            placeholder="**********"
        />
    </div>
    <div v-if="!$v.passValue.minLength" class="error-mess">{{$t('register.passnovalid')}}</div>
    <div v-if="!$v.passValue.goodPassword" class="error-mess">{{$t('register.passnogood')}}</div>
    <label class="register-input-title">{{$t('register.repassword')}}</label>
    <div class="form-group col-lg-12">
        <input
            type="password"
            name="password"
            class="register-input col-lg-12"
            v-model.trim="$v.repeatPassword.$model"
            :class="status($v.repeatPassword, passFlag)"
            @focus="repeatpassFlag = true"
            @blur="repeatpassFlag = false"
            placeholder="**********"
        />
    </div>
    <div v-if="!$v.repeatPassword.sameAsPassword" class="error-mess">{{$t('register.repassnovalid')}}</div>
    <label class="register-input-title">{{$t('register.phoneNumber')}}</label>
    <div class="form-group col-lg-12">
        <vue-tel-input
        v-model.lazy="$v.phoneValue.$model"
        onpaste="return false;"
        @onInput="onInput"
        @keyup.enter="onEnter"
        @keypress.native="numberPhoneChange"
        :preferredCountries="['co']"
        v-bind:placeholder="$t('register.phoneNumber')"
        >
        </vue-tel-input>
    </div>
    <button @click="saveData" class="btn register-submit" :disabled="disableButton">{{$t('register.next')}}</button>
    </div>
</template>

<script>
import API from '@/api'
import FilterPhoneNumberInput from '../../utils/FilterPhoneNumberInput'
import {required, minLength, maxLength, email, numeric, sameAs} from 'vuelidate/lib/validators'
const nicknameValidator = (value) => !(new RegExp('[\\/+@?=:#;,$&. ]').test(value)) // modify this expression depending on the conditions
const documentvalidator = (value) => !(new RegExp('[\\/+@?=:#;,$&. ]').test(value)) // modify this expression depending on the conditions

export default {
    name: 'Home',
    components: {

    },
    data() {
        return {
            documentType: 2,
            documentTypeRegister: false,
            document_numberFlag: false,
            document_number: null,
            document_numberError: false,
            documentError: false,
            nickFlag: false,
            nicknameValue: null,
            stagenameError: false,
            nicknameError: false,
            emailValue: null,
            emailFlag: false,
            emailError: false,
            passValue: '',
            passFlag: false,
            passError: false,
            repeatPassword: '',
            repeatPasswordError: false,
            phoneValue: null,
            errorMessage: null,
            disableButton: false,
            ErrorWithLegals: false
        }
    },
    validations: {
        emailValue: {
            required,
            email
        },
        passValue: {
            required,
            minLength: minLength(8),
            goodPassword: (password) => {
                if (password === '') {
                    return true
                } else {
                    return /[a-z]/.test(password) &&
                    /[A-Z]/.test(password) &&
                    /[0-9]/.test(password)
                }
            }
        },
        repeatPassword: {
            sameAsPassword: sameAs('passValue')
        },
        nicknameValue: {
            required,
            maxLength: maxLength(15),
            minLength: minLength(3),
            nicknameValidator
        },
        document_number: {
            minLength: minLength(3),
            required,
            numeric,
            documentvalidator
        },
        phoneValue: {
            required,
            numeric
        }
    },
    methods: {
        documentChange: function () {
            API.Checkdocument(this.document_number, this.documentType)
                .then(isAvailable => {
                    if (!isAvailable) {
                        this.errorMessage = this.$t('errors.documentTaken')
                        this.documentError = true
                    } else {
                        this.documentError = false
                    }
                })
        },
        status(validation, flag) {
            if (!flag) {
                return {
                    error: validation.$error,
                    dirty: validation.$dirty
                }
            }
        },
        nicknameChange: function () {
            API.nickNameCheck(this.nicknameValue)
                .then(isAvailable => {
                    if (!isAvailable) {
                        this.errorMessage = this.$t('errors.nickNameTaken')
                        this.nicknameError = true
                    } else {
                        this.nicknameError = false
                    }
                })
        },
        resetError: function (type) {
            if (type === 'text') {
                this.textError = false
            } else {
                this.mediaError = false
            }
        },
        validUser: function () {
            var regExp = new RegExp('[\\/+@?=:#;,$&. ]')
            this.nickFlag = false
            if (this.nicknameValue === null || this.nicknameValue.length === 0) {
                this.nicknameError = true
                return 0
            } else if (this.nicknameValue.trim().length < 3 || this.nicknameValue.trim().length > 15) {
                this.nicknameError = true
                return 0
            } else if (regExp.test(this.nicknameValue.trim())) {
                this.nicknameError = true
                return 0
            }
            return 1
        },
        validDocument: function () {
            var regExp = new RegExp('[\\/+@?=:#;,$&. ]')
            this.document_numberFlag = false
            if (this.document_number === null || this.document_number.length === 0) {
                this.document_numberError = true
                return 0
            } else if (this.document_number.trim().length < 3 || this.document_number.trim().length > 15) {
                this.document_numberError = true
                return 0
            } else if (regExp.test(this.document_number.trim())) {
                this.document_numberError = true
                return 0
            }
            return 1
        },
        emailChange: function () {
            API.emailCheck(this.emailValue)
                .then(isAvailable => {
                    if (!isAvailable) {
                        this.errorMessage = this.$t('errors.EmailTaken')
                        this.nicknameError = true
                    } else {
                        this.nicknameError = false
                    }
                })
        },
        onInput ({number, isValid, country}) {
            this.phoneError = false
            this.validPhone = isValid
            this.emailError = false
        },
        numberPhoneChange: function (evt) {
            API.phoneCheck(this.phoneValue)
                .then(isAvailable => {
                    if (!isAvailable) {
                        this.errorMessage = this.$t('errors.phoneTaken')
                        this.phoneError = true
                    } else {
                        this.phoneError = false
                    }
                })
            FilterPhoneNumberInput(evt)
        },
        validEmail: function (email) {
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex.test(email)
        },
        validPass: function(pass) {
            return /[a-z]/.test(pass) &&
                    /[A-Z]/.test(pass) &&
                    /[0-9]/.test(pass) &&
                    pass.length >= 8
        },
        onEnter () {
            this.saveData()
        },
        saveData: function() {
            // this.disableButton = true
            this.emailError = false
            this.documentTypeRegister = false
            this.document_numberError = false
            this.nicknameError = false
            if (this.document_number === null || !this.validDocument || this.documentError) {
                this.disableButton = false
                return
            }
            if (!this.validUser || this.nicknameError) {
                this.disableButton = false
                return
            }
            if (!this.validEmail(this.emailValue) || this.emailError) {
                this.disableButton = false
                return
            }
            if (!this.validPass(this.passValue)) {
                this.disableButton = false
                return
            }
            if (this.passValue !== this.repeatPassword) {
                this.disableButton = false
                return
            }
            if (this.phoneError) {
                this.disableButton = false
                return
            }
            if (this.validUser() === 1 && this.validDocument() === 1) {
                var info = {
                    stagename: this.nicknameValue
                }
                API.register(info)
                    .then((res) => {
                        this.saveEmailInfo(res.token)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        saveEmailInfo(token) {
            var info = {
                email: this.emailValue,
                password: this.passValue
            }
            API.saveEmail(info, token)
                .then(res => {
                    this.savePersonalInfo(res.token)
                })
        },
        savePersonalInfo(token) {
            var info = {
                type_document: this.documentType,
                document: this.document_number,
                phone: this.phoneValue
            }
            API.saveInfo(info, token)
                .then(() => {
                    this.succesResgister = true
                    this.$root.$emit('nextStep', token)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    beforeMount() {

    }
}
</script>

<style scoped>
    .register-box {
        text-align: center;
    }
    .register-input-title {
        padding: 25px;
        color: azure;
    }
    .title-register {
        color: azure;
        font-size: 35px;
    }
    .register-input {
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

    /deep/ .vue-tel-input.register-input .dropdown {
        outline: none;
    }

    /deep/ .vue-tel-input > input {
        background-color: transparent;
    }

    /deep/ .vue-tel-input.register-input:hover .general-error {
        display: none;
    }
    /deep/ .vue-tel-input {
        border: 2px solid rgba(78, 78, 80, 0.5);
        border-radius: 16px;
        box-shadow: none!important;
        outline: none;
        width: 100%;
        background: azure;
        height: 50px;
    }
    .register-submit {
        background: #EFEFEF;
        border-radius: 24px;
        color: #4E4E50;
        padding: 10px 40px;
        box-shadow: none;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: 32px;
    }
    .register-submit:hover {
        background: #4E4E50;
        color: #EFEFEF;
    }

    .register-submit:focus {
        outline: none;
    }

</style>
