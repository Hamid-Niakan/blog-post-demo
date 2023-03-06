<template>
  <div class="tag">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped>
.tag {
  background-color: var(--c-primary-light);
  color: var(--c-on-primary-light);
  border-radius: 4px;
  padding: 4px 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.25px;
}
</style>