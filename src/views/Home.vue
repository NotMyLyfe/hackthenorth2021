<template>
  <div id="mainPage">
      <a-layout style="padding: 24px; background-color: #fff">
        <a-page-header
            title="Main Menu"
            sub-title = "Welcome to Focuscord!"
        />
        <a-layout-content :style="{padding: '24px', margin: 0, minHeight: '280px' }">
          <a-row id = "changeStat">
            <a-col :span="24"> CURRENT STATUS:&nbsp;&nbsp;&nbsp;
              <a-cascader :options="options"
                          :display-render="displayRender"
                          placeholder="Select Status"
                          @change="switchMode" />
            </a-col>
          </a-row>
          <a-row class="inbtw">
            <a-col :span="6"> Only allow notifications for:
            </a-col>
          </a-row>
          <a-row class="inbtw"></a-row>
          <a-list class="listScroller" item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <!--<a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                <a-avatar
                  slot="avatar"
                  src="https://cdn.discordapp.com/attachments/698731617207844895/883936323772239902/richman.jpeg"
                />
              </a-list-item-meta>-->
              <a-list-item-meta :description="item.userid">
                <a slot="title" >{{ item.username }}</a>
                <a-avatar slot="avatar" :src="item.pfp"></a-avatar>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <a-row type = "flex" justify="end" id = "configRow">
            <a-col :span="6">
              <a-button id = "configBtn" type="primary">Configure Users</a-button>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
  </div>
</template>
<style scoped>
  #changeStat {
    font-weight: bold;
  }
  #configBtn {
    float: right;
  }
  #configRow {
    padding-top : 1vh;
  }
  .listScroller {
    max-height: 30vh;
    overflow: scroll;
  }
  .inbtw {
    margin-top: 1vh;
  }
</style>
<script>
const data = [
  {
    username : 'sa35577#6753',
    userid : 454791971244867620,
    pfp : 'https://cdn.discordapp.com/attachments/698731617207844895/883936323772239902/richman.jpeg',
    
  },
  {
    username : 'DavidH#0001',
    userid : 859093199390113803,
    pfp : 'https://cdn.discordapp.com/attachments/698731617207844895/888802373336727612/unknown.png'
  },
  {
    username : 'TernMaex#6753',
    userid : 454791971244867620,
    pfp : 'https://cdn.discordapp.com/attachments/698731617207844895/883936323772239902/richman.jpeg',
    
  },
  {
    username : 'Sat#0001',
    userid : 859093199390113803,
    pfp : 'https://cdn.discordapp.com/attachments/698731617207844895/888802373336727612/unknown.png'
  },
  {
    username : 'Gith#6753',
    userid : 454791971244867620,
    pfp : 'https://cdn.discordapp.com/attachments/698731617207844895/883936323772239902/richman.jpeg',
    
  },
  {
    username : 'MaexTurning#0001',
    userid : 859093199390113803,
    pfp : 'https://cdn.discordapp.com/attachments/698731617207844895/888802373336727612/unknown.png'
  },
  {
    username : 'Armaan#6753',
    userid : 454791971244867620,
    pfp : 'https://cdn.discordapp.com/attachments/698731617207844895/883936323772239902/richman.jpeg',
    
  },
  {
    username : 'GordonLiLin#0001',
    userid : 859093199390113803,
    pfp : 'https://cdn.discordapp.com/attachments/698731617207844895/888802373336727612/unknown.png'
  },
]
export default {
  name: "Home",
  data() {
    return {
      data,
      options : [
        {
          value : 'disabled',
          label : 'Disabled',
        },
        { 
          value : 'urgent',
          label : 'Urgent',
          children : [
            {
              value : 'urgent-only',
              label : 'Urgent ONLY',
            },
            {
              value : 'urgent-sms',
              label : 'Urgent To SMS',
            },
          ],
        },
        {
          value : 'custom',
          label : 'Custom',
          children : [
            
          ],
        },

      ]
    }
  },
  methods : {
    /*onChange(value) {
      console.log(value);
    }*/
    displayRender({ labels }) {
      return labels[labels.length-1];
    },
    switchMode() {

    }
  }
}
</script>

