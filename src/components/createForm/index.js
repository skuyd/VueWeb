import Vue from 'vue';
export default {
    bulidform(fields, params, pvue) {

        var formContain = this.create(fields);

        var Profile = Vue.extend({
                template: formContain.fromHtml,
                data: function() {
                    return {
                        btnType: 'primary',
                        btnSubmiting: false,
                        btnName: '开始提交',

                        formData: formContain.formDatas, //  表单数据
                        formRules: formContain.formRules, //  表单验证规则
                        uploadData: formContain.uploadData, //  用于上传的时候给  data
                        fileFields: formContain.fileFields, //  用于 暂存 文件字段  { fieldId: field.Id, fieldName: field.FieldTableName }
                        fileList: formContain.fileList, // 文件列表
                        //-----------------  文件上传后  监听操作 需要用到------------------
                        f: false,
                        fkey: '',
                        vvm: {},
                        fcount: 0,
                        fupcount: -1
                            // responseData: [],
                            // fieldKey: ''
                    }
                },
                props: ['dialogVisble'],
                methods: {
                    onSubmit() {

                        this.btnSubmiting = true;
                        this.btnName = '正在努力提交中... ...';
                        this.fcount = document.getElementsByClassName('el-upload-list__item is-ready').length;
                        //  初始化 Form-File-Data   // 有未上传的文件  为了通过Form验证，我们先将Form中赋值
                        for (var fileField of this.fileFields) {
                            var vm = this.$refs["upload_" + fileField.fieldId];
                            if (vm.uploadFiles.length > 0) {
                                this.formData[fileField.fieldName] = ["NULL"];
                            }
                        }

                        // 验证
                        this.$refs['formData'].validate((valid) => {

                            if (valid) {
                                // 样式 
                                this.btnType = 'success';
                                this.fupcount = 0;

                                // 上传
                                for (var fileField of this.fileFields) {
                                    var vm = this.$refs["upload_" + fileField.fieldId];
                                    if (vm.uploadFiles.length > 0) {
                                        this.formData[fileField.fieldName] = [];
                                        this.vvm = vm;
                                        this.fkey = fileField.fieldName;
                                        vm.submit();
                                    }
                                }

                                // this.btnSubmiting = false;
                                // for (var fileField of this.fileFields) {
                                //   var vm = this.$refs["upload_" + fileField.fieldId];
                                //   if (vm.uploadFiles.length > 0) {
                                //     for (var u of vm.uploadFiles) {
                                //       console.log(u.response);
                                //       this.formData[fileField.fieldName].push(JSON.parse(u.response.Data)[0]);

                                //     }
                                //   }
                                // }

                                //数据提交


                            } else {
                                // 样式
                                this.btnName = '表单验证错误,请修正后再试... ...';
                                this.btnType = 'danger';
                                setTimeout(() => {
                                    this.btnName = '开始提交';
                                    this.btnType = 'primary';
                                    this.btnSubmiting = false;
                                }, 2000);
                            }
                        });
                    }
                    // handleuploadPreview(file) {
                    // },
                    // handleuploadRemove(file, fileList) {
                    // },
                    ,
                    handleuploadSuccess(response, file, fileList) {
                        console.log('文件上传成功');
                        this.f = true;
                    },
                    // handleuploadChange(file, fileList) {
                    // }
                },
                watch: {
                    f: function(val, oldVal) {

                        if (val) {


                            var vvm = this.vvm;
                            if (vvm.uploadFiles.length > 0) {
                                for (var u of vvm.uploadFiles) {
                                    this.formData[this.fkey].push(JSON.parse(u.response.Data)[0]);
                                    this.fupcount = this.fupcount + 1;
                                }
                            }
                            this.f = false;
                        }
                    },
                    fupcount: function(val, oldval) {
                        if (this.fcount === val) {
                            console.log('in');
                            submit(this, pvue, params, fields);
                        }
                    }
                }
            })
            // 创建 Profile 实例，并挂载到一个元素上。
            // var component = new Profile().$mount('#mount-point')

        var component = new Profile().$mount();
        document.getElementById('mount-point').innerHTML = "";
        document.getElementById('mount-point').appendChild(component.$el);
        // return component;

    },
    create(fields) {
        var formContain = { fromHtml: '', formRules: {}, formDatas: {}, uploadData: {}, fileFields: [], fileList: {} };

        formContain.fromHtml = '<el-form ref="formData" label-position="right"  :model="formData" label-width="150px" :show-message=true :rules="formRules" size="small" >';

        for (var field of fields) {
            // 创建 Html 代码
            formContain.fromHtml += buildFieldHtml(field);

            // 创建 表单字段
            formContain.formDatas[field.FieldTableName] = createFieldData(field);

            //创建 表单 规则
            if (field.Required) {
                formContain.formRules[field.FieldTableName] = createRule(field);
            }
            if (field.FieldDataType >= 20) {
                formContain.uploadData[field.FieldTableName] = { type: "TaskFile", fieldId: field.Id };
                formContain.fileFields.push({ fieldId: field.Id, fieldName: field.FieldTableName });
                formContain.fileList[field.FieldTableName] = [];
            }
        }
        // formContain.fromHtml += ' <el-form-item>';
        formContain.fromHtml += '<el-button :type="btnType" :loading="btnSubmiting" @click="onSubmit" style="width:100%;">{{btnName}}</el-button>';
        // formContain.fromHtml += '<el-button >重置</el-button>';
        // formContain.fromHtml += '</el-form-item>';
        formContain.fromHtml += '</el-form>';
        return formContain;
    }

}
// 创建 提交数据
function BulidData(fields, data, params) {
    var formData = [];
    for (var field of fields) {
        switch (field.FieldDataType) {
            case 20:
                {
                    var attachList = [];
                    // console.log(data[field.FieldTableName]);
                    for (var att of data[field.FieldTableName]) {

                        attachList.push({
                            Comment: "电脑端上传",
                            FileUploadId: att.id,
                            RelationTableId: field.Id,
                            WorksPointId: params.WorksPointId,
                            FieldId: field.Id
                        });
                    }
                    formData.push({ FieldId: field.Id, FieldTableName: field.FieldTableName, AttachmentList: attachList });
                }
                break;
            case 21:
                {
                    var attachList = [];
                    // console.log(data[field.FieldTableName]);
                    for (var att of data[field.FieldTableName]) {
                        attachList.push({
                            Comment: "电脑端上传",
                            FileUploadId: att.id,
                            RelationTableId: field.Id,
                            WorksPointId: params.WorksPointId,
                            FieldId: field.Id
                        });
                    }
                    formData.push({ FieldId: field.Id, FieldTableName: field.FieldTableName, AttachmentList: attachList });
                }
                break;
            default:
                {
                    formData.push({ FieldId: field.Id, FieldTableName: field.FieldTableName, FieldValue: data[field.FieldTableName] });
                }
        }

    }
    return formData;
}

