
export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);

    if (!this._nameEl || !this._jobEl) {
      throw new Error('UserInfo: selectores inválidos para name o job');
    }
  }

  getUserInfo() {
    return {
      name: this._nameEl.textContent?.trim() || '',
      job: this._jobEl.textContent?.trim() || '',
    };
  }

  setUserInfo({ name, job }) {
    if (typeof name === 'string') this._nameEl.textContent = name;
    if (typeof job === 'string') this._jobEl.textContent = job;
  }
}

