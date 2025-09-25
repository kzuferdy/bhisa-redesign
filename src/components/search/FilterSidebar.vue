<template>
  <div v-if="asDrawer">
    <transition
      enter-active-class="transition-opacity ease-in-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-in-out duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" @click="close" class="fixed inset-0 bg-black/60 z-40"></div>
    </transition>
    <transition
      enter-active-class="transition-transform ease-in-out duration-300"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform ease-in-out duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div v-if="isOpen" class="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-bold">Filter</h3>
          <button @click="close" class="p-2">
            <div class="w-6 h-6 relative">
              <span class="absolute h-0.5 w-full bg-gray-600 transform rotate-45 top-1/2"></span>
              <span class="absolute h-0.5 w-full bg-gray-600 transform -rotate-45 top-1/2"></span>
            </div>
          </button>
        </div>
        <div class="p-4">
          <h4 class="font-semibold mb-2">Operator</h4>
          <div class="space-y-2">
            <div v-for="operator in operators" :key="operator" class="flex items-center">
              <input :id="operator + '-drawer'" :value="operator" v-model="selectedOperators" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
              <label :for="operator + '-drawer'" class="ml-3 text-sm text-gray-600">{{ operator }}</label>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

  <div v-else class="p-4 bg-white rounded-lg shadow-md sticky top-8">
    <h3 class="text-lg font-bold border-b pb-2 mb-4">Filter</h3>
    <div>
      <h4 class="font-semibold mb-2">Operator</h4>
      <div class="space-y-2">
        <div v-for="operator in operators" :key="operator" class="flex items-center">
          <input :id="operator + '-desktop'" :value="operator" v-model="selectedOperators" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          <label :for="operator + '-desktop'" class="ml-3 text-sm text-gray-600">{{ operator }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterSidebar',
  props: {
    operators: { type: Array, default: () => [] },
    isOpen: { type: Boolean, default: false },
    asDrawer: { type: Boolean, default: false }
  },
  emits: ['update-filters', 'close'],
  data() {
    return {
      selectedOperators: []
    }
  },
  watch: {
    selectedOperators(newValue) {
      this.$emit('update-filters', { operators: newValue });
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>
