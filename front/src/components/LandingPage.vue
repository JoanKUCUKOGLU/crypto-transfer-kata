<script setup lang="ts">
import { getTransaction } from '@/lib/api';
// Ok action function
const ok = async () => {
  console.log('Ok action', await getTransaction("test"));

}
</script>

<template>
  <v-card>
    <v-card-title>The landing page to customize</v-card-title>
    <v-card-text>The content of the card</v-card-text>
    <v-card-actions>
      <v-btn @click="ok">Ok</v-btn>
    </v-card-actions>
  </v-card>
</template>