<template>
  <div class="about">
    <div>
      <a-row>
        <a-col :span="6"> CURRENT STATUS:
          <!--<a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1">
                <a-icon type="poweroff" />Disabled
              </a-menu-item>
              <a-menu-divider/>
              <a-menu-item key="2">
                <a-icon type="user" />Urgent-Only
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="user" />Urgent-To-SMS
              </a-menu-item>
              <a-menu-divider/>
            </a-menu>
            <a-button style="margin-left: 8px">
              Button <a-icon type="down" />
            </a-button>
          </a-dropdown>-->
          <a-cascader :options="options"
                      :display-render="displayRender"
                      placeholder="Select Status" 
                      @change="onChange" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6"> Only allow notifications for: 
        </a-col>
      </a-row>
      
      
    </div>
  </div>
</template>
<script>
/*import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {
    
  },
})*/
export default {
  data() {
    return {
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
            {
              value : 'new-profile',
              label : 'Create New Profile'
            }
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
  }
}
</script>

