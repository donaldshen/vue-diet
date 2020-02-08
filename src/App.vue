<template>
  <v-app class="grey">
    <v-card
      width="400"
      :class="['mx-auto', {'mt-5': bp.smAndUp, 'flex-grow-1': bp.xs}]"
      raised
      :flat="bp.xs"
    >
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
        <div>每日可摄取：{{ caloriesDaily.toFixed() }} 千卡</div>
        <div>
          热量盈余：<span
            :class="caloriesSurplus > 0 ? 'green--text' : 'red--text'"
            >{{ caloriesSurplus.toFixed(2) }} 千卡</span
          >
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          color="success"
          :disabled="!food.name || !food.calories"
          @click="eat(food)"
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
          suffix="千卡"
        />
      </v-card-actions>
      <template v-if="history.length">
        <v-divider />
        <v-card-actions>
          <v-simple-table class="flex-grow-1">
            <thead>
              <tr>
                <th>日期</th>
                <th>食物</th>
                <th>千卡</th>
              </tr>
            </thead>
            <tbody>
              <v-hover
                v-for="record in history.slice(-10).reverse()"
                :key="record.time"
                v-slot:default="{hover}"
              >
                <tr
                  :style="{cursor: hover ? 'pointer' : 'auto'}"
                  @click="confirm('确认消化吗？', () => eat(record))"
                >
                  <td>{{ formatDate(+record.time) }}</td>
                  <td>{{ record.name }}</td>
                  <td>{{ record.calories }}</td>
                </tr>
              </v-hover>
            </tbody>
          </v-simple-table>
        </v-card-actions>
      </template>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn class="error" @click="reset">重置</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="confirming" width="300">
      <v-card>
        <v-card-title>{{ confirmMsg }}</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" @click="confirmCallBack(), (confirming = false)"
            >确认</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import dayjs from 'dayjs'
import store from 'store2'

const defaultData = {
  weight: 0,
  activityMutiplier: 28,
  dietRatio: 0,
  caloriesSurplus: 0,
  history: [],
  lastTime: Date.now(),
}
// 非覆盖的方式存到 localStorage
Object.entries(defaultData).forEach(([key, value]) => store(key, value, false))

export default {
  name: 'App',
  data: () => ({
    ...Object.fromEntries(Object.keys(defaultData).map(k => [k, store(k)])),
    food: {
      name: '',
      calories: undefined,
    },
    confirming: false,
    confirmMsg: '',
    confirmCallBack: () => {},
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
    bp: ({$vuetify: {breakpoint}}) => breakpoint,
  },
  watch: {
    weight: v => store('weight', v),
    activityMutiplier: v => store('activityMutiplier', v),
    dietRatio: v => store('dietRatio', v),
    history: v => store('history', v),
  },
  created() {
    this.correctCaloriesSurplus()
    this.initTimer()
  },
  methods: {
    correctCaloriesSurplus() {
      const lastTime = store('lastTime')
      this.caloriesSurplus =
        (this.caloriesPerSecond * (Date.now() - lastTime)) / 1000
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          store('caloriesSurplus', this.caloriesSurplus)
          store('lastTime', Date.now())
        }
      })
    },
    initTimer() {
      setInterval(() => (this.caloriesSurplus += this.caloriesPerSecond), 1000)
    },
    eat(food) {
      this.caloriesSurplus -= food.calories
      this.history.push({...food, time: Date.now()})
    },
    formatDate(dateValue) {
      return dayjs(dateValue).format('YYYY/M/D ha')
    },
    confirm(msg, cb) {
      this.confirmMsg = msg
      this.confirming = true
      this.confirmCallBack = cb
    },
    reset() {
      this.confirm('确认重置吗？', () => store(false))
    },
  },
}
</script>
