<template>
  <div class="min-h-screen bg-gray-900 p-6">
    <!-- Screen -->
    <div class="mx-auto mb-12 w-full max-w-3xl">
      <div class="bg-gradient-to-t from-gray-700 to-gray-900 h-24 rounded-lg shadow-2xl flex items-center justify-center border-t-4 border-amber-500">
        <span class="text-2xl font-bold text-amber-400 tracking-widest">SCREEN</span>
      </div>
    </div>

    <!-- Seat Map -->
    <div class="max-w-4xl mx-auto">
      <!-- Row Labels -->
      <div class="flex mb-4 ml-12">
        <div v-for="row in rows" :key="row" class="w-12 h-12 flex items-center justify-center">
          <span class="text-amber-400 font-bold">{{ row }}</span>
        </div>
      </div>

      <!-- Seats Grid -->
      <div v-for="(rowSeats, rowIndex) in seatLayout" :key="rowIndex" class="flex mb-4">
        <div class="w-12 h-12 flex items-center justify-center">
          <span class="text-amber-400 font-bold">{{ String.fromCharCode(65 + rowIndex) }}</span>
        </div>
        
        <div 
          v-for="(seat, seatIndex) in rowSeats" 
          :key="seatIndex"
          @click="toggleSeat(seat)"
          :class="[
            'w-12 h-12 m-1 rounded-lg flex items-center justify-center transition-all duration-300',
            seat.status === 'available' ? 'bg-gray-700 hover:bg-amber-500 cursor-pointer' : 
            seat.status === 'selected' ? 'bg-amber-500 shadow-lg shadow-amber-500/50' : 
            seat.status === 'vip' ? 'bg-gradient-to-br from-yellow-600 to-amber-800 border-2 border-amber-400' : 
            'bg-red-600 cursor-not-allowed',
            seat.isAisle ? 'mr-8' : ''
          ]"
        >
          <span class="text-xs font-bold text-white">{{ seat.number }}</span>
        </div>
      </div>
    </div>

    <!-- Legend & Summary -->
    <div class="max-w-4xl mx-auto mt-12 p-6 bg-gray-800 rounded-xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Legend -->
        <div>
          <h3 class="text-xl font-bold text-amber-400 mb-4">Seat Status</h3>
          <div class="space-y-3">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-gray-700 rounded-lg mr-3"></div>
              <span class="text-white">Available</span>
            </div>
            <div class="flex items-center">
              <div class="w-8 h-8 bg-amber-500 rounded-lg mr-3"></div>
              <span class="text-white">Selected</span>
            </div>
            <div class="flex items-center">
              <div class="w-8 h-8 bg-gradient-to-br from-yellow-600 to-amber-800 border-2 border-amber-400 rounded-lg mr-3"></div>
              <span class="text-white">VIP/Gold Class</span>
            </div>
            <div class="flex items-center">
              <div class="w-8 h-8 bg-red-600 rounded-lg mr-3"></div>
              <span class="text-white">Occupied</span>
            </div>
          </div>
        </div>

        <!-- Selection Summary -->
        <div>
          <h3 class="text-xl font-bold text-amber-400 mb-4">Your Selection</h3>
          <div class="bg-gray-700 p-4 rounded-lg">
            <div class="flex justify-between mb-2">
              <span class="text-gray-300">Selected Seats:</span>
              <span class="font-mono text-white">{{ selectedCount }} seats</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-300">VIP Seats:</span>
              <span class="font-mono text-amber-400">{{ vipCount }} × $15</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-300">Standard Seats:</span>
              <span class="font-mono text-white">{{ standardCount }} × $8</span>
            </div>
            <div class="border-t border-gray-600 pt-3 mt-3">
              <div class="flex justify-between text-lg font-bold">
                <span class="text-amber-400">Total:</span>
                <span class="text-white">${{ totalPrice }}</span>
              </div>
            </div>
          </div>
          <button class="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg">
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: ['1', '2', '3', '4', '5', '', '6', '7', '8', '9', '10'],
      seatLayout: [
        // Row A
        [
          { id: 'A1', number: 1, status: 'available', type: 'standard' },
          { id: 'A2', number: 2, status: 'available', type: 'standard' },
          { id: 'A3', number: 3, status: 'available', type: 'standard' },
          { id: 'A4', number: 4, status: 'available', type: 'standard' },
          { id: 'A5', number: 5, status: 'available', type: 'standard', isAisle: true },
          { id: 'A6', number: 6, status: 'available', type: 'standard' },
          { id: 'A7', number: 7, status: 'available', type: 'standard' },
          { id: 'A8', number: 8, status: 'available', type: 'standard' }
        ],
        // Row B (VIP)
        [
          { id: 'B1', number: 1, status: 'vip', type: 'vip' },
          { id: 'B2', number: 2, status: 'vip', type: 'vip' },
          { id: 'B3', number: 3, status: 'vip', type: 'vip' },
          { id: 'B4', number: 4, status: 'vip', type: 'vip' },
          { id: 'B5', number: 5, status: 'vip', type: 'vip', isAisle: true },
          { id: 'B6', number: 6, status: 'vip', type: 'vip' },
          { id: 'B7', number: 7, status: 'vip', type: 'vip' },
          { id: 'B8', number: 8, status: 'vip', type: 'vip' }
        ],
        // Row C
        [
          { id: 'C1', number: 1, status: 'occupied', type: 'standard' },
          { id: 'C2', number: 2, status: 'available', type: 'standard' },
          { id: 'C3', number: 3, status: 'available', type: 'standard' },
          { id: 'C4', number: 4, status: 'occupied', type: 'standard' },
          { id: 'C5', number: 5, status: 'available', type: 'standard', isAisle: true },
          { id: 'C6', number: 6, status: 'available', type: 'standard' },
          { id: 'C7', number: 7, status: 'occupied', type: 'standard' },
          { id: 'C8', number: 8, status: 'available', type: 'standard' }
        ],
        // Additional rows...
      ]
    }
  },
  computed: {
    selectedCount() {
      return this.seatLayout.flat().filter(seat => seat.status === 'selected').length
    },
    vipCount() {
      return this.seatLayout.flat().filter(seat => seat.status === 'selected' && seat.type === 'vip').length
    },
    standardCount() {
      return this.seatLayout.flat().filter(seat => seat.status === 'selected' && seat.type === 'standard').length
    },
    totalPrice() {
      return (this.vipCount * 15) + (this.standardCount * 8)
    }
  },
  methods: {
    toggleSeat(seat) {
      if (seat.status === 'available') {
        seat.status = 'selected'
      } else if (seat.status === 'selected') {
        seat.status = 'available'
      }
      // VIP seats remain VIP even when selected
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for seat grid */
.seat-map::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.seat-map::-webkit-scrollbar-track {
  background: #1f2937;
}
.seat-map::-webkit-scrollbar-thumb {
  background: #f59e0b;
  border-radius: 4px;
}
</style>
