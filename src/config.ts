class Config {
  get repo() {
    if (!process.env.GITHUB_REPOSITORY) {
      return 'morten-olsen/foobar';
    }
    return process.env.GITHUB_REPOSITORY;
  }

  get user() {
    const [user] = this.repo.split('/');
    return user;
  }

  get isProd() {
    return process.env.NODE_ENV === 'production';
  }
}

export default new Config();
