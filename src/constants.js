// bad practice to leave secrets in the project hard coded. only doing this for demo purpose.
// usually a user key should be store in a remote secret storage service guided by authentication.
const USER_KEY = "2c83a318e2f1bf83fe9ffe87566a"

let self = module.exports = {
    GET_ENDPOINT: `https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=${USER_KEY}`,
    POST_ENDPOINT: `https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=${USER_KEY}`,
}