<template>
  <div class="container">
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
  >
    <el-table-column label="日期" prop="docu_data"></el-table-column>
    <el-table-column label="名字" prop="docu_name"></el-table-column>
    <el-table-column label="类别" prop="docu_cata"></el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">下载</el-button>
      </template>
    </el-table-column>
  </el-table>
  <br>

  <el-pagination class="text-right"
    background
    layout="prev, pager, next"
    @size-change="sizechange"
    @current-change="currentchange"
    :page-size="pagesize"
    :total="total"
    :current-page="currentpage"
  ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: "",
      total: 0,
      pagesize: 5,
      currentpage: 2
    };
  },
  methods: {
    async handleEdit(index, row) {
      var params = new URLSearchParams();
      params.append("docu_name", row.docu_name);
      var response = await this.$http({
        method: "get",
        url: "http://47.96.87.249:8080/dhuf/docu_isexist",
        params
      });
      var msg = response.data;
      var obj = JSON.parse(msg[0]);
      console.log(obj.status);
      if (obj.status == "success") {
        location.href =
          "http://47.96.87.249:8080/dhuf/docu_download?docu_name=" + row.docu_name;

        this.$message({
          type: 'success',
          message: '下载成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: '没有该文件哦'
        })
      }
      this.updatepage();
      this.changeinfo();
    },
    buquan(year, month, day) {
      var yearstr = year.toString();
      var monthstr = month.toString();
      var daystr = day.toString();
      if (monthstr.length == 1) monthstr = "0" + monthstr;
      if (daystr.length == 1) daystr = "0" + daystr;
      return yearstr + "-" + monthstr + "-" + daystr;
    },
    updatepage() {
      var tp = this;
      this.$http({
        method: "post",
        url: "http://47.96.87.249:8080/dhuf/docu_gecount",
        data: {}
      }).then(function(response) {
        if (response.status == 200) {
          var msg = response.data;
          var obj = JSON.parse(msg[0]);
          tp.total = obj.result;
        }
      });
    },
    sizechange(val) {
      console.log("size change");
      console.log(`每页 ${val} 条`);
    },
    currentchange(val) {
      this.currentpage = val;
      this.$router.push({ path: "/ppt/list", query: { page: val } });
      console.log(this.$route.query.page);
      this.updatepage();
      this.changeinfo();
    },
    changeinfo() {
      var tp = this;
      var params = new URLSearchParams();
      params.append("begin", (this.currentpage - 1) * this.pagesize);
      params.append("pageSize", this.pagesize);
      this.$http({
        method: "post",
        url: "http://47.96.87.249:8080/dhuf/docu_geDocu",
        params
      }).then(function(response) {
        var msg = response.data;
        tp.tableData.splice(0, tp.tableData.length);
        for (var x in msg) {
          var obj = JSON.parse(msg[x]);
          var docu_data = tp.buquan(
            obj.docu_YEAR,
            obj.docu_MONTH,
            obj.docu_DAY
          );
          tp.tableData.splice(0, 0, {
            docu_data: docu_data,
            docu_name: obj.docu_name,
            docu_cata: obj.docu_cata
          });
        }
      });
    }
  },
  created() {
    var tp = this;
    this.updatepage();
    if (this.$route.query.page != null)
      this.currentpage = parseInt(this.$route.query.page);
    else this.currentpage = 1;
    tp.changeinfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    padding: 100px;
  }
  .text-right{
    text-align: right;
  }
  .text-center{
    text-align: center;
  }
</style>
