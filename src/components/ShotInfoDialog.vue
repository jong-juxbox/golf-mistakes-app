<template lang="pug">
  v-dialog(v-model="isVisible" max-width="300")
    v-card(@click.stop="onClose()" :ripple="false")
      v-card-title(class="headline") Shot {{ shotInfo.shotNo }}
      v-card-text
        div(class="gma-shot-details")
          div(class="details-section")
            div(class="gma-shot__title") Type:
            div(class="gma-shot__content") {{ shotInfo.type }}
            div(class="gma-shot__title") Category:
            div(class="gma-shot__content") {{ shotInfo.category }}
            div(class="gma-shot__title") Description:
            div(class="gma-shot__content") {{ shotInfo.desc }}
          div(class="d-flex details-section-inline details-section-alt")
            div(class="details-section-inline__content")
              span(class="gma-shot__title") Mistake:
              span(class="gma-shot__content") {{ shotInfo.mistake }}
              span(class="gma-shot__title") Penalty:
              span(class="gma-shot__content") {{ shotInfo.penalty }}
          div(v-if="shotInfo.isMistake" class="details-section-inline")
            div(class="details-section-inline__content")
              div(class="details-line")
                div(class="gma-shot__title") Result:
              div(class="details-line")
                div(class="gma-shot__content")
                  ResultsChips(v-if="shotInfo.result !== null" :isCloseable="false"
                      :results="shotInfo.result" :justify="'start'")
                  span(v-else) (no result recorded)
            div(class="details-section__action" @click.stop="editResult")
              v-btn(icon small)
                v-icon(small) mdi-pencil

          div(class="details-section-inline details-section-alt")
            div(v-if="hasSwingData" class="details-section-inline__content")
              div(v-if="clubName" class="details-line")
                span(class="gma-shot__title") Club:
                span(class="gma-shot__content") {{ clubName }}
              div(v-if="swingName" class="details-line")
                span(class="gma-shot__title") Swing:
                span(class="gma-shot__content") {{ swingName }}
              div(v-if="shotInfo.distance" class="details-line")
                span(class="gma-shot__title") Distance:
                span(class="gma-shot__content") {{ distance }}
            div(v-else class="details-section-inline__content")
              span (no swing data recorded)
            div(class="details-section__action" @click.stop="editSwing")
              v-btn(icon)
                v-icon(v-if="hasSwingData" small) mdi-pencil
                v-icon(v-else small) mdi-plus
</template>

<script lang="ts">
import _ from 'lodash';
import Vue from 'vue';
import Component from 'vue-class-component';
import ResultsChips from '@/components/ResultsChips.vue';
import { ShotInfo } from '@/store/current-round/types.d';
import { namespace } from 'vuex-class';
import { SWING_NAMES } from '@/store/consts';
import { CLUBS } from '@/store/clubs/getter-types';
import { Club } from '@/store/clubs/types.d';

const ClubsModule = namespace('clubs');

@Component({
  name: 'ShotInfoDialog',

  props: {
    shotInfo: Object,
    visible: Boolean,
  },

  components: {
    ResultsChips,
  },
})
export default class ShotInfoDialog extends Vue {
  @ClubsModule.Getter(CLUBS)
  clubs!: Array<Club>;

  shotInfo!: ShotInfo;

  visible!: boolean;

  get hasSwingData() {
    return this.clubName || this.swingName || this.shotInfo.distance;
  }

  get isVisible() {
    return this.visible;
  }

  set isVisible(value) {
    if (!value) {
      this.$emit('close');
    }
  }

  get clubName() {
    if (_.isNil(this.shotInfo.club)) {
      return null;
    }

    const club = this.clubs.find((item) => item.id === this.shotInfo.club);

    if (!club) {
      throw Error(`shotInfoDialog: clubName: unable to find club with id: ${this.shotInfo.club}`);
    }

    return `\xa0${club.type}`;
  }

  get swingName() {
    if (!_.isNil(this.shotInfo.swing)) {
      return `\xa0${SWING_NAMES[this.shotInfo.swing]}`;
    }

    return null;
  }

  get distance() {
    if (this.shotInfo.distance) {
      return `\xa0${this.shotInfo.distance} yds`;
    }

    return null;
  }

  editSwing() {
    this.$emit('edit-swing');
  }

  editResult() {
    this.$emit('edit-result');
  }

  onClose() {
    this.$emit('close');
  }
}
</script>

<style lang="stylus" scoped>
.details-section-inline
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px 10px;
  display: flex;
  flex-wrap: wrap;

.details-section
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;

.details-section-inline__content
  display: flex;
  flex-wrap: wrap;
  flex: 1 1;
  align-items: center;
  align-self: center;
  padding-right: 10px;

.details-section span
  line-height: 25px;

.details-section-alt
  background-color: #70707020;

.details-line
  flex: 1 1 100%;
  display: flex;

.details-section__action
  display: inline-flex;
  min-width: 24px;
  align-items center;
</style>
