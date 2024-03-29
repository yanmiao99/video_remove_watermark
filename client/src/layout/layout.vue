<template>
  <div class="basic-layout">
    <div class="nav-side">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="logo">
        <h1 v-show="!isCollapse">{{ config.globalName }}</h1>
      </div>
      <el-menu class="el-menu-vertical" :collapse="isCollapse" router unique-opened :collapse-transition="false"
        :default-active="defaultActive">
        <TreeMenu :routerMenu="routerMenu" :isCollapse="isCollapse" />
      </el-menu>
    </div>
    <div class="content-right">
      <div class="nav-top">
        <div class="shrink">
          <div @click="handleIsCollapse" class="shrink_icon">
            <el-icon>
              <ArrowRight v-if="isCollapse" />
              <ArrowLeft v-else />
            </el-icon>
          </div>
          <BreadCrumb />
        </div>
        <div class="user-info">
          <!-- 下拉菜单 -->
          <el-dropdown trigger="click" @command="handleLogout">
            <div class="user-info-tools">
              <span>{{ username }}</span>
              <el-icon>
                <Tools />
              </el-icon>
            </div>
            <span class="el-dropdown-link"></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="people_center">个人中心</el-dropdown-item>
                <el-dropdown-item command="exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- 暗黑模式 -->
          <el-button size="small" @click="toggleTheme" round style="margin-left: 10px">
            <el-icon v-if="isDark">
              <Sunny />
            </el-icon>
            <el-icon v-else>
              <Moon />
            </el-icon>
          </el-button>
        </div>
      </div>
      <div class="wrapper">
        <router-view v-slot="{ Component }">
          <transition>
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>

  <BasicDialog v-model="visible" title="个人信息修改" align-center width="500px" destroy-on-close>
    <el-form :model="peopleCenterForm" :rules="peopleCenterRules" label-width="90" ref="peopleCenterFormRef">
      <el-form-item label="用户名 : " prop="username">
        <el-input v-model="peopleCenterForm.username" disabled autocomplete="off" placeholder="用户名" />
      </el-form-item>
      <el-form-item label="密码 : " prop="password">
        <el-input v-model="peopleCenterForm.password" autocomplete="off" placeholder="密码" show-password show-word-limit
          maxlength="10" type="password" clearable v-auto-focus />
      </el-form-item>
      <el-form-item label="确认密码 : " prop="checkPassword">
        <el-input v-model="peopleCenterForm.checkPassword" autocomplete="off" placeholder="请再次输入密码" show-password
          show-word-limit maxlength="10" type="password" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handlePeopleCenterSubmit(peopleCenterFormRef)">
          确 认
        </el-button>
      </span>
    </template>
  </BasicDialog>
</template>

<script setup >
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { routerMenu } from "../router/routerMenu";
import { getCurrentUserInfo, postChangePassword } from "../api/user";
import { ElMessage } from "element-plus";
import config from "../config/config";
import storage from "../utils/storage";
import TreeMenu from "./treeMenu.vue"
import BreadCrumb from "./breadCrumb.vue";
import { useBasicDialog } from "@/hooks/basicDialog/useBasicDialog.js";
import BasicDialog from "@/hooks/basicDialog/basicDialog.vue";
import { useThemeAnimation } from "@/hooks/useThemeAnimation.js";


const {
  visible,
  openDialog,
  closeDialog
} = useBasicDialog()

const router = useRouter()

const { toggleTheme, isDark } = useThemeAnimation()

let isCollapse = ref(false)

const username = ref('')
onMounted(async () => {
  // isCollapse本地获取

  // 0 是展开 , 1是收缩
  let storage_isCollapse = storage.getItem('isCollapse') || '0'
  if (storage_isCollapse) {
    isCollapse.value = storage_isCollapse === '1'
  }

  // 获取当前用户信息
  let currentUserInfo = await getCurrentUserInfo()
  username.value = currentUserInfo.username
})

// 获取当前路由
let defaultActive = ref(location.hash.slice(1))

const isTransition = ref('none')
// 菜单收缩
const handleIsCollapse = () => {
  isCollapse.value = !isCollapse.value
  isTransition.value = 'all 0.3s'
  // isCollapse存储本地
  storage.setItem('isCollapse', isCollapse.value ? '1' : '0')
}

// 退出登录
const handleLogout = (key) => {
  const map = {
    people_center: handlePeopleCenter,
    exit: handleExit
  }
  map[key]()
}

const peopleCenterForm = ref({
  username: '',
  password: '',
  checkPassword: ''
})
const peopleCenterFormRef = ref(null)
const peopleCenterRules = ref({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
  ],
  checkPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === peopleCenterForm.value.password) {
          callback()
        } else {
          callback(new Error('两次输入密码不一致'))
        }
      }, trigger: 'blur'
    }
  ]
})

// 提交信息
const handlePeopleCenterSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 修改密码
      await postChangePassword({
        ...peopleCenterForm.value
      })
      ElMessage.success('修改成功,请重新登录')
      closeDialog()
      setTimeout(() => {
        // 清空本地信息
        storage.clearAll()
        // 退出登录
        handleExit()
      }, 500)
    }
  })
}

// 个人中心
const handlePeopleCenter = () => {
  openDialog()
  peopleCenterForm.value.username = username.value
}

// 退出登录
const handleExit = () => {
  storage.clearItem('userInfo')
  router.push('/login')
}

</script>

<style scoped lang="scss">
.basic-layout {
  position: relative;

  .nav-side {
    position: fixed;
    width: v-bind("isCollapse ? '65px' : '200px'");
    height: 100vh;
    background: var(--el-bg-color-overlay);
    overflow-y: auto;
    transition: v-bind(isTransition);
    color: #fff;
    border-right: 1px solid var(--el-border-color-lighter);
    z-index: 100;


    .logo {
      padding: 6px 20px 10px v-bind("isCollapse ? '10px' : '20px'");
      text-align: center;
      display: flex;
      align-items: center;
      cursor: pointer;
      transform: scale(0.9);

      img {
        width: 40px;
        height: 40px;
      }

      h1 {
        // width: 80px;
        font-size: 20px;
        line-height: 1.7em;
        color: var(--el-color-primary);
        white-space: nowrap;
      }
    }

    .el-menu-vertical {
      border-right: 0;
    }
  }

  .content-right {
    margin-left: v-bind("isCollapse ? '65px' : '200px'");
    transition: v-bind(isTransition);
    background: var(--el-bg-color-overlay);

    .nav-top {
      position: fixed;
      top: 0;
      z-index: 99;
      width: 100%;
      right: 0;
      background: var(--el-bg-color-overlay);
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--el-border-color-lighter);

      .shrink {
        margin-left: v-bind("isCollapse ? '65px' : '200px'");
        display: flex;
        align-items: center;

        .el-icon {
          font-size: 16px;
          cursor: pointer;
        }

        .shrink_icon {
          border: 1px solid #ccc;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }
      }

      .user-info {
        margin-top: 5px;
        display: flex;
        cursor: pointer;

        .user-info-tools {
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            margin-right: 5px;
          }
        }
      }
    }

    .wrapper {
      position: relative;
      min-height: calc(100vh - 50px);
      height: calc(100% - 50px);
      padding: 65px 20px;
      box-sizing: border-box;

      .v-enter-active,
      .v-leave-active {
        transition: opacity 0.2s ease;
      }

      .v-enter-from,
      .v-leave-to {
        opacity: 0;
      }

      // 解决动画冲突的问题 , 延迟执行进入动画即可
      .v-enter-active {
        transition-delay: 0.2s;
      }
    }
  }
}
</style>
