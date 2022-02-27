import Keycloak, { KeycloakPromise } from 'keycloak-js'
import { store } from '@/store'
import { MutationTypes } from '@/store/mutation-types'
class Authentication {
  public keycloak: any
  private authenticated = false
  private refreshInterval = 0
  private profile = {}

  private initOptions = {
    url: process.env.VUE_APP_KEYCLOAK_URL!,
    realm: process.env.VUE_APP_KEYCLOAK_REALM || 'Mofa',
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID || 'mofa-cs',
    onLoad: 'check-sso'
  }

  public init(): void {
    if (!this.keycloak) {
      this.keycloak = Keycloak(this.initOptions)

      this.keycloak.onReady = function (auth: boolean) {
        this.authenticated = auth
      }

      this.keycloak.onAuthSuccess = function () {
        this.authenticated = true
      }

      this.keycloak.onAuthLogout = function () {
        this.authenticated = false
      }

      this.keycloak.init({ onLoad: 'check-sso' }).then((auth: boolean) => {
        if (auth) {
          store.commit(MutationTypes.SET_TOKEN, this.keycloak.token)
          this.refreshInterval = window.setInterval(() => {
            this.keycloak
              .updateToken(60)
              .then((res: any) => {
                if (res) {
                  store.commit(MutationTypes.SET_TOKEN, this.keycloak.token)
                }
              })
              .catch(() => {
                this.keycloak.clearToken()
              })
          }, 10000)

          this.keycloak.loadUserProfile().then(function (profile: any) {
            //app.profile = profile
            store.commit(MutationTypes.SET_USER_PROFILE, profile)
          })
        }
      })
    }
  }

  public login(): KeycloakPromise<void, void> {
    return this.keycloak.login()
  }

  public logout(): void {
    clearInterval(this.refreshInterval)
    this.keycloak.logout()
    this.authenticated = false
  }

  public userProfile() {
    if (this.profile) {
      return this.profile
    }

    return {}
  }

  public hasRole(role: string) {
    if (this.authenticated) {
      return this.keycloak.hasResourceRole(role)
    }

    return false
  }

  public hasRealmRole(role: string) {
    if (this.authenticated) {
      return this.keycloak.hasRealmRole(role)
    }

    return false
  }

  public isAuthenticated() {
    return this.authenticated
  }

  public authorize(role: string, callback: CallableFunction) {
    if (this.keycloak.hasResourceRole(role)) {
      callback()
    }
  }

  public async updateToken(minValidity: number): Promise<string> {
    await this.keycloak.updateToken()
    return this.keycloak.token
  }
}

export { Authentication }
