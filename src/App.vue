<template>
  <ion-app>
    <Authenticator :key="authEvent +''">
        <ion-router-outlet />
    </Authenticator>
  </ion-app>
</template>


  <!-- <Authenticator>
    <template v-slot="{ user, signOut }">
      <h2>Hello {{ user.username }}!</h2>
      <h2>Hello {{ user?.attributes?.email }}!</h2>
      <amplify-s3-album />
      <button @click="signOut">Sign Out</button>
    </template>
  </Authenticator> -->

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';


import { Authenticator,useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

import Amplify, { Hub } from 'aws-amplify';
import { useMainStore } from './store';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Authenticator
  },
  setup() {

    // get the store
    const mainStore = useMainStore();

    Hub.listen('auth', (data: any) => {
      console.log(data.payload.event);
      switch (data.payload.event) {
        case 'signIn':
          console.log('user signed in');
          mainStore.setUser(data.payload?.data);
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signOut':
          console.log('user signed out');
          mainStore.clearUser();
          break;
        case 'configured':
          console.log('user configured');
          (async () => {
            try {
              const user = await Amplify.Auth.currentAuthenticatedUser();
              mainStore.setUser(user);
            } catch (e) {
              mainStore.clearUser();
            }
          })();
          break;
      }
    });

    Amplify.configure({

    });


    return {
      authEvent : mainStore.loggedIn
    }
  }
});
</script>