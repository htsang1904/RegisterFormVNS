<template>
  <div>
    <div id="app">
      <div class="container">
        <div class="header">
          <div class="header-logo">
            <img src="./assets/logo-vns.png" alt="">
          </div>
          <div class="header-title">
            <div class="title">
              THÔNG TIN ĐĂNG KÝ DỰ THI
            </div>
            <div class="des">
              KỲ THI CHỨNG CHỈ TIẾNG VIỆT - 19/7/2025
              <br>
              REGISTRATION FORM
              <br>
              VIETNAMESE PROFICIENCY TEST - 19 JULY, 2025 
            </div>
          </div>
        </div>
        <div class="form">
          <DxForm :form-data="formData" width="100%" label-mode="floating" :show-colon-after-label="true"
            ref="billForm">
            <DxGroupItem :caption="$t('message.titleGroupItem1')" css-class="custom-dxGroupItem">
              <DxItem data-field="candidateName" :editor-options="{ height: 34, placeholder: 'vd: Huỳnh Thanh Sang' }">
                <DxLabel text="Họ và tên (ghi đầy đủ như trong hộ chiếu)" />
                <DxRequiredRule message="Vui lòng nhập Họ và tên" />
              </DxItem>
              <DxItem data-field="birth" editor-type="dxDateBox" :editor-options="{
                height: 34,
                displayFormat: 'dd/MM/yyyy',
                invalidDateMessage: 'Ngày không hợp lệ',
                placeholder: 'dd/mm/yyyy'
              }">
                <DxLabel text="Ngày sinh" />
                <DxRequiredRule message="Vui lòng chọn ngày sinh" />
              </DxItem>
              <DxItem data-field="passportCode" editor-type="dxNumberBox" :editor-options="{
                placeholder: 'Số hộ chiếu',
                showClearButton: true,
                format: '#,##0',
              }">
                <DxLabel text="Số hộ chiếu" />
                <DxRequiredRule message="Vui lòng nhập Số hộ chiếu" />
                <DxCustomRule :validation-callback="validateAmount" message="Số hộ chiếu" />
              </DxItem>
              <DxItem data-field="candidateName" :editor-options="{ height: 34, placeholder: 'vd: Viet Nam' }">
                <DxLabel text="Quốc tịch" />
                <DxRequiredRule message="Vui lòng nhập Quốc tịch" />
              </DxItem>
              <DxItem data-field="gender" editor-type="dxRadioGroup"  css-class="custom-dxRadioGroup" :editor-options="{
                items: gender,
                displayExpr: 'label',
                valueExpr: 'value',
                layout:'horizontal',
                value: gender[0]
              }">
                <DxLabel text="Giới tính" />
                <DxRequiredRule message="Vui lòng chọn giới tính" />
              </DxItem>
            </DxGroupItem>

            <DxGroupItem caption="Thông tin liên hệ" css-class="custom-dxGroupItem">
              <DxItem data-field="phoneNumber" :editor-options="{ height: 34}">
                <DxLabel text="Số điện thoại" />
                <DxRequiredRule message="Vui lòng nhập số điện thoại" />
              </DxItem>
              <DxItem data-field="email" :editor-options="{ height: 34 }">
                <DxLabel text="Email" />
                <DxRequiredRule message="Vui lòng nhập email" />
                <DxEmailRule message="Email không hợp lệ"/>
              </DxItem>
              <DxItem data-field="address" :editor-options="{ height: 34 }">
                <DxLabel text="Địa chỉ" />
                <DxRequiredRule message="Vui lòng nhập địa chỉ" />
              </DxItem>
            </DxGroupItem>

            <DxGroupItem caption="Thông tin hình ảnh chứng từ" css-class="custom-dxGroupItem">
              <DxItem
                data-field="card_image"
                template="card-image"
              >
              </DxItem>
              <DxItem
                data-field="passport_image"
                template="passport-image"
              >
              </DxItem>
            </DxGroupItem>

            <DxGroupItem caption="Thông tin thanh toán lệ phí" css-class="custom-dxGroupItem">
              <DxItem
                data-field="passport_image"
                template="payment-image"
              >
              </DxItem>
            </DxGroupItem>
            <DxButtonItem css-class="submit-btn", :button-options="buttonOptions" />
            <template #card-image="{data}">
              <div>
                 <DxFileUploader
                 class="custom-uploader"
                  select-button-text="Upload ảnh thẻ (3x4)"
                  label-text=""
                  width="100%"
                  accept="image/*"
                  upload-mode="useForm"
                  :input-attr="{ 'aria-label': 'Chọn ảnh thẻ (3x4)' }"
                />
              </div>
            </template>
            <template #passport-image>
              <div>
                 <DxFileUploader
                 class="custom-uploader"
                  select-button-text="Upload ảnh hộ chiếu mặt trước"
                  label-text=""
                  width="100%"
                  accept="image/*"
                  upload-mode="useForm"
                  :input-attr="{ 'aria-label': 'Chọn ảnh hộ chiếu mặt trước' }"
                />
              </div>
            </template>
            <template #payment-image>
              <div>
                 <DxFileUploader
                 class="custom-uploader"
                  select-button-text="Upload ảnh chụp hóa đơn thanh toán"
                  label-text=""
                  width="100%"
                  accept="image/*"
                  upload-mode="useForm"
                  :input-attr="{ 'aria-label': 'Hình ảnh chụp hóa đơn thanh toán' }"
                />
                <div class="payment-guide" @click="openPaymentDetailPopup">Hướng dẫn thanh toán lệ phí</div>
              </div>
            </template>
          </DxForm>
        </div>
      </div>
      <DxPopup
        :visible="isShowPaymentDetail"
        :show-title="true"
        title="Chi tiết thanh toán"
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
            <strong>Lệ phí:</strong> 3.000.000 VNĐ
            <br>
            <strong>Nội dụng chuyển khoản:</strong> [Tên thí sinh] đóng lệ phí thi
          </div>
          <div class="qr-code">
            <p>Hãy quét mã thanh toán lệ phí bên dưới</p>
            <p><strong>Lưu ý:</strong> <i>Chụp màn hình thanh toán lệ phí thành công</i></p>
            <img src="../src/assets/qr-code.jpeg" alt="">
          </div>
        </div>
      </DxPopup>
      <DxPopup
        :visible="isShowFormDetail"
        :show-title="true"
        title="Phiếu đăng ký"
        width="90%"
        max-width="800px"
        height="90vh"
        :show-close-button="true"
        :drag-enabled="false"
        :onHidden="closeFormPopup"
        :wrapper-attr="{ class: 'custom-popup' }"
      >
        <div class="pdf-file">
            <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" />  
        </div>
      </DxPopup>
    </div>
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
import { fillPdf } from '@/utils/fillPdf.js'
import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL
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
    DxPopup
  },
  computed: {
    form() {
      return this.$refs.billForm.instance;
    },
  },
  // created() {
  //   loadMessages(enMessages);
  //   locale('en');
  // },
  mounted() {
    this.defaultFormData()
  },
  data() {
    return {
      formData: {},
      selectedOption: "Tại cửa hàng",
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
        text: 'Xem biểu mẫu',
        useSubmitBehavior: true,
        width: '100%',
        onClick: () => {
          this.handleSubmit()
        },
      },
      isShowPaymentDetail: false,
      pdfUrl: null,
      isShowFormDetail: false
    }
  },
  methods: {
    async generate() {
  const formData = {
    fullName: 'Nguyen Van A',
    dob: '01/01/2000',
    gender: 'Nam',
    nationality: 'Viet Nam',
    passport: 'B123456789',
    address: '123 duong ABC, Q1, HCM',
    phone: '0123456789',
    email: 'test@example.com'
  }

  const photoUrl = '/assets/photo.jpg'
  const passportUrl = '/assets/passport.jpg'
  const templateUrl = '/DonDangKyThi-ExamReg3.pdf'

  const blob = await fillPdf(formData, photoUrl, passportUrl, templateUrl)
  console.log(blob)
  this.pdfUrl = URL.createObjectURL(blob)
},
    validateAmount(e) {
      return e.value > 10000;
    },
    defaultFormData() {
      this.formData = {
        candidateName: '',
        birth: null,
        totalAmount: '',
        taxCode: '',
        comName: '',
        comAddress: '',
        userName: '',
        phone_number: '',
        email: ''
      }
    },
    async handleSubmit() {
      // let validate = this.form.validate()
      // if (!validate.isValid) {
      //   let firstError = validate.brokenRules[0]
      //   this.showNotify(firstError.message, 'error')
      //   return;
      // }
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
    openPaymentDetailPopup() {
      this.isShowPaymentDetail = true
    },
    async openFormDetailPopup() {
      await this.generate()
      this.isShowFormDetail = true
    },
    closePopup() {
      this.isShowPaymentDetail = false
    },
    closeFormPopup() {
      this.isShowFormDetail = false
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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
  display: flex;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(360deg, #034ab3 0%, #034ab3 100%);
  background: #cce4fb;

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
    .pdf-file {
      height: 100%;
      iframe {
        height: 100%;
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
}
</style>
