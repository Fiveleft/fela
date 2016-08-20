

/**
 * Use the sitemap npm 
 * @see  https://www.npmjs.com/package/sitemap
 */

// Example:


var app = require('../app'),
  sm = require('sitemap'),
  sitemap;

sitemap = sm.createSitemap ({
    hostname: 'http://fiveleft.com',
    cacheTime: 600000,        // 600 sec - cache purge period 
    urls: [
      { url: '/page-1/', changefreq: 'daily', priority: 0.3 },
      { url: '/page-2/', changefreq: 'monthly', priority: 0.7 },
      { url: '/page-3/' /*, changefreq: 'weekly',  priority: 0.5 */ },
      { url: '/page-4/', img: "http://urlTest.com" }
    ]
  });