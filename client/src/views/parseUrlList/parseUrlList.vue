<template>
  <div class="note-list">
    <div class="header_operation">
      <el-form style="width: 100%" :inline="true" :model="searchForm" @submit.native.prevent>
        <el-form-item label="" style="flex: 1">
          <el-input v-model="searchForm.title" clearable :prefix-icon="Search" style="width:100%"
            @keydown.enter="getListData" placeholder="请输入标题(可模糊搜索)">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getListData" :icon="Search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="handleReset" plain :icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" stripe border empty-text="暂无数据">
      <el-table-column align="center" label="ID" prop="id" width="70" />
      <el-table-column align="left" label="标题" prop="title" show-overflow-tooltip>
        <template #default="scope">
          <el-tag v-if="scope.row.type === 1" type="success">视频</el-tag>
          <el-tag v-else-if="scope.row.type === 2" type="warning">图文</el-tag>
          <el-text style="marginLeft: 10px;" type="primary" @click="copyUrl(scope.row.title)">
            <el-icon>
              <CopyDocument />
            </el-icon>
            {{ scope.row.title }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column align="left" label="URL" prop="url" show-overflow-tooltip>
        <template #default="scope">
          <el-text type="primary" @click="copyUrl(scope.row.url)">
            <el-icon>
              <CopyDocument />
            </el-icon>
            {{ scope.row.url }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column align="center" label="封面" prop="photo" width="150">
        <template #default="scope">
          <div class="images_box">
            <el-image :src="scope.row.photo" :preview-teleported="true" hide-on-click-modal fit="cover"
              :preview-src-list="[scope.row.photo]">
              <template #error>
                <div class="image_error">
                  <el-icon>
                    <Picture />
                  </el-icon>
                  加载失败
                </div>
              </template>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" sortable width="200" />
      <el-table-column align="center" label="操作" width="120px">
        <template #default="scope">
          <el-button plain type="primary" :icon="Pointer" @click="handleDetail(scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer_operation">
      <el-pagination background layout="prev, pager, next" v-model:page-size="pagination.limit"
        v-model:current-page="pagination.page" :total="pagination.totalCount" />
    </div>

    <BasicDialog v-model="visible" :title='title' width="600px" height="600px">
      <el-card shadow="never" style="margin-bottom: 20px;">
        <template #header>
          <div class="card_header">
            <span>文字内容</span>
          </div>
        </template>
        <p class="card_title">{{ currentDetailsData.title }}</p>
      </el-card>

      <el-card v-if="currentDetailsData.type === 2" shadow="never">
        <template #header>
          <div class="card_header">
            <span>图片内容</span>
            <el-button type="primary" text @click="downloadFile(currentDetailsData.pics)">下载全部</el-button>
          </div>
        </template>
        <div class="card_content">
          <div class="card_content_img">
            <el-image v-for="item in currentDetailsData.pics" :key="item" :src="item" preview-teleported
              hide-on-click-modal fit="cover" :preview-src-list="[item]">
              <template #error>
                <div class="image_error">
                  <el-icon>
                    <Picture />
                  </el-icon>
                  加载失败
                </div>
              </template>
            </el-image>
          </div>
        </div>
      </el-card>

      <el-card v-if="currentDetailsData.type === 1" shadow="never">
        <template #header>
          <div class="card_header">
            <span>视频内容</span>
            <div>
              <el-button type="primary" text :icon="Download"
                @click="downloadFile(currentDetailsData.downurl)">下载</el-button>
              <el-button type="primary" text @click="copyUrl(currentDetailsData.downurl)"
                :icon="CopyDocument">复制链接</el-button>
            </div>
          </div>
        </template>
        <div class="card_content">
          <video :src="currentDetailsData.downurl" controls class="card_video" />
        </div>
      </el-card>
      <template #footer></template>
    </BasicDialog>
  </div>
</template>

<script setup>
import { Pointer, Search, Refresh, CopyDocument, Download } from "@element-plus/icons-vue";
import { useBaseTable } from "@/hooks/useBaseTable.js";
import { getParseUrlList } from "@/api/parseUrlList";
import { useBasicDialog } from "@/hooks/basicDialog/useBasicDialog.js";
import BasicDialog from "@/hooks/basicDialog/basicDialog.vue";
import { copyUrl, downloadFile } from '@/utils/index'

// 搜索
const searchForm = ref({
  title: '',
});

const {
  tableData,
  isLoading,
  pagination,
  getListData,
  handleReset,
} = useBaseTable(getParseUrlList, null, searchForm, 10)

const {
  visible,
  title,
  openDialog,
} = useBasicDialog()


const currentDetailsData = ref({})

const handleDetail = (row) => {
  currentDetailsData.value = row
  openDialog('查看详情')
}


</script>

<style scoped lang="scss">
.images_box {
  display: flex;
  align-items: center;
  justify-content: center;

  .el-image {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
}

.card_title {
  line-height: 1.7em;
}

.card_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card_content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  .card_content_img {
    display: flex;
    align-items: start;
    flex-wrap: wrap;

    .el-image {
      width: 100px;
      height: 100px;
      margin: 10px;
    }
  }

  .card_video {
    width: 100%;
    height: 300px;
    border: none;
    outline: none;
  }
}
</style>