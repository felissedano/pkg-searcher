export enum ActionType {
    SEARCH_REPOS = 'search_repos',
    SEARCH_REPOS_SUCCESS = 'search_repos_success',
    SEARCH_REPOS_ERROR = 'search_repos_error'
}

export enum RepoMangerType {
    NPM = 'npm',
    CARGO = 'cargo'
}

export enum RepoManagerURLType {
    NPM_URL = 'http://registry.npmjs.org/-/v1/search',
    CARGO_URL = 'https://crates.io/api/v1/crates',
    GITHUB_URL = "https://github.com/",
    GITHUB_API_URL = "https://api.github.com/repos/"
}