<template>
  <div class="homepage">
    <!-- 主要介绍区域 -->
    <div class="hero-section">
      <a-card
          class="profile-card"
          :bordered="false"
      >
        <a-row :gutter="[32, 32]" align="middle">
          <!-- 头像区域 -->
          <a-col :xs="24" :md="8" class="avatar-section">
            <div class="avatar-container">
              <a-avatar
                  :size="160"
                  :src="profile.avatar"
                  class="profile-avatar"
              />
              <div class="status-indicator"></div>
            </div>
          </a-col>

          <!-- 个人信息区域 -->
          <a-col :xs="24" :md="16">
            <div class="profile-info">
              <a-typography-title :level="1" class="name">
                {{ profile.name }}
              </a-typography-title>

              <a-typography-title :level="3" class="title">
                {{ profile.title }}
              </a-typography-title>

              <a-typography-paragraph class="bio">
                {{ profile.bio }}
              </a-typography-paragraph>

              <!-- 联系方式 -->
              <a-space size="large" class="contact-links">
                <a :href="'mailto:' + profile.email" class="contact-item">
                  <mail-outlined />
                  邮箱
                </a>
                <a :href="profile.github" target="_blank" class="contact-item">
                  <github-outlined />
                  GitHub
                </a>
                <a href="#" class="contact-item">
                  <wechat-outlined />
                  微信
                </a>
              </a-space>

              <!-- 技能标签 -->
              <div class="skills-section">
                <a-typography-text strong>技能栈：</a-typography-text>
                <div class="skills-tags">
                  <a-tag
                      v-for="skill in skills"
                      :key="skill.name"
                      :color="getSkillColor(skill.level)"
                      class="skill-tag"
                  >
                    {{ skill.name }}
                  </a-tag>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </div>

    <!-- 统计数据 -->
    <div class="stats-section">
      <a-row :gutter="[16, 16]">
        <a-col :xs="6" :sm="6" :md="6" :lg="6">
          <a-card class="stat-card" :bordered="false">
            <a-statistic
                :value="stats.articles"
                title="文章数量"
                :value-style="{ color: '#1890ff', fontSize: '28px', fontWeight: '600' }"
            >
              <template #suffix>
                <edit-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>

        <a-col :xs="6" :sm="6" :md="6" :lg="6">
          <a-card class="stat-card" :bordered="false">
            <a-statistic
                :value="stats.views"
                title="总浏览量"
                :value-style="{ color: '#52c41a', fontSize: '28px', fontWeight: '600' }"
            >
              <template #suffix>
                <eye-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>

        <a-col :xs="6" :sm="6" :md="6" :lg="6">
          <a-card class="stat-card" :bordered="false">
            <a-statistic
                :value="stats.likes"
                title="获得点赞"
                :value-style="{ color: '#f5222d', fontSize: '28px', fontWeight: '600' }"
            >
              <template #suffix>
                <heart-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>

        <a-col :xs="6" :sm="6" :md="6" :lg="6">
          <a-card class="stat-card" :bordered="false">
            <a-statistic
                :value="stats.days"
                title="运行天数"
                :value-style="{ color: '#722ed1', fontSize: '28px', fontWeight: '600' }"
            >
              <template #suffix>
                <calendar-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 最新文章 -->
    <div class="recent-posts-section">
      <a-card :bordered="false" class="posts-card">
        <template #title>
          <a-typography-title :level="2" style="margin: 0;">
            最新文章
          </a-typography-title>
        </template>

        <template #extra>
          <a-button type="link" @click="viewAllPosts">
            查看全部 →
          </a-button>
        </template>

        <div class="posts-grid">
          <div
              v-for="post in recentPosts"
              :key="post.id"
              class="post-item"
              @click="viewPost(post.id)"
          >
            <div class="post-content">
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-excerpt">{{ post.excerpt }}</p>

              <div class="post-tags">
                <a-tag
                    v-for="tag in post.tags"
                    :key="tag"
                    size="small"
                    color="blue"
                >
                  {{ tag }}
                </a-tag>
              </div>

              <div class="post-meta">
                <span class="post-date">
                  <calendar-outlined />
                  {{ formatDate(post.date) }}
                </span>
                <span class="post-stats">
                  <eye-outlined /> {{ post.views }}
                  <heart-outlined style="margin-left: 12px" /> {{ post.likes }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </a-card>
    </div>

    <!-- 关于我 -->
    <div class="about-section">
      <a-card :bordered="false" class="about-card">
        <template #title>
          <a-typography-title :level="2" style="margin: 0;">
            关于我
          </a-typography-title>
        </template>

        <a-row :gutter="[32, 32]">
          <a-col :xs="24" :md="12">
            <div class="about-content">
              <a-typography-paragraph>
                我是一名热爱技术的全栈开发工程师，专注于现代前端技术栈的研究和实践。
              </a-typography-paragraph>

              <a-typography-paragraph>
                在这个博客里，我会分享我的技术学习心得、项目实践经验，以及对行业趋势的思考。
                希望能与更多志同道合的朋友交流学习，共同进步。
              </a-typography-paragraph>

              <a-typography-paragraph>
                如果你对我的文章感兴趣，欢迎关注我的博客，也欢迎通过邮件或社交媒体与我交流！
              </a-typography-paragraph>
            </div>
          </a-col>

          <a-col :xs="24" :md="12">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>2023 - 至今</h4>
                  <p>高级前端开发工程师</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>2021 - 2023</h4>
                  <p>前端开发工程师</p>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>2020</h4>
                  <p>开始技术博客写作</p>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  CalendarOutlined
} from '@ant-design/icons-vue'

