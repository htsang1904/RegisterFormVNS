<template>
  <div>
    <div id="app">
      <div class="language-toggle">
        <img
          :src="isEnglish ? '/icons/en.svg' : '/icons/vi.svg'"
          alt="Lang"
          class="lang-icon"
        />
        <DxSwitch
          :value="isEnglish"
          @value-changed="onLanguageSwitch"
          switched-on-text="EN"
          switched-off-text="VI"
        />
      </div>
      <div class="container">
        <div class="header">
          <div class="header-logo">
            <img src="./assets/logo-vns.png" alt="">
          </div>
          <div class="header-title">
            <div class="title">
              {{ $t('message.registerTitle') }}
            </div>
            <div class="des">
              REGISTRATION FORM
              <br>
              VIETNAMESE PROFICIENCY TEST - 19 JULY, 2025 
            </div>
          </div>
        </div>
        <div class="form">
          <DxForm :form-data="formData" width="100%" label-mode="floating" :show-colon-after-label="true"
            ref="registerForm">
            <DxGroupItem :caption="$t('message.titleGroupItem1')" css-class="custom-dxGroupItem">
              <DxItem data-field="candidateName" :editor-options="{ height: 34, placeholder: 'vd: Huynh Thanh Sang' }">
                <DxLabel :text="$t('message.candidateName')" />
                <DxRequiredRule :message="$t('message.requiredCandidateName')" />
              </DxItem>
              <DxItem data-field="candidateBirth" editor-type="dxDateBox" :editor-options="{
                height: 34,
                displayFormat: 'dd/MM/yyyy',
                invalidDateMessage: $t('message.invalidBirth'),
                placeholder: 'dd/mm/yyyy'
              }">
                <DxLabel :text="$t('message.candidateBirth')" />
                <DxRequiredRule :message="$t('message.requiredBirth')" />
              </DxItem>
              <DxItem data-field="passportCode" editor-type="dxTextBox" :editor-options="{
                showClearButton: true,
              }">
                <DxLabel :text="$t('message.passportCode')" />
                <DxRequiredRule :message="$t('message.requiredPassport')" />
                <DxPatternRule
                  :pattern="/^[A-Z0-9]{5,15}$/i"
                  :message="$t('message.invalidPassport')"
                />
              </DxItem>
              <DxItem data-field="candidateNationality" :editor-options="{ height: 34, placeholder: 'vd: Viet Nam' }">
                <DxLabel :text="$t('message.candidateNationality')" />
                <DxRequiredRule :message="$t('message.requiredNationality')" />
              </DxItem>
              <DxItem data-field="gender" editor-type="dxRadioGroup"  css-class="custom-dxRadioGroup" :editor-options="{
                items: [$t('message.male'), $t('message.female')],
                layout:'horizontal',
              }">
                <DxLabel :text="$t('message.gender')" />
                <DxRequiredRule :message="$t('message.requiredGender')" />
              </DxItem>
            </DxGroupItem>

            <DxGroupItem :caption="$t('message.titleGroupItem2')" css-class="custom-dxGroupItem">
              <DxItem data-field="phoneNumber" :editor-options="{ height: 34}">
                <DxLabel :text="$t('message.phoneNumber')" />
                <DxRequiredRule :message="$t('message.requiredPhone')" />
                <DxPatternRule
                  :pattern="/^\+?[0-9]{6,15}$/"
                  :message="$t('message.invalidPhone')"
                />
              </DxItem>
              <DxItem data-field="email" :editor-options="{ height: 34 }">
                <DxLabel text="Email" />
                <DxRequiredRule :message="$t('message.requiredEmail')" />
                <DxEmailRule :message="$t('message.invalidEmail')"/>
              </DxItem>
              <DxItem data-field="candidateAddress" :editor-options="{ height: 34 }">
                <DxLabel :text="$t('message.candidateAddress')" />
                <DxRequiredRule :message="$t('message.requiredAddress')" />
              </DxItem>
            </DxGroupItem>

            <DxGroupItem :caption="$t('message.titleGroupItem3')" css-class="custom-dxGroupItem">
              <DxItem
                data-field="card_image"
                template="card-image"
              >
              </DxItem>
              <DxItem
                data-field="passport_image"
                template="front-passport-image"
              >
              </DxItem>
              <!-- <DxItem
                data-field="back_passport_image"
                template="back-passport-image"
              >
              </DxItem> -->
            </DxGroupItem>

            <DxGroupItem :caption="$t('message.titleGroupItem4')" css-class="custom-dxGroupItem">
              <DxItem
                data-field="payment_image"
                template="payment-image"
              >
              </DxItem>
            </DxGroupItem>
            <DxItem
                data-field="card_image"
                template="captcha"
              >
              </DxItem>
            <DxButtonItem css-class="submit-btn", :button-options="buttonOptions" />
            <template #captcha="{data}">
              <div class="captcha-container">
                <vue-recaptcha 
                  class="recaptcha" 
                  ref="recaptcha" 
                  sitekey="6LfcsT4rAAAAAC9uDP0l4rIwbM1FAlvIlHvvvwJi"
                  :key="recaptchaLanguage"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired">
                  
                </vue-recaptcha>
              </div>
            </template>
            <template #card-image="{data}">
              <div>
                 <DxFileUploader
                  ref="cardUploader"
                  class="custom-uploader"
                  :select-button-text="$t('message.uploadCardImage')"
                  label-text=""
                  width="100%"
                  accept="image/*"
                  upload-mode="useForm"
                  upload-url="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
                  :input-attr="{ 'aria-label': $t('message.uploadCardImage') }"
                  @valueChanged="handleCardImageChange"
                />
              </div>
            </template>
            <template #front-passport-image>
              <div>
                 <DxFileUploader
                 ref="passportUploader"
                 class="custom-uploader"
                  :select-button-text="$t('message.uploadPassportImage')"
                  label-text=""
                  width="100%"
                  accept="image/*"
                  upload-mode="useForm"
                  upload-url="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
                  :input-attr="{ 'aria-label': $t('message.uploadPassportImage') }"
                  @valueChanged="handlePassportImageChange"
                />
              </div>
            </template>
            <template #back-passport-image>
              <div>
                 <DxFileUploader
                 ref="backPassportUploader"
                 class="custom-uploader"
                  :select-button-text="$t('message.uploadBackPassportImage')"
                  label-text=""
                  width="100%"
                  accept="image/*"
                  upload-mode="useForm"
                  upload-url="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
                  :input-attr="{ 'aria-label': $t('message.uploadBackPassportImage') }"
                  @valueChanged="handleBackPassportImageChange"
                />
              </div>
            </template>
            <template #payment-image>
              <div>
                 <DxFileUploader
                 ref="paymentUploader"
                 class="custom-uploader"
                  :select-button-text="$t('message.uploadPaymentImage')"
                  label-text=""
                  width="100%"
                  accept="image/*"
                  upload-mode="useForm"
                   upload-url="https://js.devexpress.com/Demos/NetCore/FileUploader/Upload"
                  :input-attr="{ 'aria-label': $t('message.uploadPaymentImage') }"
                  @valueChanged="handlePaymentImageChange"
                />
                <!-- <div class="payment-guide" @click="openPaymentDetailPopup">{{ $t('message.paymentGuide') }}</div> -->
              </div>
            </template>
          </DxForm>
        </div>
      </div>
      <DxPopup
        :visible="isShowPaymentDetail"
        :show-title="true"
        :title="$t('message.paymentDetailTitle')"
        width="90%"
        :max-width="500"
        height="90vh"
        :show-close-button="true"
        :drag-enabled="false"
        :onHidden="closePopup"
        :wrapper-attr="{ class: 'custom-popup' }"
      >
        <div class="content">
          <div class="detail">
            <strong>{{ $t('message.examFee') }}:</strong> 3.000.000 VNĐ
            <br>
            <strong>{{$t('message.transferContent')}}:</strong> {{ $t('message.transferNote') }}
          </div>
          <div class="qr-code">
            <p>{{ $t('message.scanQRCode') }}</p>
            <p><strong>{{ $t('message.note') }}:</strong> <i>{{ $t('message.screenshotNote') }}</i></p>
            <img src="../src/assets/qr-code.jpeg" alt="">
          </div>
        </div>
      </DxPopup>
      <DxPopup
        :visible="isShowFormDetail"
        :show-title="true"
        :title="$t('message.titleRegisterPopup')"
        width="90%"
        max-width="800px"
        height="90vh"
        :fullScreen="isFullScreen"
        :show-close-button="true"
        :drag-enabled="false"
        :onHidden="closeFormPopup"
        :onShown="openPdfPopup"
        :wrapper-attr="{ class: 'custom-popup' }"
      >
        <div id="pdf-content" class="pdf-file" style="height: 100%; font-family: Tinos;">
             <div class="top-header" style="display: flex; justify-content: space-between;">
              <div class="left-header" style="text-align: center;"> 
                TRƯỜNG ĐẠI HỌC KHOA HỌC XÃ HỘI & NHÂN VĂN
                <br>
                <strong>KHOA VIỆT NAM HỌC</strong>
                <br>
                <div style="font-style: italic;">
                  UNIVERSITY OF SOCIAL SCIENCES AND HUMANITIES
                  <br>         
                  <strong>FACULTY OF VIETNAMESE STUDIES</strong> 
                </div>
              </div>
               <div class="right-header" style="text-align: center;"> 
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM 
                <br>
                Độc lập – Tự do – Hạnh phúc 
                <br>
                <div class="sub-text" style="font-style: italic; font-size: 14px;">
                  SOCIALIST REPUBLIC OF VIETNAM
                  <br>         
                  Independence – Freedom – Happiness
                </div>
              </div>
             </div>
             <div class="bottom-header" style="font-weight: bold;margin-top: 20px;text-align: center;font-size: 18px;">
                MẪU ĐĂNG KÝ DỰ THI  
                <br>
                KỲ THI CHỨNG CHỈ TIẾNG VIỆT - {{ formatDateBoth("19/7/2025").original }}
                <br>
                <div style="font-style: italic;">
                  REGISTRATION FORM
                  <br>         
                  VIETNAMESE PROFICIENCY TEST - {{ formatDateBoth("19/7/2025").formatted }}
                </div>
             </div>
             <div class="body" style="display: flex;flex-direction: column;justify-content: center;padding: 40px; padding-bottom: 100px;">
              <div class="top-body" style="display: flex;justify-content: center;align-items: center;">
                <div class="img">
                  <img style="width: 100px; margin-right: 20px;" :src="formData.card_image" alt="">
                </div>
              <div class="info" style="flex: 3">
                <div class="row" style="margin-top: 10px;display: flex;">
                  <div style="display: flex; flex-direction: column;">
                    1. Họ và tên (ghi đầy đủ như trong hộ chiếu):
                    <div style="font-style: italic;">
                      Full name (as written in passport) 
                    </div>
                  </div>
                  <div style="margin-left: 10px; font-weight: bold;">
                    {{ formData.candidateName }}
                  </div>
                </div>
                <div class="row" style="display: flex;">
                  <div  style="margin-top: 10px;display: flex; width: 50%;">
                   <div style="display: flex; flex-direction: column;">
                     2. Ngày sinh:
                     <div style="font-style: italic;">
                       Date of birth 
                     </div>
                   </div>
                   <div style="margin-left: 10px; font-weight: bold;">
                     {{ formatBirth(formData.candidateBirth) }}
                   </div>
                 </div>
                 <div  style="margin-top: 10px; margin-left: 10px;display: flex; width: 50%;">
                   <div style="display: flex; flex-direction: column;">
                      Giới tính:
                      <div style="font-style: italic;">
                      Gender 
                      </div>
                   </div>
                   <div style="margin-left: 10px; font-weight: bold;">
                     {{ formData.gender }}
                   </div>
                 </div>
                </div>
                <div class="row" style="display: flex;">
                  <div  style="margin-top: 10px;display: flex; width: 50%;">
                   <div style="display: flex; flex-direction: column;">
                      3. Quốc tịch: 
                      <div style="font-style: italic;">
                        Nationality
                      </div>
                   </div>
                   <div style="margin-left: 10px; font-weight: bold;">
                     {{ formData.candidateNationality }}
                   </div>
                 </div>
                 <div  style="margin-top: 10px; margin-left: 10px;display: flex; width: 50%;">
                   <div style="display: flex; flex-direction: column;">
                      Số hộ chiếu:
                      <div style="font-style: italic;">
                        Passport number
                      </div>
                   </div>
                   <div style="margin-left: 10px; font-weight: bold;">
                     {{ formData.passportCode }}
                   </div>
                 </div>
                </div>
              </div>
              </div>
              <div class="row" style="margin-top: 10px;display: flex;">
                <div style="display: flex; flex-direction: column;">
                  4. Địa chỉ:
                  <div style="font-style: italic;">
                    Address 
                  </div>
                </div>
                <div style="margin-left: 10px; font-weight: bold;">
                  {{ formData.candidateAddress }}
                </div>
              </div>
              <div class="row" style="display: flex; justify-content: space-between;">
                <div  style="margin-top: 10px;display: flex; width: 50%;">
                  <div style="display: flex; flex-direction: column;">
                    5. Điện thoại: 
                    <div style="font-style: italic;">
                      Phone number
                    </div>
                  </div>
                  <div style="margin-left: 10px; font-weight: bold;">
                    {{ formData.phoneNumber }}
                  </div>
                </div>
                <div  style="margin-top: 10px; margin-left: 10px;display: flex; width: 50%;">
                  <div style="display: flex; flex-direction: column;">
                    Email:
                  </div>
                  <div style="margin-left: 10px; font-weight: bold;">
                    {{ formData.email }}
                  </div>
                </div>
              </div>
              <div class="row" style="display: flex; justify-content: space-between;">
                <div  style="margin-top: 10px;display: flex; width: 50%;">
                  <div style="display: flex; flex-direction: column;">
                   <div>
                     6. Lệ phí thi: Đã đóng <input type="checkbox" :checked="hasPaid" disabled>
                  </div>
                    <div style="font-style: italic;">
                      Exam fee: Paid
                    </div>
                  </div>
                </div>
               <div  style="margin-top: 10px;display: flex; width: 50%;">
                  <div style="display: flex; flex-direction: column;">
                   <div>
                    Chưa đóng <input type="checkbox" name="option1" :checked="!hasPaid" disabled>
                  </div>
                    <div style="font-style: italic;">
                      Not yet paid.
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" style="margin-top: 30px;display: flex;">
                <p style="text-indent: 2em;">
                Thí sinh đồng ý tuân thủ tất cả các quy định về kỳ thi Năng lực tiếng Việt tại Khoa Việt Nam học, trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc Gia Hồ Chí Minh. 
                </p>
              </div>
              <div class="row" style="margin-top: 20px;display: flex;">
                <p style="text-indent: 2em;">
                I agree to comply with all regulations regarding the Vietnamese Proficiency Test at the Faculty of Vietnamese Studies, University of Social Sciences and Humanities, Vietnam National University Ho Chi Minh City.  
                </p>
              </div>
              <div class="row" style="margin-top: 20px;display: flex;">
                <div style="display: flex; flex-direction: column;">
                 Hộ chiếu của thí sinh kèm theo
                  <div style="font-style: italic;">
                    The applicant's passport is attached
                  </div>
                </div>
              </div>
              <div class="row" style="margin-top: 20px;display: flex;">
                  <div class="img">
                    <img style="height: 150px;" :src="formData.passport_image" alt="">
                  </div>
              </div>
             </div>
        </div>
        <div class="footer">
          <button @click="sendMail">{{ $t('message.submitButton') }}</button>
        </div>
      </DxPopup>
    </div>
    <DxLoadPanel
      :visible="loadingVisible"
      :show-indicator="true"
      :show-pane="true"
      shading-color="rgba(0,0,0,0.4)"
    />
  </div>