// 创建 Html 内容
function buildFieldHtml(field) {
    var html = '';
    html += ' <el-form-item label="' + field.ShowName + '" prop="' + field.FieldTableName + '">';
    switch (field.FieldDataType) {
        case 1:
            {
                html += '<el-input v-model="formData.' + field.FieldTableName + '"   placeholder="请输入内容"></el-input>';

            }
            break;
        case 2:
            {
                html += '<el-input-number v-model="formData.' + field.FieldTableName + '"   :min="0" ></el-input-number>';
            }
            break;
        case 3:
            {
                html += '<el-input-number  v-model="formData.' + field.FieldTableName + '"   :min="0" ></el-input-number>';
            }
            break;
        case 4:
            {
                html += ' <el-date-picker  v-model="formData.' + field.FieldTableName + '"   type="datetime"   placeholder="选择日期时间">    </el-date-picker>';
            }
            break;

        case 5:
            {
                html += '<el-input v-model="formData.' + field.FieldTableName + '"  type="textarea"  placeholder="请输入内容"></el-input>';
            }
            break;
        case 6:
            {
                var options = field.SelectContent.split('\r\n');
                html += ' <el-select  v-model="formData.' + field.FieldTableName + '" multiple placeholder="请选择">';

                for (var option of options) {
                    html += ' <el-option  key="' + option + '" label="' + option + '" value="' + option + '"></el-option>  ';
                }

                html += '</el-select>';

                html += '</select>';
            }
            break;
        case 7:
            {
                var options = field.SelectContent.split('\r\n');
                html += ' <el-radio-group  v-model="formData.' + field.FieldTableName + '">';
                for (var option of options) {
                    html += ' <el-radio label = "' + option + '" > ' + option + '</el-radio>'
                }
                html += '</el-radio-group>';

            }
            break;
        case 8:
            {
                var options = field.SelectContent.split('\r\n');
                html += ' <el-select   v-model="formData.' + field.FieldTableName + '" clearable  placeholder="请选择"  >';
                for (var option of options) {
                    html += ' <el-option  key="' + option + '"      label="' + option + '"      value="' + option + '">    </el-option>  ';
                }
                html += '</el-select>';
                html += '</select>';
            }
            break;
        case 20:
            {
                // var dataObj={type:"TaskFile",fieldId:field.Id};
                html += '<el-upload   class="upload-demo"  ref="upload_' + field.Id + '" ';
                html += '  action="api/FileServer/ashx/FileUpload.ashx" ';
                html += ' :data="uploadData.' + field.FieldTableName + '" ';
                html += ' :on-success="handleuploadSuccess" ';
                // html += ' :on-change="handleuploadChange" :on-preview="handleuploadPreview"  :on-remove="handleuploadRemove" :on-success="handleuploadSuccess"';
                html += '  :file-list="fileList.' + field.FieldTableName + '"  :auto-upload="false">';
                html += '  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>';
                // html += '  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>';
                html += '  <div slot="tip" class="el-upload__tip">文件上传,将提交表单前上传文件</div>';
                html += '</el-upload>';
            }
            break;
        case 21:
            {
                // var dataObj={type:"TaskFile",fieldId: field.Id};
                html += '<el-upload   class="upload-demo"  ref="upload_' + field.Id + '" ';
                html += '  action="api/FileServer/ashx/FileUpload.ashx" ';
                html += ' :on-success="handleuploadSuccess" ';
                // html += ' :on-change="handleuploadChange" :on-preview="handleuploadPreview"  :on-remove="handleuploadRemove" :on-success="handleuploadSuccess"';
                html += ' :data="uploadData.' + field.FieldTableName + '" ';
                html += ' :file-list="fileList.' + field.FieldTableName + '" :auto-upload="false"  :multiple="true" list-type="picture" accept="image/jpeg,image/jpg,image/png" >';
                html += '  <el-button size="small" type="primary">选取文件</el-button>';
                html += '  <div slot="tip" class="el-upload__tip">图文上传，只能上传jpg/png文件，将在提交表单前上传</div>';
                html += '</el-upload>';
            }
            break;
        default:
            {
                html += '<el-input  placeholder="电脑端暂不支持该类型输入" :disabled="true"> </el-input>';
            }
    }
    html += ' </el-form-item>';

    return html;

}

