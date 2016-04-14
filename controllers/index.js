'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:SamplesIndexCtrl
 * @description
 * # SamplesIndexCtrl
 * Controller of the minovateApp
 */
angular.module('minovateApp')
  .controller('SamplesIndexCtrl', function (resolvedData, Sample, DataHelpers, toastr) {
    var vm = this;

    angular.extend(vm, {
      // Resolved data from route
      samples: resolvedData,

      // CRUD
      _new: _new,
      _show: _show,
      _edit: _edit,
      _destroy: _destroy,
      _index: _index,
    });

    function _show(id) {
      Sample._show(id).then(function(savedSample) {
        DataHelpers.addOrReplace(vm.samples, savedSample);
      });
    }

    function _new() {
      Sample._new().then(function(savedSample) {
        if (savedSample.id) { vm.samples.unshift(savedSample); }
      });
    }

    function _edit(id) {
      Sample._edit(id).then(function(savedSample) {
        DataHelpers.addOrReplace(vm.samples, savedSample);
        toastr.success('Successfully registered')
      });
    }

    function _destroy(id) {
      Sample._destroy(id).then(function() {
        DataHelpers.removeByID(vm.samples, id);
        toastr.info('Successfully deleted')
      });
    }

    function _index() {
      Sample._index().then(function(res) {
        vm.samples = res.data;
      });
    }

  });
