import Vue from 'vue'
import App from './App.vue'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
Vue.config.productionTip = false
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);


const messages = {
  en: {
    message: {
      titleGroupItem1: 'Candidate information',
      titleGroupItem2: 'Contact information',
      titleGroupItem3: 'Document images',
      titleGroupItem4: 'Payment information',

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
      uploadPassportImage: 'Upload passport front image',
      uploadPaymentImage: 'Upload payment receipt photo',
      paymentGuide: 'Payment instructions',

      // Validation
      requiredCandidateName: 'Please enter full name',
      requiredBirth: 'Please select date of birth',
      invalidBirth: 'Invalid date',
      requiredPassport: 'Please enter passport number',
      invalidPassport: 'Invalid passport number. Format: 1 letter + 7 digits (e.g., B1234567)',
      requiredNationality: 'Please enter nationality',
      requiredGender: 'Please select gender',
      requiredPhone: 'Please enter phone number',
      invalidPhone: 'Invalid phone number. E.g., 0912345678',
      requiredEmail: 'Please enter email',
      invalidEmail: 'Invalid email',
      requiredAddress: 'Please enter address',

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
      titleGroupItem1: 'Thông tin thí sinh',
      titleGroupItem2: 'Thông tin liên hệ',
      titleGroupItem3: 'Thông tin hình ảnh chứng từ',
      titleGroupItem4: 'Thông tin thanh toán lệ phí',

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
      uploadPaymentImage: 'Upload ảnh chụp hóa đơn thanh toán',
      paymentGuide: 'Hướng dẫn thanh toán lệ phí',

      // Validation
      requiredCandidateName: 'Vui lòng nhập Họ và tên',
      requiredBirth: 'Vui lòng chọn ngày sinh',
      invalidBirth: 'Ngày không hợp lệ',
      requiredPassport: 'Vui lòng nhập Số hộ chiếu',
      invalidPassport: 'Số hộ chiếu không hợp lệ. Định dạng: 1 chữ cái + 7 chữ số (VD: B1234567)',
      requiredNationality: 'Vui lòng nhập Quốc tịch',
      requiredGender: 'Vui lòng chọn giới tính',
      requiredPhone: 'Vui lòng nhập số điện thoại',
      invalidPhone: 'Số điện thoại không hợp lệ. VD: 0912345678',
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
