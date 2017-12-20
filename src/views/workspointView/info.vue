<template>
  <div style="background-color:#fff;padding:5px;">
    <table class="table table-hover table-bordered">
      <tbody >
        <tr>
          <td>交付名称：</td>
          <td>{{info.WorksPointName}}</td>
          <td>交付编号：</td>
          <td  >{{info.WorksPointNo}}</td>

        </tr>
        <tr>
          <td>所属专业：</td>
          <td>{{info.SpecialityName}}</td>
          <td>组织：</td>
          <td>{{info.OrganizeName}}</td>
        </tr>
        <tr>
          <td>区域：</td>
          <td>{{info.AreaName}}</td>
          <td>地址：</td>
          <td>{{info.Address}}</td>
        </tr>

        <tr>
          <td>交付类型： </td>
          <td>{{info.WorkspointTypeDicName}}</td>
          <td>备注： </td>
          <td>{{info.Remark}}</td>
        </tr>

        <tr style="text-align: center;">
          <td colspan="4">扩展字段</td>

        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>项目批次（无需更新） </td>
          <td> </td>
          <td>需求移交（任务分配） </td>
          <td> </td>
        </tr>
        <tr>
          <td>需求移交（任务分配－端口数） </td>
          <td> </td>
          <td>上传立项时间（做数据汇总用/不用更新） </td>
          <td> 2017/10/16 0:00:00 </td>
        </tr>
        <tr>
          <td>及时达编号 </td>
          <td> </td>
          <td>工程类别（改造/新建/扩容） </td>

          <td> 新建 </td>
        </tr>
        <tr>
          <td>接入方式 </td>

          <td> </td>
          <td>设计建议OLT节点名称 </td>
          <td> </td>
        </tr>
        <tr>
          <td>占用PON端口数 </td>
          <td> </td>
          <td>上联OLT情况描述 </td>
          <td> </td>
        </tr>
        <tr>
          <td>上联光缆情况描述 </td>
          <td> </td>
          <td>住户数 </td>
          <td> </td>
        </tr>
        <tr>
          <td>设计端口数 </td>
          <td> </td>
          <td>所属工程项目名称 </td>
          <td> </td>
        </tr>
        <tr>
          <td>WBS号 </td>
          <td> </td>
          <td>派工时间 </td>
          <td> </td>
        </tr>
        <tr>
          <td>设计受阻日期 </td>
          <td> </td>
          <td>设计受阻原因 </td>
          <td> </td>
        </tr>
        <tr>
          <td>设计受阻解决日期 </td>
          <td> </td>
          <td>设计出图日期 </td>
          <td> </td>
        </tr>
        <tr>
          <td>工程造价 </td>
          <td> </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "info",
  data() {
    return {
      info: {
        WorksPointName: "鹏润达大厦A座办公楼FTTO新建工程",
        WorksPointNo: "SZGW1710000107",
        SpecialityName: "光网",
        OrganizeName: "南油",
        AreaName: "南山",
        Address: "鹏润达大厦A座办公楼",
        WorkspointTypeDicName: "800M",
        Remark: "暂无备注"
      }
    };
  }
};
</script>
