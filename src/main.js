import Vue from 'vue'
import App from './App.vue'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
Vue.config.productionTip = false
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);
import { VueRecaptcha } from 'vue-recaptcha';

Vue.component('vue-recaptcha', VueRecaptcha)
const messages = {
  en: {
    message: {
      registerTitle: "EXAM REGISTRATION INFORMATION",
      submitButton: "Submit Registration",
      titleGroupItem1: 'Candidate information',
      titleGroupItem2: 'Contact information',
      titleGroupItem3: 'Document images',
      titleGroupItem4: 'Payment information',
      titleRegisterPopup: 'Registration Form',

      candidateName: 'Full name (as in passport)',
      candidateBirth: 'Date of birth',
      passportCode: 'Passport number',
      candidateNationality: 'Nationality',
      gender: 'Gender',

      male: 'Male',
      female: 'Female',

      phoneNumber: 'Phone number',
      email: 'Email',
      candidateAddress: 'Address',

      uploadCardImage: 'Upload ID photo (3x4)',
      uploadPassportImage: 'Upload front side of passport',
      uploadBackPassportImage: 'Upload back side of passport',
      uploadPaymentImage: 'Upload screenshot of the completed bank transfer',
      paymentGuide: 'Payment instructions',

      // Validation
      requiredCandidateName: 'Please enter full name',
      requiredBirth: 'Please select date of birth',
      invalidBirth: 'Invalid date',
      requiredPassport: 'Please enter passport number',
      invalidPassport: 'Invalid passport number. Please enter 5 to 15 characters, including only letters and numbers.',
      requiredNationality: 'Please enter nationality',
      requiredGender: 'Please select gender',
      requiredPhone: 'Please enter phone number',
      invalidPhone: 'Invalid phone number. Please enter 6 to 15 digits, optionally starting with +',
      requiredEmail: 'Please enter email',
      invalidEmail: 'Invalid email',
      requiredAddress: 'Please enter address',

      invalidUpdatePaymentImage: "Please upload a payment image",
      invalidVerifyCaptcha: "Please verify the captcha",
      invalidUpdatePassportImage: "Please upload your passport photo",
      invalidUpdatePortraitImage: "Please upload a 3x4 photo",

      //popup thanh toán
      paymentDetailTitle: 'Payment Details',
      examFee: 'Fee',
      transferContent: 'Transfer Content',
      transferNote: '[Candidate\'s name] pays the exam fee',
      scanQRCode: 'Please scan the QR code below to pay the exam fee',
      note: 'Note',
      screenshotNote: 'Take a screenshot of your successful payment',

      viewTemplate: 'Create Template',
    },
  },
  vi: {
    message: {
      registerTitle: "THÔNG TIN ĐĂNG KÝ DỰ THI",
      submitButton: "Gửi thông tin đăng ký",

      invalidUpdatePaymentImage: "Vui lòng cập nhật ảnh thanh toán",
      invalidVerifyCaptcha: "Vui lòng xác minh captcha",
      invalidUpdatePassportImage: "Vui lòng cập nhật ảnh hộ chiếu",
      invalidUpdatePortraitImage: "Vui lòng cập nhật ảnh thẻ 3x4",

      titleGroupItem1: 'Thông tin thí sinh',
      titleGroupItem2: 'Thông tin liên hệ',
      titleGroupItem3: 'Thông tin hình ảnh chứng từ',
      titleGroupItem4: 'Thông tin thanh toán lệ phí',
      titleRegisterPopup: 'Phiếu đăng ký',

      candidateName: 'Họ và tên (ghi đầy đủ như trong hộ chiếu)',
      candidateBirth: 'Ngày sinh',
      passportCode: 'Số hộ chiếu',
      candidateNationality: 'Quốc tịch',
      gender: 'Giới tính',

      male: 'Nam',
      female: 'Nữ',

      phoneNumber: 'Số điện thoại',
      email: 'Email',
      candidateAddress: 'Địa chỉ',

      uploadCardImage: 'Upload ảnh thẻ (3x4)',
      uploadPassportImage: 'Upload ảnh hộ chiếu mặt trước',
      uploadBackPassportImage: 'Upload ảnh hộ chiếu mặt sau',
      uploadPaymentImage: 'Upload ảnh chụp màn hình chuyển khoản thành công',
      paymentGuide: 'Hướng dẫn thanh toán lệ phí',

      // Validation
      requiredCandidateName: 'Vui lòng nhập Họ và tên',
      requiredBirth: 'Vui lòng chọn ngày sinh',
      invalidBirth: 'Ngày không hợp lệ',
      requiredPassport: 'Vui lòng nhập Số hộ chiếu',
      invalidPassport: 'Số hộ chiếu không hợp lệ. Vui lòng nhập từ 5 đến 15 ký tự bao gồm chữ và số, không có ký tự đặc biệt.',
      requiredNationality: 'Vui lòng nhập Quốc tịch',
      requiredGender: 'Vui lòng chọn giới tính',
      requiredPhone: 'Vui lòng nhập số điện thoại',
      invalidPhone: 'Số điện thoại không hợp lệ. Vui lòng nhập từ 6 đến 15 chữ số, có thể bắt đầu bằng dấu + nếu là mã quốc gia.',
      requiredEmail: 'Vui lòng nhập email',
      invalidEmail: 'Email không hợp lệ',
      requiredAddress: 'Vui lòng nhập địa chỉ',

      // popup thanh toán
      paymentDetailTitle: 'Chi tiết thanh toán',
      examFee: 'Lệ phí',
      transferContent: 'Nội dung chuyển khoản',
      transferNote: '[Tên thí sinh] đóng lệ phí thi',
      scanQRCode: 'Hãy quét mã thanh toán lệ phí bên dưới',
      note: 'Lưu ý',
      screenshotNote: 'Chụp màn hình thanh toán lệ phí thành công',

      viewTemplate: 'Tạo biểu mẫu',
    },
  },
};
const i18n = new VueI18n({
  locale: 'vi',
  messages,
});
new Vue({
   i18n,
  render: h => h(App),
}).$mount('#app')
