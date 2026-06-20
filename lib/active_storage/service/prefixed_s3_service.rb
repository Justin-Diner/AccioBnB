require "active_storage/service/s3_service"

module ActiveStorage
  class Service::PrefixedS3Service < Service::S3Service
    def initialize(prefix:, **options)
      @key_prefix = prefix.to_s.sub(%r{\A/*}, "").sub(%r{/*\z}, "")
      @key_prefix = "#{@key_prefix}/" unless @key_prefix.empty?
      super(**options)
    end

    private
      def object_for(key)
        bucket.object("#{@key_prefix}#{key}")
      end
  end
end
