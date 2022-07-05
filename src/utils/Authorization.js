import { isObject, isString, isEmpty, isArray, isUndefined } from 'lodash';
import { ls } from './LocalStorage';

class Authorization {
  constructor() {
    this.authUser = null;
    // this.sessionTimer = null;
    // this.sessionExpireTime = 1000 * 60 * 10; // (1000 * 60) = 1 minute & multiply 3 equal t0 3 minutes (time is in milliseconds (1000 is 1 second))
    // this.idleTimer();
  }

  // set auth user details to class property
  setAuthUser() {
    this.authUser = JSON.parse(ls.getItem('audetails'));
  }

  /**
   * check is active user is logged in
   * @return boolean
   */
  isLoggedIn() {
    return typeof ls.getItem('audetails') === 'string';
  }

  /**
   * check user is having the expected role
   * @param {string} role
   * @return boolean
   */
  isUserRole(role) {
    const user = this.getAuthUser();
    return (
      isObject(user) && isObject(user.userRole) && user.userRole.name === role
    );
  }

  /**
   * get logged in user details
   * @return object
   */
  getAuthUser() {
    if (this.isLoggedIn()) {
      this.setAuthUser();
    }
    return this.authUser;
  }

  /**
   * get auth user identifier
   * @return int
   */
  getAuthUserId() {
    const user = this.getAuthUser();
    return isObject(user) && user.userId ? user.userId : 0;
  }

  /**
   * get auth user role Id
   * @return int
   */
  getAuthRoleId() {
    const user = this.getAuthUser();
    return isObject(user) && user.roleId ? user.roleId : 0;
  }

  /**
   * Get authentication access token
   * @return string
   */
  getAccessToken() {
    let accessToken = null;
    const authUser = this.getAuthUser();
    if (authUser && isString(authUser.token)) {
      accessToken = authUser.token;
    }

    return accessToken;
  }

  /**
   * login the user by setting it in local storage
   * @param {object} userDetails
   */
  login(userDetails) {
    if (typeof Storage !== 'undefined') {
      ls.removeItem('audetails');
      ls.setItem('audetails', JSON.stringify(userDetails));
    } else {
      console.error('local storage is not supported');
    }
  }

  /**
   * Once user is logged in, redirect the user given redirectPath
   * @param {string} redirectPath
   */
  redirectAfterLogin(redirectPath = 'dashboard') {
    document.location = redirectPath;
  }

  // do logout
  logout() {
    if (typeof Storage !== 'undefined') {
      ls.removeItem('audetails');
      window.location.reload();
    } else {
      console.error('local storage is not supported');
    }
  }

  // Get the user roles
  getUserRole() {
    const user = this.getAuthUser();
    return isObject(user) && isArray(user.permissions) ? user.permissions : '';
  }

  // Get role permisions of the user roles
  getUserRolePermission() {
    const role = this.getUserRole();
    return !isEmpty(role) && isArray(role) && !isUndefined(role) ? role : '';
  }

  /**
   * Check whether given page is authorized or not to in user permission object to logged user. If user is authorized, return true. Otherwise, false.
   * @param string - page
   * @return boolean
   */
  isAuthorizedPage(page) {
    const rolePermission = this.getUserRolePermission();
    if (isEmpty(rolePermission)) {
      return false;
    }

    // Check for multiple permission
    if (isArray(page)) {
      let permission = false;
      page.forEach((singlePage) => {
        let pagePermission = this.isAuthorizedPage(singlePage);
        if (pagePermission) {
          permission = true;
          return;
        }
      });
      return permission;
    }
    const perm = rolePermission.find((x) => x.name === page);
    if (perm) {
      return true;
    }
    return false;
    // return has(rolePermission, page) && get(rolePermission, page, false);
  }

  /**
   * Reset the idle time based on listed action
   */
  // idleTimer() {
  //   let self = this;

  //   let sessionExpire = function () {
  //     self.logout();
  //     window.location.reload(); //Reloads the current
  //   };

  //   let resetTimer = function () {
  //     if (self.isLoggedIn()) {
  //       clearTimeout(self.sessionTimer);
  //       self.sessionTimer = setTimeout(sessionExpire, self.sessionExpireTime); // time is in milliseconds (1000 is 1 second)
  //     }
  //   };

  //   // This code required in future process
  //   document.getElementsByTagName("input").onkeypress = resetTimer;
  //   window.onmousemove = resetTimer; // catches mouse movements
  //   window.onmousedown = resetTimer; // catches mouse movements
  //   window.onclick = resetTimer; // catches mouse clicks
  //   window.onscroll = resetTimer; // catches scrolling
  //   window.onkeypress = resetTimer; //catches keyboard
  // }
}

export default new Authorization();
