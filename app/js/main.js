"use strict";

import snabbdom from 'snabbdom';
import h from 'snabbdom/h';


const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);

const clockView = (currentDate) => {
  return h('div', 'Current date ' + currentDate);
}

const patchClock = (oldClock, newClock) => {
  return patch(oldClock, newClock);
}

const updateClock = () => {
  let clockNode;
  if ('undefined' === typeof clockNode) {
    // get clock node the first time
    clockNode = document.getElementById('clock');
  }

  return function () {
    clockNode = patchClock(clockNode, clockView(new Date()));
  };
};

setInterval(updateClock(), 1000);
