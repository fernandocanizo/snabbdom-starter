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
};

const counterView = (currentSecondsCount) => {
  return h('div', `You have ${currentSecondsCount} seconds left`);
};

const patchClock = (oldClock, newClock) => {
  return patch(oldClock, newClock);
}

const patchCounter = (oldCounter, newCounter) => {
  return patch(oldCounter, newCounter);
};

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

const updateCounter = () => {
  let counterNode;
  let seconds;
  if ('undefined' === typeof counterNode) {
    counterNode = document.getElementById('counter');
  }

  if ('undefined' === typeof seconds) {
    seconds = 60;
  }

  return () => {
    seconds -= 1;
    console.log(`seconds: ${seconds}`);
    return patchCounter(counterNode, counterView(seconds));
  };
}

const clumper = () => {
  updateClock();
  updateCounter();
};

setInterval(updateCounter(), 1000);
