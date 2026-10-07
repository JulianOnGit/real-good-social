// CloudFront Function (viewer request) for realgoodsocial.org, deployed as
// `realgoodsocial-viewer-request` on distribution E8A6C6DIIQFS8. Runtime:
// cloudfront-js-2.0. Changes here are not deployed by CI — see the README.
//
//  1. www.realgoodsocial.org → realgoodsocial.org (301).
//  2. /about/ → /about (301), so each page has one indexable URL.
//  3. /pathways → /services/pathways-support (302), a short address for sharing.
//  4. /about → about/index.html in S3, where the prerendered page lives.
function querySuffix(querystring) {
  var parts = Object.keys(querystring).map(function (key) {
    var param = querystring[key];
    return param.value ? key + '=' + param.value : key;
  });
  return parts.length ? '?' + parts.join('&') : '';
}

function redirect(location) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: { location: { value: location } },
  };
}

function handler(event) {
  var req = event.request;
  var host = req.headers.host && req.headers.host.value;

  if (host === 'www.realgoodsocial.org') {
    return redirect('https://realgoodsocial.org' + req.uri + querySuffix(req.querystring));
  }

  if (req.uri.length > 1 && req.uri.endsWith('/')) {
    return redirect(req.uri.replace(/\/+$/, '') + querySuffix(req.querystring));
  }

  if (req.uri === '/pathways') {
    return {
      statusCode: 302,
      statusDescription: 'Found',
      headers: { location: { value: '/services/pathways-support' + querySuffix(req.querystring) } },
    };
  }

  if (req.uri === '/') {
    req.uri = '/index.html';
  } else if (req.uri.split('/').pop().indexOf('.') === -1) {
    req.uri += '/index.html';
  }
  return req;
}
