'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:SamplesShowCtrl
 * @description
 * # SamplesShowCtrl
 * Controller of the minovateApp
 */
angular.module('minovateApp')
  .controller('SamplesShowCtrl', function (instance, Sample, toastr, $state, $modalInstance) {
    var vm = this;

    angular.extend(vm,{
      // Resolved data from route
      sample: instance.sample,
      isEditing: false,

      // CRUD
      _save: _save,
      _destroy: _destroy,
      close: close,

      // Setup for form
      setEditMode: setEditMode,
      sampleForm: {}
    });

    // init edit mode if params if given
    if (instance.isEditing) { setEditMode(); }

    function _save(isInvalidFor) {
      if (isInvalidFor) { return; }

      Sample._save(vm.sampleForm).then(function(res) {
        vm.sample = res.data;
        toastr.success('Successfully registered')
        vm.isEditing = false;
      });
    }

    function _destroy() {
      Sample._destroy(vm.sample.id).then(function() {
        toastr.info('Successfully deleted');
        $state.go('app.samples',{}, {reload: true});
        $modalInstance.close();
      });
    }

    function setEditMode() {
      vm.sampleForm = angular.copy(vm.sample);
      vm.isEditing = true;
    }

    function close() {
      $modalInstance.close(vm.sample);
    }
  });
