<template>
  <div class="setting">

    <div class="page_header">
      <h2 class="page_title">设置</h2>
      <div class="page_action">
        <el-button type="primary" @click="handleSave" :icon="CircleCheck">保存</el-button>
      </div>
    </div>

    <div class="setting_wrapper">
      <el-form :model="settingForm" :rules="settingRules" ref="settingRef" label-width="80px">
        <el-card shadow="never" class="card_wrapper">
          <template #header>
            <span>公告管理</span>
          </template>
          <el-form-item prop="announcement" label="公告">
            <el-input clearable type="text" :prefix-icon="ChatLineSquare" placeholder="请输入内容" maxlength="50"
              show-word-limit v-model="settingForm.announcement" />
          </el-form-item>
        </el-card>

        <el-card shadow="never" class="card_wrapper">
          <template #header>
            <div class="card_header">
              <span>平台管理</span>
              <el-button type="primary" text @click="handleAddPlatform" :icon="CirclePlus">添加平台</el-button>
            </div>
          </template>
          <div class="card_content_flex" v-if="settingForm.platform.length">
            <div v-for="(item, index) in settingForm.platform" :key="index" class="platform_box">
              <el-card shadow="never">
                <template #header>
                  <div class="card_header">
                    <span>平台 {{ index + 1 }}</span>
                    <el-button type="danger" text @click="handleDeletePlatform(item, index)"
                      :icon="Delete">删除平台</el-button>
                  </div>
                </template>
                <el-form-item label-width="0" :prop="'platform.' + index + '.name'"
                  :rules="[{ required: true, message: '请输入平台名称', trigger: 'blur' }]">
                  <el-input clearable v-model="item.name" placeholder="请输入平台名称" :prefix-icon="Postcard" />
                </el-form-item>

                <el-form-item label-width="0" :prop="'platform.' + index + '.url'"
                  :rules="[{ required: true, message: '请输入链接', trigger: 'blur' }]">
                  <el-input clearable v-model="item.url" placeholder="请输入链接" :prefix-icon="Link" />
                </el-form-item>

                <el-form-item label-width="0" :prop="'platform.' + index + '.icon'"
                  :rules="[{ required: true, message: '请输入图标', trigger: 'blur' }]">
                  <el-input clearable v-model="item.icon" placeholder="请输入图标" :prefix-icon="Star" />
                </el-form-item>
              </el-card>
            </div>
          </div>
          <el-empty v-else description="暂无平台">
            <el-button type="primary" @click="handleAddPlatform" :icon="CirclePlus">添加平台</el-button>
          </el-empty>
        </el-card>
        <el-card shadow="never" class="card_wrapper">
          <template #header>
            <span>信息配置</span>
          </template>
          <div class="info_allocation">
            <el-form-item prop="author" label="作者">
              <el-input clearable type="text" :prefix-icon="User" placeholder="请输入作者" v-model="settingForm.author" />
            </el-form-item>
            <el-form-item prop="email" label="Email">
              <el-input clearable type="text" :prefix-icon="Message" placeholder="请输入Email" v-model="settingForm.email" />
            </el-form-item>
            <el-form-item prop="github" label="Github">
              <el-input clearable type="text" placeholder="请输入Github" v-model="settingForm.github" :prefix-icon="Link" />
            </el-form-item>
            <el-form-item prop="weChat" label="公众号">
              <el-input clearable type="text" placeholder="请输入微信公众号" v-model="settingForm.weChat" :prefix-icon="Link" />
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import { CirclePlus, Delete, CircleCheck, ChatLineSquare, Postcard, Link, User, Message, Star } from "@element-plus/icons-vue"

const settingRef = ref(null)
const settingRules = ref({
  announcement: [
    { required: true, message: '请输入公告内容', trigger: 'blur' },
  ],
  author: [
    { required: true, message: '请输入作者', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入Email', trigger: 'blur' },
    { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '请输入正确的Email', trigger: 'blur' },
  ],
  github: [
    { required: true, message: '请输入Github', trigger: 'blur' },
    { pattern: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/, message: '请输入正确的Github地址', trigger: 'blur' },
  ],
  weChat: [
    { required: true, message: '请输入微信公众号', trigger: 'blur' },
  ]
})
const settingForm = ref({
  announcement: '',
  platform: [],
  author: '',
  email: '',
  github: '',
  weChat: '',
})

// 保存
const handleSave = () => {
  settingRef.value.validate((valid) => {
    if (valid) {
      console.log('settingForm.value========', settingForm.value);
    } else {
      ElMessage.warning('请完善信息')
    }
  })
}

// 添加平台
const handleAddPlatform = () => {
  if (settingForm.value.platform.length >= 6) {
    ElMessage.warning('最多添加6个平台')
    return
  }

  settingForm.value.platform.push({
    name: '',
    url: '',
    icon: '',
  })
}

// 删除平台
const handleDeletePlatform = (item, index) => {
  settingForm.value.platform.splice(index, 1)
}

</script>

<style scoped lang="scss">
.setting {
  padding: 20px;

  .setting_wrapper {
    margin-top: 50px;

    .card_wrapper {
      margin-bottom: 20px;
    }

    .card_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card_content_flex {
      display: flex;
      flex-wrap: wrap;
    }

    .platform_box {
      width: 31%;
      margin-right: 20px;
      margin-bottom: 20px;
    }

    .info_allocation {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .el-form-item {
        width: 48%;
      }
    }
  }
}
</style>
