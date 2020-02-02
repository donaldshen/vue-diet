<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5" hover>
      <v-card-title class="pb-0">
        <h2>数据表</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="weight"
          label="体重"
          prepend-icon="mdi-nature-people"
          type="number"
          suffix="kg"
        />
        <v-slider
          v-model="activityMutiplier"
          prepend-icon="mdi-human-handsup"
          min="28"
          max="34"
          :step="2"
          :label="`运动系数: ${activityMutiplier}`"
          inverse-label
          thumb-label
          ticks="always"
          :hint="activityDescription"
          persistent-hint
        />
        <v-slider
          v-model="dietRatio"
          prepend-icon="mdi-alien"
          min="0"
          max="30"
          :label="`减肥速率: ${dietRatio}%`"
          inverse-label
        />
        <div>每日可摄取：{{ caloriesDaily.toFixed() }} kcal</div>
        <div>
          热量盈余：<span
            :class="caloriesSurplus > 0 ? 'green--text' : 'red--text'"
            >{{ caloriesSurplus.toFixed(2) }} kcal</span
          >
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn :disabled="!food.name || !food.calories" @click="eat(food)"
          >摄入</v-btn
        >
        <v-text-field
          v-model="food.name"
          class="ml-2"
          prepend-inner-icon="mdi-baguette"
          label="食物"
        />
        <v-text-field
          v-model="food.calories"
          label="热量"
          type="number"
          suffix="kcal"
        />
      </v-card-actions>
      <template v-if="history.length">
        <v-divider></v-divider>
        <v-card-actions>
          <v-simple-table>
            <tbody>
              <tr
                v-for="record in history.slice(-10).reverse()"
                :key="record.time"
                @click="eat(record)"
              >
                <td>{{ new Date(+record.time).toLocaleString() }}</td>
                <td>{{ record.name }}</td>
                <td>{{ record.calories }} kcal</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-actions>
      </template>
    </v-card>
  </v-app>
</template>

<script>
const storage = {
  get(key, defaultValue) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
}

export default {
  name: 'App',
  data: () => ({
    weight: storage.get('weight', 0),
    activityMutiplier: storage.get('activityMutiplier', 28),
    dietRatio: storage.get('dietRatio', 0),
    caloriesSurplus: 0,
    food: storage.get('food', {
      name: '',
      calories: undefined,
    }),
    history: storage.get('history', []),
  }),
  computed: {
    activityDescription: ({activityMutiplier}) =>
      ({
        28: '久坐',
        30: '偶尔散步',
        32: '低强度规律运动',
        34: '每周三次力量训练',
      }[activityMutiplier]),
    caloriesDaily: ({weight, activityMutiplier, dietRatio}) =>
      weight * activityMutiplier * (1 - dietRatio / 100),
    caloriesPerSecond: ({caloriesDaily}) => caloriesDaily / 24 / 60 / 60,
  },
  watch: {
    weight: v => storage.set('weight', v),
    activityMutiplier: v => storage.set('activityMutiplier', v),
    dietRatio: v => storage.set('dietRatio', v),
    history: v => storage.set('history', v),
  },
  created() {
    this.resetCaloriesSurplus()
    this.initTimer()
  },
  beforeDestroy() {
    storage.set('caloriesSurplus', [Date.now(), this.caloriesSurplus])
  },
  methods: {
    resetCaloriesSurplus() {
      const [lastTime = Date.now(), lastCaloriesSurplus = 0] = storage.get(
        'caloriesSurplus',
        [],
      )
      this.caloriesSurplus =
        lastCaloriesSurplus +
        (this.caloriesPerSecond * (Date.now() - lastTime)) / 1000
      document.addEventListener('pagehide', () => {
        storage.set('caloriesSurplus', [Date.now(), this.caloriesSurplus])
      })
    },
    initTimer() {
      setInterval(() => (this.caloriesSurplus += this.caloriesPerSecond), 1000)
    },
    eat(food) {
      this.caloriesSurplus -= food.calories
      this.history.push({...food, time: Date.now()})
    },
  },
}
</script>
