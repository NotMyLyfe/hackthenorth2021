<template>
  <div>
    <a-layout style="padding: 24px; background-color: #fff">
      <a-page-header
          title="SMS Settings"
          sub-title = "Local SMS setup - all you!"
      />
      <a-layout-content :style="{padding: '24px', margin: 0, minHeight: '280px' }">
        <a-row class = "rowGap" id="accountSID">
          <a-col>
            String Identifier:
            <a-input placeholder="Enter a valid String Identifier." v-model="smsInfo.accountSID"/>
          </a-col>
        </a-row>
        <a-row class = "rowGap" id="accountToken">
          <a-col>
            Account Token:
            <a-input placeholder="Enter a valid Account Token." v-model="smsInfo.accountToken"/>
          </a-col>
        </a-row>
        <a-row class = "rowGap" id="originNumber">
          <a-col>
            Sending Phone Number:
            <a-input placeholder="Don't mess up the number!" v-model="smsInfo.originNumber"/>
          </a-col>
        </a-row>
        <a-row class = "rowGap" id="phoneNumber">
          <a-col>
            Receiving Phone Number:
            <a-input placeholder="Enter your number (or prank a friend)" v-model="smsInfo.phoneNumber"/>
          </a-col>
        </a-row>
        <a-row type = "flex" justify="end" id = "configRow">
          <a-col>
            <a-button type="primary" @click="saveChanges">Save Changes</a-button>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>

  </div>
  
</template>
<style scoped>
  #configRow {
    margin-top: 1vh;
  }
  .rowGap {
    margin-top: 0.5vh;
    margin-bottom : 0.5vh;
  }
</style>
<script>
import * as DiscordApiService from '@/services/DiscordAPIService';
import Swal from 'sweetalert2';
export default {
  name: "SMS",
  async beforeMount() {
    this.smsInfo = await DiscordApiService.getSMSConfig();
  },
  data() {
    return {
      smsInfo : {}
    }
  },
  methods : {
    async saveChanges() {
      await DiscordApiService.setSMS(this.smsInfo.phoneNumber, this.smsInfo.originNumber, this.smsInfo.accountSID, this.smsInfo.accountToken);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "SMS settings updated!"
      })
    }
  }
}
</script>

