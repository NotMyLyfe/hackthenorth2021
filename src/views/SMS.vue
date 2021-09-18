<template>
  <div id="mainPage">
    <a-page-header
      title="SMS Settings"
      sub-title = "Local SMS setup - all you!"

    />
    <a-row class = "rowGap">
      <a-col>
        API Key: 
        <a-input placeholder="Enter a valid API key" />
      </a-col>
    </a-row>
    <a-row class = "rowGap">
      <a-col>
        Sending Phone Number: 
        <a-input placeholder="Don't mess up the number!" />
      </a-col>
    </a-row>
    <a-row class = "rowGap">
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
  </div>
  
</template>
<style scoped>
  #mainPage {
    margin : 5vh 2.5vw;
  }
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

