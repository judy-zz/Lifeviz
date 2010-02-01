module KarmaClient
  # This class provides the karma interface to the user model. 
  class Karma
    
    # Accepts the user object that we're going to be reporting karma for.
    def initialize(user)
      @user = user
      fetch_karma
    end
    
    # Return the total karma for this user. This is the sum of all the 
    # buckets' karma.
    def total
      @total
    end

    # Update the total karma for this user. This is just here so that the 
    # buckets model can update the total when a bucket is changed. It should
    # not be called externally, since it only affects cached data and has
    # no effect on the values on the server.
    def total=(new_total) #:nodoc:
      @total = new_total
    end
    
    # Return the levels object for this user.
    def levels
      Levels.new(@total)
    end
    
    private
    
    # Retrieve all of the karma information for this user from the server.
    def fetch_karma
      # resource = RestClient::Resource.new(karma_url, :user => '', :password => KARMA_API_KEY)   # with authentication
      resource = RestClient::Resource.new("http://#{KARMA_SERVER_HOSTNAME}/users/#{@user.karma_permalink}/karma.json")
      json = resource.get
      results = ActiveSupport::JSON.decode(json)
      @total = results['total']
      # TODO: What is the appropriate behavior when the karma server is unreachable?
      # rescue RestClient::Exception
    end
    
  end
end