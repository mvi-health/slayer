'use strict';

var Promise = require('es6-promise');
var commons = require('./_common.js');

/**
 * Processes an array of data and calls an `onComplete` callback with `error` and `spikes` parameters.
 *
 * @example
 ```js
 slayer()
 .fromArray(arrayData, function(err, spikes){
    if (err){
      console.error(err);
      return;
    }

    console.log(spikes);   // { x: 4, y: 12, id: '21232f297a57a5a743894a0e4a801fc3' }
  });
 ```
 *
 * @api
 * @name Slayer.prototype.fromArray
 * @this {Slayer}
 * @param data {Array.<Object|Number>}
 */
function fromArray(data){
  var self = this;

  var spikes = data
    .map(self.getValueY.bind(self))
    .map(self.filterDataItem.bind(self))
    .map(self.algorithm.bind(self, self.config.minPeakDistance))
    .map(commons.objectMapper.bind(self, data))
    .filter(commons.cleanEmptyElement.bind(null, self.config.transformedValueProperty));

  return spikes;
}

module.exports = fromArray;
