# This configuration file works with both the Compass command line tool and within Rails.
# Require any additional compass plugins here.
project_type = :rails
project_path = RAILS_ROOT if defined?(RAILS_ROOT)
# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "public/stylesheets"
sass_dir = "app/stylesheets"
sass_options = {
  :style => :compressed
}
environment = Compass::AppIntegration::Rails.env
# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true
