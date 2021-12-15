<template  v-slot="{ user, signOut }" >
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <strong>Ready to create an app?</strong>
      <!-- <amplify-s3-album /> -->

      <div >
        <div v-for="(item, index) in results" :key="index" style="display: flex; flex: 1; margin: 30px; justify-content: center;">
          <div  style="--width:300px; margin: 12px; ">
            <amplify-s3-image :img-key="item.key" />
          </div>
        </div>
      </div>

      <ion-button @click="doSignOut()">SIGN OUT</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { defineComponent, onMounted, ref } from 'vue';
import { Storage } from 'aws-amplify';
import { useRouter } from 'vue-router';
import { useAuthenticator } from '@aws-amplify/ui-vue';

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton
  },
  setup() {
    const router = useRouter();
    const { send } = useAuthenticator();
    const results = ref<any>([])

    onMounted(async () => {
      results.value = await Storage.list("");
      console.log("called onMounted", results);
    })

    /**
     * 
     */
    const doSignOut = async () => {
      send('SIGN_OUT');
    }
    return {
      doSignOut,
      results
    }
  }
});
</script>

<style scoped>
#container {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

amplify-s3-image img {
  height: 40px;
  width: 40px;
}
</style>