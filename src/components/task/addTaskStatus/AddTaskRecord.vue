<template>
    <div id="AddTaskRecord">
        <el-row>
            <el-col :span="24" class="checkrow">
                <div class="grid-content bg-purple-dark">
                    <el-dropdown @command="selectTaskStatus" style="color:#20A0FF" >
                        <span class="el-dropdown-link">
                            {{DropDownValue}}
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="option in DropDownOptions" :key="option.Id" :command="option">{{option.TaskName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>

        <el-row v-show="showForm">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <div id="mount-point">

                    </div>
                </div>
            </el-col>
            <!-- <el-col :span="24"><el-button type="primary" @click="onSubmit" style="width:100%;">提交任务</el-button> </el-col> -->
        </el-row>
    </div>
</template>

<script>
import './addTaskRecord.css';
import BuildForm from '@/components/createForm/index.js'
import Vue from 'vue';

export default {
    name: "AddTaskRecord",
    data() {
        return {
            DropDownValue: '请选择任务片',
            DropDownOptions: [],
            Msg: { success: true, msg: '加载成功' },
            TaskStatusId: '',
            TaskStatusTableId: '',
            showForm: false
        }

    },
    created() {
        //Init DropDownOption
        this.getTaskStatus();
    },
    props: ['TaskId', 'WorksPointId','dialogVisible'],
    methods: {
       
        selectTaskStatus(command) {
            this.showForm = false;
            this.DropDownValue = command.TaskName;
            this.TaskStatusId=command.Id;
            this.TaskStatusTableId = command.RelationTableId;
        //   this.$emit('update:dialogVisible', false)
            this.createForm();

        },
        // 获取任务片 
        getTaskStatus() {
            var param = { action: 'GetTaskStatusList', taskId: this.TaskId };
            this.$http.$axios({
                method: 'post',
                url: '/TP/ashx/TaskHandler.ashx',
                baseURL: '/api',
                params: param
            }).then(response => {
                this.DropDownOptions = response.data.rows;
            })
                .catch(function(err) {
                    console.log(err);
                });

              
            //   this.listLoading = false;
        },

        createForm() {
            var param = { action: 'List', dynamicTabeld: this.TaskStatusTableId };
            // var formhtml = '<el-form ref="formdata" :model="formdata" label-width="120px" :show-message=true :rules="formrules">';

            this.$http.$axios({
                method: 'post',
                url: '/TP/ashx/TempleteField.ashx',
                baseURL: '/api',
                params: param
            }).then(response => {
                var fields = response.data.rows;
                var par = { TaskId: this.TaskId, TaskStatusId: this.TaskStatusId, WorksPointId: this.WorksPointId }
                BuildForm.bulidform(fields, par,this);
                this.showForm = true;
            })
            .catch(function(err) {
            console.log(err);
            });
        }

    }

}

</script>


