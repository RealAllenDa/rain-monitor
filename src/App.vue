<template>
  <router-view/>
</template>

<script setup lang="ts">
import {useQuasar} from 'quasar';

const $q = useQuasar();
$q.iconMapFn = (iconName) => {
  if (iconName.startsWith('qi:')) {
    const name = iconName.substring(3);

    return {
      cls: 'qi-' + name,
    };
  }
};
</script>
