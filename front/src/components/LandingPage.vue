<script setup lang="ts">
import { ref, watch, onMounted, onErrorCaptured } from 'vue'
import { newWallet, listWallets, getBalance, transferToken } from '@/lib/api'

// define data properties
const fromAddress = ref<string>('')
const fromAddressBalance = ref<string>('')
const toAddress = ref<string>('')
const amount = ref<number>(100_000)
const wallets = ref<string[]>([])
const lastTransactionHash = ref<string>('')
const lastError = ref<string>('')

onMounted(async () => {
  loadWallets()
})

onErrorCaptured((err) => {
  lastError.value = err.message
  console.error(err)
})

watch(fromAddress, async (address) => {
  if (!address) fromAddressBalance.value = '-'
  fromAddressBalance.value = await getBalance(address)
})

async function createNewWallet() {
  const w = await newWallet()
  await loadWallets()
  toAddress.value = w.address
  console.log('new Wallet Created', w)
}

async function loadWallets() {
  wallets.value = await listWallets()
  console.log('wallets', wallets.value)
}

async function proceedTransfer() {
  lastTransactionHash.value = await transferToken(
    fromAddress.value,
    toAddress.value,
    BigInt(amount.value)
  )
  console.log('new tx hash', lastTransactionHash.value)
}
</script>

<template>
  <v-card min-width="600px">
    <v-card-title>Make a crypto transfer</v-card-title>
    <v-card-text>
      <v-combobox
        label="From"
        :items="wallets"
        v-model="fromAddress"
        :messages="`Balance: ${fromAddressBalance}`"
      ></v-combobox>
      <v-text-field label="To" v-model="toAddress"></v-text-field>
      <v-text-field label="Amount (GWei)" type="number" v-model="amount"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="proceedTransfer" color="primary">Transfer</v-btn>
      <v-btn @click="createNewWallet" color="secondary">Create a new Wallet</v-btn>
    </v-card-actions>
    <v-card-text>
      <v-alert
        type="success"
        v-if="lastTransactionHash"
        closable
        @click:close="lastTransactionHash = ''"
      >
        Transaction sent: {{ lastTransactionHash }}
      </v-alert>
      <v-alert type="error" v-if="lastError" closable @click:close="lastError = ''">
        {{ lastError }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>
