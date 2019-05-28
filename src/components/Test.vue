<template>
  <div class="container">
     <el-upload
    class="upload-demo"
    drag
    :on-success="onsuccess"
    name="file"
    action="http://47.96.87.249:8080/dhuf/docu_upload"
    multiple
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text text-center">
      将文件拖到此处，或
      <em>点击上传</em>
    </div>
    <div class="el-upload__tip text-center" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>

  <input type="button" value="hhh" v-on:click="hehe" class="text-center">

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
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      console.log(index, row);

      /*var params=new URLSearchParams();
        params.append('docu_name',row.docu_name);
        var response=await this.$http({
          method:'get',
          url:'http://localhost:8080/dhu/docu_download',
          params
        });*/
      // this.$router.push('http://localhost:8080/dhu/docu_download?docu_name='+row.docu_name);
      //console.log(response);
      // location.href='http://localhost:8080/dhu/docu_download?docu_name='+row.docu_name;

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
        console.log("hello");
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
    async handleDelete(index, row) {
      var tp = this;
      console.log("hahahahahha");
      this.$confirm("此操作将删除该文件，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var params = new URLSearchParams();
          params.append("docu_name", row.docu_name);
          //var response=await this.$htp.post('http://localhost:8080/dhu/docu_delete',params);
          var response = await tp.$http({
            method: "post",
            url: "http://47.96.87.249:8080/dhuf/docu_delete",
            params
          });
          console.log(response);
          var msg = response.data;
          for (var x in msg) {
            var obj = JSON.parse(msg[x]);
            console.log(obj.status);
            //success 为成功，notexistinfolder 为文件夹里面没有 notexistindb 为数据库里面没有
          }
          tp.updatepage();
          tp.changeinfo();
          if (obj.status != "success") throw "notexist";

          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(exception => {
          if (exception == "notexist") {
            this.$message.error("后台没有该文件orz");
          } else {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          }
        });
    },
    async hehe() {
      // console.log("hehe")
      //  this.$router.push({path:'/Test',query:{id:'123'}});
      //  console.log(this.$route.query.id)
      // console.log(this.currentpage)
      var temp = await this.test();
      console.log(temp);
      console.log("hi");
    },
    async test() {
      setTimeout(() => {}, 2000).then(() => {
        return "ok";
      });
    },
    onsuccess(response, file, fileList) {
      console.log("the upload:" + response);

      var msg = response;
      var obj = JSON.parse(msg[0]);
      console.log(obj.status);
      if (obj.status == "success") {
        this.$message({
          message: "宁上传成功",
          type: "success"
        });
      } else if (obj.status == "exist") {
        this.$message({
          message: "已经有这个文件了",
          type: "warning"
        });
      } else if (obj.status == "nofile") {
        this.$message({
          message: "后台没有接收到宁的消息哦",
          type: "warning"
        });
      } else {
        this.$message.error("未知的错误，请通知我");
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
      console.log("this is updatepage");
      var tp = this;
      this.$http({
        method: "post",
        url: "http://47.96.87.249:8080/dhuf/docu_gecount",
        data: {}
      }).then(function(response) {
        console.log(response.status);
        console.log(response.data);
        if (response.status == 200) {
          var msg = response.data;
          var obj = JSON.parse(msg[0]);
          console.log(obj.result);
          tp.total = obj.result;
        }
      });
    },
    sizechange(val) {
      console.log("size change");
      console.log(`每页 ${val} 条`);
    },
    currentchange(val) {
      console.log("current change");
      console.log(`当前页: ${val}`);
      this.currentpage = val;
      this.$router.push({ path: "/Test", query: { page: val } });
      console.log(this.$route.query.page);
      this.updatepage();
      this.changeinfo();
    },
    changeinfo() {
      console.log("this is changeinfo");
      var tp = this;
      var params = new URLSearchParams();
      params.append("begin", (this.currentpage - 1) * this.pagesize);
      params.append("pageSize", this.pagesize);
      this.$http({
        method: "post",
        url: "http://47.96.87.249:8080/dhuf/docu_geDocu",
        params
      }).then(function(response) {
        console.log(response.data);
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
    console.log("begin:" + (tp.currentpage - 1) * tp.pagesize);
    console.log("pageSize:" + tp.pagesize);
    tp.changeinfo();
  },
  watch: {
    currentpage(newValue, oldValue) {
      console.log("hello" + newValue);
    }
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
