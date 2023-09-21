<script setup lang="ts">
import {ref} from "vue";
import { transfer, newWallet } from '@/lib/api';

// define data properties
const fromAddress = ref<string>('');
const toAddress = ref<string>('');
const amount = ref<number>(100_000);

// Ok action function
const ok = async () => {
  console.log('Ok action', await transfer(fromAddress.value, toAddress.value, amount.value));
}

async function createNewWallet() {
  const w = await newWallet();
  toAddress.value = w.address;
  console.log("new Wallet Created", w);
  
}
</script>

<template>
  <v-card min-width="500px">
    <v-card-title>Make a crypto transfer</v-card-title>
    <v-card-text>
      <v-text-field label="From" v-model="fromAddress"></v-text-field>
      <v-text-field label="To" v-model="toAddress"></v-text-field>
      <v-text-field label="Amount (GWei)" type="number" v-model="amount"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="ok" color="primary">Transfer</v-btn>
      <v-btn @click="createNewWallet" color="secondary">Create a new Wallet</v-btn>
    </v-card-actions>
  </v-card>
</template>