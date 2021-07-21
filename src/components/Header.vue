<template>
  <nav>
    <div>
      <div v-if="isLogin" class="login">
        <Avatar :src="user.photoURL" />
        <button class="text-gray-400 hover:text-white" @click="signOut">
          Sign Out
        </button>
      </div>

      <button v-else class="  text-gray-600 bg-white hover:bg-white border border-gray-300 w-full py-3" @click="signIn">
      <img  alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        Login with Google
      </button>
    </div>
  </nav>
</template>

<script>
import Avatar from './icons/Avatar.vue'
import { useAuth } from '@/DataSource'

export default {
  components: { Avatar },
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth()
    return { user, isLogin, signOut, signIn }
  }
}
</script>
