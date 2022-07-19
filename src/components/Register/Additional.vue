<template>
    <div class="additional">
        <div class="title-register">{{$t('register.additional.title')}}</div>
        <div class="register-input-title">{{$t('register.additional.name')}}</div>
        <div class="form-group col-lg-12">
        <input
            class="register-input col-lg-12"
            type="text" name="name"
            v-model.trim="$v.name.$model"
            v-bind:placeholder="$t('register.additional.name')"
        />
        </div>
        <div v-if="!$v.name.minLength" class="error-mess">{{$t('register.additional.namenovalid')}}</div>
        <div class="register-input-title">{{$t('register.additional.country')}}</div>
        <div class="form-group col-lg-12">
        <div class="d-flex flex-column" style="width: 100%;">
        <b-form-select id="text" class="register-input col-lg-12" v-model="infolocation.country" style="max-height: 60px; width: 100%; padding: 10px;">
             <option v-for="(elem, index) in countries" :key="index" :value="elem">{{ elem }}</option>
        </b-form-select>
        </div>
        </div>
        <label class="register-input-title">{{$t('register.additional.location')}}</label>
        <div class="form-group col-lg-12">
        <input
            type="text"
            name="location"
            v-model="infolocation.location"
            class="register-input col-lg-12"
            v-bind:placeholder="$t('register.additional.location')"
        />
        </div>
        <label class="register-input-title">{{$t('register.additional.city')}}</label>
        <div class="form-group col-lg-12">
        <input
            type="text"
            name="city"
            v-model="infolocation.city"
            class="register-input col-lg-12"
            v-bind:placeholder="$t('register.additional.city')"
        />
        </div>
        <label class="register-input-title">{{$t('register.additional.postal_code')}}</label>
        <div class="form-group col-lg-12">
        <input
            class="register-input col-lg-12"
            type="number" name="postal_code"
            v-model="$v.infolocation.postal_code.$model"
            @focus="postalFlag = true"
            @blur="postalFlag = false"
            v-bind:placeholder="$t('register.additional.postal_code')"
        />
        </div>
        <label class="register-input-title">{{$t('register.additional.birdth')}}</label>
        <div class="form-group col-lg-12">
        <input
            class="register-input col-lg-12"
            type="date" name="dateofbirth"
            v-model="date_of_birth"
            v-bind:placeholder="$t('register.additional.postal_code')"
        />
        </div>
        <div class="sex">
            <label class="register-input-title">{{$t('register.additional.sex')}}</label>
            <div>
                <input type="radio" id="html" name="fav_language" value="male" class="radio" v-model="picked">
                <div @click="sexChange('male')"><img src="@/assets/male-icon.png" class="icon" :class="{'active': isMale}" alt=""></div>
                <input type="radio" id="html" name="fav_language" value="female" class="radio" v-model="picked">
                <div @click="sexChange('female')"><img src="@/assets/female-icon.png" class="icon" :class="{'active': isFemale}" alt=""></div>
            </div>
        </div>
        <div v-if="pickedError" class="error-mess">{{$t('register.additional.pickedError')}}</div>
        <button @click="saveData" class="btn register-submit">{{$t('register.additional.next')}}</button>
        <button @click="notSave" class="btn register-submit">{{$t('register.additional.notSave')}}</button>
    </div>
</template>

<script>
import API from '@/api'
import lookup from 'country-code-lookup'
import ipinfo from '@/store/modules/user'
import {required, minLength, numeric} from 'vuelidate/lib/validators'

export default {
    name: 'additional',
    props: {
        token: String
    },
    data() {
        return {
            name: null,
            country: null,
            countries: [],
            date_of_birth: null,
            infolocation: {
                location: null,
                city: null,
                country: null,
                postal_code: null
            },
            isMale: false,
            isFemale: false,
            sex: null,
            picked: null,
            errorMessage: null,
            postalFlag: false,
            pickedError: false
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(3)
        },
        infolocation: {
            postal_code: {
                minLength: minLength(3),
                required,
                numeric
            }
        }
    },
    methods: {
        sexChange(value) {
            console.log(value)
            if (value === 'male') {
                this.isMale = true
                this.isFemale = false
            } else {
                this.isFemale = true
                this.isMale = false
            }
            this.picked = value
        },
        saveData() {
            // it is possible to create constraints for all variables
            if (this.name.length < 3) {
                return
            }
            if (isNaN(this.infolocation.postal_code)) {
                return
            }
            if (this.picked === null) {
                this.pickedError = true
                return
            }
            if (this.date_of_birth == null) {
                this.date_of_birthError = true
                return
            }
            var info = {
                name: this.name,
                country: this.infolocation.country,
                location: this.infolocation.location,
                city: this.infolocation.city,
                postal_code: this.infolocation.postal_code,
                birdth: this.date_of_birth,
                sex: this.sex
            }
            API.saveAdditionalData(info, this.token)
                .then((res) => {
                    this.$root.$emit('nextStep', this.token)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        notSave() {
            this.$root.$emit('nextStep', this.token)
        },
        getCountries() {
            this.$http.get('https://restcountries.com/v3.1/all').then(function(response) {
                var contries = []
                response.body.forEach(country => {
                    if (country.name.common === 'Tanzania') {
                        return
                    }
                    contries.push(country.name.common)
                })
                this.countries = contries.sort()
            })
        }
    },
    mounted() {
        // get IP information from prod server
        this.infolocation.location = ipinfo.state.ipInfo.region
        this.infolocation.city = ipinfo.state.ipInfo.city
        this.infolocation.country = lookup.byIso(ipinfo.state.ipInfo.country).country
        this.infolocation.postal_code = ipinfo.state.ipInfo.postal
        this.getCountries()
    }
}
</script>

<style scoped>
    .additional {
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
    .register-submit {
        background: #EFEFEF;
        border-radius: 24px;
        color: #4E4E50;
        padding: 10px 40px;
        box-shadow: none;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: 60px;
    }
    .register-submit:hover {
        background: #4E4E50;
        color: #EFEFEF;
    }

    .register-submit:focus {
        outline: none;
    }
    .sex {
        display: inline-flex;
    }
    .sex > div {
        margin-right: 50px;
    }
    .icon {
        width: 50px;
        background-color: #a9a9a9;
        border-radius: 50%;
        padding: 10px;
    }
    input[type= radio] {
        display: none;
    }
    .active {
        background-color: chartreuse;
    }
</style>