// 个人资料数据
const profile = ref({
  name: "张三",
  title: "全栈开发工程师",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  bio: "热爱技术，专注于前端开发和用户体验。喜欢探索新技术，分享开发心得，致力于用代码创造美好的数字世界。",
  email: "hello@example.com",
  github: "https://github.com/username"
})

// 统计数据
const stats = ref({
  articles: 42,
  views: 15680,
  likes: 1234,
  days: 1456
})

// 技能列表
const skills = ref([
  { name: 'Vue.js', level: 'expert' },
  { name: 'React', level: 'advanced' },
  { name: 'TypeScript', level: 'advanced' },
  { name: 'Node.js', level: 'intermediate' },
  { name: 'Python', level: 'intermediate' },
  { name: 'Docker', level: 'beginner' }
])

// 最新文章
const recentPosts = ref([
  {
    id: 1,
    title: "Vue 3 Composition API 实战指南",
    excerpt: "深入探讨 Vue 3 的核心特性，通过实际项目案例讲解组合式 API 的使用技巧...",
    date: "2024-01-15",
    tags: ['Vue3', 'JavaScript'],
    views: 892,
    likes: 45
  },
  {
    id: 2,
    title: "现代前端工程化实践",
    excerpt: "从零搭建现代化前端开发环境，包括构建工具、代码规范、自动化部署等...",
    date: "2024-01-10",
    tags: ['工程化', 'Webpack'],
    views: 756,
    likes: 38
  },
  {
    id: 3,
    title: "CSS Grid 布局完全指南",
    excerpt: "全面解析 CSS Grid 布局系统，从基础概念到高级应用，让你彻底掌握网格布局...",
    date: "2024-01-05",
    tags: ['CSS', '布局'],
    views: 634,
    likes: 29
  }
])

// 方法
const getSkillColor = (level) => {
  const colors = {
    expert: '#f50',
    advanced: '#2db7f5',
    intermediate: '#87d068',
    beginner: '#108ee9'
  }
  return colors[level] || 'default'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN')
}

const viewPost = (id) => {
  console.log('查看文章:', id)
  // 这里可以添加路由跳转逻辑
}

const viewAllPosts = () => {
  console.log('查看全部文章')
  // 这里可以添加路由跳转逻辑
}
</script>

<style lang="less" scoped>
.homepage {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;

  > div {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.hero-section {
  margin-bottom: 32px;

  .profile-card {
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);

    .avatar-section {
      text-align: center;

      .avatar-container {
        position: relative;
        display: inline-block;

        .profile-avatar {
          border: 4px solid #fff;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .status-indicator {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          background: #52c41a;
          border: 3px solid #fff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      }
    }

    .profile-info {
      .name {
        margin-bottom: 8px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .title {
        color: #666;
        margin-bottom: 16px;
        font-weight: 400;
      }

      .bio {
        color: #666;
        font-size: 16px;
        line-height: 1.8;
        margin-bottom: 24px;
      }

      .contact-links {
        margin-bottom: 24px;

        .contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #1890ff;
          text-decoration: none;
          transition: all 0.3s ease;

          &:hover {
            color: #40a9ff;
            transform: translateY(-2px);
          }
        }
      }

      .skills-section {
        .skills-tags {
          margin-top: 12px;

          .skill-tag {
            margin: 4px 8px 4px 0;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
          }
        }
      }
    }
  }
}

.stats-section {
  margin-bottom: 32px;

  .stat-card {
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    }
  }
}

.recent-posts-section {
  margin-bottom: 32px;

  .posts-card {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);

    .posts-grid {
      .post-item {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-left: 4px solid transparent;

        &:hover {
          background: #fff;
          border-left-color: #1890ff;
          box-shadow: 0 4px 16px rgba(24, 144, 255, 0.1);
          transform: translateX(4px);
        }

        .post-title {
          color: #2c3e50;
          margin-bottom: 12px;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.4;
        }

        .post-excerpt {
          color: #666;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .post-tags {
          margin-bottom: 16px;
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #999;
          font-size: 12px;

          .post-date {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .post-stats {
            display: flex;
            align-items: center;
            gap: 4px;
          }
        }
      }
    }
  }
}

.about-section {
  .about-card {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);

    .about-content {
      :deep(.ant-typography) {
        color: #555;
        line-height: 1.8;
      }
    }

    .timeline {
      .timeline-item {
        position: relative;
        padding-left: 32px;
        padding-bottom: 24px;

        &:not(:last-child)::before {
          content: '';
          position: absolute;
          left: 9px;
          top: 24px;
          width: 2px;
          height: calc(100% - 12px);
          background: #e8e8e8;
        }

        .timeline-dot {
          position: absolute;
          left: 0;
          top: 6px;
          width: 18px;
          height: 18px;
          background: #1890ff;
          border-radius: 50%;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .timeline-content {
          h4 {
            margin: 0 0 8px 0;
            color: #2c3e50;
            font-size: 16px;
          }

          p {
            margin: 0;
            color: #666;
            font-size: 14px;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .homepage {
    padding: 20px 16px;
  }

  .hero-section .profile-card {
    .avatar-section .avatar-container .profile-avatar {
      size: 120px;
    }

    .profile-info {
      text-align: center;

      .contact-links {
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  }

  .stats-section {
    :deep(.ant-col) {
      margin-bottom: 16px;
    }
  }
}
</style>