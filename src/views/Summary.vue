<template lang="pug">
  #edittabs(class="gma-tabs-container" v-touch:swipe="onSwipe")
    v-tabs-items(v-model="currentTab")
      ShotTypes
      Clubs
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import { UPDATE_EDITING_TAB } from '@/store/mistake-defs/mutation-types';
import { CURRENT_EDITING_TAB } from '@/store/mistake-defs/getter-types';
import ShotTypes from '@/views/screens/summary/ShotTypes.vue';
import Clubs from '@/views/screens/summary/Clubs.vue';

const ShotTypesModule = namespace('mistakeDefs');

@Component({
  name: 'Summary',

  components: {
    ShotTypes,
    Clubs,
  },
})
export default class Summary extends Vue {
  @ShotTypesModule.Mutation(UPDATE_EDITING_TAB)
  updateEditingTab!: (arg0: string) => void;

  @ShotTypesModule.Getter(CURRENT_EDITING_TAB)
  currentEditingTab!: string;

  set currentTab(value) {
    this.updateEditingTab(value);
  }

  get currentTab() {
    return this.currentEditingTab;
  }

  onSwipe(direction: string) {
    if (direction === 'left' && this.currentTab === 'ShotTypes') {
      this.currentTab = 'Clubs';
    } else if (direction === 'right' && this.currentTab === 'Clubs') {
      this.currentTab = 'ShotTypes';
    }
  }
}
</script>
