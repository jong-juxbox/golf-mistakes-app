<template lang="pug">
  v-form(ref="startRound")
    v-row
      v-col
        v-text-field(label="Course" name="course" v-model="course") {{ course }}
    v-row
      v-col
        v-menu(offset-y transition="scale-transition" min-width="290")
          template(v-slot:activator="{ on }")
            v-text-field(label="Date", name="date", v-model="date" v-on="on" readonly)
          v-date-picker(no-title v-model="date" :min="nowDate" scrollable)
    v-row
      v-col
        v-text-field(label="Tees (optional)" name="tees" v-model="tees")
    v-row
      v-col(cols="6")
        v-text-field(label="Slope (optional)" name="slope" type="number" class=""
            v-model.number="slope")
      v-col(cols="6")
        v-text-field(label="Rating (optional)" name="rating" type="number"
          v-model.number="rating")
    v-btn(class="ma-2" dark @click="onCreate") Start
    v-btn(class="ma-2" outlined @click="onCancel") Cancel
</template>

<script lang="ts">
import Vue from 'vue';
import { namespace } from 'vuex-class';
import Component from 'vue-class-component';
import { BEGIN_TRACKING } from '@/store/current-round/mutation-types';

const CANCEL_EVENT = 'cancel-start';
const START_ROUND_EVENT = 'start-round';

const CurrentRoundModule = namespace('currentRound');

@Component({
  name: 'StartRound',
})
export default class StartRound extends Vue {
  @CurrentRoundModule.Mutation(BEGIN_TRACKING)
  beginTracking!: (arg0: object) => void;

  course = '';

  rating?: number = null;

  slope?: number = null;

  tees?: string = null;

  nowDate = new Date().toISOString().substr(0, 10);

  date = new Date().toISOString().substr(0, 10);

  onCreate() {
    if (this.course.length) {
      this.beginTracking({
        course: this.course,
        date: typeof this.date === 'string' ?
          this.date : (this.date as Date).toISOString().substr(0, 10),
        slope: this.slope,
        rating: this.rating,
        tees: this.tees,
      });
      this.$emit(START_ROUND_EVENT);
      this.$router.push('/track/hole/1');
    }
  }

  onCancel() {
    this.$emit(CANCEL_EVENT);
  }
}
</script>
