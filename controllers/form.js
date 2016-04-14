'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:SamplesFormCtrl
 * @description
 * # SamplesFormCtrl
 * Controller of the minovateApp
 */
angular.module('minovateApp')
  .controller('SamplesFormCtrl', function (instance, Sample) {
    var vm = this;

    angular.extend(vm,{
      // Instance of sample
      sample: instance,

      // Crud operation
      _save: _save,

      // Setup for form
      setEditMode: setEditMode,
      isEditing: false,
      sampleForm: {}
    });

    function _save() {
      Sample._save(vm.sample).then(function(res) {
        vm.sample = res.data;
      });
    }

    function setEditMode() {
      vm.sampleForm = angular.copy(vm.sample);
      vm.isEditing = true;
    }

  });
