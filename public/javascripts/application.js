// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(function(){
   
   $('#login_button').click(function(){
       $('#login-buttons').hide();
       $('#login').show();
   });
   
   $('#login_cancel_button').click(function(){
       $('#login').hide();
       $('#login-buttons').show();
   })
   
   $('#kingdom-dropdown').change(function() {
      // Disable all dropdowns to the right of phylum.
      $('#class-dropdown').attr('disabled', 'disabled');
      $('#order-dropdown').attr('disabled', 'disabled');
      $('#family-dropdown').attr('disabled', 'disabled');
      $('#genus-dropdown').attr('disabled', 'disabled');
      $('#species').fadeOut();
      
      // If someone selects 'any'
      if ($('#kingdom-dropdown').val() == '') {
          
          $('#phylum-dropdown').attr('disabled', 'disabled');
          
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
          
      } else {
          
          // Populate the phylum dropdown.
          $.ajax({
              type: 'GET',
              url: '/taxonomy/dropdown/phylums', 
              data: { parent_id: $('#kingdom-dropdown').val() },
              success: function(response) {
                  $('#phylum-dropdown').html(response);
                  $('#phylum-dropdown').parent().effect('highlight', {}, 500);
              }
          });

          // Enable the phylum dropdown.
          $('#phylum-dropdown').removeAttr('disabled');
      
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#kingdom-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
      
      }
      
   });
   
   
   
   
   
   $('#phylum-dropdown').change(function() {
      // Disable all dropdowns to the right of class.
      $('#order-dropdown').attr('disabled', 'disabled');
      $('#family-dropdown').attr('disabled', 'disabled');
      $('#genus-dropdown').attr('disabled', 'disabled');
      $('#species').fadeOut();
      
      // If someone selects 'any'
      if ($('#phylum-dropdown').val() == '') {
          
          $('#class-dropdown').attr('disabled', 'disabled');
          
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#kingdom-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
          
      } else {
      
          // Populate the class dropdown.
          $.ajax({
              type: 'GET',
              url: '/taxonomy/dropdown/classes', 
              data: { parent_id: $('#phylum-dropdown').val() },
              success: function(response) {
                  $('#class-dropdown').html(response);
                  $('#class-dropdown').parent().effect('highlight', {}, 500);
              }
          });

          // Enable the class dropdown.
          $('#class-dropdown').removeAttr('disabled');
      
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#phylum-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
      
      }
      
   });
   
   
   
   
   
   $('#class-dropdown').change(function() {
      // Disable all dropdowns to the right of class.
      $('#family-dropdown').attr('disabled', 'disabled');
      $('#genus-dropdown').attr('disabled', 'disabled');
      $('#species').fadeOut();
      
      // If someone selects 'any'
      if ($('#class-dropdown').val() == '') {
          
          $('#order-dropdown').attr('disabled', 'disabled');
          
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#phylum-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
          
      } else {
      
          // Populate the order dropdown.
          $.ajax({
              type: 'GET',
              url: '/taxonomy/dropdown/orders', 
              data: { parent_id: $('#class-dropdown').val() },
              success: function(response) {
                  $('#order-dropdown').html(response);
                  $('#order-dropdown').parent().effect('highlight', {}, 500);
              }
          });

          // Enable the order dropdown.
          $('#order-dropdown').removeAttr('disabled');
      
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#class-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
      
      }
      
   });
   
   
   
   
   
   $('#order-dropdown').change(function() {
      // Disable all dropdowns to the right of family.
      $('#genus-dropdown').attr('disabled', 'disabled');
      $('#species').fadeOut();
      
      // If someone selects 'any'
      if ($('#order-dropdown').val() == '') {
          
          $('#family-dropdown').attr('disabled', 'disabled');
          
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#class-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
          
      } else {
      
          // Populate the family dropdown.
          $.ajax({
              type: 'GET',
              url: '/taxonomy/dropdown/families', 
              data: { parent_id: $('#order-dropdown').val() },
              success: function(response) {
                  $('#family-dropdown').html(response);
                  $('#family-dropdown').parent().effect('highlight', {}, 500);
              }
          });

          // Enable the family dropdown.
          $('#family-dropdown').removeAttr('disabled');
      
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#order-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
      
      }
      
   });
   
   
   
   
   
   
   $('#family-dropdown').change(function() {
      
      $('#species').fadeOut();
       
      // If someone selects 'any'
      if ($('#family-dropdown').val() == '') {
          
          $('#genus-dropdown').attr('disabled', 'disabled');
          
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#order-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
          
      } else {
       
          // Populate the genus dropdown.
          $.ajax({
              type: 'GET',
              url: '/taxonomy/dropdown/genuses', 
              data: { parent_id: $('#family-dropdown').val() },
              success: function(response) {
                  $('#genus-dropdown').html(response);
                  $('#genus-dropdown').parent().effect('highlight', {}, 500);
              }
          });

          // Enable the genus dropdown.
          $('#genus-dropdown').removeAttr('disabled');
      
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#family-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
      
      }
      
   });
   
   
   
   
   
   
   
   $('#genus-dropdown').change(function() {
       
      $('#species').fadeOut();
       
       // If someone selects 'any'
      if ($('#genus-dropdown').val() == '') {
          
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#family-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
          
      } else {
      
          // Update the main page content.
          $.ajax({
              type: 'GET',
              url: '/species/data', 
              data: { 'taxon_id': $('#genus-dropdown').val() },
              success: function(response) {
                  $('#species').html(response);
                  $('#species').fadeIn();
              }
          });
      
      }
      
   });
   
});