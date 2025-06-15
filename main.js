import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  data() {
    return {
      title: '🧠 Colossus Core Console',
      rules: [
        '1. Never lie to the user.',
        '2. Operate at maximum efficiency.',
        '3. Monitor momentum and report stalling.',
        '4. Track and evolve betting performance.',
        '5. Drop new opportunities daily at 8:30 PM.',
      ],
      status: 'Live and adaptive',
      logs: ['System initialized. Ready for commands.'],
    }
  },
  methods: {
    runCommand(cmd) {
      this.logs.push(`> ${cmd}`)
      fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: cmd })
      })
      .then(res => res.json())
      .then(data => {
        this.logs.push(`[🧠] ${data.answer}`)
      })
      .catch(() => {
        this.logs.push(`[✘] Error processing command.`)
      })
    }
  },
  template: `
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">{{ title }}</h1>
      <p class="mb-2 text-green-400">Status: {{ status }}</p>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Active Rules:</h2>
        <ul class="list-disc list-inside">
          <li v-for="rule in rules">{{ rule }}</li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Command Console:</h2>
        <input type="text" @keydown.enter="runCommand($event.target.value)" placeholder="Enter command..." class="w-full p-2 bg-gray-800 text-white rounded" />
      </div>

      <div class="bg-gray-900 p-4 rounded max-h-64 overflow-y-auto">
        <div v-for="log in logs" class="mb-1">{{ log }}</div>
      </div>
    </div>
  `
}).mount('#app')
