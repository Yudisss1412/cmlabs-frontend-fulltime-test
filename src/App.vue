<template>
  <router-view v-slot="{ Component, route }">
    <KeepAlive include="Ingredients">
      <component
        v-if="route.name === 'Ingredients'"
        :is="Component"
        :key="route.name"
      />
    </KeepAlive>

    <Transition name="page-fade" mode="out-in">
      <component
        v-if="route.name !== 'Ingredients'"
        :is="Component"
        :key="route.fullPath"
      />
    </Transition>
  </router-view>
</template>
