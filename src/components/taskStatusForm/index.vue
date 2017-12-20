<template>
    <div id="TaskStatusForm">
        <!-- 创建一个任务片表单 -->
        <el-form ref="formdata" :model="formdata" label-width="80px">
            <div v-html="reshtml"></div>
        </el-form>
    </div>
</template>

<script>


export default {
    name: "TaskStatusForm",
    data() {
        return {
            formdata: {}
        }
    },
    props: ['DynamicTableId', 'workspointId'],
    methods: {
        getFields() {
            var param = { action: 'List', dynamicTabeld: this.DynamicTableId };
            this.$axios({
                method: 'post',
                url: '/TP/ashx/TempleteField.ashx',
                baseURL: '/api',
                params: param
            }).then(response => {
                var fields = response.data.rows;

                for (var i = 0; i < fields.length; i++) {
                    this.$set(this.formdata, fields[i], '');
                }
            })
                .catch(function(err) {
                    console.log(err);
                });
        },

        ParseToInt(val) {
            ParseInt(val);
        }

    },
    created() {
        this.getFields();
    },
    watch: {
        DynamicTableId: {
            handler: function(old, newval) {

                this.getFields();
            }
        }
    }
}
</script>
