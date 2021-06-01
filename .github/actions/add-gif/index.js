const core = require('@actions/core');
const github = require('@actions/github');
const octokit = github.getOctokit(GITHUB_TOKEN)

const action = async() => {

  const payload = JSON.stringify(github.context.payload.review, undefined, 2)
  console.log(`The event payload: ${payload}`);
  const user = payload.review.user.login
  
  await octokit.pulls.updateReview({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    pull_number: payload.pull_request.number,
    review_id: payload.review.id,
    body: `${payload.review.body}\n\n![${user} approves!](https://media.giphy.com/media/DhstvI3zZ598Nb1rFf/source.gif)`,
  })
}

action().catch(e => core.setFailed(e.message))
