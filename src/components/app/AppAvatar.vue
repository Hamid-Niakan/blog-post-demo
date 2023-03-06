<template>
  <div class="container">
    <div
      class="avatar"
      :style="{backgroundImage: `url(${src})`}"
    ></div>

    <div v-if="detailed" class="avatar_details">
      <span class="avatar_details_title">
        {{ title }}
      </span>
      <span class="avatar_details_subtitle">
        {{ subtitle }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detailed: {
        type: Boolean,
        default: false,
        required: false,
      },
      src: {
        type: String,
        default: '',
        required: true,
      },
      title: {
        type: String,
        default: '',
        required: false,
      },
      subtitle: {
        type: String,
        default: '',
        required: false,
      }
    }
  }
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}
.avatar {
  width: 56px;
  height: 56px;
  background-size: contain;
  border-radius: 100%;
}
.avatar_details {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.avatar_details_title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: 0.25px;
}

.avatar_details_subtitle {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: 0.25px;
  color: var(--c-text-subtitle);
}
</style>