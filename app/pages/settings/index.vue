<template>
<div class="card p-8">
  <h2 class="text-lg font-semibold text-brand-foreground mb-4">Profile Picture</h2>

  <div class="flex gap-6">
    <input
        type="file"
        hidden
        name="avatar"
        id="avatar"
        accept="image/*, .gif"
        @change="handleAvatarChange"
    >
    <label for="avatar" class="cursor-pointer">
      <img
          v-if="userStore.avatar"
          :src="userStore.avatar"
          alt="Avatar"
          class="w-24 h-24 rounded-full"
      >

      <div v-else class="relative">
        <component :is="LucideCircleUser" class="w-24 h-24 stroke-brand-muted" :stroke-width="1.2"/>
        <div class="absolute bottom-1 right-1 flex items-center justify-center rounded-full p-1.5 bg-brand-primary border-brand-card border-4 bg-primary-darker">
          <LucideCamera class="w-4 h-4"/>
        </div>
      </div>
    </label>

    <div class="flex flex-col justify-center">
      <span class="text-sm text-brand-muted">Upload a new avatar. JPG, PNG or GIF. Max 2 MB</span>

      <div class="mt-3 flex gap-2 items-center">
        <input
            type="file"
            hidden
            name="avatar"
            id="avatar"
            accept="image/*, .gif"
            @change="handleAvatarChange"
        />
        <label
            for="avatar"
            class="px-4 py-2 rounded-xl bg-brand-primary text-sm transition-all hover:bg-brand-primary/90 border border-brand-border font-medium cursor-pointer">
          Upload Image
        </label>
        <button
            @click="removeAvatar"
            class="px-4 py-2 rounded-xl bg-brand-secondary text-sm transition-all hover:bg-brand-secondary/80 border border-brand-border font-medium cursor-pointer">
          Remove
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { LucideCircleUser } from "#components"

const userStore = useUserStore()

const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (target.files && target.files[0] && target.files[0].size <= 2e6) {
    const file = target.files[0]

    console.log(file.size);

    userStore.avatar = URL.createObjectURL(file)
  }
}

const removeAvatar = () => {
  userStore.avatar = ''
}
</script>