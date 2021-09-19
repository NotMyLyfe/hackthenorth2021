const cron = require('node-cron');
const find = require('find-process');



find('name', 'Google Chrome', true)
  .then(function (list) {
    console.log('there are %s nginx process(es)', list.length);
    console.log(list);
  });