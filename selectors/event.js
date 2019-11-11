function getHeaders(data) {
  return data.headers || {}
}

function getXForwardedFor(data) {
  const headers = getHeaders(data)
  return headers['X-Forwarded-For'] || ''
}

function getFirstForwardedIp(data) {
  const forwardedIps = getXForwardedFor(data)
  return forwardedIps.split(', ').slice(0, 1).join('')
}

function getRequestContext(data) {
  return data.requestContext || {}
}

function getIdentity(data) {
  const reqContext = getRequestContext(data)
  return reqContext.identity || {}
}

function getSourceIp(data) {
  const identity = getIdentity(data)
  return identity.sourceIp || 'localhost'
}

function getUserAgent(data) {
  const identity = getIdentity(data)
  return identity.userAgent || 'no agent'
}

exports.getFirstForwardedIp = getFirstForwardedIp
exports.getSourceIp = getSourceIp
exports.getUserAgent = getUserAgent
