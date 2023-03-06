<template>
  <div class="container">
    <AppAvatar detailed :src="src" :title="user" :subtitle="date.slice(0, 10)" />
    <div class="comment mt-3">
      {{ comment }}
    </div>
  </div>
</template>

<script>
import AppAvatar from './AppAvatar.vue'

export default {
  components: {
    AppAvatar,
  },
  props: {
    src: {
      type: String,
      default: '',
      required: true
    },
    user: {
      type: String,
      default: '',
      required: false
    },
    date: {
      type: String,
      default: '',
      required: false
    },
    comment: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>

<style scoped>
.comment {
  background-color: var(--c-background);
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0.75px;
  border-radius: 0 100px 100px 100px;
  padding: 25px 15px;
}
</style>