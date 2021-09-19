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
            <a-input placeholder="Enter a valid String Identifier." />
          </a-col>
        </a-row>
        <a-row class = "rowGap" id="accountToken">
          <a-col>
            Account Token:
            <a-input placeholder="Enter a valid Account Token." />
          </a-col>
        </a-row>
        <a-row class = "rowGap" id="originNumber">
          <a-col>
            Sending Phone Number:
            <a-input placeholder="Don't mess up the number!" />
          </a-col>
        </a-row>
        <a-row class = "rowGap" id="phoneNumber">
          <a-col>
            Receiving Phone Number:
            <a-input placeholder="Enter your number (or prank a friend)" />
          </a-col>
        </a-row>
        <a-row type = "flex" justify="end" id = "configRow">
          <a-col>
            <a-button type="danger">Cancel</a-button>
            &nbsp;
            <a-button type="primary">Save Changes</a-button>
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

export default {
  data() {
    return {
    
    }
  },
  methods : {
    
  }
}
</script>

