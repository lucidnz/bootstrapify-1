#!/usr/bin/env/ruby

require 'yaml'

# Get the "type" of checkout from the arguments Git passes to us.
# Possible values for this are "0" for a file-only checkout (which we dont' care about)
# or "1" for a full branch checkout (which we do).
checkout_type = ARGV[2]

if checkout_type == "1"
  # Get the name of the current branch and the absolute path to our git root. Trim whitespace.
  current_branch_name = `git rev-parse --abbrev-ref HEAD`.gsub(/\s+/, "")
  root_directory = `git rev-parse --show-toplevel`.gsub(/\s+/, "")

  # Convert the branch name to a symbol for hash lookups.
  branch = current_branch_name.to_sym

  # Find and update any config.yml files.
  Dir.glob("#{root_directory}/**/config.yml").each do |config_file|
    config = YAML.load_file(config_file)

    # Check to see if we've specified a known theme ID for this branch.
    if config.has_key?(branch)
      config[:theme_id] = config.fetch(branch)

      File.open(config_file, 'w') do |f|
        f.write config.to_yaml
      end
    end
  end
end