<template lang="pug">
  v-tab-item(value="Clubs" class="gma-scrolling-layout" :transition="false"
      :reverse-transition="false")
    div(v-show="!isAdding && !isEditing" class="gma-mistake-list")
      v-list
        v-list-item(v-for="club in clubs" :key="club.id" :ripple="false"
            @click.stop="onEdit(club.id)" dark class="club-list-item")
          v-list-item-content
            v-list-item-title {{ club.type }}
            v-list-item-subtitle {{ club.brand }}
          v-list-item-action
            v-btn(icon @click.stop="onEdit(club.id)")
              v-icon(color="white") mdi-pencil-circle
        v-list-item(class='gma-list-item__link' @click="createClub()" :ripple="false" inactive)
          v-btn(small rounded dark :ripple="false") + add a club

    EditClub(v-if="isAdding || isEditing" v-on:done-edit="onDoneEdit()"
        :clubId="clubToEdit")

    v-fab-transition
      v-btn(dark fixed bottom right fab v-show="!hideFab && !isAdding && !isEditing"
          @click="createClub")
        v-icon mdi-plus
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import EditClub from '@/views/screens/summary/EditClub.vue';
import { namespace } from 'vuex-class';
import { CLUBS } from '@/store/clubs/getter-types';
import { Club } from '@/store/clubs/types.d';

const ClubsModule = namespace('clubs');

@Component({
  name: 'Clubs',

  components: {
    EditClub,
  },
})
export default class Clubs extends Vue {
  @ClubsModule.Getter(CLUBS)
  clubs!: Array<Club>;

  hideFab = true;

  isAdding = false;

  isEditing = false;

  clubToEdit?: number = null;

  createClub() {
    this.isAdding = true;
  }

  onEdit(clubId: number) {
    this.clubToEdit = clubId;
    this.isEditing = true;
  }

  onDoneEdit() {
    this.isAdding = false;
    this.isEditing = false;
    this.clubToEdit = null;
  }

  mounted() {
    this.$nextTick(() => {
      // trigger the fab transition animation
      this.hideFab = false;
    });
  }
}
</script>

<style lang="stylus">
.club-list-item
  border: 1px solid #707070;
  border-radius: 2px;
  margin-bottom: 3px;
  background-color: #707070;
</style>
