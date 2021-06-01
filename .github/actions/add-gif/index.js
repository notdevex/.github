const core = require('@actions/core');
const github = require('@actions/github');

const action = async() => {
  const octokit = github.getOctokit(core.getInput('GITHUB_TOKEN'))
  const { payload } = github.context

  const user = payload.review.user.login
  
  await octokit.rest.pulls.updateReview({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    pull_number: payload.pull_request.number,
    review_id: payload.review.id,
    body: `${payload.review.body}\n\n![${user} approves!](https://media.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.gif)`,
  })
}

action().catch(e => core.setFailed(e.message))
