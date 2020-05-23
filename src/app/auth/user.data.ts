export class UserData {
  constructor(public id: number, public roles: string[], public name: string,
              public pictureUrl: string) {
  }

  get isSuperAdmin() {
    return this.roles.find(role => role == 'ROLE_SUPER_ADMIN') != null;
  }

  get isAdmin() {
    return this.roles.find(role => role == 'ROLE_ADMIN') != null;

  }
}