</template>

<script>
import {
  DxForm,
  DxItem,
  DxLabel,
  DxGroupItem,
  DxRequiredRule,
  DxButtonItem,
  DxEmailRule,
  DxAsyncRule,
  DxRangeRule,
} from 'devextreme-vue/form';
import DxRadioGroup from 'devextreme-vue/radio-group';
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import notify from 'devextreme/ui/notify';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import {
  DxValidator,
  DxPatternRule,
  DxCustomRule
} from 'devextreme-vue/validator';
import DxPopup from 'devextreme-vue/popup';
import moment from 'moment';
import { DxSwitch } from 'devextreme-vue/switch';
import html2pdf from 'html2pdf.js';
import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL
const siteKey = process.env.VUE_APP_CAPTCHA_KEY
export default {
  name: 'App',
  components: {
    DxForm,
    DxItem,
    DxLabel,
    DxGroupItem,
    DxRequiredRule,
    DxButtonItem,
    DxEmailRule,
    DxValidator,
    DxPatternRule,
    DxAsyncRule,
    DxRangeRule,
    DxLoadPanel,
    DxRadioGroup,
    DxCustomRule,
    DxFileUploader,
    DxPopup,
    DxSwitch,
  },
  computed: {
    form() {
      return this.$refs.registerForm.instance;
    },
    hasPaid() {
      return this.formData.payment_image ? true : false;
    }
  },
  // created() {
  //   loadMessages(enMessages);
  //   locale('en');
  // },
  mounted() {
    this.defaultFormData()
    if (window.innerWidth <= 768) {
      this.isFullScreen = true
    } else {
      this.isFullScreen = false
    }
    console.log(this.$refs.recaptcha)
  },
  data() {
    return {
      recaptchaLanguage: 'en',
      formData: {},
      isEnglish: true,
      isFullScreen: false,
      loadingVisible: false,
      siteKey: siteKey,
      gender: [
        {
          label: "Nam",
          value: 1
        },
        {
          label: "Nữ",
          value: 2
        }
      ],
      buttonOptions: {
        text: 'Create Template',
        useSubmitBehavior: true,
        width: '100%',
        onClick: () => {
          this.handleSubmit()
        },
      },
      isShowPaymentDetail: false,
      pdfFile: null,
      isShowFormDetail: false,
      paymentImage: null,
      cardImage: null,
      passportImage: null,
      backPassportImage: null,
      isVerified: false,
      captchaToken: ''
    }
  },
  methods: {
    onCaptchaVerified(token) {
      this.isVerified = true
      this.captchaToken = token
      console.log(this.captchaToken)
    },
    onCaptchaExpired() {
      this.isVerified = false
      this.captchaToken = ''
    },
    async generatePDF() {
  const element = document.getElementById("pdf-content");

  if (!element) {
    console.warn("Không tìm thấy phần tử #pdf-content");
    return;
  }

  try {
    const pdfInstance = html2pdf().set({
      margin: 6,
      filename: 'DonDangKyThi-ExamReg.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 ,ignoreElements: (element) => {
      return element.tagName === 'IFRAME'; 
    }},
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element);

    const pdfBlob = await pdfInstance.output('blob');

    this.pdfFile = new File([pdfBlob], 'DonDangKyThi-ExamReg.pdf', {
      type: 'application/pdf',
    });

  } catch (err) {
    console.error('Lỗi khi generatePDF:', err);
  }
},
    updateViewTemplateText() {
      this.buttonOptions.text = this.$t('message.viewTemplate');
    },
     onLanguageSwitch(e) {
      this.isEnglish = e.value;
      const lang = e.value ? 'en' : 'vi';
      this.$i18n.locale = lang;
      localStorage.setItem('lang', lang);
      this.formData.gender = this.$t('message.male')
      this.updateViewTemplateText()
    },
    formatBirth(date) {
      return moment(date).format("MMM Do YY")
    },
    handleCardImageChange(e) {
      const file = e.value[0];
      if (file && file.type.startsWith('image/')) {
        console.log(file.type.startsWith('image/'))
        const reader = new FileReader();
        reader.onload = () => {
          this.formData.card_image = reader.result;
          this.cardImage = file
        };
        reader.readAsDataURL(file);
      } else {
        this.formData.card_image = null;
      }
    },
    handlePaymentImageChange(e) {
      const file = e.value[0];
      if (file && file.type.startsWith('image/')) {
        console.log(file.type.startsWith('image/'))
        const reader = new FileReader();
        reader.onload = () => {
          this.formData.payment_image = reader.result;
          this.paymentImage = file
        };
        reader.readAsDataURL(file);
      } else {
        this.formData.payment_image = null;
      }
    },
    handlePassportImageChange(e) {
      const file = e.value[0];
      if (file && file.type.startsWith('image/')) {
        console.log(file.type.startsWith('image/'))
        const reader = new FileReader();
        reader.onload = () => {
          this.formData.passport_image = reader.result;
          this.passportImage = file
        };
        reader.readAsDataURL(file);
      } else {
        this.formData.passport_image = null;
      }
    },
    handleBackPassportImageChange(e) {
      const file = e.value[0];
      if (file && file.type.startsWith('image/')) {
        console.log(file.type.startsWith('image/'))
        const reader = new FileReader();
        reader.onload = () => {
          this.formData.back_passport_image = reader.result;
          this.backPassportImage = file
        };
        reader.readAsDataURL(file);
      } else {
        this.formData.back_passport_image = null;
      }
    },
    validateAmount(e) {
      return e.value > 10000;
    },
    defaultFormData() {
      this.formData = {
        candidateName: '',
        candidateBirth: null,
        gender: this.$t('message.male'),
        candidateNationality: '',
        passportCode: '',
        candidateAddress: '',
        phoneNumber: '',
        email: '',
        card_image: null,
        passport_image: null,
        payment_image: null,
        back_passport_image: null
      }
    },
    async handleSubmit() {
      let validate = this.form.validate()
      if (!validate.isValid) {
        let firstError = validate.brokenRules[0]
        this.showNotify(firstError.message, 'error')
        return;
      }
      if (!this.formData.card_image) {
        this.showNotify(this.$t('message.invalidUpdatePortraitImage'), 'error')
        return;
      }

      if (!this.formData.passport_image) {
        this.showNotify(this.$t('message.invalidUpdatePassportImage'), 'error')
        return;
      }

      if (!this.formData.payment_image) {
        this.showNotify(this.$t('message.invalidUpdatePaymentImage'), 'error')
        return;
      }
      if (!this.isVerified || !this.captchaToken) {
         this.showNotify(this.$t('message.invalidVerifyCaptcha'), 'error')
        return;
      }
      this.openFormDetailPopup()
    },
    showNotify(message, type) {
      notify({
        message: message,
        maxWidth: 400,
        type: type,
        displayTime: 3500,
        animation: {
          show: {
            type: 'fade', duration: 400, from: 0, to: 1,
          },
          hide: { type: 'fade', duration: 40, to: 0 },
        },
      },
        { position: 'top center' }
      );
    },
    formatDateBoth(input) {
      const [day, month, year] = input.split('/').map(Number);
      const months = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
      ];

      return {
        original: `${day}/${month}/${year}`,
        formatted: `${day} ${months[month - 1]}, ${year}`
      };
    },
    openPaymentDetailPopup() {
      this.isShowPaymentDetail = true
    },
    openFormDetailPopup() {
      this.isShowFormDetail = true
    },
    closePopup() {
      this.isShowPaymentDetail = false
    },
    closeFormPopup() {
      this.isShowFormDetail = false
    },
    openPdfPopup() {
      this.$nextTick(async()=> {
        this.loadingVisible = true
        await this.generatePDF()
        this.loadingVisible = false
        console.log(this.pdfFile)
      })
    },
    async sendMail() {
      try {
        this.loadingVisible = true

        if (!this.isVerified || !this.captchaToken) {
          this.showNotify('Mã captcha đã quá hạn', 'error')
          return;
        }

        const formData = new FormData();
        const clearData = {
          candidateName: this.formData.candidateName,
          email: this.formData.email,
        }

        formData.append('formData', JSON.stringify(clearData));
        formData.append('pdf', this.pdfFile);
        formData.append('card_image', this.cardImage);
        formData.append('passport_image', this.passportImage);
        // formData.append('back_passport_image', this.backPassportImage);
        formData.append('payment_image', this.paymentImage);
        formData.append('captchaToken', this.captchaToken);

        const res = await axios.post(`https://be.register-form-vns.io.vn/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.showNotify('Chúc mừng bạn đã đăng ký thành công', 'success')
        this.defaultFormData()
        this.$refs.cardUploader.instance.reset();
        this.$refs.passportUploader.instance.reset();
        this.$refs.paymentUploader.instance.reset();
        // this.$refs.backPassportUploader.instance.reset();
        this.form.resetValues();
        this.$refs.recaptcha.reset()
        this.closeFormPopup()
      } catch (err) {
        console.error('Lỗi gửi', err)
        let message = err?.response?.data?.error || err.message || 'Đã xảy ra lỗi'
        this.showNotify(message, 'error')
      } finally {
        this.loadingVisible = false
      }
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');
* {
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  box-sizing: border-box;
  width: 100%;
}

#app {
  font-family: Montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #424242;
  min-height: 100vh;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(360deg, #034ab3 0%, #034ab3 100%);
  background: #cce4fb;
  .language-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .lang-icon {
    width: 40px;
    height: 24px;
  }
  .btn-payment {
    font-size: 10px;
    color: #034ab3;
    font-weight: 600;
    text-align: right;
    margin-top: 10px;
  }

  .container {
    height: 90%;
    width: 90%;
    max-width: 600px;
    background-color: #fff;
    box-shadow: 0 0 10px #d1d1d1;
    margin: 14px;
    border-radius: 14px;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 10px;
      box-sizing: border-box;

      .header-logo {
        max-width: 20%;
        text-align: center;
        img {
          width: 70%;
        }
      }

      .header-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          font-size: 20px;
          font-weight: 600;
        }

        .des {
          margin-top: 4px;
          font-size: 12px;
          text-align: center;
          line-height: 1.5;
        }
      }
    }

    .form {
      width: 100%;
      padding: 16px;
      padding-top: 0;
      box-sizing: border-box;

      .containerBackgroundRadio {
        margin-top: 14px;
        padding: 10px !important;
        border: 1px solid #e9e9e9;
        border-radius: 14px;

        .titleHeaderRadio {
          font-size: 18px;
          color: #424242;
        }
      }


      .containerRadio {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: auto;
        gap: 10px;
        margin-top: 10px;

        .containerRadioItem {
          font-size: 14px;

          .checkmark {
            margin-left: 5px;
          }
        }
      }

      .dx-form {
        .custom-dxGroupItem {
          margin-top: 14px;
          padding: 10px !important;
          border: 1px solid #e9e9e9;
          border-radius: 14px;
          color: #000000;

          .dx-field-item-content {
            .dx-form-group-caption {
              font-size: 18px;
            }

            .dx-form-group-content {
              border: none;
              padding: 0;
            }
          }
        }
        .custom-dxRadioGroup {
          margin-top: 10px;
          padding: 7px 9px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          .dx-field-item-label-text {
            color: #999 !important;

          }
        }
        .captcha-container {
          margin-top: 10px;
          display: flex;
          justify-content: center;
        }
      }
        .submit-btn {
          .dx-widget.dx-button.dx-button-mode-contained.dx-button-normal.dx-button-has-text {
            background-color: #1c079f;
            box-shadow: 0 8px #12046d;
            border: none;
            color: white;
            font-size: 16px;
            font-weight: 700;
            margin: 10px 0;
          }
      }
      .custom-uploader {
        .dx-fileuploader-button {
          width: 100%;
        }
        .dx-fileuploader-input-wrapper {
          border: none;
        }
        .dx-fileuploader-wrapper {
          padding: 0;
        }
      }
      .payment-guide {
        float: right;
        font-size: 12px;
        color:#1c079f;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
}
.dx-overlay-wrapper.dx-popup-wrapper.dx-overlay-shader.custom-popup {
  background-color: #00000081;
  .dx-popup-content.dx-popup-content-scrollable {
    display: flex;
    justify-content: center;
  }
    .content {
      font-size: 16px;
      text-align: center;
      .detail {
        text-align: left;
      }
      .qr-code {
        width: 100%;
        margin-top: 20px;
        img {
          width: 80%;
        }
      }
    }
    .footer {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 10px;
      text-align: right;
      background-color: #fff;
      box-shadow: 0 0 4px #898989;
      button {
        background-color: #1c079f;
        box-shadow: 0 8px #12046d;
        border: none;
        color: white;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 700;
        padding: 10px;
        cursor: pointer;
      }
    }
  }
@media (max-width: 480px) {
  #app {
    .container {
      .header {
        .header-title {
          .title {
            font-size: 14px;
          }

          .des {
            font-size: 8px;
          }
        }
      }

      .form {
        .dx-form {
          .custom-dxGroupItem {
            .dx-field-item-content {
              .dx-form-group-caption {
                font-size: 16px;
              }

              .dx-form-group-content {}
            }
          }
        }

        .containerBackgroundRadio {
          margin-top: 14px;
          padding: 10px !important;
          border: 1px solid #e9e9e9;
          border-radius: 14px;

          .titleHeaderRadio {
            font-size: 14px;
            color: #424242;
          }
        }

        .containerRadio {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: auto;
          gap: 10px;
          margin-top: 10px;

          .containerRadioItem {
            font-size: 12px;

            .checkmark {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  .dx-overlay-wrapper.dx-popup-wrapper.dx-overlay-shader.custom-popup {
    .pdf-file {
      font-size: 7px !important;
      .top-header {
        .left-header {
          
        }
        .right-header {
          .sub-text {
            font-size: 6px !important;
          }
        }
      }
      .bottom-header {
        font-size: 8px !important;
      }
      .body {
        padding: 10px !important;
        .img {
          img {
            width: 50px !important;
          }
        }
      }
    }
  }
}
</style>
