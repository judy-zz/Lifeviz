module ActiveRecord
  module Associations
    module ClassMethods
      require 'null_object'
      
      # Add a boolean :null_object option to belongs_to.
      def belongs_to_with_null_object(association_id, options = {}) #:nodoc:
        # Extract our custom option.
        use_null_object = options.delete(:null_object)
        # Call the real belongs_to so that the association gets defined.
        belongs_to_without_null_object(association_id, options)
        # Modify the association if need be.
        if use_null_object
          
          # Determine the class of the association.
          association_class_name = options[:class_name] || association_id.to_s.classify
          association_class = association_class_name.constantize

          # Determine the null class for this association.
          null_class_name = "Null" + association_class_name
          if Object.const_defined?(null_class_name)
            null_class = Object.const_get(null_class_name.to_sym)
          else
            # Define the null class as an ancestor of the association class.
            null_class = Object.const_set(null_class_name, Class.new(association_class))
            null_class.class_eval do
              include Singleton
              include ActiveRecordNullObject::NullObject
            end
          end

          # Modify the "getter" of the belongs_to relationship to return an
          # instance of the association's null object instead of returning nil.
          class_eval do
            define_method("#{association_id}_with_null_object".to_sym) do
              send("#{association_id}_without_null_object".to_sym) || null_class.instance
            end
            alias_method_chain association_id, :null_object
          end
          
        end
      end
      alias_method_chain :belongs_to, :null_object
      
      # Add a boolean :null_object option to has_one.
      def has_one_with_null_object(association_id, options = {}) #:nodoc:
        # Extract our custom option.
        use_null_object = options.delete(:null_object)
        # Call the real has_one so that the association gets defined.
        has_one_without_null_object(association_id, options)
        # Modify the association if need be.
        if use_null_object
          
          # Determine the class of the association.
          association_class_name = options[:class_name] || association_id.to_s.classify
          association_class = association_class_name.constantize

          # Determine the null class for this association.
          null_class_name = "Null" + association_class_name
          if Object.const_defined?(null_class_name)
            null_class = Object.const_get(null_class_name.to_sym)
          else
            # Define the null class as an ancestor of the association class.
            null_class = Object.const_set(null_class_name, Class.new(association_class))
            null_class.class_eval do
              include Singleton
              include ActiveRecordNullObject::NullObject
            end
          end

          # Modify the "getter" of the has_one relationship to return an
          # instance of the association's null object instead of returning nil.
          class_eval do
            define_method("#{association_id}_with_null_object".to_sym) do
              send("#{association_id}_without_null_object".to_sym) || null_class.instance
            end
            alias_method_chain association_id, :null_object
          end
          
        end
      end
      alias_method_chain :has_one, :null_object
      
    end
  end
end