'use strict';

/**
 * @ngdoc service
 * @name minovateApp.sampleService
 * @description
 * # sampleService
 * Service in the minovateApp.
 */
angular.module('minovateApp')
  .factory('Sample', function (API_URL, $http, ModalHelpers) {
    var DEBUG = true,
        baseURL = (DEBUG ? '/mock': API_URL) + '/samples';

    return {
      // Promisses
      _index: _index,
      _save: _save,

      // Modals
      _destroy: _destroy,
      _new: _new,
      _edit: _edit,
      _show: _show,
    }

    // Promisses
    function _index(query){ return $http.get(baseURL, { params: query }); }

    function _save (sample) {
       if (sample.id) {
        return $http.put(baseURL + '/' + sample.id, sample);
       } else {
        return $http.post(baseURL, sample);
      }
    }

    // Modals
    function _show(id){
      return _get(id).then(function (res) {
        return ModalHelpers.openDetailsFor('samples', {sample: res.data});
      });
    }

    function _new (newInstance){
      newInstance = newInstance || {};
      return ModalHelpers.openDetailsFor('samples', {sample: newInstance, isEditing: true });
    }

    function _edit (id) {
      return _get(id).then(function(res){
        return ModalHelpers.openDetailsFor('samples', {sample: res.data, isEditing: true });
      });
    }

    function _destroy(id) {
      return ModalHelpers.destroyConfirmation().then(function(res){
        return $http.delete(baseURL +  '/' + id);
      });
    }

  // private
  function _get (id) { return $http.get(baseURL + '/' + id); }

  });
