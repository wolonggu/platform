require 'fileutils'
moduleName = ARGV[0]
moduleDir = "./app/#{moduleName}"
FileUtils::mkdir_p moduleDir

`ng generate module #{moduleName}`

directories = %w(actions components containers effects models reducers services)
Dir.chdir moduleDir do
  directories.each do |d|
    FileUtils.mkdir_p d
  end

end
