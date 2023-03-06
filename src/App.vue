<template>
  <section id="blog">
    <div v-if="!post" class="loading">
      Loading...
    </div>

    <template v-else>
      <div class="header">
        <div class="header_actions  ">
          <IconArrow class="cursor-pointer" />
          <IconHeart class="cursor-pointer" />
        </div>
        <img src="./assets/images/network.640.jpg" alt="article image" class="header_image" />
      </div>

      <div class="tags px-7 py-5">
        <AppTag v-for="(tag, i) in post.tags" :key="`tag-${i}`" :text="tag" class="mx-2" />
      </div>

      <h1 class="article-title px-7">
        {{ post.title }}
      </h1>
      <span class="article-subtitle px-7">
        Understanding the Hidden Pitfalls of Software Abstractions
      </span>

      <AppAvatar detailed class="px-7 py-5" src="src/assets/images/user.6.jpg" :title="post.author" :subtitle="post.date.slice(0, 10)" />

      <article class="article-content px-7" v-html="post.content"></article>

      <div class="cta_container py-6 px-7 mt-5">
        <AppAvatar src="src/assets/images/user.6.jpg" />
        <div class="cta_content">
          <h2>About the author</h2>
          <p>Joel Spolsky is a New York Times bestseller and a RITA® winner.</p>

          <div class="cta_action mt-3">
            <button class="cta_action--primary px-4">
              <IconCheck />
              Following  
            </button>

            <button class="cta_action--secondary mx-3">
              <IconBookmark />
            </button>
          </div>
        </div>
      </div>

      <section id="comments" class="px-7 mt-5">
        <h3 class="section-title">
          Share a reply?
        </h3>

        <textarea v-model="comment" class="mt-3 mb-5" placeholder="your message... (hit Enter to send)" @keydown.enter="postComment(1)"></textarea>

        <AppComment v-for="({ username, text, date }, i) in post.comments"
        :key="`comment-${i}`"
        :src="`src/assets/images/user.${i + 1 < 6 ? i + 1 : 1}.jpg`"
        :user="username"
        :comment="text"
        :date="date"
        class="mt-6" /> 
      </section>

      <footer class="mt-8 px-4 py-6">
        <span class="footer-title">
          Company
        </span>

        <nav>
          <ul>
            <li v-for="(item, i) in links" :key="`nav-${i}`">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </nav>

        <div class="socials">
          <IconFacebook class="mx-2" />

          <IconInstagram class="mx-2" />

          <IconYoutube class="mx-2" />
        </div>
      </footer>
    </template>
  </section>
</template>

<script>
import IconHeart from './components/icons/IconHeart.vue'
import IconArrow from './components/icons/IconArrow.vue'
import IconCheck from './components/icons/IconCheck.vue'
import IconBookmark from './components/icons/IconBookmark.vue'
import IconFacebook from './components/icons/IconFacebook.vue'
import IconInstagram from './components/icons/IconInstagram.vue'
import IconYoutube from './components/icons/IconYoutube.vue'
import AppTag from './components/app/AppTag.vue'
import AppAvatar from './components/app/AppAvatar.vue'
import AppComment from './components/app/AppComment.vue'

export default {
  components: {
    IconHeart,
    IconArrow,
    AppTag,
    AppAvatar,
    IconCheck,
    IconBookmark,
    AppComment,
    IconFacebook,
    IconInstagram,
    IconYoutube
  },
  data() {
    return {
      post: null,
      comment: null,
      links: ['About', 'Community']
    }
  },
  created() {
    this.getPost(1)
  },
  methods: {
    async getPost(postId) {
      try {
        const { data, status } = await this.axios.get(`/posts/${postId}`)
        if (status !== 200) throw new Error("Oops! something's wrong here")
        this.post = data
      } catch (e) {
        alert(e.message)
      }
    },
    async postComment(postId) {
      try {
        if (typeof this.comment !== 'string' || this.comment.trim().length === 0)
          throw new Error('you forgot to type the comment')
        const { status } = await this.axios.post(`/posts/${postId}/comment`, {
          text: this.comment
        })
        if (status !== 201) throw new Error("Oops! something's wrong here")
        const comment = {
          username: 'Hamid Niakan',
          text: this.comment,
          date: new Date().toISOString()
        }
        this.post.comments.push(comment)
        this.comment = null
      } catch (e) {
        alert(e.message)
      }
    }
  }
}
</script>

<style scoped>
#blog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.loading {
  height: 100vh;
  font-weight: bold;
  font-size: 30px;
  margin-top: 5vh;
}

.header {
  height: 25vh;
  width: 100vw;
}

.header_image {
  width: 100%;
  height: 25vh;
  object-fit: cover;
  object-position: center;
}

.header_actions {
  height: 50%;
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}

.tags {
  width: 100%;
  display: flex;
}

.article-title {
  color: var(--c-text-title);
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  letter-spacing: 1px;
}

.article-subtitle {
  font-family: 'Source Serif Pro';
  color: var(--c-text-title);
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 32px;
  letter-spacing: 0.75px;
}

.article-content {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 28px;
  letter-spacing: 0.75px;
}

.cta_container {
  background-color: var(--c-background);
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: start;
}

.cta_content {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}

.cta_action {
  display: flex;
  align-items: center;
}

.cta_action--primary {
  background-color: var(--c-primary);
  color: var(--c-white);
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 22px;
}

.cta_action--secondary {
  background-color: transparent;
  border-radius: 100px;
  border-color: var(--c-border);
}
.section-title {
  color: var(--c-text-title);
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: 1px;
}

textarea {
  resize: none;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  background-color: var(--c-background);
  color: var(--c-text-secondary);
  padding: 15px 25px;
  border-radius: 30px;
  width: 100%;
  height: fit-content;
  min-height: 120px;
}

footer {
  width: 100%;
  background-color: var(--c-background-light);
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: 0.75px;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 0 20px;
}
.socials {
  display: flex;
  justify-content: center;
}
</style>