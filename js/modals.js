/* ========================================================================
 * Ratchet: modals.js v2.0.2
 * http://goratchet.com/components#modals
 * ========================================================================
 * Copyright 2015 Connor Sears
 * Licensed under MIT (https://github.com/twbs/ratchet/blob/master/LICENSE)
 * ======================================================================== */

!(function () {
  'use strict';

  var eventModalOpen = new CustomEvent('modalOpen', {
    bubbles: true,
    cancelable: true
  });
  var eventModalClose = new CustomEvent('modalClose', {
    bubbles: true,
    cancelable: true
  });
  var findModals = function (target) {
    var i;
    var modals = document.querySelectorAll('a');

    for (; target && target !== document; target = target.parentNode) {
      for (i = modals.length; i--;) {
        if (modals[i] === target) {
          return target;
        }
      }
    }
  };

  var getModal = function (event) {
    var modalToggle = findModals(event.target);
    if (modalToggle && modalToggle.hash) {
      return document.querySelector(modalToggle.hash);
    }
  };

  window.addEventListener('touchend', function (event) {
    var modal = getModal(event);
    if (modal && modal.classList.contains('modal')) {
      var eventToDispatch = eventModalOpen;
      if (modal.classList.contains('active')) {
        eventToDispatch = eventModalClose;
      }
      modal.dispatchEvent(eventToDispatch);
      modal.classList.toggle('active');
    }
    event.preventDefault(); // prevents rewriting url (apps can still use hash values in url)
  });
}());
