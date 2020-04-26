const scrapList = require('./functions/scrapList');
const getContainers = require('./functions/getContainers');
const getContainerResource = require('./functions/getContainerResource');

exports.scrapList = scrapList.handler;
exports.getContainers = getContainers.handler;
exports.getContainerResource = getContainerResource.handler;