// 创建规则
function createRule(field) {
    var rule = null;
    switch (field.FieldDataType) {
        case 4:
            {
                rule = [{ type: 'date', required: true, message: '请选择' + field.ShowName, trigger: 'change' }];
            }
            break;
        case 6:
            {
                rule = [{ type: 'array', required: true, message: '请选择' + field.ShowName, trigger: 'blur' }];
            }
            break;
        case 20:
            {
                rule = [{ type: 'array', required: true, message: '请选择' + field.ShowName, trigger: 'change' }];
            }
            break;
        case 21:
            {
                rule = [{ type: 'array', required: true, message: '请选择' + field.ShowName, trigger: 'change' }];
            }
            break;
        default:
            {
                rule = [{ required: true, message: '请输入' + field.ShowName, trigger: 'blur' }];
            }
    }
    return rule;
}

// 创建FormData 字段 类型
function createFieldData(field) {
    var fieldData = null;
    switch (field.FieldDataType) {
        case 20:
            {
                fieldData = [];
            }
            break;
        case 21:
            {
                fieldData = [];
            }
            break;
        default:
            {
                fieldData = '';
            }
    }
    return fieldData;
}

function submit(vue, pvue, params, fields) {
    console.log('上传表单');
    var self = vue;
    Object.assign(params, { formData: BulidData(fields, self.formData, params) });

    self.$http.$axios({
            method: 'post',
            url: '/ProjectManage/ashx/WorksPointTaskHandler.ashx?action=UploadTaskFormData',
            baseURL: '/api',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;' },
            data: 'formData=' + JSON.stringify(params)
        }).then(response => {
            if (response.data.Success) {
                self.$message({ message: '提交成功', type: 'success', duration: 4000 });
                pvue.$emit('update:dialogVisible', false);
            } else {
                self.$message.error('提交好像出了点问题哦 (╬￣皿￣)=○ ');
                self.btnType = 'danger';
                self.btnName = '提交出错,请重试 ... ...';
                setTimeout(() => {
                    self.btnName = '开始提交';
                    self.btnType = 'primary';
                    self.btnSubmiting = false;
                }, 2000);
            }
        })
        .catch(function(err) {
            self.$message.error('提交好像出了点问题哦 (╬￣皿￣)=○ ');
            self.btnType = 'danger';
            self.btnName = '提交出错,请重试 ... ...';
            setTimeout(() => {
                self.btnName = '开始提交';
                self.btnType = 'primary';
                self.btnSubmiting = false;
            }, 2000);
        });
}